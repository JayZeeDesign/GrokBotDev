import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';

const htmlFiles = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.isFile() && path.endsWith('.html')) htmlFiles.push(path);
  }
}
walk('dist');

const hrefPattern = /\s(?:href|src)="([^"]+)"/g;
const assetPrefixes = ['/_astro/', '/pagefind/'];
const externalPattern = /^(?:https?:)?\/\//;
const ignoredSchemes = /^(?:mailto:|tel:|#|data:|javascript:)/;
const missing = [];

function targetExists(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean || ignoredSchemes.test(clean) || externalPattern.test(clean)) return true;
  if (assetPrefixes.some((prefix) => clean.startsWith(prefix))) return true;
  if (!clean.startsWith('/')) return true;
  if (clean === '/') return existsSync('dist/index.html');
  const ext = extname(clean);
  if (ext) return existsSync(join('dist', clean));
  return existsSync(join('dist', clean, 'index.html')) || existsSync(join('dist', `${clean}.html`));
}

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(hrefPattern)) {
    const href = match[1];
    if (!targetExists(href)) missing.push(`${file}: ${href}`);
  }
}

if (missing.length) {
  console.error(`check-links: ${missing.length} broken internal links`);
  for (const line of missing) console.error(line);
  process.exit(1);
}
console.log(`check-links: ${htmlFiles.length} HTML files checked, 0 broken internal links`);
