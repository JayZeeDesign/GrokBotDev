// §7.1.2 — the 50 newest included entries across all types, `added_at` desc / slug asc.
// Adds two top-level keys beside the envelope: `truncated` (true when more than 50 included
// entries exist, i.e. the window was cut) and `oldest_added_at` (the added_at of the last
// item). Together they let a poller detect a missed window and fall back to the full lists.
import type { APIRoute } from 'astro';
import { allCollections, allPlugins, allUseCases } from '../../../lib/entries';
import { allTemplates } from '../../../lib/templates';
import { apiSort, envelope, included, jsonResponse, resolveMembers, toApiItem } from '../../../lib/api';

const WINDOW = 50;

export const GET: APIRoute = async () => {
  const [plugins, useCases, collections, templates] = await Promise.all([
    allPlugins(),
    allUseCases(),
    allCollections(),
    allTemplates(),
  ]);
  const pool = [...plugins, ...useCases];
  const all = apiSort(included([...plugins, ...useCases, ...collections]));
  const window = all.slice(0, WINDOW);
  const items = window.map((doc) => resolveMembers(toApiItem(doc), pool, templates));

  return jsonResponse(
    envelope(items, {
      truncated: all.length > WINDOW,
      oldest_added_at: window.length ? window[window.length - 1].data.added_at : null,
    })
  );
};
