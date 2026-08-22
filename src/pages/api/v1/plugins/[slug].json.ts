// §7.1.5 — per-entry DETAIL for a plugin: the full non-lossy record (incl. the install prompt
// and steps). Reached from feed.json's `detail_url`, so the prompt is fetched on demand.
import type { APIRoute, GetStaticPaths } from 'astro';
import { allPlugins } from '../../../../lib/entries';
import { included, jsonResponse, toApiItem } from '../../../../lib/api';

export const getStaticPaths = (async () => {
  const plugins = included(await allPlugins());
  return plugins.map((doc) => ({ params: { slug: doc.data.slug }, props: { doc } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => jsonResponse(toApiItem((props as any).doc));
