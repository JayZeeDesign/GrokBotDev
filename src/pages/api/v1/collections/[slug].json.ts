// §7.1.5 — per-entry DETAIL for a collection: full record with members resolved to
// type/url/name. Reached from feed.json's `detail_url`.
import type { APIRoute, GetStaticPaths } from 'astro';
import { allCollections, allPlugins, allUseCases } from '../../../../lib/entries';
import { included, jsonResponse, resolveMembers, toApiItem } from '../../../../lib/api';

export const getStaticPaths = (async () => {
  const collections = included(await allCollections());
  return collections.map((doc) => ({ params: { slug: doc.data.slug }, props: { doc } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const [plugins, useCases] = await Promise.all([allPlugins(), allUseCases()]);
  const pool = [...plugins, ...useCases];
  return jsonResponse(resolveMembers(toApiItem((props as any).doc), pool));
};
