// §6.7 — /llms.txt, the llmstxt.org-shaped index for agents (not a dump).
// The blockquote summary is CP-115 (FENCED) and is one of §6.11's four required
// money-phrase placements — `check-keyword-placements.mjs` greps for it.
// §3.2's repo layout puts this at src/pages/llms.txt.ts (an Astro endpoint); §6.7 calls it
// a postbuild script. §3.2 owns repo layout, so the endpoint form wins. See BUILD-NOTES.
import type { APIRoute } from 'astro';
import { allCollections, allPlugins, allUseCases, sortForIndex } from '../lib/entries';
import { allNews } from '../lib/news';

const SITE = 'https://grokbot.dev';

export const GET: APIRoute = async () => {
  const [plugins, useCases, collections, news] = await Promise.all([
    allPlugins(),
    allUseCases(),
    allCollections(),
    allNews(),
  ]);

  const list = (docs: Awaited<ReturnType<typeof allPlugins>>, dir: string, limit?: number) =>
    sortForIndex(docs)
      .slice(0, limit ?? docs.length)
      .map((doc) => `- [${doc.data.name}](${SITE}/${dir}/${doc.data.slug}/): ${doc.data.tagline}`)
      .join('\n');
  const newsList = news
    .slice(0, 20)
    .map((doc) => `- [${doc.data.title}](${SITE}/news/${doc.data.slug}/): ${doc.data.summary}`)
    .join('\n');

  const body = `# grokbot.dev

> Open-source directory of ready-to-use Grok Bot prompts, plugins, collections, and news.
> Browse it, or point your own Grok Bot at the JSON API below and it pulls new
> entries on your schedule.

## Start here
- [Agent contract](${SITE}/agent/): copy-paste instructions for a Grok Bot to connect and sync
- [Feed JSON](${SITE}/api/v1/feed.json): RECOMMENDED - the complete lean list (plugins, use cases, collections, and news), newest first. News items have type "news" plus kind, important, and external_url.
- [News JSON](${SITE}/api/v1/news.json): releases, deals, updates, and announcements. Full item at /api/v1/news/<slug>.json.
- [Status JSON](${SITE}/api/v1/status.json): API version, capabilities, notices, deprecations, changelog. Poll it to learn if the API changed; v1 is additive-only and every response carries a schema_revision.
- [Per-entry detail](${SITE}/api/v1/use-cases/<slug>.json): full record for one entry (also /api/v1/plugins/<slug>.json)
- [Latest JSON](${SITE}/api/v1/latest.json): 50 newest, full records
- [RSS](${SITE}/rss.xml)

## Plugins
${list(plugins, 'plugins', 20)}

## Use cases
${list(useCases as never, 'use-cases', 20)}

## News
${newsList}

## Collections
${list(collections as never, 'collections')}

## Optional
- [Full content export](${SITE}/llms-full.txt)
- [Contribute](${SITE}/contribute/)
- [About](${SITE}/about/)
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
