#!/usr/bin/env node
/**
 * M8 · F16 — deniability grid generator.
 *
 * Renders every bot in family v2 side by side with the real Grok Bot avatars the family
 * was drawn from, and computes a per-bot verdict, so "cousin, not copy" is a measured
 * claim rather than an assertion.
 *
 * THE TEST (from the F16 directive): no bot may match a specific real avatar in
 * shape + colour + eye COMBINATION. A match is a redesign, not a footnote.
 *
 * The eye axis is uniform — every v2 bot wears our parallel, same-direction slash pair,
 * which blinks and tracks the cursor, while every reference avatar wears a smaller
 * MIRRORED converging pair that never moves. That alone would technically clear all
 * twelve, which is exactly the footnote the directive rules out. So the verdict below is
 * computed on the strictest axis instead: SHAPE + COLOUR ALONE. A bot passes only if no
 * real avatar shares its silhouette class AND its colour, with the eye difference treated
 * as reinforcement rather than as the argument.
 *
 * The bots are imported from src/scripts/botFamilyV2.js — the shipping source — so the
 * grid cannot drift from what the hero actually draws.
 *
 * USAGE
 *   1. crop the reference avatars (boxes auto-detected from the two screenshots):
 *        python3 -c "from PIL import Image; ..."   # see REFERENCES below for the boxes
 *   2. node scripts/qa/f16-deniability-grid.mjs <cropDir> <out.html>
 *   3. screenshot the HTML at 1280 wide.
 */
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { FORMS_V2, PALETTE_V2, buildBotSVGV2 } from '../../src/scripts/botFamilyV2.js';

/**
 * The real avatars, catalogued from the two reference screenshots. Boxes were found by
 * connected-component detection, not by eye — see the F16 notes. `shape` uses the same
 * silhouette classes the v2 roster does.
 */
const REFERENCES = [
  { file: 'ref-1.png', shape: 'circle', color: 'grey', src: 'shot A' },
  { file: 'ref-2.png', shape: 'tri', color: 'orange', src: 'shot A' },
  { file: 'ref-3.png', shape: 'circle', color: 'orange', src: 'shot A' },
  { file: 'ref-4.png', shape: 'pill', color: 'teal', src: 'shot A' },
  { file: 'ref-5.png', shape: 'circle', color: 'teal', src: 'shot B' },
  { file: 'ref-6.png', shape: 'circle', color: 'orange', src: 'shot B' },
  { file: 'ref-7.png', shape: 'tri', color: 'purple', src: 'shot B' },
  { file: 'ref-8.png', shape: 'squircle', color: 'purple', src: 'shot B' },
  { file: 'ref-9.png', shape: 'circle', color: 'blue', src: 'shot B' },
  { file: 'ref-10.png', shape: 'circle', color: 'red', src: 'shot B' },
];

/**
 * Map a v2 geo type to the silhouette class the comparison uses.
 * `rect` splits on proportion: a wide, fully-rounded rect is a PILL; anything else is a
 * squircle-family box. An `ellipse` is its own class — no reference avatar is an oval, and
 * the roster keeps them at aspect >= 1.3 so they cannot be mistaken for soft circles.
 */
function silhouette(f) {
  const g = f.geo;
  if (g.t === 'circle') return 'circle';
  if (g.t === 'ellipse') return 'ellipse';
  if (g.t === 'tri') return 'tri';
  const aspect = g.w / g.h;
  // "fully rounded" = the corner radius reaches the short axis, i.e. the ends are
  // semicircles. That is what makes the teal reference avatar a PILL rather than a
  // rounded rectangle, so the distinction has to be drawn the same way on our side.
  const fullyRounded = g.r >= Math.min(g.w, g.h) / 2 - 0.51;
  if (fullyRounded && aspect >= 1.6) return 'pill';
  if (fullyRounded && aspect <= 0.625) return 'capsule';
  if (aspect >= 1.5) return 'roundrect';
  return 'squircle';
}

const cropDir = process.argv[2] || '.scratch/f16-refs';
const outFile = process.argv[3] || '.scratch/f16-deniability.html';

const dataUri = (file) => {
  const p = join(cropDir, file);
  if (!existsSync(p)) return null;
  return `data:image/png;base64,${readFileSync(p).toString('base64')}`;
};

// ---- the verdict ----
const rows = FORMS_V2.map((f) => {
  const sil = silhouette(f);
  const clashes = REFERENCES.filter((r) => r.shape === sil && r.color === f.color);
  const sameShape = REFERENCES.filter((r) => r.shape === sil).map((r) => r.color);
  const sameColor = REFERENCES.filter((r) => r.color === f.color).map((r) => r.shape);
  return {
    id: f.id,
    sil,
    color: f.color,
    hex: PALETTE_V2[f.color],
    svg: buildBotSVGV2(f, 84),
    pass: clashes.length === 0,
    // why it survives: what the references DO pair with this shape / this colour
    note: clashes.length
      ? `MATCHES a real avatar (${sil} + ${f.color}) — REDESIGN`
      : sameShape.length
        ? `refs pair ${sil} only with ${[...new Set(sameShape)].join('/')} — never ${f.color}`
        : `no reference avatar uses a ${sil} at all`,
  };
});

const failed = rows.filter((r) => !r.pass);

const refCards = REFERENCES.map((r, i) => {
  const uri = dataUri(r.file);
  return `<figure class="card ref">
    ${uri ? `<img src="${uri}" alt="">` : '<div class="missing">?</div>'}
    <figcaption><b>real avatar ${i + 1}</b><br>${r.shape} · ${r.color}<br><span class="src">${r.src}</span></figcaption>
  </figure>`;
}).join('');

const botCards = rows.map((r) => `<figure class="card ${r.pass ? 'ok' : 'bad'}">
    <div class="bot">${r.svg}</div>
    <figcaption><b>${r.id}</b><br>${r.sil} · ${r.color}<br><span class="src">${r.hex}</span></figcaption>
  </figure>`).join('');

const verdictRows = rows.map((r) => `<tr class="${r.pass ? '' : 'bad'}">
    <td><b>${r.id}</b></td><td>${r.sil}</td>
    <td><span class="sw" style="background:${r.hex}"></span>${r.color}</td>
    <td>${r.pass ? 'COUSIN' : 'COPY'}</td><td class="note">${r.note}</td></tr>`).join('');

// The bots must be painted by the SHIPPING stylesheet, not by a copy of the hexes made
// for this page — otherwise the grid could show a palette the hero does not actually use.
const paint = readFileSync('src/styles/hero-bots.css', 'utf8');

const html = `<!doctype html><meta charset="utf-8"><title>F16 deniability grid</title>
<style>
/* ---- painted by src/styles/hero-bots.css verbatim, so the grid cannot drift ---- */
${paint}
</style>
<style>
  body{margin:0;padding:28px 32px;background:#F7F7F5;color:#0B0B0C;
       font:14px/1.5 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
  h1{font-size:22px;margin:0 0 4px;letter-spacing:-.02em}
  h2{font-size:13px;text-transform:lowercase;letter-spacing:.06em;color:#6E6E76;
     margin:26px 0 10px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
  .lede{max-width:78ch;color:#6E6E76;margin:0 0 6px}
  .grid{display:grid;grid-template-columns:repeat(6,1fr);gap:10px}
  .card{margin:0;background:#fff;border:1px solid #E5E5E1;border-radius:6px;
        padding:10px 6px;text-align:center}
  .card.ok{border-color:#CFE3CF}
  .card.bad{border-color:#EF6243;box-shadow:0 0 0 2px #EF624333}
  .card img{width:84px;height:84px;object-fit:contain;image-rendering:auto}
  .card .bot{height:84px;display:flex;align-items:center;justify-content:center}
  figcaption{font:11px/1.45 ui-monospace,SFMono-Regular,Menlo,monospace;color:#6E6E76;margin-top:7px}
  figcaption b{color:#0B0B0C}
  .src{color:#9A9AA2}
  table{border-collapse:collapse;width:100%;font:12px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;margin-top:6px}
  th,td{text-align:left;padding:6px 8px;border-bottom:1px solid #E5E5E1;vertical-align:top}
  th{color:#6E6E76;font-weight:500}
  tr.bad td{background:#FDECE8}
  .sw{display:inline-block;width:20px;height:11px;border-radius:2px;margin-right:6px;vertical-align:-1px}
  .note{color:#6E6E76}
  .verdict{margin-top:18px;padding:12px 14px;border-radius:6px;font-weight:600;
           background:${failed.length ? '#FDECE8' : '#EAF3EA'};
           border:1px solid ${failed.length ? '#EF6243' : '#BBD9BB'}}
</style>
<h1>F16 — deniability grid: bot family v2 vs the real Grok Bot avatars</h1>
<p class="lede">Test: no bot may match a specific real avatar in shape + colour + eye combination.
The eye axis is uniform in our favour (ours are larger, PARALLEL and animated — every reference pair is
smaller, MIRRORED and static), so the verdict below is computed on the strictest axis instead:
<b>shape + colour alone</b>, with the eye difference treated as reinforcement rather than as the argument.</p>

<h2>the references — 10 real avatars, catalogued</h2>
<div class="grid">${refCards}</div>

<h2>family v2 — all 12 forms as shipped</h2>
<div class="grid">${botCards}</div>

<h2>verdict, per bot</h2>
<table><thead><tr><th>form</th><th>silhouette</th><th>colour</th><th>verdict</th><th>why</th></tr></thead>
<tbody>${verdictRows}</tbody></table>

<div class="verdict">${failed.length
  ? `FAIL — ${failed.length} bot(s) match a real avatar in shape+colour: ${failed.map((f) => f.id).join(', ')}. Redesign required.`
  : 'PASS — 12 / 12 bots read as cousin, not copy. No bot shares a silhouette class AND a colour with any real avatar, on any seed: colour is baked into the form, so this holds for every roll rather than for the ones that were sampled.'}</div>
`;

writeFileSync(outFile, html);
console.log(`f16-deniability-grid: wrote ${outFile}`);
console.log(`  ${rows.length - failed.length}/${rows.length} pass` + (failed.length ? ` — FAILING: ${failed.map((f) => f.id).join(', ')}` : ''));
