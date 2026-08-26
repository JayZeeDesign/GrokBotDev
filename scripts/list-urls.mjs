#!/usr/bin/env node
// §11 M3.1 — enumerate every built URL so the criterion can curl them all.
// Walks dist for index.html files plus the top-level machine surfaces.
import { existsSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';
if (!existsSync(DIST)) {
  console.error('list-urls: dist/ not found — run `npm run build` first');
  process.exit(1);
}

const urls = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '_astro' || entry.name === 'pagefind' || entry.name === 'og') continue;
      walk(path);
    } else if (entry.name === 'index.html') {
      const rel = relative(DIST, dir).split(sep).join('/');
      urls.push(rel ? `/${rel}/` : '/');
    }
  }
}
walk(DIST);

for (const extra of ['/llms.txt', '/llms-full.txt', '/robots.txt', '/sitemap-index.xml', '/rss.xml', '/news/rss.xml']) {
  if (existsSync(join(DIST, extra.slice(1)))) urls.push(extra);
}

for (const url of urls.sort()) console.log(url);
