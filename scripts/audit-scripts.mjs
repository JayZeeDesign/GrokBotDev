#!/usr/bin/env node
// §11 M1.3 — audit every <script> in dist/.
//
// The client-JS policy (§4.2 intro, §3.1) allows exactly one shape of shipped script:
// an Astro-processed module bundled to /_astro/*.js, plus Pagefind's own /pagefind/*
// assets. `is:inline` is forbidden sitewide — the production CSP is
// `script-src 'self' …` with no 'unsafe-inline' and no nonces (§10.7).
//
// Fails (exit 1) on:
//   · any <script src> outside /_astro/ or /pagefind/
//   · any inline <script> block with content, EXCEPT application/ld+json
//     (structured data is data, not script — §6.4 emits it on entry/hub pages)
//
// Lists everything it finds either way, so the output doubles as the M1.3 evidence.

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const ALLOWED_SRC_PREFIXES = ['/_astro/', '/pagefind/'];
const ALLOWED_INLINE_TYPES = ['application/ld+json'];

if (!existsSync(DIST)) {
  console.error('audit-scripts: dist/ not found — run `npm run build` first');
  process.exit(1);
}

/** @type {string[]} */
const htmlFiles = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.isFile() && path.endsWith('.html')) htmlFiles.push(path);
  }
}
walk(DIST);

const SCRIPT_RE = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const ATTR_RE = /(\w[\w-]*)\s*=\s*"([^"]*)"/g;

const violations = [];
const externals = new Map(); // src → page count
let inlineDataBlocks = 0;
let inlineJsBlocks = 0;

for (const file of htmlFiles) {
  const page = `/${relative(DIST, file)}`;
  const html = readFileSync(file, 'utf8');

  for (const match of html.matchAll(SCRIPT_RE)) {
    const attrs = {};
    for (const attr of match[1].matchAll(ATTR_RE)) attrs[attr[1].toLowerCase()] = attr[2];
    const body = match[2].trim();
    const src = attrs.src;
    const type = (attrs.type ?? '').toLowerCase();

    if (src) {
      externals.set(src, (externals.get(src) ?? 0) + 1);
      const allowed = ALLOWED_SRC_PREFIXES.some((prefix) => src.startsWith(prefix));
      if (!allowed) violations.push(`${page}: <script src="${src}"> is outside /_astro/ and /pagefind/`);
      continue;
    }

    if (ALLOWED_INLINE_TYPES.includes(type)) {
      inlineDataBlocks += 1;
      continue;
    }

    if (body.length > 0) {
      inlineJsBlocks += 1;
      violations.push(
        `${page}: inline <script> block (${body.length} chars) — is:inline is forbidden (§4.2, §10.7 CSP)`
      );
    }
  }
}

console.log(`audit-scripts: ${htmlFiles.length} html files scanned`);
console.log(`audit-scripts: ${externals.size} distinct <script src> values`);
for (const [src, count] of [...externals].sort()) {
  console.log(`  ${src}  (${count} page${count === 1 ? '' : 's'})`);
}
console.log(`audit-scripts: ${inlineDataBlocks} inline application/ld+json blocks (allowed)`);
console.log(`audit-scripts: ${inlineJsBlocks} inline script blocks with JS (must be 0)`);

if (violations.length) {
  console.error(`\naudit-scripts: ${violations.length} violation(s)`);
  for (const violation of violations) console.error(`  ${violation}`);
  process.exit(1);
}

console.log('audit-scripts: OK');
