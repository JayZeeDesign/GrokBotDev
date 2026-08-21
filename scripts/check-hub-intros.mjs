#!/usr/bin/env node
// §6.2 — all 83 hub intros must exist and be 60–160 words; a miss fails the build.
// GATE STATUS: report-only until the intro corpus lands (they are being drafted by a
// content executor). `HUB_INTRO_GATE=1` makes it fail; M7 must run with the gate ON.
import { existsSync, readFileSync } from 'node:fs';

const categories = JSON.parse(readFileSync('src/data/categories.json', 'utf8'));
const integrations = JSON.parse(readFileSync('src/data/integrations.json', 'utf8'));
const slugify = (v) => v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const expected = [
  ...categories.map((c) => `categories/${c.slug}`),
  ...categories.flatMap((c) => c.subcategories.map((s) => `categories/${c.slug}--${s.slug}`)),
  ...integrations.map((i) => `integrations/${slugify(i.canonical_name)}`),
];

const missing = [];
const badLength = [];
for (const key of expected) {
  const path = `src/data/hub-intros/${key}.md`;
  if (!existsSync(path)) {
    missing.push(key);
    continue;
  }
  const words = readFileSync(path, 'utf8').trim().split(/\s+/).filter(Boolean).length;
  if (words < 60 || words > 160) badLength.push(`${key} (${words} words)`);
}

console.log(
  `check-hub-intros: ${expected.length - missing.length}/${expected.length} present · ${badLength.length} out of range`
);
if (missing.length) console.log(`  missing: ${missing.length} (first: ${missing.slice(0, 3).join(', ')})`);
for (const row of badLength) console.log(`  length: ${row}`);

if (process.env.HUB_INTRO_GATE === '1' && (missing.length || badLength.length)) {
  console.error('check-hub-intros: gate is ON and the corpus is incomplete');
  process.exit(1);
}
