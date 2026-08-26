// §7.2 — the all-types feed.
import type { APIRoute } from 'astro';
import { allListable } from '../lib/entries';
import { allNews } from '../lib/news';
import { rssFeed } from '../lib/feed';

export const GET: APIRoute = async () =>
  rssFeed({
    title: 'grokbot.dev',
    description: 'Ready-to-use Grok Bot prompts, plugins, collections and news - everything, newest first.',
    path: '/rss.xml',
    docs: [...(await allListable()), ...(await allNews())],
  });
