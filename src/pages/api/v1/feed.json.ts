// §7.1.5 — the LEAN feed: the complete list of every included entry (all types), newest
// first, decision fields only (NO prompt, NO body). This is the recommended entry point for
// a bot that wants to "keep me informed": one small request holds everything, the bot ranks
// by awesome_score / filters by category, then fetches each item's `detail_url` (full record
// incl. prompt) only for what it actually surfaces. ~4x smaller than the full lists.
import type { APIRoute } from 'astro';
import { allCollections, allPlugins, allUseCases } from '../../../lib/entries';
import { apiSort, envelope, included, jsonResponse, toFeedItem } from '../../../lib/api';
import { allNews, toNewsFeedItem } from '../../../lib/news';
import { allTemplates, includedTemplates, toTemplateFeedItem } from '../../../lib/templates';

export const GET: APIRoute = async () => {
  const [plugins, useCases, collections, news, templates] = await Promise.all([
    allPlugins(),
    allUseCases(),
    allCollections(),
    allNews(),
    allTemplates(),
  ]);
  const all = apiSort(included([...plugins, ...useCases, ...collections]));
  // Templates join the SAME item contract (type/slug/url/detail_url/headline/summary/
  // categories/featured/source/added_at/updated_at) and add exactly two keys, share_url and
  // includes. `categories` carries their tag slugs, so a consumer's existing interest filter
  // keeps working untouched. Additive only - v1's promise holds.
  const items = [
    ...all.map(toFeedItem),
    ...news.map(toNewsFeedItem),
    ...includedTemplates(templates).map(toTemplateFeedItem),
  ].sort((a, b) => {
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
      note: "Lean feed. Fetch an item.detail_url for its full record incl. the prompt or news body. Items with type 'template' are shareable Grok Bot setups - they carry share_url (the Add to Grok Bot link) instead of a prompt.",
    })
  );
};
