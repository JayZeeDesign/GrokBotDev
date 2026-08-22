import sponsorsData from '../data/sponsors.json';

export interface Sponsor {
  slug: string;
  name: string;
  url: string;
  tagline: string;
  tint: 'sage' | 'sand' | 'lilac' | 'sky' | 'blush';
  icon: string | null;
  /** Operator: `active: false` deactivates a sponsor everywhere (rails + mobile bar +
   *  the /sponsors/ showcase) without deleting its record, so it can be turned back on
   *  by flipping the flag. Absent = active. */
  active?: boolean;
}

// One source of truth: everything sponsor-shaped reads SPONSORS, so filtering deactivated
// entries here removes them from the desktop rails, the mobile bar, and the /sponsors/ page.
export const SPONSORS = (sponsorsData as Sponsor[]).filter((s) => s.active !== false);

/** Outbound URL with attribution params — same shape the reference sites use. */
export function sponsorHref(s: Sponsor): string {
  const u = new URL(s.url);
  u.searchParams.set('utm_source', 'grokbot.dev');
  u.searchParams.set('utm_medium', 'referral');
  u.searchParams.set('utm_campaign', 'sponsor');
  return u.toString();
}

export const sponsorIconPath = (s: Sponsor): string | null =>
  s.icon ? `/icons/sponsors/${s.icon}` : null;

/** Split across the two desktop rails: left gets even indices, right gets odd. */
export function splitRails(list: Sponsor[] = SPONSORS): { left: Sponsor[]; right: Sponsor[] } {
  const left: Sponsor[] = [];
  const right: Sponsor[] = [];
  list.forEach((s, i) => (i % 2 === 0 ? left : right).push(s));
  return { left, right };
}
