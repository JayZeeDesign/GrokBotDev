// §7.2 — the plugins lane feed.
import type { APIRoute } from 'astro';
import { allPlugins } from '../../lib/entries';
import { rssFeed } from '../../lib/feed';

export const GET: APIRoute = async () =>
  rssFeed({
    title: 'grokbot.dev — plugins',
    description: 'Every plugin people have built for Grok Bot, newest first.',
    path: '/plugins/rss.xml',
    docs: await allPlugins(),
  });
