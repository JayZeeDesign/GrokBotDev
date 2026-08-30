/**
 * Side-rail geometry — the ONE place the rail layout is defined.
 *
 * Ported from the youtubetotranscript "dissolving wrapper" system. Three ideas, in order of
 * importance:
 *
 *   1. THE BREAKPOINT IS DERIVED, NEVER TYPED. It is CONTENT_MIN + SIDE_COST. The old rails
 *      used a round, typed `1600px` against a layout that only needed ~1276 — which is why
 *      they never appeared on a real laptop. If any constant below changes, the breakpoint
 *      recomputes and every rule that depends on it follows, because the stylesheet is
 *      GENERATED from these numbers (see `railCss`) rather than hand-written.
 *
 *   2. THE PAGE NARROWS TO MAKE ROOM. Rather than only showing rails where a gutter already
 *      exists, the content is narrowed so a gutter EXISTS. YTT does this with a
 *      `body > *:not(.rail)` rule because their host pages have no common wrapper. We have
 *      one: every page, the header and the footer centre their content with
 *      `.container-page { max-width: var(--container-max) }` (29 files). So our dissolving
 *      wrapper is the TOKEN: narrowing `--container-max` narrows the whole site in one move,
 *      full-bleed backgrounds included. (YTT caution ①: a narrowing selector that matches
 *      nothing is a silent no-op — `--container-max` is verified against all 29 consumers,
 *      plus the two opt-outs handled explicitly in `railCss`: `.wallMasonry`, which carries
 *      its own max-width, and the hero's gutter decorations.)
 *
 *   3. RAILS + CARDS SCALE. `--sr-rail` grows 160→300px with the viewport and the cards grow
 *      with it, so a 1920 screen gets a genuinely prominent unit rather than the same 160px
 *      sliver a 1280 screen gets.
 *
 * The CSS this module emits is rendered ONLY inside the `ENABLE_SPONSORS` conditional (YTT
 * caution ②) — a sponsors-off page carries no dormant narrowing rules at all.
 */
import { SPONSORS, type Sponsor } from './sponsors';

/* ── Source constants ──────────────────────────────────────────────────────────────────── */

/** Narrowest a rail is ever drawn. Below this a sponsor card stops being readable. */
export const CARD_MIN = 160;
/** Widest a rail grows. Past this the unit reads as an ad block, not a sponsor. */
export const CARD_MAX = 300;
/** Breathing room between a rail and the content column. */
export const GAP = 16;
/** Breathing room between a rail and the viewport edge. */
export const EDGE = 12;
/** Distance from the top of the viewport to the top of a rail. */
export const TOP = 16;
/** Vertical gap between two cards in a rail. */
export const GAP_Y = 12;

/** Our container token's normal value — the widest the content column is ever drawn. */
export const CONTENT_MAX = 1200;

/**
 * CONTENT_MIN — the narrowest we will squeeze the content column in order to fit rails.
 *
 * This is the number that decides the breakpoint, so it is chosen for OUR content, not
 * copied from YTT. YTT's pages are single-column articles and transcripts, so they can go
 * down to 700px. Ours are multi-column CARD GRIDS: the sitewide pattern is
 * `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (home directory, every lane index, categories,
 * integrations, search, related lists — 15+ call sites).
 *
 * Those are TAILWIND breakpoints, which key off the VIEWPORT, not off the narrowed content
 * box — so at any viewport ≥1024 the grid is 3 columns no matter how narrow we make the
 * content. The binding constraint is therefore the width of ONE CARD at CONTENT_MIN:
 *
 *     card = (CONTENT_MIN − 2×24 page gutter − 2×24 grid gap) / 3
 *     900 → 268px    960 → 288px    1000 → 301px
 *
 * For reference, the site already ships this card at 296px (2-up at a 640px viewport) and at
 * 309px (3-up at a 1024px viewport), and at 358px on a 390px phone. 900 was measured on the
 * rendered page at the breakpoint and the 3-up grid holds (chips and 2-line summaries do not
 * wrap differently), so 900 stands — it is also what buys rails at 1280, the single most
 * common laptop width in the 1280–1536 band this port exists to serve.
 *
 * Raise this number if the card grids ever stop being comfortable; the breakpoint follows.
 */
export const CONTENT_MIN = 900;

/** Card height at CARD_MIN is 116 → 116/160. Cards keep this ratio as the rail grows. */
export const CARD_RATIO = 0.725;
/** …but stop growing at 200px, so a 300px rail is a wide card, not a tall one. */
export const CARD_H_MAX = 200;

/** Most cards we will ever draw in one rail. */
export const SLOTS_MAX = 4;
/**
 * Fewest cards that still make a rail look deliberate. Below this we do not lay out partial
 * rails at all — we fall back to the tape (see `railPlan`).
 */
export const SLOTS_MIN = 2;

/* ── Derived geometry — arithmetic, not typed pixels ───────────────────────────────────── */

/** What both rails cost the content column: card + gap + edge, twice over. */
export const SIDE_COST = 2 * (CARD_MIN + GAP + EDGE);

/**
 * THE BREAKPOINT. The narrowest viewport that can hold CONTENT_MIN of content plus both
 * rails. Derived — if you find yourself typing this number anywhere, that is the bug.
 */
export const BREAKPOINT = CONTENT_MIN + SIDE_COST;

/** Shortest viewport that can show a full rail without clipping (documented, not enforced). */
export const MIN_VIEWPORT_H = (slots: number) =>
  2 * TOP + slots * Math.round(CARD_MIN * CARD_RATIO) + (slots - 1) * GAP_Y;

/* ── Slot policy — ONE source for both "narrow" and "too few" ──────────────────────────── */

export interface RailPlan {
  /** Cards drawn per rail. */
  slots: number;
  /** True when rails are worth laying out at all. False ⇒ tape at every width. */
  railsMode: boolean;
  /** Active sponsors. */
  count: number;
}

/**
 * The single decision both triggers read.
 *
 * YTT §4: "an empty rail must never be laid out … both triggers emit from one function so
 * they cannot drift apart." Ours is stricter than a boolean — it also decides HOW MANY slots
 * a rail gets, so the two rails are always FULL and always symmetric.
 *
 * With 5 active sponsors: slots = min(4, ⌊5/2⌋) = 2, so both rails draw 2 cards and the
 * spare sponsor rotates into view via the client-side shuffle (see SponsorBar's module) —
 * rather than the left rail drawing 3 cards and the right drawing 2, which is exactly the
 * half-empty rail YTT warns about.
 *
 * Below SLOTS_MIN per rail there is nothing to lay out, so `railsMode` goes false and
 * BaseLayout renders the tape alone, at every width, with NO narrowing CSS emitted at all.
 */
export function railPlan(list: Sponsor[] = SPONSORS): RailPlan {
  const count = list.length;
  const slots = Math.min(SLOTS_MAX, Math.floor(count / 2));
  return { slots, railsMode: slots >= SLOTS_MIN, count };
}

/* ── The generated stylesheet ──────────────────────────────────────────────────────────── */

/**
 * Build the rail stylesheet from the constants above.
 *
 * Why generated rather than a static `.css` file: a CSS `@media` condition cannot read a
 * custom property (`@media (min-width: var(--x))` is invalid), so the breakpoint has to be
 * MATERIALISED somewhere. Generating it here keeps the arithmetic as the source of truth and
 * leaves exactly one place where a pixel appears. Everything else — rail width, card height,
 * content width — is a custom property doing real arithmetic at render time.
 *
 * Emitted inline, gated on ENABLE_SPONSORS. §10.7's CSP is `style-src 'self' 'unsafe-inline'`
 * (inline CSS is permitted; inline JS is not), so this is CSP-clean and adds no script.
 *
 * Returns '' when rails are not viable — so the too-few case ships zero rail CSS.
 */
export function railCss(plan: RailPlan = railPlan()): string {
  if (!plan.railsMode) return '';

  const { slots } = plan;
  const bp = BREAKPOINT;
  const trackH = `calc(${slots} * var(--sr-cardh) + ${(slots - 1) * GAP_Y}px)`;

  return `
/* GENERATED from src/lib/sponsorLayout.ts — CONTENT_MIN ${CONTENT_MIN} + SIDE_COST ${SIDE_COST} = ${bp}.
   Do not hand-edit the breakpoint; change the constants and it recomputes. */
.sideRail{
  position:fixed;
  inset-block-start:${TOP}px;
  inline-size:var(--sr-rail);
  z-index:20;
  display:none;
}
.railTrack{
  display:grid;
  grid-template-rows:repeat(${slots}, var(--sr-cardh));
  grid-auto-rows:var(--sr-cardh);
  gap:${GAP_Y}px;
  block-size:${trackH};
  margin:0;
  padding:0;
  list-style:none;
  /* Extra sponsors beyond the slot count are clipped rather than laid out, so the rail is
     always exactly ${slots} cards tall. Which ones show is reshuffled per pageview. */
  overflow:hidden;
}
.railTrack > li{ min-block-size:0; }
.railCard{
  position:relative;
  display:flex;
  flex-direction:column;
  gap:4px;
  block-size:100%;
  padding:10px;
  border:1px solid var(--color-border);
  border-radius:var(--radius-sm);
  background:var(--tint);
  text-decoration:none;
  overflow:hidden;
}
.railCard__icon,
.railCard__tile{
  display:block;
  inline-size:var(--sr-icon);
  block-size:var(--sr-icon);
  border-radius:6px;
  object-fit:cover;
}
.railCard__tile{
  display:flex;
  align-items:center;
  justify-content:center;
  background:var(--color-surface);
  border:1px solid var(--color-border);
  font-family:var(--font-display);
  font-weight:600;
  font-size:calc(var(--sr-icon) * 0.55);
  color:var(--color-text);
}
.railCard__name{
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:1;
  line-clamp:1;
  overflow:hidden;
  overflow-wrap:anywhere;
  margin-block-start:2px;
  font-family:var(--font-sans);
  font-size:clamp(0.82rem, calc(0.72rem + 0.28vw), 0.95rem);
  font-weight:600;
  line-height:1.3;
  color:var(--color-text);
}
.railCard__tag{
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  line-clamp:2;
  overflow:hidden;
  overflow-wrap:anywhere;
  font-size:clamp(0.74rem, calc(0.66rem + 0.22vw), 0.84rem);
  line-height:1.35;
  color:var(--color-text-muted);
}
/* Disclosure label. Absolutely positioned so it costs the fixed-height card ZERO vertical
   space — at the minimum card height (116px) there is no room for it in flow. */
.railCard__badge{
  position:absolute;
  inset-block-start:10px;
  inset-inline-end:10px;
  font-family:var(--font-mono);
  font-size:9px;
  letter-spacing:0.1em;
  text-transform:uppercase;
  color:var(--color-text-muted);
  opacity:0.7;
}
.railCta{
  flex:0 0 auto;
  display:block;
  margin-block-start:${GAP_Y}px;
  padding:12px;
  border:1px dashed var(--color-border-strong);
  border-radius:var(--radius-sm);
  background:transparent;
  text-decoration:none;
}
.railCta__plus{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  inline-size:28px;
  block-size:28px;
  margin-block-end:8px;
  border-radius:6px;
  background:var(--color-surface);
  border:1px solid var(--color-border);
  font-family:var(--font-mono);
  font-size:16px;
  line-height:1;
  color:var(--color-text);
}
.railCta__title{
  display:block;
  font-family:var(--font-sans);
  font-size:var(--text-sm);
  font-weight:600;
  color:var(--color-text);
}
.railCta__text{
  display:block;
  margin-block-start:3px;
  font-size:var(--text-xs);
  line-height:1.4;
  color:var(--color-text-muted);
}
@media (prefers-reduced-motion: no-preference){
  .railCard,
  .railCta{ transition:border-color .15s, background .15s; }
}
/* Reduced motion still gets the STATE change, it just is not animated (YTT §5). */
.railCard:hover{ border-color:var(--color-border-strong); }
.railCta:hover{ border-color:var(--color-text); background:var(--color-surface); }

@media (min-width: ${bp}px){
  :root{
    /* Rails grow 1px per 5px of viewport past the breakpoint, capped at CARD_MAX. */
    --sr-rail:clamp(${CARD_MIN}px, calc(${CARD_MIN}px + (100vw - ${bp}px) / 5), ${CARD_MAX}px);
    --sr-cardh:min(calc(var(--sr-rail) * ${CARD_RATIO}), ${CARD_H_MAX}px);
    --sr-icon:clamp(24px, calc(var(--sr-rail) * 0.16), 40px);

    /* ── THE DISSOLVE ──────────────────────────────────────────────────────────────────
       Our container token IS the wrapper. Narrowing it here narrows every .container-page
       on the site — all pages, the header and the footer — in one declaration, while
       full-bleed backgrounds keep spanning the viewport. */
    --container-max:min(${CONTENT_MAX}px, calc(100vw - 2 * (var(--sr-rail) + ${GAP}px + ${EDGE}px)));

    /* The hero stage is full-bleed, so its two gutter decorations would sit UNDER the rails.
       HeroStage reads this with a 16px fallback, so it is inert when sponsors are off. */
    --sr-hero-inset:calc((100vw - var(--container-max)) / 2 + 24px);

    /* The tape reads this instead of us fighting Astro's scoped-style specificity. */
    --sr-tape-display:none;
  }

  /* Clear the top of both gutters so the rails run from the very top. */
  .siteHeader{
    max-inline-size:var(--container-max);
    margin-inline:auto;
  }

  /* YTT caution ① — the wall carries its OWN max-width and is NOT a .container-page, so the
     token narrowing above misses it and it would slide under the rails. Narrow it too. */
  .wallMasonry{ max-inline-size:min(1160px, var(--container-max)); }

  .sideRail{ display:flex; flex-direction:column; }

  /* ── Rails hang off the CENTRE LINE, never off the viewport edges ───────────────────
     Content is '--container-max' wide and centred, so its outer edge sits at
     50% − container/2; back off one GAP and one rail width to place the rail.

     The 'max(EDGE, …)' is the scrollbar fix (YTT §3). '100vw' INCLUDES a classic
     (non-overlay) scrollbar, but '50%' on a fixed element resolves against the layout
     viewport, which EXCLUDES it — so on Windows/Linux Chrome the vw-derived content width
     runs ~15px wide and pushes the rails ~7px further out than intended, eating the edge
     gutter (YTT measured 12px specified → 5px rendered and shipped it that way).
     Clamping on a PERCENTAGE — scrollbar-free, same basis as the 50% — guarantees the
     12px edge on every platform. When the scrollbar does bite, the card→content gap
     absorbs it (16px → ~9px) instead of the edge; content is never overlapped either way. */
  .sideRail--l{
    inset-inline-start:max(${EDGE}px, calc(50% - var(--container-max) / 2 - ${GAP}px - var(--sr-rail)));
  }
  .sideRail--r{
    inset-inline-end:max(${EDGE}px, calc(50% - var(--container-max) / 2 - ${GAP}px - var(--sr-rail)));
  }
}
`.trim();
}
