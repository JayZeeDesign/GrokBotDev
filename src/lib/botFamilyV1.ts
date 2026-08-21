/* ============================================================================
   BOT FAMILY v1 — the ABOUT-PAGE family.  (M8 · F16)

   This is the original hero cluster: ink / paper / Ash Amber, token-driven and
   theme-reactive, with strokes, an outline treatment and the halftone diamond.
   Eleven angular forms — squircle, hexagon, pill, diamond, capsule, arch,
   triangle, wide rect, octagon, tall hex.

   It is no longer the hero. F16 re-skinned the hero to family v2 (soft
   silhouettes, flat fixed-palette fills — src/scripts/botFamilyV2.js) so the
   home page reads as a room full of real Grok Bot avatars. v1 was NOT deleted:
   the geometry is good and the operator asked to keep it, so it lives on here as
   a decorative static pile on /about/ (src/components/AboutBotPile.astro).

   WHY THIS IS A .ts LIB AND NOT A CLIENT SCRIPT
   /about/ ships ZERO JavaScript for this. The pile is rendered at BUILD TIME
   into one inline <svg>, so there is no second physics island, no matter.js on
   /about/, and no extra network request — the page stays exactly as light as it
   was. The layout below is the SAME algorithm hero.js uses for its reduced-
   motion / no-JS render (`pileRows` + `renderStatic`), ported so the two piles
   are recognisably the same object. Keep them in step if either is retuned.

   The geometry, the stroke insets and the eye markup are lifted from v1
   unchanged, INCLUDING the quirks integration-notes §8 warns about — the
   triangle's 16-unit round-joined stroke with its 0.70 inset, the sw/2 inset on
   stroked rects, and the opt-in `strokeInset` for stroked polygons. Do not
   "clean these up": §8 is explicit that retuning one without the other makes
   bots overlap.
   ============================================================================ */

type Pt = { x: number; y: number };

type Geo =
  | { t: 'rect'; w: number; h: number; r: number }
  | { t: 'hex'; w: number; h: number }
  | { t: 'vhex'; w: number; h: number }
  | { t: 'oct'; w: number; h: number; c?: number }
  | { t: 'diamond'; w: number }
  | { t: 'tri'; w: number; h: number }
  | { t: 'arch'; w: number; h: number };

type Eye = { cy: number; gap: number; w: number; h: number; tilt: number };

type FormV1 = {
  id: string;
  style: 'solid' | 'accent' | 'outline' | 'halftone';
  geo: Geo;
  eye: Eye;
  sw?: number;
  strokeInset?: boolean;
  inset?: number;
};

/* The eleven v1 forms, verbatim. */
export const FORMS_V1: FormV1[] = [
  { id: 'squircle',   style: 'solid',    geo: { t: 'rect', w: 88,  h: 80,  r: 26 }, eye: { cy: 2,  gap: 36, w: 15, h: 27, tilt: 20 } },
  { id: 'squircleXL', style: 'outline',  geo: { t: 'rect', w: 100, h: 93,  r: 31 }, eye: { cy: 4,  gap: 40, w: 16, h: 29, tilt: 23 }, sw: 7 },
  { id: 'hexagon',    style: 'solid',    geo: { t: 'hex',  w: 100, h: 86 },         eye: { cy: 2,  gap: 38, w: 15, h: 26, tilt: 17 } },
  { id: 'pill',       style: 'solid',    geo: { t: 'rect', w: 88,  h: 46,  r: 23 }, eye: { cy: 0,  gap: 32, w: 13, h: 22, tilt: 22 } },
  { id: 'diamond',    style: 'halftone', geo: { t: 'diamond', w: 94 },              eye: { cy: 2,  gap: 35, w: 14, h: 24, tilt: 19 }, sw: 3 },
  { id: 'capsule',    style: 'solid',    geo: { t: 'rect', w: 48,  h: 104, r: 24 }, eye: { cy: 26, gap: 26, w: 12, h: 22, tilt: 24 } },
  { id: 'arch',       style: 'outline',  geo: { t: 'arch', w: 78,  h: 100 },        eye: { cy: -8, gap: 34, w: 15, h: 26, tilt: 18 }, sw: 7 },
  { id: 'triangle',   style: 'solid',    geo: { t: 'tri',  w: 96,  h: 78 },         eye: { cy: 14, gap: 31, w: 13, h: 21, tilt: 21 } },
  { id: 'wideRect',   style: 'outline',  geo: { t: 'rect', w: 114, h: 56,  r: 28 }, eye: { cy: 0,  gap: 38, w: 14, h: 23, tilt: 25 }, sw: 6 },
  { id: 'octagon',    style: 'outline',  geo: { t: 'oct',  w: 98,  h: 90 },         eye: { cy: 2,  gap: 37, w: 15, h: 26, tilt: 18 }, sw: 6, strokeInset: true },
  { id: 'tallHex',    style: 'solid',    geo: { t: 'vhex', w: 70,  h: 104 },        eye: { cy: -6, gap: 30, w: 13, h: 23, tilt: 20 } },
];

/* ---------- geometry (verbatim from hero.js pre-F16) ---------- */
const hexVerts = (w: number, h: number): Pt[] => [
  { x: -w / 2, y: 0 }, { x: -w / 4, y: -h / 2 }, { x: w / 4, y: -h / 2 },
  { x: w / 2, y: 0 }, { x: w / 4, y: h / 2 }, { x: -w / 4, y: h / 2 },
];

const vhexVerts = (w: number, h: number): Pt[] => [
  { x: 0, y: -h / 2 }, { x: w / 2, y: -h / 4 }, { x: w / 2, y: h / 4 },
  { x: 0, y: h / 2 }, { x: -w / 2, y: h / 4 }, { x: -w / 2, y: -h / 4 },
];

function octVerts(w: number, h: number, c?: number): Pt[] {
  const x = w / 2, y = h / 2, cx = w * (c || 0.29), cy = h * (c || 0.29);
  return [
    { x: -x + cx, y: -y }, { x: x - cx, y: -y }, { x, y: -y + cy }, { x, y: y - cy },
    { x: x - cx, y }, { x: -x + cx, y }, { x: -x, y: y - cy }, { x: -x, y: -y + cy },
  ];
}

const diamondVerts = (w: number): Pt[] => {
  const a = w / 2;
  return [{ x: 0, y: -a }, { x: a, y: 0 }, { x: 0, y: a }, { x: -a, y: 0 }];
};

const triVerts = (w: number, h: number): Pt[] => [
  { x: 0, y: -h / 2 }, { x: w / 2, y: h / 2 }, { x: -w / 2, y: h / 2 },
];

function archVerts(w: number, h: number): Pt[] {
  const r = w / 2, v: Pt[] = [], N = 22, topY = -h / 2 + r, botY = h / 2;
  for (let i = 0; i <= N; i++) {
    const a = Math.PI + (i / N) * Math.PI;
    v.push({ x: r * Math.cos(a), y: topY + r * Math.sin(a) });
  }
  v.push({ x: r, y: botY });
  v.push({ x: -r, y: botY });
  return v;
}

function centroidOf(v: Pt[]): Pt {
  let a = 0, cx = 0, cy = 0;
  for (let i = 0; i < v.length; i++) {
    const p = v[i]!, q = v[(i + 1) % v.length]!;
    const f = p.x * q.y - q.x * p.y;
    a += f; cx += (p.x + q.x) * f; cy += (p.y + q.y) * f;
  }
  a *= 0.5;
  if (Math.abs(a) < 1e-9) return { x: 0, y: 0 };
  return { x: cx / (6 * a), y: cy / (6 * a) };
}

const ptsAttr = (v: Pt[], ox: number, oy: number): string =>
  v.map((p) => `${(p.x - ox).toFixed(2)},${(p.y - oy).toFixed(2)}`).join(' ');

function formVerts(f: FormV1): Pt[] | null {
  const g = f.geo;
  if (g.t === 'hex') return hexVerts(g.w, g.h);
  if (g.t === 'vhex') return vhexVerts(g.w, g.h);
  if (g.t === 'oct') return octVerts(g.w, g.h, g.c);
  if (g.t === 'diamond') return diamondVerts(g.w);
  if (g.t === 'tri') return triVerts(g.w, g.h);
  if (g.t === 'arch') return archVerts(g.w, g.h);
  return null; // rect
}

/* ---------- SVG (verbatim, minus the outer <svg> wrapper) ---------- */
function eyesMarkup(e: Eye): string {
  const hx = e.gap / 2, rx = e.w / 2;
  const slash = (sx: number) =>
    `<rect class="eye" x="${-rx}" y="${-e.h / 2}" width="${e.w}" height="${e.h}" rx="${rx}"`
    + ` transform="translate(${sx},${e.cy}) rotate(${e.tilt})"/>`;
  return slash(-hx) + slash(hx);
}

/* Returns the <g> for ONE bot, drawn in v1's 120-unit frame centred on 0,0.
   `patternId` lets the caller namespace the halftone <pattern> so the /about
   copy cannot collide with the one HeroStage.astro still declares. */
export function botGroupV1(f: FormV1, patternId: string): string {
  const g = f.geo;
  const sw = f.sw || 0;
  let off: Pt = { x: 0, y: 0 };
  let shape = '';
  const verts = formVerts(f);
  if (verts) off = centroidOf(verts);

  if (g.t === 'rect') {
    // An SVG stroke paints CENTRED on the path, so it bleeds sw/2 outside the
    // nominal geometry. Inset by sw/2 so the painted silhouette matches. §8.
    const iw = g.w - sw, ih = g.h - sw, ir = Math.max(1, g.r - sw / 2);
    shape = `<rect x="${-iw / 2}" y="${-ih / 2}" width="${iw}" height="${ih}" rx="${ir}"`
      + (sw ? ` stroke-width="${sw}"` : '') + '/>';
  } else if (g.t === 'tri' && verts) {
    // Rounded corners via a fat round-joined stroke; verts pulled in so the
    // stroke's outer edge lands back on the nominal triangle. §8: retuning the
    // geo without retuning `inset` makes it overlap its neighbours.
    const TSW = 16, k = f.inset || 0.70;
    const tv = verts.map((p) => ({ x: (p.x - off.x) * k, y: (p.y - off.y) * k }));
    shape = `<polygon points="${tv.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')}"`
      + ` class="rt" stroke-width="${TSW}" stroke-linejoin="round"/>`;
  } else if (verts) {
    let pv = verts;
    // Opt-in stroke inset, so the already-tuned arch and diamond render
    // byte-identically to the pre-F16 hero. §8.
    if (sw && f.strokeInset) {
      let dmin = Infinity;
      for (let vi = 0; vi < verts.length; vi++) {
        const p = verts[vi]!, q = verts[(vi + 1) % verts.length]!;
        const ex = q.x - p.x, ey = q.y - p.y, L = Math.hypot(ex, ey);
        if (L < 1e-6) continue;
        const d = Math.abs((p.x - off.x) * ey - (p.y - off.y) * ex) / L;
        if (d < dmin) dmin = d;
      }
      if (isFinite(dmin) && dmin > sw) {
        const ik = 1 - (sw / 2) / dmin;
        pv = verts.map((pt) => ({ x: off.x + (pt.x - off.x) * ik, y: off.y + (pt.y - off.y) * ik }));
      }
    }
    shape = `<polygon points="${ptsAttr(pv, off.x, off.y)}"`
      + (sw ? ` stroke-width="${sw}" stroke-linejoin="round"` : '') + '/>';
  }

  const fill = f.style === 'halftone' ? ` fill="url(#${patternId})"` : '';
  // Eyes render level and still — this is the static path, exactly as
  // hero.js's renderStatic leaves them under reduced motion.
  const inner = shape + `<g class="eyes">${eyesMarkup(f.eye)}</g>`;
  return `<g class="s-${f.style}"${fill}`
    + ` transform="translate(${(-off.x).toFixed(2)},${(-off.y).toFixed(2)})">${inner}</g>`;
}

/* ---------- deterministic roll (hero.js's mulberry32) ---------- */
function mulberry32(a: number): () => number {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- the pile ----------
   pileRows is hero.js's, unchanged: 6/3/1 for ten bots, 4/2 for six. */
function pileRows(n: number): number[] {
  const r0 = Math.ceil(n * 0.55), rem = n - r0;
  const r1 = Math.ceil(rem * 0.7), r2 = rem - r1;
  return [r0, r1, r2].filter((c) => c > 0);
}

export type PileOptions = {
  /**
   * viewBox width. This stands in for the hero's measured `#content` block —
   * i.e. it drives `clusterW`, how wide the pile spreads.
   */
  width?: number;
  /**
   * The hero derives BOT SIZE from the STAGE width but CLUSTER WIDTH from the
   * narrower `#content` block (~1440 vs ~880 at desktop), so the two are not the
   * same number and collapsing them makes the pile sparse: pass 760 for both and
   * botSize() lands at 67px against a 653px cluster, which scatters six bots
   * across a row instead of piling them.
   *
   * Keeping them separate reproduces the hero's actual proportions — roughly
   * cluster : bot = 7.3 : 1, which is what makes the bottom row read as touching.
   * Defaults to 1180, botSize()'s own reference width, i.e. full desktop scale.
   */
  stageWidth?: number;
  /** viewBox height; the pile is anchored just above its bottom edge. */
  height?: number;
  /** how many bots — 10 mirrors the desktop hero assembly. */
  count?: number;
  /** fixed seed, so the build is deterministic and the pile never "re-rolls". */
  seed?: number;
  /** namespace for the halftone <pattern> id. */
  patternId?: string;
  /**
   * v1's rule was "exactly ONE bot wears Ash Amber". Default true, so the hero's
   * historical behaviour is what this function reproduces.
   *
   * Pass false where A1's accent law would be breached: amber means now/do, it
   * is capped at <2% of a viewport, and it may appear on NO MORE THAN ONE
   * element per viewport. A decorative pile is not a now/do element, and on a
   * page that already spends its accent (a live dot, a primary button, a
   * verified state) a second amber object is a breach. Making that a flag rather
   * than an artefact of which seed was picked means a future seed change cannot
   * silently reintroduce it.
   */
  accent?: boolean;
};

/**
 * Build-time render of the v1 static pile as ONE inline <svg> string.
 *
 * The placement is hero.js's `renderStatic()` line for line — biggest bots on
 * the bottom row, `rowH = avg * 0.78`, per-row inset `ri * 0.11`, the same
 * deterministic `((k*37)%7 - 3) * 0.045` tilt — with the hero's measured
 * `#content` rect replaced by the illustration's own box, since /about has no
 * headline block to rest against. Same algorithm, same object, no physics.
 */
export function renderStaticPileV1(opts: PileOptions = {}): string {
  const W = opts.width ?? 880;
  const H = opts.height ?? 270;
  const stageW = opts.stageWidth ?? 1180;
  const count = opts.count ?? 10;
  const seed = opts.seed ?? 4173;
  const patternId = opts.patternId ?? 'gbHalftoneV1';

  const rnd = mulberry32(seed);
  const rr = (a: number, b: number) => a + rnd() * (b - a);

  // hero.js's botSize(): base 104 desktop, scaled by STAGE width against 1180,
  // then the per-bot size mutation rr(0.88, 1.12).
  const k = Math.max(0.56, Math.min(1, stageW / 1180));
  const shuffled = FORMS_V1.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const t = shuffled[i]!; shuffled[i] = shuffled[j]!; shuffled[j] = t;
  }
  const picks = shuffled.slice(0, count);

  // v1's rule: exactly ONE bot wears Ash Amber, and only if it is a solid.
  // Drawn unconditionally so the seed stream stays identical whether or not the
  // accent is actually applied — otherwise toggling `accent` would reshuffle
  // every subsequent size and tilt, and the pile would change shape.
  const accentIdx = Math.floor(rnd() * picks.length);
  const useAccent = opts.accent ?? true;

  const bots = picks.map((f, i) => {
    const form: FormV1 = { ...f, eye: { ...f.eye } };
    if (useAccent && i === accentIdx && form.style === 'solid') form.style = 'accent';
    form.eye.tilt = f.eye.tilt + rr(-5, 5);
    return { form, size: Math.round(104 * k * rr(0.88, 1.12)) };
  });

  // ---- renderStatic(), ported ----
  const order = bots.slice().sort((a, b) => b.size - a.size);
  const avg = order.reduce((t, b) => t + b.size, 0) / Math.max(1, order.length);
  const clusterW = Math.min(W * 0.86, W - 32);
  const left = (W - clusterW) / 2;
  const rowH = avg * 0.78;
  // hero.js anchors on the measured #content top; here the illustration's own
  // bottom edge plays that role, so the pile sits on the baseline of the box.
  const contentTop = H;
  const baseY = Math.max(avg * 0.6 + 10, contentTop - avg * 0.50 - 10);

  const rows = pileRows(order.length);
  const out: string[] = [];
  let idx = 0;
  rows.forEach((cnt, ri) => {
    const inset = ri * 0.11;
    for (let i = 0; i < cnt; i++) {
      const b = order[idx];
      if (!b) return;
      const t = cnt === 1 ? 0.5 : i / (cnt - 1);
      const x = left + (inset + t * (1 - 2 * inset)) * clusterW;
      const y = baseY - ri * rowH;
      const rot = (((idx * 37) % 7) - 3) * 0.045;              // radians, as hero.js
      const deg = (rot * 180 / Math.PI).toFixed(3);
      const s = (b.size / 120).toFixed(4);                     // 120-unit frame -> px
      out.push(
        `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${deg}) scale(${s})">`
        + botGroupV1(b.form, patternId) + '</g>'
      );
      idx++;
    }
  });

  // The halftone pattern the diamond fills with. Namespaced so it cannot clash
  // with the copy HeroStage.astro declares on the home page.
  const defs = `<defs><pattern id="${patternId}" width="11" height="11"`
    + ' patternUnits="userSpaceOnUse">'
    + '<circle cx="2.9" cy="2.9" r="2.3"/><circle cx="8.4" cy="8.4" r="2.3"/>'
    + '</pattern></defs>';

  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" fill="none"`
    + ' xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"'
    + ` class="botpile-v1-svg">${defs}${out.join('')}</svg>`;
}
