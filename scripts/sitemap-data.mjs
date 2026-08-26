// §6.5 — the data the sitemap serialize()/filter() hooks need, computed from `content/`
// without booting Astro's content layer (the integration runs outside it).
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';

const DIRS = { plugin: 'content/plugins', 'use-case': 'content/use-cases', collection: 'content/collections', news: 'content/news' };
const LANE = { plugin: 'plugins', 'use-case': 'use-cases', collection: 'collections', news: 'news' };

function read(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((name) => {
      const raw = readFileSync(join(dir, name), 'utf8');
      const end = raw.indexOf('\n---', 3);
      return parseYaml(raw.slice(3, end)) ?? {};
    });
}

export function sitemapData() {
  const entries = [];
  for (const [type, dir] of Object.entries(DIRS)) {
    for (const data of read(dir)) entries.push({ type, ...data });
  }

  const lastmod = new Map();
  const noindex = new Set(['/search/', '/subscribed/']);

  for (const entry of entries) {
    const url = `/${LANE[entry.type]}/${entry.slug}/`;
    lastmod.set(url, entry.updated_at ?? entry.published_at);
    // Deprecated + demo entries are noindex (§5.6 rule 8, Addendum B4).
    if (entry.status === 'deprecated' || entry.status === 'demo' || entry.status === 'draft') noindex.add(url);
  }

  const liveNews = entries.filter((e) => e.type === 'news' && e.status === 'live');
  if (liveNews.length) lastmod.set('/news/', liveNews.map((e) => e.updated_at ?? e.published_at).sort().at(-1));

  // Hubs: plugins + use cases only (§6.2). Thin (<3) hubs are noindex,follow.
  const hubEntries = entries.filter(
    (e) => (e.type === 'plugin' || e.type === 'use-case') && e.status !== 'deprecated' && e.status !== 'demo'
  );
  const bucket = new Map();
  const push = (key, entry) => {
    const list = bucket.get(key) ?? [];
    list.push(entry);
    bucket.set(key, list);
  };
  const slugify = (v) => v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  // Seed EVERY hub URL first: a hub with zero entries is still built, and it is still thin
  // (§6.2). Without this, empty hubs never enter the bucket and slip into the sitemap.
  const categories = JSON.parse(readFileSync('src/data/categories.json', 'utf8'));
  const integrations = JSON.parse(readFileSync('src/data/integrations.json', 'utf8'));
  for (const category of categories) {
    bucket.set(`/categories/${category.slug}/`, []);
    for (const sub of category.subcategories) bucket.set(`/categories/${category.slug}/${sub.slug}/`, []);
  }
  for (const tool of integrations) bucket.set(`/integrations/${slugify(tool.canonical_name)}/`, []);

  for (const entry of hubEntries) {
    push(`/categories/${entry.category}/`, entry);
    push(`/categories/${entry.category}/${entry.subcategory}/`, entry);
    for (const tool of entry.works_with ?? entry.integrations ?? []) {
      push(`/integrations/${slugify(tool)}/`, entry);
    }
  }

  for (const [url, list] of bucket) {
    if (list.length) lastmod.set(url, list.map((e) => e.updated_at).sort().at(-1));
    if (list.length < 3) noindex.add(url);
  }

  return { lastmod, noindex, hubUrls: new Set(bucket.keys()) };
}
