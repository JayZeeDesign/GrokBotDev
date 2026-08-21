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
// `/theme-init.js` (F9) is the one hand-placed script on the site and the allowance is
// deliberately an EXACT path, not a prefix: it is the pre-paint theme setter, and it has to
// be a blocking classic script in <head> because an Astro-compiled module defers past first
// paint and reintroduces the flash. Still same-origin and still external, so §10.7's
// `script-src 'self'` is unchanged — this widens what the AUDIT accepts, never the CSP.
const ALLOWED_SRC_PREFIXES = ['/_astro/', '/pagefind/'];
const ALLOWED_SRC_EXACT = ['/theme-init.js'];
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
      const allowed =
        ALLOWED_SRC_PREFIXES.some((prefix) => src.startsWith(prefix)) ||
        ALLOWED_SRC_EXACT.includes(src);
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

// ── §10.7 header completeness (added at F5) ──────────────────────────────────────────────
// The scan above only sees BUILT HTML, which is the right scope for the no-inline-JS rule
// but is blind to the thing that actually permits a third-party script at runtime: the
// nginx CSP. That file shipped from M0 with 4 of its 7 headers missing — including the whole
// Content-Security-Policy — and nothing noticed for seven milestones, because no gate read
// deploy-time config. It does now.
//
// NOTE ON F5: this is NOT a loosening. `platform.twitter.com` / `syndication.twitter.com`
// were already in §10.7's table for the click-to-load model; F5 changed when the request
// fires, not which host makes it. The assertion below is what stops a future edit dropping
// them and breaking every embed in production only.
//
// NOTE ON F17: this one IS a loosening, deliberately — `www.youtube-nocookie.com` joins
// `frame-src`, the first new third-party origin since M0. Because it is deliberate, the
// guard gates it in BOTH directions: the host must be present in frame-src (or the build
// fails), and YouTube must be ABSENT from the script directives (or the build fails). A
// one-directional guard would have let the widening grow quietly afterwards, which is the
// usual way a narrow exception becomes a broad one.
const HEADERS_CONF = 'infra/security-headers.conf';
const REQUIRED_HEADERS = [
  'Strict-Transport-Security',
  'X-Content-Type-Options',
  'X-Frame-Options',
  'Referrer-Policy',
  'Permissions-Policy',
  'Cross-Origin-Opener-Policy',
  'Content-Security-Policy',
];
const REQUIRED_CSP_TOKENS = [
  "default-src 'self'",
  "'wasm-unsafe-eval'", // Pagefind — removing it kills search in production only
  'https://platform.twitter.com', // F5 embeds (script-src + frame-src)
  'https://syndication.twitter.com', // F5 embeds
  'https://plausible.io', // §9.7 Plausible (script + ingest)
  'https://www.youtube-nocookie.com', // F17 embeds (frame-src ONLY — see below)
  "object-src 'none'",
  "frame-ancestors 'none'",
];

if (!existsSync(HEADERS_CONF)) {
  violations.push(`${HEADERS_CONF} is missing — §10.7 has no header set to include`);
} else {
  // Directives only — the `#` prose in this file legitimately names `script-src` and
  // `'unsafe-inline'` in the same breath while explaining why they must never meet, and
  // matching against the comments made the guard fail on its own documentation.
  const conf = readFileSync(HEADERS_CONF, 'utf8')
    .split('\n')
    .filter((line) => !line.trimStart().startsWith('#'))
    .join('\n');
  const csp = conf.match(/add_header\s+Content-Security-Policy\s+"([^"]*)"/)?.[1] ?? '';

  const missingHeaders = REQUIRED_HEADERS.filter((h) => !conf.includes(`add_header ${h} `));
  const missingCsp = REQUIRED_CSP_TOKENS.filter((t) => !csp.includes(t));
  for (const h of missingHeaders) violations.push(`${HEADERS_CONF}: §10.7 header missing — ${h}`);
  for (const t of missingCsp) violations.push(`${HEADERS_CONF}: CSP is missing \`${t}\``);

  // Per-directive, not just "appears somewhere in the policy": an embed needs the host in
  // script-src-elem to fetch widgets.js AND in frame-src to render the iframe. Losing
  // either one breaks embeds in production only, which is the expensive way to find out.
  const directiveOf = (name) =>
    csp.split(';').map((d) => d.trim()).find((d) => d.split(/\s+/)[0] === name) ?? '';
  const perDirective = [
    ['script-src-elem', 'https://platform.twitter.com'],
    ['script-src-elem', 'https://syndication.twitter.com'],
    ['frame-src', 'https://platform.twitter.com'],
    ['script-src', "'wasm-unsafe-eval'"],
    ['connect-src', 'https://plausible.io'],
    ['script-src-elem', 'https://plausible.io'],
    // F17 — the YouTube host is gated exactly the way the twitter ones are: presence in the
    // policy is not enough, it has to be in the directive that actually does the work.
    ['frame-src', 'https://www.youtube-nocookie.com'],
  ];
  for (const [name, token] of perDirective) {
    if (!directiveOf(name).includes(token)) {
      violations.push(`${HEADERS_CONF}: CSP \`${name}\` is missing \`${token}\``);
    }
  }

  // ── F17 · THE OTHER HALF OF THE WIDENING ────────────────────────────────────────────
  // A guard that only checks a token is PRESENT can be satisfied by a policy that is far
  // too open. F17's whole claim is that it widened ONE directive by ONE token, so the
  // guard asserts the negative too — otherwise "we only added frame-src" is a comment, not
  // a fact, and the next person to want the IFrame Player API can add a script host with
  // nothing objecting.
  const FORBIDDEN = [
    // The IFrame Player API. Loading it would make YouTube a script origin, which is a
    // different and much larger permission than letting it render in a frame.
    ['script-src', 'youtube'],
    ['script-src-elem', 'youtube'],
    // The no-cookie host is the one the /about privacy copy (CP-125) names. Framing
    // plain youtube.com would make that copy false while every gate stayed green.
    ['frame-src', 'https://www.youtube.com'],
    ['frame-src', 'https://youtube.com'],
  ];
  for (const [name, token] of FORBIDDEN) {
    if (directiveOf(name).includes(token)) {
      violations.push(
        `${HEADERS_CONF}: CSP \`${name}\` contains \`${token}\` — F17 widened frame-src by exactly one token (www.youtube-nocookie.com). Loading YouTube script, or framing a host the /about privacy copy does not name, is a NEW decision: take it explicitly and amend §10.7 + CP-125 with it.`
      );
    }
  }

  // 'unsafe-inline' is legitimate in style-src and forbidden in script-src, so test the
  // script directives specifically rather than the policy as a whole.
  for (const directive of csp.split(';').map((d) => d.trim())) {
    if (/^script-src(-elem)?\b/.test(directive) && directive.includes("'unsafe-inline'")) {
      violations.push(
        `${HEADERS_CONF}: 'unsafe-inline' in ${directive.split(' ')[0]} — islands are bundled, never inline (§4.2)`
      );
    }
  }
  if (!missingHeaders.length && !missingCsp.length) {
    console.log(
      `audit-scripts: §10.7 headers complete (${REQUIRED_HEADERS.length}/${REQUIRED_HEADERS.length}) · CSP carries every required source`
    );
  }
}

if (violations.length) {
  console.error(`\naudit-scripts: ${violations.length} violation(s)`);
  for (const violation of violations) console.error(`  ${violation}`);
  process.exit(1);
}

console.log('audit-scripts: OK');
