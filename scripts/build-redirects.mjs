import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const redirectPath = 'src/data/redirects.json';
const outPath = 'dist/redirects.conf';
const rows = JSON.parse(readFileSync(redirectPath, 'utf8'));
const pathPattern = /^\/[a-z0-9]+(?:[a-z0-9\-/]*[a-z0-9])?\/$/;
const forbidden = /[{};\n\r"$]/;

if (!Array.isArray(rows)) {
  throw new Error('redirects.json must be an array');
}
if (rows.length > 2000) {
  throw new Error('redirects.json must contain 2000 rows or fewer');
}

const lines = [];
for (const row of rows) {
  if (!row || typeof row.from !== 'string' || typeof row.to !== 'string') {
    throw new Error('redirect rows must have string from/to fields');
  }
  for (const value of [row.from, row.to]) {
    if (!pathPattern.test(value) || forbidden.test(value)) {
      throw new Error(`invalid redirect path: ${value}`);
    }
  }
  lines.push(`location = ${encodeURI(row.from)} { return 301 https://grokbot.dev${encodeURI(row.to)}; }`);
}

mkdirSync('dist', { recursive: true });
writeFileSync(outPath, `${lines.join('\n')}${lines.length ? '\n' : ''}`);
console.log(`build-redirects: wrote ${outPath} (${rows.length} redirects)`);
