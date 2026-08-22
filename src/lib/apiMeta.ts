// §7.1.6 — the API's self-description. One place defines "what state is v1 in", consumed by
// /api/v1/status.json AND stamped into every envelope (schema_revision) so a bot can detect a
// change from any response. This is how a bot already polling us learns the API evolved
// (e.g. pagination arrived) WITHOUT breaking.

export const API_VERSION = 'v1';

// Bump the DATE whenever the response shape changes in any way (always additively — see
// STABILITY). A bot keeps the last value it saw; a newer one means "re-read status.json".
export const SCHEMA_REVISION = '2026-08-23';

// Feature flags a bot can branch on instead of hard-coding assumptions. When pagination
// ships, `pagination` flips to true and the feed starts returning a `next` cursor — a bot
// that already follows `next` when present (see the routine prompt) adapts with no change.
export const CAPABILITIES = {
  feed: true, // /api/v1/feed.json — complete lean list
  detail_endpoints: true, // /api/v1/{use-cases,plugins,collections}/<slug>.json
  cursor_field: 'added_at', // sort + incremental cursor across list endpoints
  pagination: false, // when true, list endpoints return a `next` cursor to follow
  rss: true,
  mcp: true,
};

// The promise a consumer can rely on. Kept short and machine-readable-ish on purpose.
export const STABILITY =
  'v1 is additive-only: new fields and endpoints may appear, but existing fields are never ' +
  'removed, renamed, or repurposed within v1. Consumers MUST ignore fields they do not ' +
  'recognize, and SHOULD follow a `next` cursor if a response includes one (that is how ' +
  'pagination will arrive). Any breaking change ships at /api/v2/ and is announced here as a ' +
  'deprecation with a sunset date at least 90 days out before v1 changes behavior.';

// ANNOUNCEMENTS — the broadcast channel to every bot that syncs with us. A bot reads
// status.json at the start of each run and surfaces active notices to its human (news,
// what's new, and promos). Keep the array empty when there's nothing to say. To announce
// something, add one object and rebuild; to end it, remove it or set expires_at in the past.
//
//   level:      'info' (news / what's new) · 'warn' (heads-up) · 'promo' (offer / campaign)
//   id:         stable, unique — a bot shows a given id only once, so never reuse an id
//   title:      short headline the bot leads with
//   message:    one or two sentences
//   date:       ISO date the notice went up
//   action_url / action_label:  optional CTA (e.g. a landing page + "Claim it")
//   expires_at: optional ISO — the endpoint drops it after this, and bots skip expired ones
//
// Example (do NOT ship a fake one — this is documentation):
//   { id: 'launch-2026', level: 'info', title: 'grokbot.dev is live',
//     message: '100+ curated Grok Bot use cases and 18 plugins, updated constantly.',
//     date: '2026-08-23' }
export const NOTICES: Array<{
  id: string;
  level: 'info' | 'warn' | 'promo';
  title: string;
  message: string;
  date: string;
  action_url?: string;
  action_label?: string;
  expires_at?: string;
}> = [];

// Endpoints on a sunset path (empty now). Shape:
// { endpoint, since, sunset, replacement }.
export const DEPRECATIONS: Array<{
  endpoint: string;
  since: string;
  sunset: string;
  replacement: string;
}> = [];

// Human + machine readable history, newest first. A bot can diff this against what it saw.
export const CHANGELOG = [
  {
    date: '2026-08-23',
    change:
      'Announcements: status.json `notices` gained title / action_label / expires_at and a ' +
      '`promo` level, and the endpoint now drops expired notices. A bot that syncs should read ' +
      'status.json first each run and surface active notices to its human.',
  },
  {
    date: '2026-08-22',
    change:
      'Added feed.json (complete lean list) and per-entry detail endpoints ' +
      '(/api/v1/{use-cases,plugins,collections}/<slug>.json, linked as each item’s detail_url). ' +
      'feed.json is now the recommended entry point.',
  },
  {
    date: '2026-07-01',
    change:
      'v1 launched: index, latest, plugins, use-cases, collections, categories, integrations, ' +
      'plus RSS and the MCP host.',
  },
];
