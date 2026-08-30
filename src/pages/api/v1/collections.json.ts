// §7.1 — all collections; members resolved to {type, slug, url, name, reason} (§7.1.3).
// Templates (Shareable Bots) resolve too, to `/marketplace/<slug>/` — see `resolveMembers`.
import type { APIRoute } from 'astro';
import { allCollections, allPlugins, allUseCases } from '../../../lib/entries';
import { allTemplates } from '../../../lib/templates';
import { apiSort, envelope, included, jsonResponse, resolveMembers, toApiItem } from '../../../lib/api';

export const GET: APIRoute = async () => {
  const [collections, plugins, useCases, templates] = await Promise.all([
    allCollections(),
    allPlugins(),
    allUseCases(),
    allTemplates(),
  ]);
  const pool = [...plugins, ...useCases];
  const items = apiSort(included(collections)).map((doc) =>
    resolveMembers(toApiItem(doc), pool, templates)
  );
  return jsonResponse(envelope(items));
};
