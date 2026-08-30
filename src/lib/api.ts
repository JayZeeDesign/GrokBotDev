// §7.1 JSON API serializers. §3.2 puts these under src/lib/api.ts and the endpoints under
// src/pages/api/v1/*.json.ts; §7.1.1 describes them as a post-build script. §3.2 owns repo
// layout, so they are Astro endpoints — identical dist output, and they read the content
// collections directly instead of re-parsing frontmatter. (Same call as llms.txt.)
//
// Governing rule (§7.1.3): NON-LOSSY. Every §5 frontmatter field and every §5.3 body
// section appears under its §5 snake_case name. The only renames are `works_with`
// (plugins) and `integrations` (use cases) → the API field `integrations`.
import type { AnyDoc, UseCaseDoc } from './entries';
import { categoriesOf, integrationSlug, kindOf, primarySourceOf, summaryOf, titleOf, urlOf } from './entries';
import integrationsVocab from '../data/integrations.json';
import { API_VERSION, SCHEMA_REVISION } from './apiMeta';

export const SITE_URL = 'https://grokbot.dev';

/**
 * §7.1.1 envelope — the keys guaranteed on every endpoint forever. `schema_revision` +
 * `api_version` are stamped on EVERY response so a bot can detect the API changed from any
 * call it already makes (and know where to look: /api/v1/status.json).
 */
export function envelope<T>(items: T[], extra: Record<string, unknown> = {}) {
  return {
    generated_at: new Date().toISOString(),
    api_version: API_VERSION,
    schema_revision: SCHEMA_REVISION,
    status_url: `${SITE_URL}/api/v1/status.json`,
    count: items.length,
    ...extra,
    items,
  };
}

export function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

/** §7.1.1: live + needs-update only. `deprecated` and `demo` never appear. */
export function included(docs: AnyDoc[]): AnyDoc[] {
  return docs.filter((d) => d.data.status === 'live' || d.data.status === 'needs-update');
}

/** §7.1.1 sort + stable cursor: `added_at` desc, tie-break `slug` asc. */
export function apiSort(docs: AnyDoc[]): AnyDoc[] {
  return [...docs].sort((a, b) =>
    a.data.added_at === b.data.added_at
      ? a.data.slug.localeCompare(b.data.slug)
      : a.data.added_at < b.data.added_at
        ? 1
        : -1
  );
}

function integrationObjects(names: string[]) {
  return names.map((name) => {
    const slug = integrationSlug(name);
    return { slug, name, page_url: `${SITE_URL}/integrations/${slug}/` };
  });
}

/** §5.3 body sections → snake_case API fields. */
function section(body: string, heading: string, next: string[]): string | null {
  const start = body.indexOf(heading);
  if (start === -1) return null;
  const from = start + heading.length;
  const ends = next.map((h) => body.indexOf(h, from)).filter((i) => i !== -1);
  const end = ends.length ? Math.min(...ends) : body.length;
  return body.slice(from, end).trim() || null;
}

function promptFromBody(body: string): string | null {
  const match = body.match(/```text\n([\s\S]*?)```/);
  return match ? match[1].trim() : null;
}

/**
 * F17 — `primary_source`, in §5 snake_case, with the DERIVED fields kept.
 *
 * `video_id` and `start_seconds` are not frontmatter — they are computed from `url` and
 * `timestamp` at resolve time. They are published anyway: an API consumer that wanted to
 * embed the video would otherwise have to re-implement our URL parser and our mm:ss maths,
 * and two parsers is two answers. `timestamp` is published beside `start_seconds` because the
 * human receipt ("4:12") is what a reader is shown; the seconds are what a machine wants.
 */
function primarySourceApi(doc: AnyDoc): Record<string, unknown> | null {
  if (kindOf(doc) !== 'use-case') return null;
  const source = primarySourceOf(doc as UseCaseDoc);
  if (!source) return null;
  if (source.kind === 'youtube-video') {
    return {
      kind: source.kind,
      url: source.url,
      video_id: source.videoId,
      title: source.title,
      channel: source.channel,
      channel_url: source.channelUrl ?? null,
      timestamp: source.timestamp ?? null,
      start_seconds: source.startSeconds ?? null,
      posted_at: source.postedAt ?? null,
    };
  }
  return {
    kind: source.kind,
    url: source.url,
    author_handle: source.authorHandle,
    excerpt: source.excerpt,
    posted_at: source.postedAt ?? null,
  };
}

/** The per-entry detail endpoint for a doc: /api/v1/{use-cases|plugins|collections}/<slug>.json */
export function detailUrl(doc: AnyDoc): string {
  const kind = kindOf(doc);
  const dir = kind === 'use-case' ? 'use-cases' : kind === 'plugin' ? 'plugins' : 'collections';
  return `${SITE_URL}/api/v1/${dir}/${doc.data.slug}.json`;
}

/** One compact "who/where it's from" object for the lean feed — enough to show credit. */
function feedSource(doc: AnyDoc): Record<string, unknown> | null {
  const kind = kindOf(doc);
  if (kind === 'use-case') {
    const src = primarySourceOf(doc as UseCaseDoc);
    if (src?.kind === 'youtube-video') {
      return { platform: 'youtube', label: src.channel, url: src.url };
    }
    const d = doc.data as Record<string, unknown>;
    const tweet = ((d.source_tweets ?? []) as Array<Record<string, unknown>>)[0];
    const author = d.author as Record<string, unknown> | undefined;
    const handle = (tweet?.author_handle as string) ?? (author?.handle as string) ?? null;
    if (!handle) return null;
    return { platform: 'x', label: `@${handle}`, url: (tweet?.url as string) ?? (author?.url as string) ?? null };
  }
  if (kind === 'plugin') {
    const url = (doc.data as Record<string, unknown>).project_url as string | undefined;
    if (!url) return null;
    return { platform: 'web', label: new URL(url).host.replace(/^www\./, ''), url };
  }
  return null;
}

/**
 * §7.1.5 — the LEAN feed item: the decision layer. Everything a bot needs to scan and rank
 * "what's new" and decide what's relevant — WITHOUT the prompt or body (which are ~half the
 * payload). The bot then fetches `detail_url` only for the entries it actually wants. This is
 * the recommended consumption path for "keep me informed"; the full endpoints stay for export.
 */
export function toFeedItem(doc: AnyDoc): Record<string, unknown> {
  const d = doc.data as Record<string, unknown>;
  const kind = kindOf(doc);
  return {
    type: kind,
    slug: d.slug,
    url: `${SITE_URL}${urlOf(doc)}`,
    detail_url: detailUrl(doc),
    headline: titleOf(doc),
    summary: summaryOf(doc),
    categories: categoriesOf(doc),
    awesome_score: kind === 'use-case' ? (d.awesome_score ?? null) : null,
    format: kind === 'use-case' ? (d.format ?? 'use-case') : null,
    featured: Boolean(d.featured),
    source: feedSource(doc),
    added_at: d.added_at,
    updated_at: d.updated_at,
  };
}

/** §7.1.3 — one item, non-lossy, for any entry type. */
export function toApiItem(doc: AnyDoc): Record<string, unknown> {
  const d = doc.data as Record<string, unknown>;
  const kind = kindOf(doc);
  const body = (doc.body ?? '').trim();

  const cats = categoriesOf(doc);
  const common = {
    type: kind,
    slug: d.slug,
    url: `${SITE_URL}${urlOf(doc)}`,
    detail_url: detailUrl(doc),
    name: titleOf(doc),
    tagline: summaryOf(doc),
    category: cats[0] ?? d.category ?? null,
    categories: cats,
    subcategory: d.subcategory ?? null,
    integrations: integrationObjects(
      ((kind === 'plugin' ? d.works_with : d.integrations) ?? []) as string[]
    ),
    status: d.status,
    added_at: d.added_at,
    updated_at: d.updated_at,
    verified_at: d.verified_at ?? null,
    author: d.author
      ? {
          handle: (d.author as Record<string, unknown>).handle,
          url: (d.author as Record<string, unknown>).url ?? null,
          platform: (d.author as Record<string, unknown>).platform,
        }
      : null,
    scouted_by: d.scouted_by
      ? {
          handle: (d.scouted_by as Record<string, unknown>).handle,
          platform: (d.scouted_by as Record<string, unknown>).platform,
        }
      : null,
    source_tweets: (((d.source_tweets ?? []) as Array<Record<string, unknown>>) ?? []).map((t) => ({
      url: t.url,
      author_handle: t.author_handle,
      excerpt: t.excerpt,
      posted_at: t.posted_at ?? null,
    })),
    // F17 — the kind-aware primary source, on EVERY item of all seven endpoints because it
    // lives in `common`. Two properties worth stating, because §7.1.3's non-lossy rule cuts
    // both ways here:
    //   · It is RESOLVED, not echoed. A pre-F17 entry with no `primary_source` in frontmatter
    //     reports `{"kind":"x-post", …}` for its first credited post — which is what the entry
    //     always meant. A consumer never has to reimplement the defaulting rule, and the API
    //     never disagrees with the page.
    //   · It is `null`, not absent, for plugins and collections. Those types have no primary
    //     source in v1 (see the note in content.config.ts); an explicit null says "asked and
    //     answered" where a missing key would leave a consumer guessing whether the field is
    //     unsupported or the build is old.
    primary_source: primarySourceApi(doc),
    featured: Boolean(d.featured),
  };

  if (kind === 'plugin') {
    return {
      ...common,
      project_url: d.project_url ?? null,
      repo_url: d.repo_url ?? null,
      source_url: d.source_url ?? null,
      install_steps: d.install_steps ?? [],
      prompt: d.prompt ?? null,
      pricing_note: d.pricing_note ?? null,
      setup_minutes: d.setup_minutes ?? null,
      description: body,
    };
  }

  if (kind === 'use-case') {
    return {
      ...common,
      prompt: promptFromBody(body),
      // M2b: where the prompt text came from. Absent frontmatter means author-published.
      prompt_provenance: d.prompt_provenance ?? 'author',
      what_it_does: d.what_it_does ?? d.summary,
      headline: d.headline ?? null,
      summary: d.summary ?? null,
      awesome_score: d.awesome_score ?? null,
      format: d.format ?? 'use-case',
      how_its_set_up: section(body, "## How it's set up", ['## Prompt']),
      why_its_cool: section(body, "## Why it's cool", ['## Example output']),
      example_output: section(body, '## Example output', []),
      replicability: d.replicability,
      schedule: d.schedule,
      autonomy: d.autonomy,
      difficulty: d.difficulty,
      setup_minutes: d.setup_minutes,
      cost_note: d.cost_note ?? null,
      bot_name: d.bot_name ?? (d.name ? String(d.name).split(' · ')[0] : undefined),
    };
  }

  const members = ((d.members ?? []) as Array<{ slug: string; reason: string }>).map((m) => m);
  return {
    ...common,
    rationale: body,
    prompt: d.prompt ?? null,
    members,
    member_count: members.length,
  };
}

/**
 * Collection members need the member's type/url/name resolved (§7.1.3), which the entry
 * itself cannot know — the page/endpoint passes the resolved pool in.
 *
 * TEMPLATES ARE MEMBERS TOO (2026-08-30). A collection curates whatever the site holds, and
 * the site now holds Shareable Bots; the first template-only collection is the X desk. They
 * arrive in a SECOND pool rather than in `pool` because `AnyDoc` deliberately excludes
 * templates (see the long note in `src/content.config.ts`) — widening `AnyDoc` to carry them
 * would drag `category`/`subcategory` onto a lane that has neither.
 *
 * The pool is typed structurally, not as `TemplateDoc`, ON PURPOSE: `lib/templates.ts` already
 * imports `envelope`/`SITE_URL` from this file, so importing its types back here would close an
 * import cycle. The template URL shape (`/marketplace/<slug>/`) is the one duplication that
 * buys the acyclic graph, and it is asserted by `check-links` on every build.
 */
type MemberTemplate = { data: { slug: string; name: string } };

export function resolveMembers(
  item: Record<string, unknown>,
  pool: AnyDoc[],
  templates: MemberTemplate[] = []
): Record<string, unknown> {
  if (item.type !== 'collection') return item;
  const members = (item.members as Array<{ slug: string; reason: string }>).map((member) => {
    const doc = pool.find((candidate) => candidate.data.slug === member.slug);
    if (doc) {
      return {
        type: kindOf(doc),
        slug: member.slug,
        url: `${SITE_URL}${urlOf(doc)}`,
        name: doc.data.name,
        reason: member.reason,
      };
    }
    const template = templates.find((candidate) => candidate.data.slug === member.slug);
    return {
      type: template ? 'template' : null,
      slug: member.slug,
      url: template ? `${SITE_URL}/marketplace/${template.data.slug}/` : null,
      name: template ? template.data.name : null,
      reason: member.reason,
    };
  });
  return { ...item, members, member_count: members.length };
}

/** §7.1.4 integrations.json — zero-usage integrations are omitted. */
export function integrationItems(pool: AnyDoc[]) {
  return integrationsVocab
    .map((tool) => {
      const used = pool.filter((doc) => {
        const data = doc.data as { works_with?: string[]; integrations?: string[] };
        return (data.works_with ?? data.integrations ?? []).includes(tool.canonical_name);
      });
      const slug = integrationSlug(tool.canonical_name);
      return {
        slug,
        name: tool.canonical_name,
        aliases: tool.aliases,
        url: tool.url,
        page_url: `${SITE_URL}/integrations/${slug}/`,
        auth: tool.auth_type ?? null,
        counts: {
          plugins: used.filter((d) => kindOf(d) === 'plugin').length,
          use_cases: used.filter((d) => kindOf(d) === 'use-case').length,
        },
      };
    })
    .filter((tool) => tool.counts.plugins + tool.counts.use_cases > 0);
}
