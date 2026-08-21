// §7.1 — all collections; members resolved to {type, slug, url, name, reason} (§7.1.3).
import type { APIRoute } from 'astro';
import { allCollections, allPlugins, allUseCases } from '../../../lib/entries';
import { apiSort, envelope, included, jsonResponse, resolveMembers, toApiItem } from '../../../lib/api';

export const GET: APIRoute = async () => {
  const [collections, plugins, useCases] = await Promise.all([
    allCollections(),
    allPlugins(),
    allUseCases(),
  ]);
  const pool = [...plugins, ...useCases];
  const items = apiSort(included(collections)).map((doc) => resolveMembers(toApiItem(doc), pool));
  return jsonResponse(envelope(items));
};
