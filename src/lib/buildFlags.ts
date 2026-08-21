/**
 * Build flags.
 *
 * `ENABLE_RAILS` — Addendum A6: the page grid is built rails-capable (left/right rail
 * slots exist in the layout skeleton) but NOTHING sponsor-shaped renders. Default OFF.
 * Flipping it must never require layout rework (A11 item 6).
 *
 * `INCLUDE_DEV_PAGES` — §6.1 / §11 M1.2: `/dev/components/` is a dev-only surface —
 * `noindex,nofollow`, excluded from the sitemap AND excluded from production output.
 * It always builds on the dev server; `astro build` emits it only when
 * `INCLUDE_DEV_PAGES=1` is set explicitly. M7.5 asserts it 404s in production.
 */
export const ENABLE_RAILS = false;

/**
 * `ENABLE_SPONSORS` — the live sponsorship system (operator): fixed left/right sponsor rails
 * on wide desktop, a sponsor strip in the mobile header, driven by src/data/sponsors.json.
 * Independent of the grid rails above (those squish content); these float in the gutters.
 */
export const ENABLE_SPONSORS = true;

export const INCLUDE_DEV_PAGES = import.meta.env.DEV || process.env.INCLUDE_DEV_PAGES === '1';
