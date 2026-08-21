// §7.2 — the use-cases lane feed.
import type { APIRoute } from 'astro';
import { allUseCases } from '../../lib/entries';
import { rssFeed } from '../../lib/feed';

export const GET: APIRoute = async () =>
  rssFeed({
    title: 'grokbot.dev — awesome use cases',
    description: 'Real things people got their Grok Bot to do, newest first.',
    path: '/use-cases/rss.xml',
    docs: await allUseCases(),
  });
