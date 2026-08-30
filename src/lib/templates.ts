// The "Shareable Bots" lane — everything templates need, in one file.
//
// Shaped after `lib/news.ts`, deliberately: templates are NOT part of `AnyDoc`. See the long
// note in `src/content.config.ts` for why. The consequence is that this file owns the lane's
// ordering, its serialisers and its cross-links, and `lib/entries.ts` / `lib/api.ts` stay
// exactly as they were.
//
// NAMING: `template` is the machine word (collection, API `type`, feed items); "Shareable Bots"
// is the human word (H1, nav, footer, OG). The split is deliberate and precedented — CP-032
// renames the rendered label of `replicability` without touching the field. Do not unify them.
import { getCollection, type CollectionEntry } from 'astro:content';
import { envelope, SITE_URL } from './api';
import { integrationSlug } from './entries';
import templateTagFacets from '../data/template-tags.json';

export type TemplateDoc = CollectionEntry<'templates'>;

export type TagFacet = {
  facet: string;
  label: string;
  tags: Array<{ slug: string; label: string }>;
};

const FACETS = templateTagFacets as TagFacet[];

const TAG_LABEL = new Map<string, string>();
const TAG_FACET = new Map<string, string>();
for (const facet of FACETS) {
  for (const tag of facet.tags) {
    TAG_LABEL.set(tag.slug, tag.label);
    TAG_FACET.set(tag.slug, facet.facet);
  }
}

/** Unknown slugs degrade to themselves rather than throwing — the schema already gated them. */
export function tagLabel(slug: string): string {
  return TAG_LABEL.get(slug) ?? slug;
}
export function facetOfTag(slug: string): string | undefined {
  return TAG_FACET.get(slug);
}
export function tagFacets(): TagFacet[] {
  return FACETS;
}

export function templateUrlOf(doc: TemplateDoc): string {
  return `/marketplace/${doc.data.slug}/`;
}

export function templateDetailUrl(doc: TemplateDoc): string {
  return `${SITE_URL}/api/v1/templates/${doc.data.slug}.json`;
}

/** Human list surfaces: never deprecated, demo, or proposed (mirrors `isListable`). */
export function isListableTemplate(doc: TemplateDoc): boolean {
  const { status } = doc.data;
  return status !== 'deprecated' && status !== 'demo' && status !== 'proposed';
}

/** Machine surfaces: live + needs-update only (mirrors `included`). */
export function includedTemplates(docs: TemplateDoc[]): TemplateDoc[] {
  return docs.filter((d) => d.data.status === 'live' || d.data.status === 'needs-update');
}

/** `added_at` desc, slug asc — the same cursor contract every other lane uses. */
export function sortTemplates(docs: TemplateDoc[]): TemplateDoc[] {
  return [...docs].sort((a, b) =>
    a.data.added_at === b.data.added_at
      ? a.data.slug.localeCompare(b.data.slug)
      : a.data.added_at < b.data.added_at
        ? 1
        : -1
  );
}

/**
 * TRUE RECENCY — `source.posted_at` desc. The key for "what's new", and it is NOT `added_at`.
 *
 * ── WHY `sortTemplates` CANNOT ANSWER THIS ──────────────────────────────────────────────
 * The harvester stamps every template it publishes with the SAME `added_at` constant, so
 * `sortTemplates`' primary key is a tie across the entire corpus and its `slug.localeCompare`
 * tiebreaker decides everything. It is, in practice, alphabetical — a perfectly stable order
 * for a sectioned skim (which is all it was ever asked for) and completely empty of recency.
 * A "latest" strip built on it would have shipped 12 bots starting with a digit.
 *
 * `source.posted_at` is the timestamp of the X post the bot was actually shared in, which is
 * the only real event in the record, so it is what "newest" means here.
 *
 * ── THE MISSING-TIMESTAMP CASE IS REAL ──────────────────────────────────────────────────
 * `source` is optional in the schema and `posted_at` is optional within it, so an entry can
 * legitimately carry neither. Those sort to the END, keeping their incoming relative order,
 * and a malformed date is treated identically to a missing one — this function never throws
 * and never lets one bad frontmatter field reorder the ones around it.
 *
 * Ties (two bots shared in the same second — the harvester does produce these) fall back to
 * the incoming index rather than to a second field, so the order is stable across builds
 * without inventing a ranking the data does not support.
 */
export function latestTemplates(docs: TemplateDoc[], limit = 12): TemplateDoc[] {
  const at = (doc: TemplateDoc): number | null => {
    const raw = doc.data.source?.posted_at;
    if (!raw) return null;
    const ms = Date.parse(raw);
    return Number.isNaN(ms) ? null : ms;
  };
  return docs
    .map((doc, index) => ({ doc, index, ms: at(doc) }))
    .sort((a, b) => {
      if (a.ms === null && b.ms === null) return a.index - b.index;
      if (a.ms === null) return 1;
      if (b.ms === null) return -1;
      return b.ms - a.ms || a.index - b.index;
    })
    .slice(0, Math.max(0, limit))
    .map((row) => row.doc);
}

// `sortTemplatesFeatured` and the `/marketplace/featured/` route are GONE (operator,
// 2026-08-28: "no featured for now, just pure list and upvoting"). Ordering inside a section is
// `sortTemplates` — newest first.
//
// WHY NEWEST AND NOT VOTES, for v1: vote counts arrive from the votes API AFTER hydration, so
// ordering by them means either shipping a server order that visibly reshuffles, or hiding the
// list until the counts land (what `/use-cases/upvoted/` does, and it can afford to because it
// is one flat list). Reshuffling seven sections under the reader is worse than a stable order,
// so rows ship newest-first with their live ▲ counts visible, and per-section vote ordering is
// a fast-follow that can reuse the `upvoted-sort` island once the counts are real.
//
// NOTE ON THE `featured` FIELD: it stays in the schema AND in the API. Removing it from
// /api/v1/templates.json would break v1's additive-only promise (§7.1 STABILITY: existing
// fields are never removed within v1). It is simply no longer rendered or sorted on.

export async function allTemplates(): Promise<TemplateDoc[]> {
  return sortTemplates((await getCollection('templates')).filter(isListableTemplate));
}

// ── SECTIONS ────────────────────────────────────────────────────────────────────────────
//
// The sectioned skim is the marketplace's primary presentation (operator, 2026-08-28): a
// reader scans section headers, jumps to the one they want, and scans its rows.
//
// ASSIGNMENT IS DERIVED, NEVER AUTHORED. Each template lands in exactly ONE section via the
// first rule that matches, in the order below. Nothing in frontmatter says which section an
// entry belongs to, which is what lets the corpus grow to hundreds with zero manual filing —
// a new template slots itself the moment its tags are set.
//
// PRIORITY ORDER IS THE WHOLE DESIGN. A bot tagged both `agent-team` and `finance` is an
// orchestrator that happens to touch money, so orchestrators come first.
//
// ── WHY "PERSONAL & LIFE" IS A LIFE-DOMAIN MATCH AND NOT THE CATCH-ALL ──────────────────
// It used to be last and unconditional, and it held TWO of 98 templates. The cause was not
// thin content, it was the shape of the rule: `personal` is an AUDIENCE tag that sits on most
// entries, while every other section is DOMAIN-shaped, so six domain filters ran first and
// drained it. 57 of 98 carried a life tag and landed somewhere else. More lifestyle content
// would not have fixed that.
//
// So Personal now matches the LIFE DOMAINS — home, health, travel, family, wellbeing — and
// deliberately NOT `life-hacks`, which the deal bots (Bounty Hunter, Local Deals, Lease Finder,
// Credit Card Max) all carry and which would have dragged them out of Money, where somebody
// shopping actually looks. It sits BELOW Money for the same reason: money matches first.
//
// SPLITTING A SECTION LATER is a two-line change — insert an entry with a narrower `match`
// above the broader one it is carving out of, and every affected template re-files itself on
// the next build.
export type TemplateSection = {
  /** Anchor id, also the quick-nav href. */
  id: string;
  label: string;
  /** First match wins. Runs against the entry's tags plus its lowercased name. */
  match: (tags: Set<string>, name: string) => boolean;
};

const has = (tags: Set<string>, ...slugs: string[]) => slugs.some((s) => tags.has(s));

export const TEMPLATE_SECTIONS: TemplateSection[] = [
  {
    id: 'chief-of-staff',
    label: 'Chief of Staff & orchestrators',
    // The name check catches the several bots that ARE routers but are tagged only by domain.
    match: (t, name) =>
      has(t, 'meta-bot', 'agent-team') || /\b(router|orchestrat|chief of staff)\b/.test(name),
  },
  { id: 'money', label: 'Money, deals & finance', match: (t) => has(t, 'saving-money', 'finance', 'shopping') },
  // Life DOMAINS only, and below money on purpose. See the note above.
  { id: 'personal', label: 'Personal & life', match: (t) => has(t, 'home', 'health', 'travel', 'family', 'wellbeing') },
  { id: 'work', label: 'Work, ops & back office', match: (t) => has(t, 'ops', 'back-office', 'email', 'productivity') },
  { id: 'dev', label: 'Dev & engineering', match: (t) => has(t, 'developer', 'engineering') },
  { id: 'research', label: 'Research, monitoring & news', match: (t) => has(t, 'research', 'monitoring', 'news', 'data') },
  { id: 'creator', label: 'Creator, content & design', match: (t) => has(t, 'creator', 'content', 'social-media', 'design', 'youtube') },
];

/**
 * THE MAPPING MUST STAY TOTAL. Every section now has a real predicate, so — unlike the old
 * unconditional last entry — a future template whose tags match nothing would fall through and
 * `sectionOf` would return undefined. Today's 98 all match, which is exactly the kind of thing
 * that looks fine until the harvest brings in something new.
 *
 * A template with no domain signal at all is a general-purpose personal bot, so Personal is the
 * fallback. It is named here rather than assumed to be `at(-1)`, because the array order is a
 * display decision and reordering it must not silently change where unmatched entries land.
 */
const FALLBACK_SECTION = TEMPLATE_SECTIONS.find((s) => s.id === 'personal')!;

export function sectionOf(doc: TemplateDoc): TemplateSection {
  const tags = new Set(doc.data.tags);
  const name = doc.data.name.toLowerCase();
  return TEMPLATE_SECTIONS.find((s) => s.match(tags, name)) ?? FALLBACK_SECTION;
}

/**
 * Templates grouped into the fixed section order, empty sections dropped.
 *
 * Ordering WITHIN a section is `sortTemplates` (newest first) — see the note on
 * `sortTemplatesFeatured` below for why that is the v1 answer rather than vote order.
 */
export function groupBySection(docs: TemplateDoc[]): Array<{ section: TemplateSection; items: TemplateDoc[] }> {
  const byId = new Map<string, TemplateDoc[]>();
  for (const doc of docs) {
    const id = sectionOf(doc).id;
    byId.set(id, [...(byId.get(id) ?? []), doc]);
  }
  return TEMPLATE_SECTIONS.filter((s) => byId.has(s.id)).map((section) => ({
    section,
    items: sortTemplates(byId.get(section.id)!),
  }));
}

/** Per-tag counts, for the filter chips. Only counts tags that are actually in use. */
export function tagCounts(docs: TemplateDoc[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const doc of docs) {
    for (const tag of doc.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return counts;
}

/**
 * One lowercased haystack per row, precomputed at build so the filter island never has to walk
 * the DOM to find text. Name + tagline + tag LABELS (what the reader sees) + the handle.
 */
export function searchTextOf(doc: TemplateDoc): string {
  const d = doc.data;
  return [d.name, d.tagline, ...d.tags.map(tagLabel), ...d.tags, `@${d.sharer.handle}`]
    .join(' ')
    .toLowerCase();
}

/** Shared-tag count desc → same primary_category → newest. Max 3, never padded. */
export function relatedTemplates(doc: TemplateDoc, pool: TemplateDoc[]): TemplateDoc[] {
  const mine = new Set(doc.data.tags);
  return pool
    .filter((other) => other.data.slug !== doc.data.slug)
    .map((other) => ({
      doc: other,
      overlap: other.data.tags.filter((t) => mine.has(t)).length,
      samePrimary: other.data.primary_category === doc.data.primary_category ? 1 : 0,
    }))
    .filter((row) => row.overlap > 0)
    .sort(
      (a, b) =>
        b.overlap - a.overlap ||
        b.samePrimary - a.samePrimary ||
        (a.doc.data.updated_at < b.doc.data.updated_at ? 1 : -1)
    )
    .slice(0, 3)
    .map((row) => row.doc);
}

/**
 * The REVERSE cross-link: which templates name this use case in `related_use_cases`.
 *
 * Derived rather than authored so a use case never has to know a template exists — which is
 * what let this ship without editing a single one of the 135 existing use-case files.
 */
export function templatesReferencing(useCaseSlug: string, pool: TemplateDoc[]): TemplateDoc[] {
  return pool.filter((doc) => doc.data.related_use_cases.includes(useCaseSlug));
}

/** Tags grouped by facet — published so a consumer never re-implements our vocabulary file. */
function tagFacetMap(tags: string[]): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const facet of FACETS) out[facet.facet] = [];
  for (const tag of tags) {
    const facet = facetOfTag(tag);
    if (facet) out[facet].push(tag);
  }
  return out;
}

function sharerApi(doc: TemplateDoc) {
  const s = doc.data.sharer;
  return { handle: s.handle, name: s.name ?? null, url: s.url, platform: s.platform };
}

function sourceApi(doc: TemplateDoc) {
  const src = doc.data.source;
  if (!src) return null;
  return { url: src.url, excerpt: src.excerpt, posted_at: src.posted_at ?? null };
}

/**
 * The lean feed item (§7.1.5). Keeps the feed's existing field contract exactly — `type`,
 * `slug`, `url`, `detail_url`, `headline`, `summary`, `categories`, `awesome_score`, `format`,
 * `featured`, `source`, `added_at`, `updated_at` — and adds exactly two template-only keys.
 * `categories` carries the tag slugs, so a consumer's existing interest filter keeps working
 * with no change at all. Purely additive: v1's additive-only promise holds.
 */
export function toTemplateFeedItem(doc: TemplateDoc): Record<string, unknown> {
  const d = doc.data;
  return {
    type: 'template',
    slug: d.slug,
    url: `${SITE_URL}${templateUrlOf(doc)}`,
    detail_url: templateDetailUrl(doc),
    headline: d.name,
    summary: d.tagline,
    categories: d.tags,
    awesome_score: null,
    format: null,
    featured: d.featured,
    source: { platform: d.sharer.platform, label: `@${d.sharer.handle}`, url: d.source?.url ?? d.sharer.url },
    // Template-only. `share_url` is the whole point of the lane: it is what a connected Bot
    // shows its human as the install link.
    share_url: d.share_url ?? null,
    includes: d.includes,
    added_at: d.added_at,
    updated_at: d.updated_at,
  };
}

/** §7.1.3 non-lossy: every frontmatter field under its snake_case name. */
export function toTemplateApiItem(doc: TemplateDoc): Record<string, unknown> {
  const d = doc.data;
  return {
    type: 'template',
    slug: d.slug,
    url: `${SITE_URL}${templateUrlOf(doc)}`,
    detail_url: templateDetailUrl(doc),
    name: d.name,
    tagline: d.tagline,
    description: d.description,
    share_url: d.share_url ?? null,
    sharer: sharerApi(doc),
    source: sourceApi(doc),
    tags: d.tags,
    tag_facets: tagFacetMap(d.tags),
    primary_category: d.primary_category,
    includes: d.includes,
    includes_note: d.includes_note ?? null,
    integrations: d.integrations.map((name) => {
      const slug = integrationSlug(name);
      return { slug, name, page_url: `${SITE_URL}/integrations/${slug}/` };
    }),
    related_use_cases: d.related_use_cases.map((slug) => ({
      slug,
      url: `${SITE_URL}/use-cases/${slug}/`,
    })),
    featured: d.featured,
    status: d.status,
    added_at: d.added_at,
    updated_at: d.updated_at,
    verified_at: d.verified_at ?? null,
    body: (doc.body ?? '').trim(),
  };
}

export function templateEnvelope(docs: TemplateDoc[]) {
  return envelope(sortTemplates(docs).map(toTemplateApiItem));
}
