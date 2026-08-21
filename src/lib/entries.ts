// Collection query helpers (§3.2 names this file). Ordering rules are §5.6 rule 11 and
// §6.2; `deprecated` entries are excluded from every card grid, hub, index, RelatedList
// and latest surface (§5.6 rule 8) — only their own detail page survives, plus inbound
// "appears in" references.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { SiteStats } from './types';

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
