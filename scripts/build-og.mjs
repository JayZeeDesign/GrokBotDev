#!/usr/bin/env node
// §6.6 — per-entry (and per-hub) OG images: satori → SVG, @resvg/resvg-js → PNG.
// 1200x630, colours resolved at build from tokens.css (the only file with raw hex, §4.1.1).
// Output: dist/og/{plugins,use-cases,collections}/<slug>.png · dist/og/hubs/<path>.png ·
// dist/og/default.png · dist/og/logo-512.png (the Organization.logo raster, §6.4).
//
// FONT NOTE: §6.6 wants the §4 mono + sans as committed subsets. Geist/Inter ship woff2
// only via @fontsource and satori needs TTF/OTF, so DejaVu Sans/Mono stand in for now —
// the composition, tokens and layout are final; the typeface is a swap. Logged in
// BUILD-NOTES as an open item.
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { parse as parseYaml } from 'yaml';

const tokens = readFileSync('src/styles/tokens.css', 'utf8');
const token = (name) => tokens.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{3,8})`))?.[1] ?? '#000000';
const BG = token('--color-bg');
const INK = token('--color-text');
const MUTED = token('--color-text-muted');
const ACCENT = token('--color-accent');
const BORDER = token('--color-border');

// REAL brand fonts (2026-08-22): the @fontsource woff2s converted to TTF (satori cannot read
// woff2) by fontTools — committed at src/assets/og-fonts/. DejaVu stand-ins retired.
const fonts = [
  { name: 'display', data: readFileSync('src/assets/og-fonts/Geist-600.ttf'), weight: 600, style: 'normal' },
  { name: 'sans', data: readFileSync('src/assets/og-fonts/Inter-400.ttf'), weight: 400, style: 'normal' },
  { name: 'mono', data: readFileSync('src/assets/og-fonts/GeistMono-400.ttf'), weight: 400, style: 'normal' },
];

// satori requires an explicit display on any div with more than one child; default every
// node to flex so a layout tweak can never trip it.
const el = (type, props, ...children) => ({
  type,
  props: { ...props, style: { display: 'flex', ...(props.style ?? {}) }, children: children.flat() },
});
const text = (value, style) => el('div', { style: { display: 'flex', ...style } }, value);

// The dot-grid mark (MarkGlyph geometry) as satori-safe positioned divs: two tilted capsule
// "slash eyes", six ink dots, and the gold accent dot bottom-centre. 36px design → scaled.
function mark(size = 40) {
  const s = size / 36;
  const dot = (cx, cy, color) =>
    el('div', {
      style: {
        position: 'absolute', left: (cx - 3.25) * s, top: (cy - 3.25) * s,
        width: 6.5 * s, height: 6.5 * s, borderRadius: 999, backgroundColor: color, display: 'flex',
      },
    });
  const eye = (cx) =>
    el('div', {
      style: {
        position: 'absolute', left: (cx - 2.25) * s, top: 3.5 * s,
        width: 4.5 * s, height: 11 * s, borderRadius: 999, backgroundColor: INK,
        transform: 'rotate(38deg)', display: 'flex',
      },
    });
  return el(
    'div',
    { style: { position: 'relative', width: size, height: size, display: 'flex' } },
    eye(9), eye(18),
    dot(27, 9, INK), dot(9, 18, INK), dot(18, 18, INK), dot(27, 18, INK),
    dot(9, 27, INK), dot(27, 27, INK),
    dot(18, 27, ACCENT)
  );
}

const clamp = (s, n) => {
  const v = String(s ?? '');
  return v.length > n ? `${v.slice(0, n - 1).trimEnd()}…` : v;
};

// Brand-true per-entry card (2026-08-22): mark + wordmark, type label, score badge when
// graded, the HOOK in Geist 600, the summary in Inter, category chips + verified date.
function card({ typeLabel, name, summary, stamp, categories, score, guide }) {
  const chips = (categories ?? []).filter(Boolean).slice(0, 3);
  return el(
    'div',
    {
      style: {
        width: 1200, height: 630, display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', backgroundColor: BG, padding: 60, fontFamily: 'sans',
        border: `1px solid ${BORDER}`,
      },
    },
    el(
      'div',
      { style: { display: 'flex', flexDirection: 'column', gap: 26 } },
      el(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 16 } },
        mark(40),
        text('grokbot.dev', { fontFamily: 'display', fontSize: 30, fontWeight: 600, color: INK }),
        el('div', { style: { flex: 1, display: 'flex' } }),
        guide
          ? text('GUIDE · REFERENCE', { fontFamily: 'mono', fontSize: 22, color: MUTED })
          : score != null
            ? text(`${score} · ${score >= 90 ? 'must-try' : score >= 78 ? 'awesome' : score >= 65 ? 'solid' : 'use case'}`, {
                fontFamily: 'mono', fontSize: 26, fontWeight: 400, color: ACCENT,
                border: `2px solid ${ACCENT}`, borderRadius: 999, padding: '6px 20px',
              })
            : el('div', { style: { display: 'flex' } })
      ),
      text(typeLabel, { fontFamily: 'mono', fontSize: 22, letterSpacing: 3, color: MUTED }),
      text(clamp(name, 76), {
        fontFamily: 'display', fontSize: 66, fontWeight: 600, color: INK,
        lineHeight: 1.06, letterSpacing: -1.5, maxWidth: 1060,
      }),
      summary
        ? text(clamp(summary, 150), { fontSize: 28, color: MUTED, lineHeight: 1.4, maxWidth: 1020 })
        : el('div', { style: { display: 'flex' } })
    ),
    el(
      'div',
      { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
      el(
        'div',
        { style: { display: 'flex', gap: 12 } },
        chips.map((c) =>
          text(c, {
            fontFamily: 'mono', fontSize: 22, color: MUTED,
            border: `1px solid ${BORDER}`, borderRadius: 999, padding: '6px 18px',
          })
        )
      ),
      stamp
        ? text(stamp, { fontFamily: 'mono', fontSize: 22, color: MUTED })
        : el('div', { style: { display: 'flex' } })
    )
  );
}

async function png(node, width = 1200, height = 630) {
  const svg = await satori(node, { width, height, fonts });
  return new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();
}

function write(path, buffer) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, buffer);
}

const DIRS = { plugins: 'PLUGIN', 'use-cases': 'USE CASE', collections: 'COLLECTION', news: 'NEWS', templates: 'SHAREABLE BOT' };
// Tag slugs are not what a reader recognises on a social card, so the chips carry LABELS.
const TEMPLATE_TAG_LABEL = new Map(
  JSON.parse(readFileSync('src/data/template-tags.json', 'utf8')).flatMap((facet) =>
    facet.tags.map((tag) => [tag.slug, tag.label])
  )
);
const frontmatter = (file) => {
  const raw = readFileSync(file, 'utf8');
  return parseYaml(raw.slice(3, raw.indexOf('\n---', 3))) ?? {};
};

let count = 0;
for (const [dir, label] of Object.entries(DIRS)) {
  const source = `content/${dir}`;
  if (!existsSync(source)) continue;
  for (const name of readdirSync(source).filter((f) => f.endsWith('.md'))) {
    const d = frontmatter(join(source, name));
    if (dir === 'news' && d.status === 'draft') continue;
    // A card for an entry no list surface shows is a card nothing can ever link to.
    if (dir === 'templates' && d.status !== 'live' && d.status !== 'needs-update') continue;
    const newsStamp = dir === 'news' && d.published_at ? String(d.published_at).slice(0, 10) : null;
    const verified = d.status === 'live' && d.verified_at ? String(d.verified_at).slice(0, 10) : null;
    const isGuide = d.format === 'guide';
    write(`dist/og/${dir}/${d.slug}.png`, await png(card({
      typeLabel: isGuide ? 'GUIDE' : label,
      name: d.title ?? d.headline ?? d.name,
      summary: d.summary ?? d.tagline ?? d.what_it_does ?? null,
      // The template card's stamp is the CREDIT - the whole premise of the section, so it is
      // what the social card should say rather than a verification date.
      stamp:
        dir === 'templates'
          ? `shared by @${d.sharer?.handle ?? ''}`
          : (newsStamp ?? (verified ? `verified ${verified}` : null)),
      categories: dir === 'news'
        ? [d.kind, d.important ? 'important' : null].filter(Boolean)
        : dir === 'templates'
          ? (d.tags ?? []).map((tag) => TEMPLATE_TAG_LABEL.get(tag) ?? tag)
          : (d.categories && d.categories.length ? d.categories : [d.category]),
      score: isGuide ? null : (d.awesome_score ?? null),
      guide: isGuide,
    })));
    count += 1;
  }
}

write(
  'dist/og/hubs/news.png',
  await png(card({
    typeLabel: 'NEWS',
    name: 'News for Grok Bot users',
    summary: 'Releases, deals, opportunities and platform updates worth surfacing to your Bot.',
    stamp: 'grokbot.dev/news',
    categories: ['releases', 'deals', 'updates'],
    score: null,
    guide: false,
  }))
);

// Site default (§6.6): the social card is now a brand-true, browser-rendered image committed
// at public/og/default.png (scripts/gen-og-default.mjs) — REAL Geist/Inter fonts + REAL
// family-v2 bots, which this satori/DejaVu path cannot reproduce. Astro copies public/ into
// dist/, so dist/og/default.png already exists; do NOT regenerate it here or it clobbers the
// good one. The Organization.logo raster (§6.4) stays satori-generated below.
write(
  'dist/og/logo-512.png',
  await png(
    el('div', {
      style: {
        width: 512, height: 512, display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: BG, border: `1px solid ${BORDER}`,
      },
    }, mark(300)),
    512,
    512
  )
);

console.log(`build-og: ${count} entry cards + news hub + logo-512.png (default.png is committed at public/og/default.png)`);
