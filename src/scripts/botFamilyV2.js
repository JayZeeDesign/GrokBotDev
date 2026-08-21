/* eslint-disable */
/* ============================================================================
   BOT FAMILY v2 — the HERO family.  (M8 · F16)

   There are now two bot families in this repo and they are not interchangeable:

     · family v1  (src/lib/botFamilyV1.ts)  — the original ink / paper / amber
       cluster: token-driven, theme-reactive, strokes + halftone, eleven angular
       forms. It is NOT deleted. It now lives on /about/ as a decorative static
       pile (components/AboutBotPile.astro).
     · family v2  (THIS FILE)               — the hero family: soft silhouettes,
       FLAT SOLID fills, a FIXED six-colour palette that is identical in light
       and dark mode, and no strokes or halftone anywhere.

   v2 exists because the hero should read as a room full of real Grok Bot
   interface avatars. Operator directive, and it supersedes Addendum A1's hero
   treatment specifically — A1's palette laws still bind every other surface.

   THREE THINGS IN HERE ARE LOAD-BEARING. Read before editing:

   1. COLOUR IS BAKED INTO THE FORM, NOT ROLLED PER BOT. See the deniability
      note below. Randomising colour would make the cousin-not-copy guarantee
      probabilistic; baking it makes it true for every seed forever.
   2. FIXED HEXES, NOT TOKENS. Real avatars do not invert with the OS theme and
      neither do these. The paint lives in src/styles/hero-bots.css under its own
      class names (`.s2` / `.s2-<colour>`), deliberately NOT the v1 `.s-*` rules,
      so both families can coexist without a specificity fight.
   3. GEOMETRY MUST STAY INSIDE THE INFLATE 1.10 TOLERANCE. integration-notes §8.
      Every form here reports a collider via `bodySpecV2()` that bounds the
      painted silhouette. Notes per branch at that function.
   ============================================================================ */

/* ---------------------------------------------------------------------------
   THE SIX COLOURS

   Eyedropped from the two reference screenshots of real Grok Bot avatars with
   PIL (dominant-cluster sample per hue bucket; the macOS traffic-light pixels in
   the second shot were identified and discarded), then harmonised in OKLCH so
   the six sit together as one family:

     name    final     eyedropped  OKLCH L / C / H
     blue    #4B92FA   #3C82F6     0.665 / 0.170 / 258
     orange  #E49422   #F19D38     0.730 / 0.150 /  69
     teal    #25B8A4   #1CC3AF     0.705 / 0.120 / 181
     purple  #9E77FD   #885CF5     0.668 / 0.192 / 294
     red     #EF6243   #ED712E     0.670 / 0.180 /  34
     grey    #919497   #959595     0.665 / 0.006 / 250

   Raw lightness spread across the sampled avatars was 0.581–0.811 (0.230).
   Harmonised to 0.665–0.720 (0.055) — compressed, but NOT flattened: the warm
   hues keep a small lightness lead, because forcing orange down to a cool hue's
   lightness turns it to mud. All six sit inside sRGB; worst pairwise oklab
   separation is 0.114 (blue vs purple), so no two read as the same bot.

   Contrast, measured: white eyes clear 3:1 on all six — grey is the tight one at
   3.05:1, which is the readability case the directive called out. Silhouette vs
   page is 2.3–3.0 on #F7F7F5 and 6.1–8.0 on #0B0B0C.

   A1 note: v2 uses NO Ash Amber. The old family spent the "one accent element
   per viewport" budget on a bot; the hero now leaves amber entirely to the CTA
   and the search cursor, which tightens A1 rather than bending it.
   --------------------------------------------------------------------------- */
export var PALETTE_V2 = {
  blue:   '#4B92FA',
  orange: '#E49422',
  teal:   '#25B8A4',
  purple: '#9E77FD',
  red:    '#EF6243',
  grey:   '#919497'
};

/* ---------------------------------------------------------------------------
   DENIABILITY — why colour is a property of the FORM and not of the roll.

   ┌──────────────────────────────────────────────────────────────────────────┐
   │ THE FORBIDDEN PAIRS — CHECK BEFORE ADDING ANY FORM TO THE ROSTER BELOW.   │
   │                                                                          │
   │ Catalogued from the reference screenshots, the real avatars use these     │
   │ nine shape × colour pairs. A v2 form may not reproduce any of them:       │
   │                                                                          │
   │   circle            × grey, orange, teal, blue, red    (five of six!)     │
   │   rounded triangle  × orange, purple                                      │
   │   horizontal pill   × teal                                                │
   │   rounded square    × purple                                              │
   │                                                                          │
   │ Which leaves open:                                                        │
   │   circle            → PURPLE ONLY (hence `dot` below)                     │
   │   rounded triangle  → blue, teal, red, grey                               │
   │   horizontal pill   → blue, orange, purple, red, grey                     │
   │   rounded square    → blue, orange, teal, red, grey                       │
   │   rounded rect / vertical capsule / ellipse → all six, no reference       │
   │                       avatar uses any of these shapes at all              │
   │                                                                          │
   │ ADDING A FORM: pick a colour that clears the table, add it below, then    │
   │ re-run `node scripts/qa/f16-deniability-grid.mjs` — it re-derives the     │
   │ verdict mechanically from its own REFERENCES array, so it catches a       │
   │ clash even if this comment was skipped. If the shape is a NEW silhouette  │
   │ class, extend silhouette() in that script too: an unclassified shape      │
   │ falls through to `squircle` and could mask a clash. Keep every colour on  │
   │ at least two forms (a roll dropping a whole colour: ~1.5% at two, ~9% at  │
   │ one). Full table + procedure: BUILD-NOTES-F16.md §2.1.                    │
   └──────────────────────────────────────────────────────────────────────────┘

   A circle is therefore spoken for in five of our six colours. If colour were
   rolled per bot the way v1 rolled its amber pick, some seeds would land a grey
   circle or a teal pill — an exact shape+colour clone — and I could only ever
   spot-check the seeds I happened to render.

   Baking colour into the form moves the guarantee from "probably" to "always":
   the twelve forms below avoid all nine pairs by construction, so EVERY seed is
   deniable, not just the sampled ones. Purple is the only colour the references
   never draw as a circle, so the one circle in this family is purple. The ovals
   sit at aspect >= 1.3 so they read as ovals rather than as soft circles.

   Variety per load is unchanged and still comes from the mechanics that always
   produced it: ten of TWELVE forms drawn (v1 drew ten of eleven — the roster
   rotates harder now, and every colour has two forms, so a roll that drops a
   whole colour went from ~9% to ~1.5%), per-bot size mutation, per-bot eye-tilt
   mutation, drop position, and the visible seed. Bot COUNTS are untouched at
   10 desktop / 6 mobile, which is what A4 and integration-notes actually lock.

   The third axis is the eyes, and it is the big one: the reference avatars wear
   two SMALL MIRRORED slashes that converge, and they never move. Ours are
   larger, PARALLEL (both eyes share one tilt direction), and they blink and
   track the cursor. That is our eye system, kept deliberately per the brief.
   --------------------------------------------------------------------------- */

/* Coordinate space is v1's: ~120×120 units centred on the shape bbox, so
   botSize() and the "-60 -60 120 120" viewBox carry over untouched. */
export var FORMS_V2 = [
  /* --- rounded squares / squircles ------------------------------------- */
  { id:'squircle',     color:'blue',   geo:{t:'rect', w:88,  h:82,  r:28},
    eye:{cy:2,   gap:34, w:14, h:26, tilt:20} },
  { id:'squircleXL',   color:'red',    geo:{t:'rect', w:102, h:95,  r:34},
    eye:{cy:4,   gap:40, w:16, h:29, tilt:23} },
  { id:'squircleTall', color:'grey',   geo:{t:'rect', w:74,  h:100, r:28},
    eye:{cy:-6,  gap:30, w:13, h:24, tilt:18} },

  /* --- rounded rectangles / pills --------------------------------------- */
  { id:'pill',         color:'purple', geo:{t:'rect', w:90,  h:46,  r:23},
    eye:{cy:0,   gap:32, w:12, h:20, tilt:22} },
  { id:'slab',         color:'orange', geo:{t:'rect', w:114, h:58,  r:24},
    eye:{cy:0,   gap:38, w:14, h:23, tilt:25} },
  { id:'capsule',      color:'teal',   geo:{t:'rect', w:48,  h:104, r:24},
    eye:{cy:26,  gap:24, w:11, h:21, tilt:24} },

  /* --- rounded-corner triangles ----------------------------------------- */
  { id:'rtri',         color:'teal',   geo:{t:'tri',  w:96,  h:78},
    eye:{cy:14,  gap:31, w:13, h:21, tilt:21} },
  { id:'rtriWide',     color:'grey',   geo:{t:'tri',  w:108, h:72},
    eye:{cy:12,  gap:34, w:13, h:21, tilt:17} },
  { id:'rtriSmall',    color:'red',    geo:{t:'tri',  w:84,  h:72},
    eye:{cy:12,  gap:28, w:12, h:20, tilt:23} },

  /* --- circle + ovals ---------------------------------------------------- */
  /* The ONE circle. Purple, because purple is the one colour the references
     never draw as a circle. Hero illustration ONLY — the A3 no-circle-marks
     rule is untouched everywhere else; see the C3 block in hero-bots.css. */
  { id:'dot',          color:'purple', geo:{t:'circle', w:88},
    eye:{cy:0,   gap:32, w:13, h:24, tilt:20} },
  { id:'oval',         color:'blue',   geo:{t:'ellipse', w:108, h:82},
    eye:{cy:0,   gap:36, w:14, h:25, tilt:22} },
  { id:'ovalTall',     color:'orange', geo:{t:'ellipse', w:78,  h:102},
    eye:{cy:-4,  gap:30, w:13, h:25, tilt:19} }
];

/* Rounded-triangle corner stroke width, in the 120-unit space. Same value v1
   used, so the corner radius reads identically across the two families. */
var TRI_STROKE = 16;

/* ---------- geometry ------------------------------------------------------ */

export function triVerts(w, h) {
  return [{ x: 0, y: -h / 2 }, { x: w / 2, y: h / 2 }, { x: -w / 2, y: h / 2 }];
}

/* Ellipse as an inscribed N-gon. N=18 puts the worst inward deviation at
   1 - cos(180/18 deg) = 1.52% of the radius, i.e. two orders inside the INFLATE
   1.10 margin, so the collider still bounds the painted ellipse comfortably.
   Wound clockwise in screen space (y down), which is what matter.js wants. */
export function ellipseVerts(w, h, n) {
  var N = n || 18, v = [], i, a;
  for (i = 0; i < N; i++) {
    a = (i / N) * Math.PI * 2;
    v.push({ x: (w / 2) * Math.cos(a), y: (h / 2) * Math.sin(a) });
  }
  return v;
}

export function centroidOf(v) {
  var a = 0, cx = 0, cy = 0, i, p, q, f;
  for (i = 0; i < v.length; i++) {
    p = v[i]; q = v[(i + 1) % v.length];
    f = p.x * q.y - q.x * p.y;
    a += f; cx += (p.x + q.x) * f; cy += (p.y + q.y) * f;
  }
  a *= 0.5;
  if (Math.abs(a) < 1e-9) return { x: 0, y: 0 };
  return { x: cx / (6 * a), y: cy / (6 * a) };
}

/* Smallest centroid→edge distance. Used to derive the triangle inset. */
function minEdgeDist(verts, c) {
  var dmin = Infinity, i, p, q, ex, ey, L, d;
  for (i = 0; i < verts.length; i++) {
    p = verts[i]; q = verts[(i + 1) % verts.length];
    ex = q.x - p.x; ey = q.y - p.y; L = Math.hypot(ex, ey);
    if (L < 1e-6) continue;
    d = Math.abs((p.x - c.x) * ey - (p.y - c.y) * ex) / L;
    if (d < dmin) dmin = d;
  }
  return dmin;
}

/* integration-notes §8: "the rounded triangle gets its corners from a 16-unit
   round-joined stroke, and its polygon is inset to 0.70 to compensate. If you
   retune the triangle's geo, retune inset too or it will overlap its
   neighbours."

   v2 has THREE triangles at different proportions, so rather than carry a magic
   number per triangle the inset is DERIVED. A polygon scaled by k about its
   centroid pulls each edge in by (1-k)·d; the stroke then paints TRI_STROKE/2
   back out. Setting those equal on the tightest edge gives

       k = 1 - (TRI_STROKE / 2) / dmin

   Using dmin rather than the mean means no edge can ever paint outside the
   nominal silhouette, which is the property §8 actually cares about.

   Sanity check against the hand-tuned v1 value: for v1's 96×78 triangle dmin is
   26.0, so k = 1 - 8/26 = 0.692 — which is the 0.70 that was tuned by eye. The
   formula reproduces the tuning, so it is safe on the new proportions.
   (rtriWide 108×72 → dmin 24.0 → k 0.667; rtriSmall 84×72 → dmin 24.0 → 0.667.) */
export function triInset(w, h) {
  var v = triVerts(w, h);
  var c = centroidOf(v);
  var dmin = minEdgeDist(v, c);
  if (!isFinite(dmin) || dmin <= TRI_STROKE / 2) return 0.70;
  return 1 - (TRI_STROKE / 2) / dmin;
}

/* ---------------------------------------------------------------------------
   BODY SPEC — the single source of truth for what the physics collider is.

   hero.js consumes this, so the drawn shape and the collider cannot drift apart.
   Every branch is documented against integration-notes §8; in all four the
   collider bounds the paint, never the reverse.

   `off` is the centroid of `verts` in the drawing frame. hero.js subtracts it
   before handing the polygon to Bodies.fromVertices, so the collider centroid
   and the SVG origin are the same point. (v2 draws every form centroid-at-origin
   — see shapeMarkupV2 — so paint and collider share one frame exactly. v1 also
   applied a second -centroid translate on the group, which left its triangle and
   arch drawn ~13 units above their colliders; that offset was absorbed by
   INFLATE and is left alone in v1, but v2 does not reproduce it.)
   --------------------------------------------------------------------------- */
export function bodySpecV2(f) {
  var g = f.geo;

  /* circle: exact. Bodies.circle matches <circle> perfectly — no inset, no
     polygon approximation, nothing to retune. */
  if (g.t === 'circle') return { kind: 'circle', r: g.w / 2, off: { x: 0, y: 0 } };

  /* ellipse: inscribed 18-gon, 1.52% inside the painted ellipse (see above). */
  if (g.t === 'ellipse') {
    var ev = ellipseVerts(g.w, g.h);
    return { kind: 'poly', verts: ev, off: centroidOf(ev) };
  }

  /* rounded triangle: the collider is the FULL sharp triangle while the paint is
     the inset triangle plus a round-joined stroke — so the paint sits at or
     inside the collider everywhere, and strictly inside at the rounded corners.
     Same relationship v1 shipped. */
  if (g.t === 'tri') {
    var tv = triVerts(g.w, g.h);
    return { kind: 'poly', verts: tv, off: centroidOf(tv) };
  }

  /* rounded rect / squircle / pill / capsule: matter's chamfer radius takes the
     same r the <rect> paints with, so the collider is the same rounded box. No
     v2 form is stroked, so v1's sw/2 stroke-inset case cannot arise here. */
  return { kind: 'rect', w: g.w, h: g.h, r: g.r, off: { x: 0, y: 0 } };
}

/* ---------- SVG ----------------------------------------------------------- */

/* OUR eye system, carried over from v1 unchanged and deliberately: two slash
   capsules sharing ONE tilt direction (parallel, not mirrored), sized large
   against the body. hero.js animates them — blink via a scale on the .eyes
   group, cursor tracking via a translate. integration-notes §8: the .eyes group
   uses the SVG transform ATTRIBUTE and needs `transform-box:fill-box;
   transform-origin:center` from CSS, or blinks scale from the wrong origin. */
export function eyesMarkupV2(e) {
  var hx = e.gap / 2, rx = e.w / 2;
  function slash(sx) {
    return '<rect class="eye" x="' + (-rx) + '" y="' + (-e.h / 2) + '"'
      + ' width="' + e.w + '" height="' + e.h + '" rx="' + rx + '"'
      + ' transform="translate(' + sx + ',' + e.cy + ') rotate(' + e.tilt + ')"/>';
  }
  return slash(-hx) + slash(hx);
}

/* Every branch draws CENTROID AT ORIGIN, so the group transform is identity and
   the painted shape shares its frame with the collider. */
export function shapeMarkupV2(f) {
  var g = f.geo;

  if (g.t === 'circle') {
    return '<circle cx="0" cy="0" r="' + (g.w / 2) + '"/>';
  }
  if (g.t === 'ellipse') {
    return '<ellipse cx="0" cy="0" rx="' + (g.w / 2) + '" ry="' + (g.h / 2) + '"/>';
  }
  if (g.t === 'tri') {
    var k = (typeof f.inset === 'number') ? f.inset : triInset(g.w, g.h);
    var v = triVerts(g.w, g.h);
    var c = centroidOf(v);
    var pts = v.map(function (p) {
      return ((p.x - c.x) * k).toFixed(2) + ',' + ((p.y - c.y) * k).toFixed(2);
    }).join(' ');
    return '<polygon points="' + pts + '" class="rt"'
      + ' stroke-width="' + TRI_STROKE + '" stroke-linejoin="round"/>';
  }
  return '<rect x="' + (-g.w / 2) + '" y="' + (-g.h / 2) + '"'
    + ' width="' + g.w + '" height="' + g.h + '" rx="' + g.r + '"/>';
}

export function buildBotSVGV2(f, size) {
  var inner = shapeMarkupV2(f)
    + '<g class="eyes" transform="translate(0,0)">' + eyesMarkupV2(f.eye) + '</g>';
  return '<svg width="' + size + '" height="' + size + '" viewBox="-60 -60 120 120">'
    + '<g class="s2 s2-' + f.color + '">' + inner + '</g></svg>';
}
