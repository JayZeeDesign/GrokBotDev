// §7.4 — the MCP server: Streamable HTTP, no auth in v1.
// Tools: search_directory · whats_new · get_entry · list_collections. Each declares an
// inputSchema AND an outputSchema, and every result carries `structuredContent` alongside
// the text content block so a client can consume it without parsing prose.
//
// The server is a READER of the built static API (§12.7: the engine gets no privileged
// path). It reads dist/api/v1/*.json with a 60s in-process cache and never touches the
// filesystem outside DIST_DIR — filenames come from a fixed allow-list, so no traversal is
// possible even if a tool argument is hostile.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST_DIR = process.env.DIST_DIR ?? 'dist';
const CACHE_MS = 60_000;
const ENDPOINTS = ['index', 'latest', 'plugins', 'use-cases', 'collections', 'categories', 'integrations'];
const cache = new Map();

async function readEndpoint(name) {
  if (!ENDPOINTS.includes(name)) throw new Error(`unknown endpoint: ${name}`);
  const hit = cache.get(name);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.value;
  const value = JSON.parse(await readFile(join(DIST_DIR, 'api', 'v1', `${name}.json`), 'utf8'));
  cache.set(name, { at: Date.now(), value });
  return value;
}

const MAX_RESULTS = 20;

const ENTRY_SUMMARY = {
  type: 'object',
  properties: {
    type: { type: 'string' },
    slug: { type: 'string' },
    name: { type: 'string' },
    tagline: { type: 'string' },
    url: { type: 'string' },
    category: { type: 'string' },
    status: { type: 'string' },
    added_at: { type: 'string' },
    updated_at: { type: 'string' },
  },
  required: ['type', 'slug', 'name', 'url'],
};

const RESULT_LIST = {
  type: 'object',
  properties: {
    count: { type: 'integer' },
    truncated: { type: 'boolean', description: 'true when more matches existed than were returned' },
    items: { type: 'array', items: ENTRY_SUMMARY },
  },
  required: ['count', 'truncated', 'items'],
};

export const TOOLS = [
  {
    name: 'search_directory',
    description:
      'Search grokbot.dev plugins, use cases and collections by free text, type, category or integration.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'free text matched against name, tagline and category' },
        type: { type: 'string', enum: ['plugin', 'use-case', 'collection'] },
        category: { type: 'string' },
        integration: { type: 'string', description: 'integration slug, e.g. "github"' },
        limit: { type: 'integer', minimum: 1, maximum: MAX_RESULTS, default: 10 },
      },
    },
    outputSchema: RESULT_LIST,
  },
  {
    name: 'whats_new',
    description: 'The newest entries across all types, newest first. Mirrors /api/v1/latest.json.',
    inputSchema: {
      type: 'object',
      properties: {
        since: { type: 'string', description: 'ISO 8601 UTC; only entries with a later added_at' },
        limit: { type: 'integer', minimum: 1, maximum: MAX_RESULTS, default: 10 },
      },
    },
    outputSchema: RESULT_LIST,
  },
  {
    name: 'get_entry',
    description: 'One entry in full, including its prompt text, by slug.',
    inputSchema: {
      type: 'object',
      properties: { slug: { type: 'string' } },
      required: ['slug'],
    },
    outputSchema: {
      type: 'object',
      properties: { found: { type: 'boolean' }, entry: { type: ['object', 'null'] } },
      required: ['found'],
    },
  },
  {
    name: 'list_collections',
    description: 'All collections with their resolved members.',
    inputSchema: {
      type: 'object',
      properties: { limit: { type: 'integer', minimum: 1, maximum: MAX_RESULTS, default: 10 } },
    },
    outputSchema: RESULT_LIST,
  },
];

const summarise = (item) => ({
  type: item.type,
  slug: item.slug,
  name: item.name,
  tagline: item.tagline,
  url: item.url,
  category: item.category,
  status: item.status,
  added_at: item.added_at,
  updated_at: item.updated_at,
});

async function allEntries() {
  const [plugins, useCases, collections] = await Promise.all([
    readEndpoint('plugins'),
    readEndpoint('use-cases'),
    readEndpoint('collections'),
  ]);
  return [...plugins.items, ...useCases.items, ...collections.items];
}

function listResult(matched, limit) {
  const capped = Math.min(limit ?? 10, MAX_RESULTS);
  const items = matched.slice(0, capped).map(summarise);
  return { count: items.length, truncated: matched.length > items.length, items };
}

export async function callTool(name, args = {}) {
  if (name === 'search_directory') {
    const query = String(args.query ?? '').toLowerCase();
    let matched = await allEntries();
    if (args.type) matched = matched.filter((i) => i.type === args.type);
    if (args.category) matched = matched.filter((i) => i.category === args.category);
    if (args.integration) {
      matched = matched.filter((i) => (i.integrations ?? []).some((t) => t.slug === args.integration));
    }
    if (query) {
      matched = matched.filter((i) =>
        `${i.name} ${i.tagline} ${i.category} ${i.subcategory}`.toLowerCase().includes(query)
      );
    }
    return listResult(matched, args.limit);
  }

  if (name === 'whats_new') {
    const latest = await readEndpoint('latest');
    let items = latest.items;
    if (args.since) items = items.filter((i) => i.added_at > args.since);
    return listResult(items, args.limit);
  }

  if (name === 'get_entry') {
    const entry = (await allEntries()).find((i) => i.slug === args.slug);
    return { found: Boolean(entry), entry: entry ?? null };
  }

  if (name === 'list_collections') {
    const collections = await readEndpoint('collections');
    return listResult(collections.items, args.limit);
  }

  throw new Error(`unknown tool: ${name}`);
}

export { readEndpoint };
