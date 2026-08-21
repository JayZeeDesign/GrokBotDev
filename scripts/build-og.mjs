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

const fonts = [
  { name: 'sans', data: readFileSync('src/assets/og-fonts/DejaVuSans.ttf'), weight: 400, style: 'normal' },
  { name: 'sans', data: readFileSync('src/assets/og-fonts/DejaVuSans-Bold.ttf'), weight: 700, style: 'normal' },
  { name: 'mono', data: readFileSync('src/assets/og-fonts/DejaVuSansMono.ttf'), weight: 400, style: 'normal' },
];

// satori requires an explicit display on any div with more than one child; default every
// node to flex so a layout tweak can never trip it.
const el = (type, props, ...children) => ({
  type,
  props: { ...props, style: { display: 'flex', ...(props.style ?? {}) }, children: children.flat() },
});
const text = (value, style) => el('div', { style: { display: 'flex', ...style } }, value);

function card({ typeLabel, name, verified, category }) {
  return el(
    'div',
    {
      style: {
        width: 1200, height: 630, display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', backgroundColor: BG, padding: 64, fontFamily: 'sans',
      },
    },
    el(
      'div',
      { style: { display: 'flex', flexDirection: 'column', gap: 24 } },
      el(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 16 } },
        el('div', { style: { width: 36, height: 36, backgroundColor: ACCENT, borderRadius: 4, display: 'flex' } }),
        text('grokbot.dev', { fontFamily: 'mono', fontSize: 30, color: INK })
      ),
      text(typeLabel, { fontFamily: 'mono', fontSize: 26, letterSpacing: 2.6, color: MUTED }),
      text(name, { fontSize: 76, fontWeight: 700, color: INK, lineHeight: 1.05, maxWidth: 1000 })
    ),
    el(
      'div',
      { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
      verified
        ? text(`VERIFIED ${verified}`, {
            fontFamily: 'mono', fontSize: 24, color: ACCENT,
            border: `1px solid ${ACCENT}`, borderRadius: 2, padding: '8px 16px',
          })
        : el('div', { style: { display: 'flex' } }),
      category ? text(category, { fontFamily: 'mono', fontSize: 24, color: MUTED }) : el('div', { style: { display: 'flex' } })
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

const DIRS = { plugins: 'PLUGIN', 'use-cases': 'USE CASE', collections: 'COLLECTION' };
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
    const verified = d.status === 'live' && d.verified_at ? String(d.verified_at).slice(0, 10) : null;
    write(`dist/og/${dir}/${d.slug}.png`, await png(card({
      typeLabel: label, name: d.name, verified, category: d.category,
    })));
    count += 1;
  }
}

// Site default + the Organization.logo raster (§6.4).
write('dist/og/default.png', await png(card({
  typeLabel: 'DIRECTORY',
  name: 'Everything your Grok Bot could be doing',
  verified: null,
  category: null,
})));

write(
  'dist/og/logo-512.png',
  await png(
    el('div', {
      style: {
        width: 512, height: 512, display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: BG, border: `1px solid ${BORDER}`,
      },
    }, el('div', { style: { width: 220, height: 220, backgroundColor: ACCENT, borderRadius: 8, display: 'flex' } })),
    512,
    512
  )
);

console.log(`build-og: ${count} entry cards + default.png + logo-512.png`);
