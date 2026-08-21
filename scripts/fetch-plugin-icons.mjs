#!/usr/bin/env node
// F11 — BUILD-PREP (manual, not part of `npm run build`).
//
// Fetches each live plugin's site favicon ONCE and commits a local static copy to
// `public/icons/plugins/<slug>.png`. Deliberately NOT a runtime lookup:
//   · a third-party favicon service (Google s2, DuckDuckGo, etc.) would leak every visitor's
//     browsing of our directory to that service, and would need a new `img-src` host in the
//     §10.7 CSP. Neither is acceptable for a privacy line we just tightened at F5.
//   · fetching at page-build time would make the build depend on 5+ third-party hosts being
//     up, which is a bad trade for an icon.
// So: run this by hand when plugins are added, eyeball the results, commit the files.
//
//   node scripts/fetch-plugin-icons.mjs            # fetch missing only
//   node scripts/fetch-plugin-icons.mjs --force    # re-fetch everything
//
// No new dependencies: `fetch` is built in, and the only decoding we do is checking magic
// bytes. Anything that is not a plausible raster icon is REJECTED rather than committed —
// a broken 0-byte or HTML-error-page "icon" is worse than the letter-tile fallback.

import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const CONTENT = 'content/plugins';
const OUT_DIR = 'public/icons/plugins';
const FORCE = process.argv.includes('--force');
const TIMEOUT_MS = 8000;
const MIN_BYTES = 100; // below this it is an error page or a 1px tracker, not an icon

mkdirSync(OUT_DIR, { recursive: true });

/** Read `slug` + `project_url` straight out of the frontmatter — no YAML parser needed. */
function plugins() {
  return readdirSync(CONTENT)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const src = readFileSync(join(CONTENT, f), 'utf8');
      const slug = src.match(/^slug:\s*"?([^"\n]+)"?/m)?.[1]?.trim();
      const url = src.match(/^project_url:\s*"?([^"\n]+)"?/m)?.[1]?.trim();
      const name = src.match(/^name:\s*"?([^"\n]+)"?/m)?.[1]?.trim();
      return { slug, url, name };
    })
    .filter((p) => p.slug && p.url);
}

/** PNG / ICO / JPEG / GIF / WEBP / SVG by magic bytes. */
function kindOf(buf) {
  if (buf.length < 8) return null;
  const b = [...buf.subarray(0, 12)];
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return 'png';
  if (b[0] === 0x00 && b[1] === 0x00 && b[2] === 0x01 && b[3] === 0x00) return 'ico';
  if (b[0] === 0xff && b[1] === 0xd8) return 'jpg';
  if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46) return 'gif';
  if (b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50) return 'webp';
  const head = buf.subarray(0, 200).toString('utf8').trimStart().toLowerCase();
  if (head.startsWith('<svg') || head.includes('<svg')) return 'svg';
  return null;
}

async function get(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: 'follow',
      headers: { 'user-agent': 'grokbot.dev icon fetch (one-off build prep)' },
    });
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** Prefer a declared <link rel="icon">, fall back to /favicon.ico at the origin. */
async function candidates(pageUrl) {
  const origin = new URL(pageUrl).origin;
  const out = [];
  const html = await get(pageUrl);
  if (html) {
    const text = html.toString('utf8');
    for (const m of text.matchAll(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi)) {
      const href = m[0].match(/href=["']([^"']+)["']/i)?.[1];
      if (href) out.push(new URL(href, pageUrl).href);
    }
    const apple = text.match(/<link[^>]+rel=["']apple-touch-icon["'][^>]*href=["']([^"']+)["']/i)?.[1];
    if (apple) out.unshift(new URL(apple, pageUrl).href);
  }
  out.push(`${origin}/favicon.ico`, `${origin}/favicon.png`);
  // A `-dark` / `dark-` variant is drawn FOR a dark background and disappears on ours
  // (the site defaults to light). Sink those to the back rather than dropping them.
  const isDark = (u) => /(^|[-_/])dark([-_.]|$)/i.test(new URL(u).pathname);
  const uniq = [...new Set(out)];
  return [...uniq.filter((u) => !isDark(u)), ...uniq.filter(isDark)];
}

const rows = [];
for (const { slug, url, name } of plugins()) {
  const existing = readdirSync(OUT_DIR).find((f) => f.startsWith(`${slug}.`));
  if (existing && !FORCE) {
    rows.push([slug, 'kept', `${existing} (${statSync(join(OUT_DIR, existing)).size}B)`]);
    continue;
  }

  let saved = null;
  for (const candidate of await candidates(url)) {
    const buf = await get(candidate);
    if (!buf || buf.length < MIN_BYTES) continue;
    const kind = kindOf(buf);
    if (!kind) continue;
    writeFileSync(join(OUT_DIR, `${slug}.${kind}`), buf);
    saved = `${slug}.${kind} (${buf.length}B) ← ${candidate}`;
    break;
  }
  rows.push([slug, saved ? 'saved' : 'NONE → letter-tile', saved ?? `no usable icon at ${url}`]);
}

// A GENERIC HOST ICON is worse than no icon. Three GitHub-hosted plugins all resolved to
// github.com/fluidicon.png — the octocat — which tells a reader nothing and makes a product
// directory look broken. (The Grok Bot plugins modal has the same problem and solves it the
// same way: letter tiles.) Detected structurally rather than by hardcoding hosts: if two or
// more plugins fetched BYTE-IDENTICAL icons, that file belongs to the HOST, not to any
// product. Drop them and let the letter tile do the work.
const byHash = new Map();
for (const file of readdirSync(OUT_DIR)) {
  const hash = createHash('sha256').update(readFileSync(join(OUT_DIR, file))).digest('hex');
  byHash.set(hash, [...(byHash.get(hash) ?? []), file]);
}
for (const [, files] of byHash) {
  if (files.length < 2) continue;
  for (const file of files) {
    unlinkSync(join(OUT_DIR, file));
    const slug = file.replace(/\.[a-z]+$/, '');
    const row = rows.find((r) => r[0] === slug);
    if (row) {
      row[1] = 'GENERIC -> letter-tile';
      row[2] = `byte-identical to ${files.length - 1} other plugin(s) — host default, not a product mark`;
    }
  }
}

const pad = Math.max(...rows.map((r) => r[0].length));
for (const [slug, status, detail] of rows) {
  console.log(`  ${slug.padEnd(pad)}  ${status.padEnd(18)}  ${detail}`);
}
console.log(
  `\nfetch-plugin-icons: ${rows.filter((r) => r[1] === 'saved' || r[1] === 'kept').length}/${rows.length} have a local icon; ${rows.filter((r) => r[1].includes('letter-tile')).length} fall back to the letter tile.`
);
