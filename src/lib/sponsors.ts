import sponsorsData from '../data/sponsors.json';

export interface Sponsor {
  slug: string;
  name: string;
  url: string;
  tagline: string;
  tint: 'sage' | 'sand' | 'lilac' | 'sky' | 'blush';
  icon: string | null;
}

export const SPONSORS = sponsorsData as Sponsor[];

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
