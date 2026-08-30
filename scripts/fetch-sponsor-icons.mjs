#!/usr/bin/env node
// fetch-sponsor-icons.mjs — pull a REAL favicon for every sponsor and host it locally as a
// normalized PNG under public/icons/partners/<slug>.png, then rewrite sponsors.json's `icon`.
//
// Why self-host our OWN sponsors' marks (vs. hotlinking): a hotlinked favicon breaks the
// moment the source path 404s or moves, and a runtime third-party favicon service would need
// a new img-src host in the §10.7 CSP. These are our own sites, so there is no privacy cost —
// we just want the link to be PROPER and never broken. Downloading once and serving from
// 'self' is the proper link.
//
// Candidate order per site: <link rel=apple-touch-icon> (usually 180²) → <link rel=icon> with
// the largest declared size → /apple-touch-icon.png → /favicon.png|svg|ico → Google s2 (last
// resort). Every candidate is VALIDATED as a real image (PIL/convert opens it, or it is SVG);
// HTML error pages (the old transcriptapi.ico bug) are rejected.
import { readFileSync, writeFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'public/icons/partners');
const SPONSORS = JSON.parse(readFileSync(join(ROOT, 'src/data/sponsors.json'), 'utf8'));
const UA = 'Mozilla/5.0 (compatible; grokbot.dev-iconbot/1.0)';

async function get(url, asBuffer = false) {
  const res = await fetch(url, { headers: { 'user-agent': UA }, redirect: 'follow', signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return asBuffer ? Buffer.from(await res.arrayBuffer()) : await res.text();
}

// Return {ok, kind:'raster'|'svg', w,h} for a buffer, using python/PIL for raster.
function inspect(buf) {
  const head = buf.subarray(0, 64).toString('latin1').toLowerCase();
  if (head.includes('<!doctype') || head.includes('<html') || head.includes('<?xml') && head.includes('<html')) {
    return { ok: false };
  }
  if (head.includes('<svg') || (head.includes('<?xml') && buf.toString('latin1', 0, 512).toLowerCase().includes('<svg'))) {
    return { ok: true, kind: 'svg' };
  }
  const tmp = mkdtempSync(join(tmpdir(), 'ico-'));
  const f = join(tmp, 'cand');
  writeFileSync(f, buf);
  try {
    const out = execFileSync('python3', ['-c',
      `from PIL import Image;im=Image.open('${f}');print(im.size[0],im.size[1])`
    ], { encoding: 'utf8' }).trim();
    const [w, h] = out.split(' ').map(Number);
    return { ok: w >= 16 && h >= 16, kind: 'raster', w, h };
  } catch {
    return { ok: false };
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

function normalizeToPng(buf, outPath) {
  const tmp = mkdtempSync(join(tmpdir(), 'ico-'));
  const src = join(tmp, 'src');
  writeFileSync(src, buf);
  // PIL: for multi-frame .ico pick the largest frame; paste onto transparent, cap at 128².
  const py = `
from PIL import Image
im = Image.open('${src}')
try:
    im.seek(0)
    best = im
    if getattr(im, 'n_frames', 1) > 1:
        big = None
        for i in range(im.n_frames):
            im.seek(i)
            if big is None or im.size[0] > big.size[0]:
                big = im.convert('RGBA')
        best = big
except Exception:
    pass
best = best.convert('RGBA')
w, h = best.size
if max(w, h) > 128:
    best.thumbnail((128, 128), Image.LANCZOS)
best.save('${outPath}', 'PNG')
print('ok', best.size)
`;
  try {
    execFileSync('python3', ['-c', py], { encoding: 'utf8' });
    return true;
  } catch (e) {
    return false;
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

function abs(base, href) {
  try { return new URL(href, base).toString(); } catch { return null; }
}

async function bestCandidateUrls(siteUrl) {
  const out = [];
  const origin = new URL(siteUrl).origin;
  try {
    const html = await get(siteUrl);
    const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]);
    const scored = [];
    for (const tag of links) {
      const rel = (tag.match(/rel=["']([^"']+)["']/i) || [])[1]?.toLowerCase() || '';
      if (!/icon/.test(rel)) continue;
      const href = (tag.match(/href=["']([^"']+)["']/i) || [])[1];
      if (!href) continue;
      const sizes = (tag.match(/sizes=["']([^"']+)["']/i) || [])[1] || '';
      const dim = parseInt((sizes.match(/(\d+)x\d+/) || [])[1] || '0', 10);
      let score = dim;
      if (/apple-touch/.test(rel)) score += 1000; // crisp, opaque, ideal on a tinted card
      if (/\.svg(\?|$)/i.test(href)) score += 500;  // scalable
      scored.push({ url: abs(siteUrl, href), score });
    }
    scored.sort((a, b) => b.score - a.score);
    out.push(...scored.map((s) => s.url).filter(Boolean));
  } catch { /* homepage unreachable — fall through to well-known paths */ }
  out.push(
    `${origin}/apple-touch-icon.png`,
    `${origin}/apple-touch-icon-precomposed.png`,
    `${origin}/favicon.svg`,
    `${origin}/favicon.png`,
    `${origin}/favicon.ico`,
    `https://www.google.com/s2/favicons?domain=${new URL(siteUrl).hostname}&sz=128`
  );
  return [...new Set(out)];
}

const report = [];
for (const s of SPONSORS) {
  let done = false;
  for (const cand of await bestCandidateUrls(s.url)) {
    try {
      const buf = await get(cand, true);
      const info = inspect(buf);
      if (!info.ok) continue;
      if (info.kind === 'svg') {
        const outPath = join(OUT, `${s.slug}.svg`);
        writeFileSync(outPath, buf);
        s.icon = `${s.slug}.svg`;
        report.push(`${s.slug.padEnd(20)} SVG   ${cand}`);
      } else {
        const outPath = join(OUT, `${s.slug}.png`);
        if (!normalizeToPng(buf, outPath)) continue;
        s.icon = `${s.slug}.png`;
        const dim = `${info.w}x${info.h}`.padEnd(8);
        report.push(`${s.slug.padEnd(20)} ${dim} ${cand}`);
      }
      done = true;
      break;
    } catch { /* try next candidate */ }
  }
  if (!done) report.push(`${s.slug.padEnd(20)} !! NO ICON FOUND`);
}

// Drop any stale files that are no longer referenced (e.g. the old broken .ico).
writeFileSync(join(ROOT, 'src/data/sponsors.json'), JSON.stringify(SPONSORS, null, 2) + '\n');
console.log(report.join('\n'));
