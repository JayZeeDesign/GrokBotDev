import type { APIRoute } from 'astro';
import { allUseCases, sortForLatest, urlOf } from '../../lib/entries';
import type { UseCaseDoc } from '../../lib/entries';

// F12 — the paginated tail of the wall, for the infinite-scroll island.
//
// The first SSR_COUNT items are server-rendered into `/wall/` for SEO and for no-JS; this
// endpoint carries everything after them. It ships RENDERED HTML rather than raw fields on
// purpose: WallCard stays the single source of truth for the markup, so the appended cards
// cannot drift from the server-rendered ones. Re-implementing the card in the island would
// have been a second copy of the same component, guaranteed to rot.
//
// The HTML is our own build output — never contributor input — and the entry bodies were
// already sanitised at build (§10.2 / §8.5 check 7), so `insertAdjacentHTML` on the client
// is not a sink for untrusted content.

export const SSR_COUNT = 12;
const PAGE_SIZE = 12;

export const GET: APIRoute = async () => {
  const useCases = sortForLatest(await allUseCases()) as UseCaseDoc[];
  const items = useCases.flatMap((entry) =>
    entry.data.source_tweets.map((tweet) => ({ tweet, entry }))
  );

  // Data only — the island renders it through the same markup shape as WallCard.
  const tail = items.slice(SSR_COUNT).map((item) => ({
    url: item.tweet.url,
    authorHandle: item.tweet.author_handle,
    excerpt: item.tweet.excerpt,
    postedAt: item.tweet.posted_at ?? null,
    entryName: item.entry.data.name,
    entryHref: urlOf(item.entry),
    tweetId: item.tweet.url.match(/status\/(\d+)/)?.[1] ?? '',
  }));

  const pages: (typeof tail)[] = [];
  for (let i = 0; i < tail.length; i += PAGE_SIZE) pages.push(tail.slice(i, i + PAGE_SIZE));

  return new Response(
    JSON.stringify({
      generated_at: new Date().toISOString(),
      ssr_count: SSR_COUNT,
      page_size: PAGE_SIZE,
      total: items.length,
      remaining: tail.length,
      pages,
    }),
    { headers: { 'content-type': 'application/json; charset=utf-8' } }
  );
};
