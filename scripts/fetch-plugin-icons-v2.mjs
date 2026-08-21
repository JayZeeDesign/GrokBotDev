#!/usr/bin/env node
// Pull a REAL favicon for each plugin (by its project_url) and host it locally as
// public/icons/plugins/<slug>.png|svg, so the plugin listing + home table show product marks
// just like the sponsor rails do — not letter tiles. Same robust approach as
// fetch-sponsor-icons.mjs: prefer apple-touch-icon → largest declared icon → /favicon.* →
// Google s2; VALIDATE it is a real image (reject HTML error pages); normalize to ≤128px PNG.
//
// GitHub-hosted plugins are skipped: their favicon is the shared GitHub octocat, which tells a
// reader nothing about the product — PluginIcon.astro renders a letter tile for those instead.
import { readFileSync, writeFileSync, readdirSync, mkdtempSync, rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const OUT = 'public/icons/plugins';
const UA = 'Mozilla/5.0 (compatible; grokbot.dev-iconbot/1.0)';

function frontmatter(file) {
  const raw = readFileSync(file, 'utf8');
  const end = raw.indexOf('\n---', 3);
  const yaml = raw.slice(3, end);
  const slug = (yaml.match(/^slug:\s*(.+)$/m) || [])[1]?.trim();
  const url = (yaml.match(/^project_url:\s*"?([^"\n]+)"?\s*$/m) || [])[1]?.trim();
  return { slug, url };
}

async function get(url, asBuffer = false) {
  const res = await fetch(url, { headers: { 'user-agent': UA }, redirect: 'follow', signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return asBuffer ? Buffer.from(await res.arrayBuffer()) : await res.text();
}

function inspect(buf) {
  const head = buf.subarray(0, 64).toString('latin1').toLowerCase();
  if (head.includes('<!doctype') || head.includes('<html')) return { ok: false };
  if (head.includes('<svg') || (head.includes('<?xml') && buf.toString('latin1', 0, 512).toLowerCase().includes('<svg'))) {
    return { ok: true, kind: 'svg' };
  }
  const tmp = mkdtempSync(join(tmpdir(), 'pico-')); const f = join(tmp, 'c'); writeFileSync(f, buf);
  try {
    const out = execFileSync('python3', ['-c', `from PIL import Image;im=Image.open('${f}');print(im.size[0],im.size[1])`], { encoding: 'utf8' }).trim();
    const [w, h] = out.split(' ').map(Number);
    return { ok: w >= 16 && h >= 16, kind: 'raster', w, h };
  } catch { return { ok: false }; } finally { rmSync(tmp, { recursive: true, force: true }); }
}

function normalizeToPng(buf, outPath) {
  const tmp = mkdtempSync(join(tmpdir(), 'pico-')); const src = join(tmp, 's'); writeFileSync(src, buf);
  const py = `
from PIL import Image
im = Image.open('${src}')
best = im
try:
    if getattr(im, 'n_frames', 1) > 1:
        big = None
        for i in range(im.n_frames):
            im.seek(i)
            if big is None or im.size[0] > big.size[0]: big = im.convert('RGBA')
        best = big
except Exception: pass
best = best.convert('RGBA')
if max(best.size) > 128: best.thumbnail((128,128), Image.LANCZOS)
best.save('${outPath}', 'PNG')`;
  try { execFileSync('python3', ['-c', py]); return true; } catch { return false; } finally { rmSync(tmp, { recursive: true, force: true }); }
}

const abs = (base, href) => { try { return new URL(href, base).toString(); } catch { return null; } };

async function candidates(siteUrl) {
  const out = []; const origin = new URL(siteUrl).origin;
  try {
    const html = await get(siteUrl);
    const scored = [];
    for (const tag of [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0])) {
      const rel = (tag.match(/rel=["']([^"']+)["']/i) || [])[1]?.toLowerCase() || '';
      if (!/icon/.test(rel)) continue;
      const href = (tag.match(/href=["']([^"']+)["']/i) || [])[1]; if (!href) continue;
      const dim = parseInt(((tag.match(/sizes=["']([^"']+)["']/i) || [])[1] || '').match(/(\d+)x\d+/)?.[1] || '0', 10);
      let s = dim; if (/apple-touch/.test(rel)) s += 1000; if (/\.svg(\?|$)/i.test(href)) s += 500;
      scored.push({ url: abs(siteUrl, href), s });
    }
    scored.sort((a, b) => b.s - a.s); out.push(...scored.map((x) => x.url).filter(Boolean));
  } catch { /* fall through */ }
  out.push(`${origin}/apple-touch-icon.png`, `${origin}/apple-touch-icon-precomposed.png`, `${origin}/favicon.svg`, `${origin}/favicon.png`, `${origin}/favicon.ico`, `https://www.google.com/s2/favicons?domain=${new URL(siteUrl).hostname}&sz=128`);
  return [...new Set(out)];
}

const report = [];
for (const file of readdirSync('content/plugins').filter((f) => f.endsWith('.md'))) {
  const { slug, url } = frontmatter(join('content/plugins', file));
  if (!slug || !url) { report.push(`${file}: no slug/url`); continue; }
  if (/github\.com/i.test(url)) { report.push(`${slug.padEnd(16)} SKIP (github → octocat; letter tile)`); continue; }
  // don't refetch if a good icon already exists
  const existing = existsSync(OUT) ? readdirSync(OUT).find((f) => f.replace(/\.[a-z]+$/, '') === slug) : null;
  let done = false;
  for (const cand of await candidates(url)) {
    try {
      const buf = await get(cand, true); const info = inspect(buf); if (!info.ok) continue;
      if (info.kind === 'svg') { writeFileSync(join(OUT, `${slug}.svg`), buf); report.push(`${slug.padEnd(16)} SVG   ${cand}`); }
      else { if (!normalizeToPng(buf, join(OUT, `${slug}.png`))) continue; report.push(`${slug.padEnd(16)} ${info.w}x${info.h}  ${cand}`); }
      done = true; break;
    } catch { /* next */ }
  }
  if (!done) report.push(`${slug.padEnd(16)} !! NONE${existing ? ' (kept existing ' + existing + ')' : ''}`);
}
console.log(report.join('\n'));
