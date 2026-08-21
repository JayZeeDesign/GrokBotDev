// §9.2 — POST /api/waitlist. Store-only capture: no mail is sent, so this can never act as
// a subscription-bombing relay (§9.6 precondition).
//
// Accepts application/json (the JS fetch path) and application/x-www-form-urlencoded (the
// no-JS native form post). The response SHAPE is chosen by request Content-Type: JSON gets
// JSON, a form post gets a 303 to the static /subscribed/ page (§9.2a) — the static site
// cannot read a query param at build time, so the no-JS path needs a real page.
import { createHash } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import Database from 'better-sqlite3';

const DB_PATH = process.env.WAITLIST_DB_PATH ?? '/opt/data/grokbot/waitlist.sqlite';
const IP_SALT = process.env.WAITLIST_IP_SALT ?? '';
const RATE_MAX = Number(process.env.WAITLIST_RATE_LIMIT_MAX ?? 5);
const RATE_WINDOW_S = Number(process.env.WAITLIST_RATE_LIMIT_WINDOW_S ?? 3600);
const CORS_ORIGIN = process.env.CORS_ALLOWED_ORIGIN ?? 'https://grokbot.dev';
const BODY_LIMIT = 4096;

// Resend Audiences (operator, direct round). The API key is SERVER-SIDE ONLY — it never
// reaches the browser; the form posts here and only this process talks to Resend. If the key
// is unset (local dev), the push is a no-op and SQLite is still the record. `source` maps to
// an audience: the landing's `get-notified` list vs the live-site newsletter list.
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? '';
const RESEND_AUDIENCE_BY_SOURCE = {
  'get-notified': process.env.RESEND_AUDIENCE_GET_NOTIFIED ?? '',
};
const RESEND_AUDIENCE_DEFAULT = process.env.RESEND_AUDIENCE_NEWSLETTER ?? '';
const audienceFor = (source) => RESEND_AUDIENCE_BY_SOURCE[source] || RESEND_AUDIENCE_DEFAULT;

// Confirmation email (operator). Sent server-side via Resend from the verified domain, ONCE
// per genuinely-new signup, best-effort. The endpoint's honeypot + per-IP rate limit + dedup
// keep it from becoming a subscription-bombing relay: an abuser is capped at the rate limit
// and a re-submit of a known email sends nothing (info.changes === 0).
const RESEND_FROM = process.env.RESEND_FROM ?? 'grokbot.dev <noreply@grokbot.dev>';
const CONFIRMATIONS = {
  'get-notified': {
    subject: "you're on the list — grokbot.dev",
    text:
      "Thanks for signing up.\n\n" +
      "grokbot.dev is launching soon — everything your Grok Bot could be doing: awesome use cases " +
      "and the best plugins, delivered straight to your bot.\n\n" +
      "We'll email you once, the day it goes live. That's the only thing you'll get from this list.\n\n" +
      "— grokbot.dev",
  },
  default: {
    subject: "you're subscribed — grokbot.dev",
    text:
      "You're on the list.\n\n" +
      "Once a week we'll send the best new plugins, use cases and collections for Grok Bot — " +
      "one email, no spam.\n\n" +
      "— grokbot.dev",
  },
};
const confirmationFor = (source) => CONFIRMATIONS[source] || CONFIRMATIONS.default;

async function sendConfirmation(email, source) {
  if (!RESEND_API_KEY) return;
  const c = confirmationFor(source);
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: RESEND_FROM, to: [email], subject: c.subject, text: c.text }),
    });
    if (!r.ok) {
      const t = await r.text().catch(() => '');
      console.error('resend: confirmation send failed', r.status, t.slice(0, 200));
    }
  } catch (error) {
    console.error('resend: confirmation send error', error.message);
  }
}

/**
 * Best-effort push of one contact into the mapped Resend audience. Fired only on a genuinely
 * NEW insert (dedup already handled by SQLite), never awaited by the request path — a Resend
 * outage must not fail or slow a signup, because SQLite already holds the record and a
 * reconcile job can replay it. Adding an existing contact is idempotent on Resend's side.
 */
async function pushToResend(email, source) {
  if (!RESEND_API_KEY) return;
  const audienceId = audienceFor(source);
  if (!audienceId) return;
  try {
    const r = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, unsubscribed: false }),
    });
    if (!r.ok) {
      const t = await r.text().catch(() => '');
      console.error('resend: contact push failed', r.status, t.slice(0, 200));
    }
  } catch (error) {
    console.error('resend: contact push error', error.message);
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SOURCE_RE = /^[a-z0-9_/-]{1,64}$/;

let db;
function database() {
  if (db) return db;
  mkdirSync(dirname(DB_PATH), { recursive: true });
  db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.exec(`
    CREATE TABLE IF NOT EXISTS waitlist (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      email      TEXT NOT NULL UNIQUE,
      source     TEXT NOT NULL DEFAULT 'unknown',
      ip_hash    TEXT,
      user_agent TEXT,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now'))
    );
    CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);
  `);
  return db;
}

/**
 * §9.3 — the client IP is whatever nginx resolved from Cloudflare into CF-Connecting-IP.
 * A client-supplied header is discarded at the proxy; if the header is absent we fall back
 * to the socket address ONLY. There is no path by which a client chooses its own IP.
 */
function clientIp(req) {
  return req.headers['cf-connecting-ip'] || req.socket.remoteAddress || 'unknown';
}

const hashIp = (ip) => (IP_SALT ? createHash('sha256').update(ip + IP_SALT).digest('hex') : null);

const buckets = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const window = RATE_WINDOW_S * 1000;
  const bucket = (buckets.get(ip) ?? []).filter((t) => now - t < window);
  bucket.push(now);
  buckets.set(ip, bucket);
  return bucket.length > RATE_MAX;
}

export const corsHeaders = {
  'Access-Control-Allow-Origin': CORS_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

const json = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders });
  res.end(JSON.stringify(body));
};
const redirect = (res, location) => {
  res.writeHead(303, { Location: location, ...corsHeaders });
  res.end();
};

function parseBody(raw, contentType) {
  if (contentType.includes('application/json')) return JSON.parse(raw);
  if (contentType.includes('application/x-www-form-urlencoded')) {
    return Object.fromEntries(new URLSearchParams(raw));
  }
  throw new Error('unsupported content type');
}

export function handleWaitlist(req, res) {
  const contentType = (req.headers['content-type'] ?? '').toLowerCase();
  const isForm = contentType.includes('application/x-www-form-urlencoded');

  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    return res.end();
  }
  if (req.method !== 'POST') {
    return json(res, 405, { ok: false, error: 'method_not_allowed' });
  }

  let raw = '';
  let tooLarge = false;
  req.on('data', (chunk) => {
    raw += chunk;
    if (raw.length > BODY_LIMIT) {
      tooLarge = true;
      req.destroy();
    }
  });

  req.on('end', () => {
    if (tooLarge) return json(res, 400, { ok: false, error: 'bad_request' });

    let body;
    try {
      body = parseBody(raw, contentType);
    } catch {
      return isForm
        ? redirect(res, '/subscribed/?subscribed=0')
        : json(res, 400, { ok: false, error: 'bad_request' });
    }

    const ip = clientIp(req);
    if (rateLimited(ip)) {
      return isForm
        ? redirect(res, '/subscribed/?subscribed=0&reason=rate_limited')
        : json(res, 429, { ok: false, error: 'rate_limited' });
    }

    // §9.4 honeypot: any non-empty value is a silent accept — nothing is stored, and the
    // response is byte-identical to a real one so a bot learns nothing.
    if (String(body.website ?? '').trim() !== '') {
      return isForm ? redirect(res, '/subscribed/?subscribed=1') : json(res, 200, { ok: true });
    }

    const email = String(body.email ?? '').trim().toLowerCase();
    if (email.length < 6 || email.length > 254 || !EMAIL_RE.test(email)) {
      return isForm
        ? redirect(res, '/subscribed/?subscribed=0')
        : json(res, 400, { ok: false, error: 'invalid_email' });
    }

    const rawSource = String(body.source ?? '');
    const source = SOURCE_RE.test(rawSource) ? rawSource : 'unknown';
    const userAgent = String(req.headers['user-agent'] ?? '').slice(0, 256);

    let info;
    try {
      // INSERT OR IGNORE keyed on email: a duplicate is indistinguishable from a new
      // signup in the response, so the endpoint is not an email-enumeration oracle.
      info = database()
        .prepare(
          'INSERT OR IGNORE INTO waitlist (email, source, ip_hash, user_agent) VALUES (?, ?, ?, ?)'
        )
        .run(email, source, hashIp(ip), userAgent);
    } catch (error) {
      console.error('waitlist: insert failed', error.message);
      return isForm
        ? redirect(res, '/subscribed/?subscribed=0')
        : json(res, 500, { ok: false, error: 'server_error' });
    }

    // Only a genuinely new row pushes to Resend + sends the confirmation — a re-submit of an
    // existing email changes nothing (info.changes === 0) and must not re-hit the API or mail
    // the person again. Fire-and-forget: neither can fail or slow the signup response.
    if (info.changes === 1) {
      void pushToResend(email, source);
      void sendConfirmation(email, source);
    }

    return isForm ? redirect(res, '/subscribed/?subscribed=1') : json(res, 200, { ok: true });
  });
}
