#!/usr/bin/env node
// §4.6 / §12.5 — re-run the measured contrast table after ANY token edit.
// "Any future token swap must re-run the measured contrast table, including the border
// floors" (§4.6). Floors: body/meta text ≥ 4.5:1 · large text and UI borders/glyphs ≥ 3:1.
//
// Reads the hex values straight out of src/styles/tokens.css — the only file allowed to
// contain them (§4.1.1) — so the table can never drift from what ships.

import { readFileSync } from 'node:fs';

const css = readFileSync('src/styles/tokens.css', 'utf8');

function block(startPattern) {
  const start = css.indexOf(startPattern);
  if (start === -1) throw new Error(`token block not found: ${startPattern}`);
  const open = css.indexOf('{', start);
  const close = css.indexOf('\n}', open);
  return css.slice(open, close);
}

function tokens(source) {
  const map = new Map();
  for (const match of source.matchAll(/(--[\w-]+):\s*(#[0-9a-fA-F]{3,8})\s*;/g)) {
    map.set(match[1], match[2]);
  }
  return map;
}

const light = tokens(block('@theme static'));
const dark = new Map([...light, ...tokens(block('[data-theme="dark"]'))]);

function channel(value) {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const clean = hex.replace('#', '');
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function ratio(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

// Addendum A10 is CLOSED — design authority decision #18, 2026-08-21. Text on amber is ink
// in both modes (light 4.73:1, dark 9.18:1), so `accent-contrast on accent` is now a fully
// GATED pair in PAIRS below and there is no exemption set any more. A regression back to
// white-on-amber (4.16:1) fails the build instead of printing a warning nobody reads.

// [label, foreground token, background token, floor]
const PAIRS = [
  ['text on bg', '--color-text', '--color-bg', 4.5],
  ['text on surface', '--color-text', '--color-surface', 4.5],
  ['muted on bg', '--color-text-muted', '--color-bg', 4.5],
  ['muted on surface', '--color-text-muted', '--color-surface', 4.5],
  ['accent-ink on bg (amber-as-text)', '--color-accent-ink', '--color-bg', 4.5],
  ['accent-contrast on accent', '--color-accent-contrast', '--color-accent', 4.5],
  ['accent on bg (fill/glyph)', '--color-accent', '--color-bg', 3],
  ['border-interactive on bg (SC 1.4.11)', '--color-border-interactive', '--color-bg', 3],
  ['border-interactive on surface', '--color-border-interactive', '--color-surface', 3],
  ['border-strong on bg', '--color-border-strong', '--color-bg', 3],
  ['warn on surface', '--color-warn', '--color-surface', 3],
  ['danger on surface', '--color-danger', '--color-surface', 4.5],
  ['cat-text on cat-bg (A5 slate)', '--color-cat-text', '--color-cat-bg', 4.5],
  ['cat-on-solid on cat-solid', '--color-cat-on-solid', '--color-cat-solid', 4.5],
];

// --color-border is DECORATIVE ONLY (§4.6) — deliberately not gated here.
const DECORATIVE = [['border on bg (decorative only)', '--color-border', '--color-bg']];

let failures = 0;

for (const [mode, set] of [
  ['light (default)', light],
  ['dark', dark],
]) {
  console.log(`\n${mode}`);
  console.log('  pair                                    ratio   floor  result');
  for (const [label, fg, bg, floor] of PAIRS) {
    const a = set.get(fg);
    const b = set.get(bg);
    if (!a || !b) {
      console.log(`  ${label.padEnd(38)} MISSING TOKEN`);
      failures += 1;
      continue;
    }
    const value = ratio(a, b);
    const ok = value >= floor;
    if (!ok) failures += 1;
    console.log(
      `  ${label.padEnd(38)} ${value.toFixed(2).padStart(5)}:1 ${String(floor).padStart(5)}  ${
        ok ? 'PASS' : 'FAIL'
      }`
    );
  }
  for (const [label, fg, bg] of DECORATIVE) {
    const value = ratio(set.get(fg), set.get(bg));
    console.log(`  ${label.padEnd(38)} ${value.toFixed(2).padStart(5)}:1     —  n/a`);
  }
}

if (failures) {
  console.error(`\ncheck-contrast: ${failures} pair(s) below the §4.6 floor`);
  process.exit(1);
}
console.log('\ncheck-contrast: every gated pair clears its §4.6 floor');
