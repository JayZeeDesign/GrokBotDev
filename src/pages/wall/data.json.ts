import type { APIRoute } from 'astro';
import { allUseCases, urlOf, wallItems } from '../../lib/entries';
import type { UseCaseDoc } from '../../lib/entries';
import { youtubeEmbedUrl, youtubeWatchUrl } from '../../lib/sources';

// F12 — the paginated tail of the wall, for the infinite-scroll island.
//
// The first SSR_COUNT items are server-rendered into `/wall/` for SEO and for no-JS; this
// endpoint carries everything after them.
//
// F17 — items are now KIND-DISCRIMINATED (`x-post` | `youtube-video`), because YouTube source
// cards join the wall rather than getting a lane of their own. Two things here are deliberate:
//
//   1. EVERY DERIVED URL IS COMPUTED HERE, at build time — `embed_src` and `watch_url` come
//      from `lib/sources.js`, the same helpers the server-rendered cards use. The island never
//      assembles a YouTube URL from parts. That is not fussiness: `youtube-nocookie.com` is
//      the ONLY YouTube host in the §10.7 frame-src allowlist, so a second URL-builder
//      living in client JS is a second chance to frame `youtube.com` and be blocked by CSP in
//      production only — the expensive way to find out.
//   2. The items are DATA, not rendered HTML. The island renders them through a small template
//      that mirrors WallCard; the server-rendered cards remain the reference, and the shared
//      CSS classes mean a style change lands on both at once. (The earlier note here claimed
//      this endpoint shipped HTML — it never did; it shipped fields. Corrected at F17.)
//
// Every string below is our own build output, and the entry bodies were sanitised at build
// (§10.2 / §8.5 check 7) — the island still escapes on the way in.

export const SSR_COUNT = 12;
const PAGE_SIZE = 12;

export const GET: APIRoute = async () => {
  const items = wallItems((await allUseCases()) as UseCaseDoc[]);

  const tail = items.slice(SSR_COUNT).map(({ source, entry }) => {
    const shared = {
      kind: source.kind,
      url: source.url,
      entry_name: entry.data.name,
      entry_href: urlOf(entry),
      posted_at: source.postedAt ?? null,
    };

    if (source.kind === 'youtube-video') {
      return {
        ...shared,
        video_id: source.videoId,
        title: source.title,
        channel: source.channel,
        channel_url: source.channelUrl ?? null,
        timestamp: source.timestamp ?? null,
        start_seconds: source.startSeconds ?? null,
        embed_src: youtubeEmbedUrl(source.videoId, source.startSeconds),
        watch_url: youtubeWatchUrl(source.videoId, source.startSeconds),
      };
    }

    return {
      ...shared,
      author_handle: source.authorHandle,
      excerpt: source.excerpt,
      tweet_id: source.url.match(/status\/(\d+)/)?.[1] ?? '',
    };
  });

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
