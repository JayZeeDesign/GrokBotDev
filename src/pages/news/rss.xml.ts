// News lane feed.
import type { APIRoute } from 'astro';
import { allNews } from '../../lib/news';
import { rssFeed } from '../../lib/feed';

export const GET: APIRoute = async () =>
  rssFeed({
    title: 'grokbot.dev - news',
    description: 'Releases, deals, opportunities and platform updates for Grok Bot users.',
    path: '/news/rss.xml',
    docs: await allNews(),
  });
