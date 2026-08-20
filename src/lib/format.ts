// Display helpers shared by the §4.2 components.
// Rules enforced here: absolute UTC dates only, never relative (§4.2.17);
// data-driven mono labels are lowercased in JS at build, never with CSS
// `text-transform`, so prompt/code content is never mangled (§4.1.3).

import type { Entry, EntryType } from './types';

/** `2026-08-20T14:02:00Z` → `2026-08-20` (§02 Q21, §4.2.11, §4.2.17). */
export function isoToDate(iso: string): string {
  return iso.slice(0, 10);
}

/** Lowercase a data-driven label (Title Case source data → mono chrome, §4.1.3). */
export function monoLabel(label: string): string {
  return label.toLowerCase();
}

/** §4.2.11 setup-time chip formatting rule. */
export function setupLabel(minutes: number): string {
  return `~${minutes} min setup`;
}

const LANE_BY_TYPE: Record<EntryType, string> = {
  plugin: 'plugins',
  'use-case': 'use-cases',
  collection: 'collections',
};

/** Canonical entry URL — lowercase, trailing slash (CONTEXT). */
export function entryUrl(type: EntryType, slug: string): string {
  return `/${LANE_BY_TYPE[type]}/${slug}/`;
}

/** Use-case names carry the named-character pattern `R2 · Chief of Staff` (§4.2.10). */
export function splitNamedCharacter(name: string): { character: string; role: string } | null {
  const parts = name.split(' · ');
  if (parts.length < 2) return null;
  return { character: parts[0], role: parts.slice(1).join(' · ') };
}

/** `3 plugins · 1 use case` member summary for collection cards (§4.2.10). */
export function memberSummary(counts: { plugins: number; useCases: number }): string {
  const parts: string[] = [];
  if (counts.plugins) parts.push(`${counts.plugins} plugin${counts.plugins === 1 ? '' : 's'}`);
  if (counts.useCases) parts.push(`${counts.useCases} use case${counts.useCases === 1 ? '' : 's'}`);
  return parts.join(' · ');
}

/** Entries with `status: deprecated` never render in card grids (§5.6 rule 8). */
export function isCardEligible(entry: Entry): boolean {
  return entry.status !== 'deprecated';
}
