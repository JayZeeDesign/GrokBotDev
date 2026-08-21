#!/usr/bin/env node
// §6.11 — the exact phrase "ready-to-use Grok Bot prompts" must appear verbatim at four
// surfaces, and the build fails if any is missing. Addendum B1 retargets the list: the
// home H1 is EXEMPT (it is B1's operator-locked line); the hero SUBLINE carries the phrase.
//
// §6.2's anti-templating rule is enforced here too: no two hub intros may share a
// ≥40-character substring.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const PHRASE = 'ready-to-use Grok Bot prompts';
const TARGETS = [
  { file: 'dist/index.html', label: '/ (hero subline)' },
  { file: 'dist/use-cases/index.html', label: '/use-cases/ (intro first sentence)' },
  { file: 'dist/agent/index.html', label: '/agent/ (intro first paragraph)' },
  { file: 'dist/llms.txt', label: '/llms.txt (summary blockquote)' },
];

const errors = [];
const decode = (s) => s.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');

for (const target of TARGETS) {
  if (!existsSync(target.file)) {
    errors.push(`${target.label}: ${target.file} does not exist`);
    continue;
  }
  const body = decode(readFileSync(target.file, 'utf8'));
  if (!body.includes(PHRASE)) {
    errors.push(`${target.label}: the phrase "${PHRASE}" is missing from ${target.file}`);
  }
}

// §6.2 anti-boilerplate across the hub intros.
const INTRO_DIR = 'src/data/hub-intros';
const intros = [];
function walk(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (path.endsWith('.md')) intros.push({ path, body: readFileSync(path, 'utf8').trim() });
  }
}
walk(INTRO_DIR);

for (let i = 0; i < intros.length; i += 1) {
  for (let j = i + 1; j < intros.length; j += 1) {
    const a = intros[i].body;
    const b = intros[j].body;
    for (let start = 0; start + 40 <= a.length; start += 1) {
      const slice = a.slice(start, start + 40);
      if (b.includes(slice)) {
        errors.push(
          `hub intros ${intros[i].path} and ${intros[j].path} share a 40-char run: "${slice}"`
        );
        start = a.length;
        break;
      }
    }
  }
}

console.log(
  `check-keyword-placements: ${TARGETS.length} required placements · ${intros.length} hub intros compared`
);

if (errors.length) {
  console.error(`\ncheck-keyword-placements: ${errors.length} problem(s)`);
  for (const error of errors) console.error(`  ${error}`);
  process.exit(1);
}
console.log('check-keyword-placements: OK');
