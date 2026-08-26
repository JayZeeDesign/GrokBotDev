// §7.1.5 — the LEAN feed: the complete list of every included entry (all types), newest
// first, decision fields only (NO prompt, NO body). This is the recommended entry point for
// a bot that wants to "keep me informed": one small request holds everything, the bot ranks
// by awesome_score / filters by category, then fetches each item's `detail_url` (full record
// incl. prompt) only for what it actually surfaces. ~4x smaller than the full lists.
import type { APIRoute } from 'astro';
import { allCollections, allPlugins, allUseCases } from '../../../lib/entries';
import { apiSort, envelope, included, jsonResponse, toFeedItem } from '../../../lib/api';
import { allNews, toNewsFeedItem } from '../../../lib/news';

export const GET: APIRoute = async () => {
  const [plugins, useCases, collections, news] = await Promise.all([
    allPlugins(),
    allUseCases(),
    allCollections(),
    allNews(),
  ]);
  const all = apiSort(included([...plugins, ...useCases, ...collections]));
  const items = [...all.map(toFeedItem), ...news.map(toNewsFeedItem)].sort((a, b) => {
    const aDate = String(a.added_at ?? a.published_at ?? '');
    const bDate = String(b.added_at ?? b.published_at ?? '');
    if (aDate !== bDate) return aDate < bDate ? 1 : -1;
    return String(a.slug ?? '').localeCompare(String(b.slug ?? ''));
  });
  return jsonResponse(
    envelope(items, {
      // The whole set is here — no window, so no `truncated`. `newest_added_at` is the cursor
      // convenience: a poller keeps it and treats anything later as new next time.
      newest_added_at: items.length ? items[0].added_at : null,
      note: 'Lean feed. Fetch an item.detail_url for its full record incl. the prompt or news body.',
    })
  );
};
