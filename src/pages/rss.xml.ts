// §7.2 — the all-types feed.
import type { APIRoute } from 'astro';
import { allListable } from '../lib/entries';
import { rssFeed } from '../lib/feed';

export const GET: APIRoute = async () =>
  rssFeed({
    title: 'grokbot.dev',
    description: 'Ready-to-use Grok Bot prompts, plugins and collections — everything, newest first.',
    path: '/rss.xml',
    docs: await allListable(),
  });
