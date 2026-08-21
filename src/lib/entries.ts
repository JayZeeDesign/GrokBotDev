// Collection query helpers (§3.2 names this file). Ordering rules are §5.6 rule 11 and
// §6.2; `deprecated` entries are excluded from every card grid, hub, index, RelatedList
// and latest surface (§5.6 rule 8) — only their own detail page survives, plus inbound
// "appears in" references.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Entry, PrimarySource, SiteStats } from './types';
import { timestampToSeconds, youtubeVideoId } from './sources';

export type PluginDoc = CollectionEntry<'plugins'>;
export type UseCaseDoc = CollectionEntry<'use-cases'>;
export type CollectionDoc = CollectionEntry<'collections'>;
export type AnyDoc = PluginDoc | UseCaseDoc | CollectionDoc;

export type EntryKind = 'plugin' | 'use-case' | 'collection';

const LANE: Record<EntryKind, string> = {
  plugin: 'plugins',
  'use-case': 'use-cases',
  collection: 'collections',
};

export function kindOf(doc: AnyDoc): EntryKind {
  return doc.data.type as EntryKind;
}

export function urlOf(doc: AnyDoc): string {
  return `/${LANE[kindOf(doc)]}/${doc.data.slug}/`;
}

/** Anything that may appear in a list surface: never `deprecated`, never `demo` (B4). */
export function isListable(doc: AnyDoc): boolean {
  return doc.data.status !== 'deprecated' && doc.data.status !== 'demo';
}

const bySlug = (a: AnyDoc, b: AnyDoc) => a.data.slug.localeCompare(b.data.slug);

/** Human list surfaces: `updated_at` desc, `needs-update` last, slug asc (§4.3.2, §5.6 #11). */
export function sortForIndex(docs: AnyDoc[]): AnyDoc[] {
  return [...docs].sort((a, b) => {
    const stale = Number(a.data.status === 'needs-update') - Number(b.data.status === 'needs-update');
    if (stale !== 0) return stale;
    if (a.data.updated_at !== b.data.updated_at) return a.data.updated_at < b.data.updated_at ? 1 : -1;
    return bySlug(a, b);
  });
}

/** Home "latest" mirrors the API: `added_at` desc, slug asc (§4.3.1, §5.6 #11 exception). */
export function sortForLatest(docs: AnyDoc[]): AnyDoc[] {
  return [...docs].sort((a, b) => {
    if (a.data.added_at !== b.data.added_at) return a.data.added_at < b.data.added_at ? 1 : -1;
    return bySlug(a, b);
  });
}

export async function allPlugins(): Promise<PluginDoc[]> {
  return (await getCollection('plugins')).filter(isListable) as PluginDoc[];
}
export async function allUseCases(): Promise<UseCaseDoc[]> {
  return (await getCollection('use-cases')).filter(isListable) as UseCaseDoc[];
}
export async function allCollections(): Promise<CollectionDoc[]> {
  return (await getCollection('collections')).filter(isListable) as CollectionDoc[];
}

/** Plugins + use cases only — collections are their own lane and never on hubs (§6.2). */
export async function hubEligible(): Promise<AnyDoc[]> {
  const [plugins, useCases] = await Promise.all([allPlugins(), allUseCases()]);
  return [...plugins, ...useCases];
}

export async function allListable(): Promise<AnyDoc[]> {
  const [plugins, useCases, collections] = await Promise.all([
    allPlugins(),
    allUseCases(),
    allCollections(),
  ]);
  return [...plugins, ...useCases, ...collections];
}

export async function siteStats(): Promise<SiteStats> {
  const [plugins, useCases, collections] = await Promise.all([
    allPlugins(),
    allUseCases(),
    allCollections(),
  ]);
  return {
    plugins: plugins.length,
    useCases: useCases.length,
    collections: collections.length,
    generatedAt: new Date().toISOString(),
  };
}

/** The integration list for an entry — `works_with` on plugins, `integrations` elsewhere. */
export function integrationsOf(doc: AnyDoc): string[] {
  const data = doc.data as { works_with?: string[]; integrations?: string[] };
  return data.works_with ?? data.integrations ?? [];
}

/** §5.5 derived hub slug: lowercase, non-alphanumerics → `-`, trimmed. */
export function integrationSlug(canonicalName: string): string {
  return canonicalName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * §6.10 related: max 3, same type, same subcategory first (newest `updated_at`), then
 * entries sharing ≥1 integration ordered by shared count desc. Never padded.
 */
export function relatedTo(doc: AnyDoc, pool: AnyDoc[]): AnyDoc[] {
  const mine = new Set(integrationsOf(doc));
  const candidates = pool.filter(
    (other) => other.data.slug !== doc.data.slug && kindOf(other) === kindOf(doc)
  );

  const sameSub = candidates
    .filter((o) => o.data.category === doc.data.category && o.data.subcategory === doc.data.subcategory)
    .sort((a, b) => (a.data.updated_at < b.data.updated_at ? 1 : -1));

  const shared = candidates
    .filter((o) => !sameSub.includes(o))
    .map((o) => ({ doc: o, overlap: integrationsOf(o).filter((i) => mine.has(i)).length }))
    .filter((row) => row.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || (a.doc.data.updated_at < b.doc.data.updated_at ? 1 : -1))
    .map((row) => row.doc);

  return [...sameSub, ...shared].slice(0, 3);
}

/** §6.10 "appears in": every live collection containing this entry. */
export function appearsIn(slug: string, collections: CollectionDoc[]): CollectionDoc[] {
  return collections.filter((c) => c.data.members.some((m) => m.slug === slug));
}

/** §5.6 rule 8 — dofollow is a reward for verification. */
export function editorialRel(doc: AnyDoc): string | undefined {
  const { status, verified_at: verifiedAt } = doc.data;
  if (status === 'deprecated') return 'nofollow noopener';
  return status !== 'demo' && verifiedAt ? 'noopener' : 'nofollow noopener';
}

/**
 * §4.2.10's collection boundary: "snake_case frontmatter → camelCase at the collection
 * boundary". This is that boundary, and it was missing — pages were handing raw snake_case
 * frontmatter straight to EntryCard's camelCase Props behind an `as never` cast, so every
 * camelCase read (`setupMinutes`, `verifiedAt`, `worksWith`, `sourceTweets`) came back
 * undefined at runtime. Visible symptom: "~undefined min setup"; silent symptom: the
 * verified chip, integration chips and scouted chip never rendered at all.
 * Every EntryCard / RelatedList call site goes through here, and no call site casts.
 */
export function toCardEntry(doc: AnyDoc): Entry {
  const d = doc.data as Record<string, unknown>;
  const base = {
    name: d.name as string,
    slug: d.slug as string,
    tagline: d.tagline as string,
    category: d.category as string,
    subcategory: d.subcategory as string,
    featured: Boolean(d.featured),
    addedAt: d.added_at as string,
    updatedAt: d.updated_at as string,
    verifiedAt: d.verified_at as string | undefined,
    status: d.status as Entry['status'],
  };

  const kind = kindOf(doc);
  if (kind === 'plugin') {
    return {
      ...base,
      type: 'plugin',
      installSteps: (d.install_steps ?? []) as string[],
      prompt: d.prompt as string | undefined,
      worksWith: (d.works_with ?? []) as string[],
      projectUrl: d.project_url as string,
      repoUrl: d.repo_url as string | undefined,
      author: d.author as Entry extends { author: infer A } ? A : never,
      scoutedBy: d.scouted_by as never,
      sourceUrl: d.source_url as string | undefined,
      pricingNote: d.pricing_note as string | undefined,
      setupMinutes: d.setup_minutes as number | undefined,
    } as Entry;
  }

  if (kind === 'use-case') {
    return {
      ...base,
      type: 'use-case',
      botName: d.bot_name as string | undefined,
      whatItDoes: d.what_it_does as string,
      integrations: (d.integrations ?? []) as string[],
      schedule: d.schedule as never,
      autonomy: d.autonomy as never,
      difficulty: d.difficulty as never,
      setupMinutes: d.setup_minutes as number,
      costNote: d.cost_note as string | undefined,
      sourceTweets: ((d.source_tweets ?? []) as Array<Record<string, unknown>>).map((tweet) => ({
        url: tweet.url as string,
        authorHandle: tweet.author_handle as string,
        excerpt: tweet.excerpt as string,
        postedAt: tweet.posted_at as string | undefined,
      })),
      // F17 — RESOLVED, not raw: the camelCase mirror carries the same value every other
      // surface sees, including the `source_tweets[0]` default for pre-F17 entries. A mirror
      // that reported `undefined` where the API reported an x-post would be a lossy mirror.
      primarySource: primarySourceOf(doc as UseCaseDoc) ?? undefined,
      author: d.author as never,
      scoutedBy: d.scouted_by as never,
      replicability: d.replicability as string,
    } as Entry;
  }

  return {
    ...base,
    type: 'collection',
    members: (d.members ?? []) as Array<{ slug: string; reason: string }>,
    prompt: d.prompt as string | undefined,
  } as Entry;
}

// ── F17 · PRIMARY SOURCE ────────────────────────────────────────────────────────────────
//
// ONE resolver, called by the entry page, the wall, the API serializer and the feeds. The
// alternative — each surface reading `primary_source` and doing its own `?? source_tweets[0]`
// — is four copies of a defaulting rule that will drift the first time one of them is edited.
//
// Two jobs, and the second is the one worth naming:
//   1. Apply the ADDITIVE default. No `primary_source` in frontmatter means the first credited
//      post, which is what the codebase already meant before F17 named the concept. This is
//      why zero content files changed.
//   2. REJOIN an `x-post` primary with its credit-line record. The frontmatter deliberately
//      stores only a URL for that branch, so the excerpt and handle live in exactly one place
//      (`source_tweets[]`) and cannot drift from what the wall and the credit row show. The
//      renderer needs them together, so the join happens here rather than in a template.
//
// Returns null for an entry with neither a primary_source nor any source_tweets — legal (the
// field has always been `.default([])`), and every surface already hides an empty source block.

type SourceTweetData = {
  url: string;
  author_handle: string;
  excerpt: string;
  posted_at?: string;
};

type PrimarySourceData =
  | { kind: 'x-post'; url: string }
  | {
      kind: 'youtube-video';
      url: string;
      title: string;
      channel: string;
      channel_url?: string;
      timestamp?: string;
      posted_at?: string;
    };

export function primarySourceOf(doc: UseCaseDoc): PrimarySource | null {
  const data = doc.data as unknown as {
    primary_source?: PrimarySourceData;
    source_tweets: SourceTweetData[];
  };
  const tweets = data.source_tweets ?? [];
  const declared = data.primary_source;

  if (declared?.kind === 'youtube-video') {
    const videoId = youtubeVideoId(declared.url);
    // The Zod regex already guaranteed this parses; the guard is here because a null id would
    // otherwise become the string "null" inside an embed URL and frame a 404 rather than fail.
    if (!videoId) return null;
    const startSeconds = declared.timestamp ? timestampToSeconds(declared.timestamp) : null;
    return {
      kind: 'youtube-video',
      url: declared.url,
      videoId,
      title: declared.title,
      channel: declared.channel,
      channelUrl: declared.channel_url,
      timestamp: declared.timestamp,
      startSeconds: startSeconds ?? undefined,
      postedAt: declared.posted_at,
    };
  }

  // x-post, declared or defaulted. `primaryIsCredited` in the schema guarantees a declared
  // URL matches one of these, so the find cannot miss on validated content.
  const tweet = declared ? tweets.find((t) => t.url === declared.url) : tweets[0];
  if (!tweet) return null;
  return {
    kind: 'x-post',
    url: tweet.url,
    authorHandle: tweet.author_handle,
    excerpt: tweet.excerpt,
    postedAt: tweet.posted_at,
  };
}

/**
 * Every source of an entry, primary FIRST, then the remaining credited posts in file order.
 *
 * The wall and the entry rail both need this exact list, and both need it in this exact
 * order. Note what it does to existing output: with no `primary_source` in frontmatter the
 * primary IS `source_tweets[0]`, so "primary first, then the rest" reproduces file order
 * byte for byte. The rule is new; the rendering of every current entry is not.
 */
export function allSourcesOf(doc: UseCaseDoc): PrimarySource[] {
  const primary = primarySourceOf(doc);
  const tweets = (doc.data as unknown as { source_tweets: SourceTweetData[] }).source_tweets ?? [];
  const rest: PrimarySource[] = tweets
    .filter((t) => !(primary?.kind === 'x-post' && t.url === primary.url))
    .map((t) => ({
      kind: 'x-post' as const,
      url: t.url,
      authorHandle: t.author_handle,
      excerpt: t.excerpt,
      postedAt: t.posted_at,
    }));
  return primary ? [primary, ...rest] : rest;
}

/**
 * F17 — THE wall item list. One function, called by `/wall/`, `/wall/[page]` and
 * `/wall/data.json`.
 *
 * It is centralised because the previous three-copy version is what produced F12's 404s: the
 * page and its paginated routes each rebuilt the same flatMap, they disagreed about how many
 * items existed, and Pagination linked at pages that were never generated. Three copies of a
 * derivation is three chances to disagree; this is one.
 *
 * Order — `newest-first unchanged` is a requirement, so note precisely what it means here:
 * entries in `sortForLatest` order, and WITHIN an entry the primary source first, then the
 * remaining credited posts in file order. For every entry that predates F17 the primary IS
 * `source_tweets[0]`, so the emitted sequence is byte-identical to the pre-F17 wall. A
 * YouTube primary simply takes that first slot for its own entry.
 */
export function wallItems(docs: UseCaseDoc[]): Array<{ source: PrimarySource; entry: UseCaseDoc }> {
  return sortForLatest(docs).flatMap((entry) =>
    allSourcesOf(entry as UseCaseDoc).map((source) => ({ source, entry: entry as UseCaseDoc }))
  );
}
