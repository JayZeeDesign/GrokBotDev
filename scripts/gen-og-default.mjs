#!/usr/bin/env node
// MANUAL asset generator (not in the build chain). Emits a brand-true OG card HTML that is
// rendered to public/og/default.png via a headless browser (agent-browser) — see the sibling
// shell step. Uses the REAL self-hosted Geist/Inter fonts (inlined as base64 @font-face) and
// the REAL family-v2 bot SVGs (src/scripts/botFamilyV2.js), so the share card matches the
// coming-soon hero exactly, not a satori/DejaVu approximation. Re-run when the brand changes.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { FORMS_V2, buildBotSVGV2 } from '../src/scripts/botFamilyV2.js';

const b64 = (p) => readFileSync(p).toString('base64');
const GEIST = b64('node_modules/@fontsource/geist/files/geist-latin-600-normal.woff2');
const INTER = b64('node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2');
const MONO = b64('node_modules/@fontsource/geist-mono/files/geist-mono-latin-400-normal.woff2');

const byId = (id) => FORMS_V2.find((f) => f.id === id);

// A curated pile that spans the full six-colour palette, echoing the hero cluster. Each entry
// is a real FORMS_V2 shape placed by hand for a balanced arc above the headline.
const PILE = [
  { id: 'squircle',    x: 312, y: 182, size: 120, rot: -9 },
  { id: 'dot',         x: 408, y: 150, size: 100, rot: 0 },
  { id: 'rtri',        x: 490, y: 192, size: 126, rot: 5 },
  { id: 'slab',        x: 602, y: 150, size: 144, rot: -4 },
  { id: 'squircleXL',  x: 716, y: 184, size: 126, rot: 7 },
  { id: 'rtriWide',    x: 812, y: 164, size: 118, rot: -6 },
  { id: 'oval',        x: 902, y: 196, size: 126, rot: 10 },
];

const bots = PILE.map((p) => {
  const svg = buildBotSVGV2(byId(p.id), p.size);
  const half = p.size / 2;
  return `<div class="bot" style="left:${p.x - half}px;top:${p.y - half}px;transform:rotate(${p.rot}deg)">${svg}</div>`;
}).join('\n');

// The dot-grid mark (MarkGlyph geometry): two slash eyes + seven ink dots + the gold accent
// dot (bottom-centre). Ink #0B0B0C, accent #8C7A5C on paper.
const MARK = `<svg viewBox="0 0 36 36" width="42" height="42" aria-hidden="true">
  <g fill="#0B0B0C">
    <rect x="6.75" y="3.5" width="4.5" height="11" rx="2.25" transform="rotate(38 9 9)"/>
    <rect x="15.75" y="3.5" width="4.5" height="11" rx="2.25" transform="rotate(38 18 9)"/>
    <circle cx="27" cy="9" r="3.25"/>
    <circle cx="9" cy="18" r="3.25"/><circle cx="18" cy="18" r="3.25"/><circle cx="27" cy="18" r="3.25"/>
    <circle cx="9" cy="27" r="3.25"/><circle cx="27" cy="27" r="3.25"/>
  </g>
  <circle cx="18" cy="27" r="3.25" fill="#8C7A5C"/>
</svg>`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Geist;src:url(data:font/woff2;base64,${GEIST}) format('woff2');font-weight:600;font-display:block}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${INTER}) format('woff2');font-weight:400;font-display:block}
@font-face{font-family:'Geist Mono';src:url(data:font/woff2;base64,${MONO}) format('woff2');font-weight:400;font-display:block}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1200px;height:630px}
.card{position:relative;width:1200px;height:630px;background:#F7F7F5;overflow:hidden;
  font-family:Inter,sans-serif}
/* faint hairline frame so the card reads as a deliberate object in a busy feed */
.card::after{content:"";position:absolute;inset:20px;border:1px solid #E5E5E1;border-radius:18px;pointer-events:none}
.wordmark{position:absolute;left:56px;top:48px;display:flex;align-items:center;gap:12px;z-index:5}
.wordmark b{font-family:Geist;font-weight:600;font-size:30px;color:#0B0B0C;letter-spacing:-.01em}
.pile{position:absolute;inset:0;z-index:1}
.bot{position:absolute}
.bot svg{display:block}
.s2{fill:var(--bot-fill);stroke:none}
.s2-blue{--bot-fill:#4B92FA}.s2-orange{--bot-fill:#E49422}.s2-teal{--bot-fill:#25B8A4}
.s2-purple{--bot-fill:#9E77FD}.s2-red{--bot-fill:#EF6243}.s2-grey{--bot-fill:#919497}
.s2 .rt{stroke:var(--bot-fill)}
.s2 .eye{fill:#fff;stroke:none}
.stack{position:absolute;left:0;right:0;top:288px;z-index:4;display:flex;flex-direction:column;
  align-items:center;text-align:center;padding:0 90px}
h1{font-family:Geist;font-weight:600;font-size:76px;line-height:.98;letter-spacing:-.035em;
  color:#0B0B0C;max-width:960px}
.sub{margin-top:26px;font-family:Inter;font-size:29px;line-height:1.35;color:#6E6E76;max-width:760px}
.eyebrow{position:absolute;left:0;right:0;bottom:52px;text-align:center;z-index:4;
  font-family:'Geist Mono';font-size:19px;letter-spacing:.14em;color:#8C7A5C;text-transform:lowercase}
</style></head><body>
<div class="card">
  <div class="wordmark">${MARK}<b>grokbot.dev</b></div>
  <div class="pile">${bots}</div>
  <div class="stack">
    <h1>Everything your Grok&nbsp;Bot could be doing</h1>
    <div class="sub">Awesome use cases &amp; plugins, delivered directly to your Grok&nbsp;Bot.</div>
  </div>
  <div class="eyebrow">awesome use cases · plugins · collections</div>
</div>
</body></html>`;

mkdirSync('/tmp/og-build', { recursive: true });
writeFileSync('/tmp/og-build/og-card.html', html);
console.log('wrote /tmp/og-build/og-card.html (' + (html.length / 1024).toFixed(0) + ' KB, ' + PILE.length + ' bots)');
