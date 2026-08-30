// Compact "how old is this" labels for the Fresh-drops strip.
//
// ── WHY THIS FILE IS DEPENDENCY-FREE ────────────────────────────────────────────────────
// It is imported from BOTH sides of the strip: `LatestBots.astro`'s frontmatter (build time,
// so the label is right with JS off) and `src/scripts/latest-strip.ts` (load time, so the
// label is right on a page that was built three days ago). One implementation, two callers —
// CLAUDE.md's "componentize; no duplicate front-end" applied to a pure function.
//
// That is exactly why it does NOT live in `lib/templates.ts`: that module imports
// `astro:content`, which cannot be pulled into a client bundle. Anything both sides need has
// to sit in a module with zero build-only imports, and this is that module.
//
// ── AND WHY THE BUILD-TIME LABEL IS STILL RENDERED ──────────────────────────────────────
// A relative label baked into a static page goes stale. The honest fixes are (a) don't render
// one, or (b) render the build-time value and correct it on load. This is (b): the label is a
// LABEL, not a control, so a slightly stale "2d" with JS off is a cosmetic imprecision rather
// than a dead affordance — the §4.4 "ships hidden, the island un-hides it" rule governs
// controls, and the strip's arrows follow it separately.

/**
 * Under this age an item gets the "just landed" dot.
 *
 * SIX HOURS, AND THE FIRST NUMBER WAS WRONG. It started at 24h on the reasoning that the dot
 * means "today". Measured against the live corpus, that lit up ALL TWELVE cards — the harvester
 * runs hourly, so on any normal publishing day the entire strip is under a day old and a dot on
 * everything is a dot on nothing. It also spent the §A1 accent budget twelve times over.
 *
 * Six hours is roughly "since a returning visitor last looked", which is the question the strip
 * exists to answer, and it typically marks one to three cards. On a quiet night it marks none —
 * which is the honest answer, not a bug.
 */
export const FRESH_WINDOW_MS = 6 * 60 * 60 * 1000;

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

/**
 * A chip-sized age: `now` · `7h` · `3d` · `2w` · `5mo` · `1y`.
 *
 * Deliberately terse — it sits in a 248px card next to a handle, and a chip that reads
 * "3 days ago" would wrap the row. Clamped at 0 so a clock skew (or a `posted_at` a few
 * seconds in the future, which a same-minute harvest can produce) reads `now` rather than a
 * negative age.
 */
export function relativeAge(thenMs: number, nowMs: number): string {
  const delta = Math.max(0, nowMs - thenMs);
  if (delta < HOUR) return 'now';
  if (delta < DAY) return `${Math.floor(delta / HOUR)}h`;
  const days = Math.floor(delta / DAY);
  if (days < 7) return `${days}d`;
  if (days < 30) return `${Math.floor(days / 7)}w`;
  if (days < 365) return `${Math.floor(days / 30)}mo`;
  return `${Math.floor(days / 365)}y`;
}

/** `true` inside `FRESH_WINDOW_MS`. Drives the accent dot — a non-text accent use (§A1). */
export function isFresh(thenMs: number, nowMs: number): boolean {
  return nowMs - thenMs < FRESH_WINDOW_MS;
}

/** `Date.parse` with the NaN swallowed: a malformed timestamp is treated as "no timestamp". */
export function parseTimestamp(iso: string | undefined | null): number | null {
  if (!iso) return null;
  const ms = Date.parse(iso);
  return Number.isNaN(ms) ? null : ms;
}
