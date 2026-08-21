// A5/A11 item 1 — RESOLVED by the operator (direct round, 2026-08-21): category glyphs SHIP.
// Source of truth: assets/category-system/category-system.md §2.1 — each category lights a
// distinct pattern on the Mark A 3×3 grid; unlit dots stay visible at 22% opacity so the grid
// always reads as "the index". Plain circles ONLY — the two tilted capsules belong to the
// logo alone and never appear in a chip (that is what keeps the logo the logo). The glyph
// inherits currentColor and is decorative: aria-hidden, the category name always real text.

/** Lit cells per category, row-major 0–8, verbatim from the category-system spec table. */
export const CATEGORY_GLYPHS: Record<string, number[]> = {
  work: [0, 1, 2], // top row
  sales: [6, 4, 2], // rising diagonal
  marketing: [3, 4, 5], // middle band
  engineering: [0, 3, 6, 2, 5, 8], // two columns — brackets
  support: [1, 3, 4, 5, 7], // a plus
  'finance-ops': [6, 7, 8], // bottom row — a foundation
  data: [0, 2, 6, 8], // four corners
  personal: [4], // a single centre dot
  'trading-crypto': [6, 7, 4, 1, 2], // a staircase
  fun: [0, 2, 4, 6, 8], // an X
};

/** Same 9-cell geometry as MarkGlyph's grid: centres at 9/18/27 on both axes. */
const CX = [9, 18, 27, 9, 18, 27, 9, 18, 27];
const CY = [9, 9, 9, 18, 18, 18, 27, 27, 27];

/**
 * Inline SVG for a category's signature glyph. Returns '' for unknown slugs so a future
 * eleventh category degrades to label-only instead of inventing a pattern (the pattern is
 * a design decision — see the spec's add-a-category rule).
 */
export function categoryGlyphSvg(slug: string, sizePx = 11): string {
  const lit = CATEGORY_GLYPHS[slug];
  if (!lit) return '';
  const dots = CX.map((cx, i) => {
    const on = lit.includes(i);
    return `<circle cx="${cx}" cy="${CY[i]}" r="4"${on ? '' : ' opacity="0.22"'} />`;
  }).join('');
  return (
    `<svg viewBox="0 0 36 36" width="${sizePx}" height="${sizePx}" class="shrink-0 fill-current" ` +
    `aria-hidden="true" role="presentation">${dots}</svg>`
  );
}

/** Slug from a rendered label ("finance &amp; ops" → "finance-ops"), for label-only callers. */
export function categorySlugFromLabel(label: string): string {
  return label
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
