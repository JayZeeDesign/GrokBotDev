// §7.1.5 — per-entry DETAIL for a use case: the full non-lossy record (incl. the prompt and
// body sections). A bot lands here from feed.json's `detail_url` once it decides an entry is
// worth showing/installing — so the heavy fields are fetched on demand, one entry at a time.
import type { APIRoute, GetStaticPaths } from 'astro';
import { allUseCases } from '../../../../lib/entries';
import { included, jsonResponse, toApiItem } from '../../../../lib/api';

export const getStaticPaths = (async () => {
  const useCases = included(await allUseCases());
  return useCases.map((doc) => ({ params: { slug: doc.data.slug }, props: { doc } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => jsonResponse(toApiItem((props as any).doc));
