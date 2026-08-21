// §6.7 — /llms.txt, the llmstxt.org-shaped index for agents (not a dump).
// The blockquote summary is CP-115 (FENCED) and is one of §6.11's four required
// money-phrase placements — `check-keyword-placements.mjs` greps for it.
// §3.2's repo layout puts this at src/pages/llms.txt.ts (an Astro endpoint); §6.7 calls it
// a postbuild script. §3.2 owns repo layout, so the endpoint form wins. See BUILD-NOTES.
import type { APIRoute } from 'astro';
import { allCollections, allPlugins, allUseCases, sortForIndex } from '../lib/entries';

const SITE = 'https://grokbot.dev';

export const GET: APIRoute = async () => {
  const [plugins, useCases, collections] = await Promise.all([
    allPlugins(),
    allUseCases(),
    allCollections(),
  ]);

  const list = (docs: Awaited<ReturnType<typeof allPlugins>>, dir: string, limit?: number) =>
    sortForIndex(docs)
      .slice(0, limit ?? docs.length)
      .map((doc) => `- [${doc.data.name}](${SITE}/${dir}/${doc.data.slug}/): ${doc.data.tagline}`)
      .join('\n');

  const body = `# grokbot.dev

> Open-source directory of ready-to-use Grok Bot prompts, plugins, and collections.
> Browse it, or point your own Grok Bot at the JSON API below and it pulls new
> entries on your schedule.

## Start here
- [Agent contract](${SITE}/agent/): copy-paste instructions for a Grok Bot to connect and sync
- [Latest entries JSON](${SITE}/api/v1/latest.json)
- [All plugins JSON](${SITE}/api/v1/plugins.json)
- [All use cases JSON](${SITE}/api/v1/use-cases.json)
- [RSS](${SITE}/rss.xml)

## Plugins
${list(plugins, 'plugins', 20)}

## Use cases
${list(useCases as never, 'use-cases', 20)}

## Collections
${list(collections as never, 'collections')}

## Optional
- [Full content export](${SITE}/llms-full.txt)
- [Contribute](${SITE}/contribute/)
- [About](${SITE}/about/)
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
