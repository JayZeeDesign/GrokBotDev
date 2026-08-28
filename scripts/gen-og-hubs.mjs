#!/usr/bin/env node
// MANUAL asset generator (not in the build chain). Emits brand-true OG card HTML for the HUB /
// listing pages, rendered to public/og/hubs/<name>.png via a headless browser (agent-browser) -
// same template + real Geist/Inter fonts + real family-v2 bots as scripts/gen-og-default.mjs, so
// every hub card matches the home card exactly. Re-run when the brand or hub copy changes, then
// bump OG_VERSION in src/lib/seo.ts.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { FORMS_V2, buildBotSVGV2 } from '../src/scripts/botFamilyV2.js';

const b64 = (p) => readFileSync(p).toString('base64');
const GEIST = b64('node_modules/@fontsource/geist/files/geist-latin-600-normal.woff2');
const INTER = b64('node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2');
const MONO = b64('node_modules/@fontsource/geist-mono/files/geist-mono-latin-400-normal.woff2');

const byId = (id) => FORMS_V2.find((f) => f.id === id);
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

// One card per hub. h1 sizing shrinks a touch for longer titles so it never wraps to 3 lines.
const HUBS = [
  { name: 'use-cases',   h1: 'Awesome Grok&nbsp;Bot use cases', sub: 'Ready-to-use prompts, curated from X and YouTube, delivered to your Grok&nbsp;Bot.', eyebrow: 'awesome use cases', h1size: 72 },
  { name: 'plugins',     h1: 'Grok&nbsp;Bot plugins',           sub: 'Agentic tools your Grok&nbsp;Bot can actually plug into and use.', eyebrow: 'plugins', h1size: 84 },
  { name: 'news',        h1: 'Grok&nbsp;Bot news',              sub: 'Releases, deals, and opportunities worth surfacing to your Grok&nbsp;Bot.', eyebrow: 'news', h1size: 96 },
  { name: 'collections', h1: 'Grok&nbsp;Bot collections',       sub: 'Whole setups that work as one, put together for you.', eyebrow: 'collections', h1size: 82 },
  { name: 'marketplace', h1: 'Shareable Grok&nbsp;Bots',    sub: 'Whole Grok&nbsp;Bot setups people shared on X. One link adds one to your own Bot.', eyebrow: 'shareable bots', h1size: 74 },
  { name: 'wall',        h1: 'The wall',                        sub: 'Everything people are building with Grok&nbsp;Bot, as it lands.', eyebrow: 'the wall', h1size: 96 },
];

const cardHtml = (hub) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Geist;src:url(data:font/woff2;base64,${GEIST}) format('woff2');font-weight:600;font-display:block}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${INTER}) format('woff2');font-weight:400;font-display:block}
@font-face{font-family:'Geist Mono';src:url(data:font/woff2;base64,${MONO}) format('woff2');font-weight:400;font-display:block}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1200px;height:630px}
.card{position:relative;width:1200px;height:630px;background:#F7F7F5;overflow:hidden;font-family:Inter,sans-serif}
.card::after{content:"";position:absolute;inset:20px;border:1px solid #E5E5E1;border-radius:18px;pointer-events:none}
.wordmark{position:absolute;left:56px;top:48px;display:flex;align-items:center;gap:12px;z-index:5}
.wordmark b{font-family:Geist;font-weight:600;font-size:30px;color:#0B0B0C;letter-spacing:-.01em}
.pile{position:absolute;inset:0;z-index:1}
.bot{position:absolute}.bot svg{display:block}
.s2{fill:var(--bot-fill);stroke:none}
.s2-blue{--bot-fill:#4B92FA}.s2-orange{--bot-fill:#E49422}.s2-teal{--bot-fill:#25B8A4}
.s2-purple{--bot-fill:#9E77FD}.s2-red{--bot-fill:#EF6243}.s2-grey{--bot-fill:#919497}
.s2 .rt{stroke:var(--bot-fill)}.s2 .eye{fill:#fff;stroke:none}
.stack{position:absolute;left:0;right:0;top:288px;z-index:4;display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 90px}
h1{font-family:Geist;font-weight:600;font-size:${hub.h1size}px;line-height:.98;letter-spacing:-.035em;color:#0B0B0C;max-width:1000px}
.sub{margin-top:26px;font-family:Inter;font-size:29px;line-height:1.35;color:#6E6E76;max-width:820px}
.eyebrow{position:absolute;left:0;right:0;bottom:52px;text-align:center;z-index:4;font-family:'Geist Mono';font-size:19px;letter-spacing:.14em;color:#8C7A5C;text-transform:lowercase}
</style></head><body>
<div class="card">
  <div class="wordmark">${MARK}<b>grokbot.dev</b></div>
  <div class="pile">${bots}</div>
  <div class="stack">
    <h1>${hub.h1}</h1>
    <div class="sub">${hub.sub}</div>
  </div>
  <div class="eyebrow">${hub.eyebrow}</div>
</div>
</body></html>`;

mkdirSync('/tmp/og-build', { recursive: true });
for (const hub of HUBS) {
  writeFileSync(`/tmp/og-build/hub-${hub.name}.html`, cardHtml(hub));
  console.log(`wrote /tmp/og-build/hub-${hub.name}.html`);
}
console.log(`gen-og-hubs: ${HUBS.length} hub cards -> render each to public/og/hubs/<name>.png`);
