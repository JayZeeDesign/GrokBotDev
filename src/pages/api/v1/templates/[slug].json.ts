// §7.1.5 — per-entry DETAIL for a shareable bot: the full non-lossy record incl. the install
// link and the body. Reached from a feed item's `detail_url`.
import type { APIRoute, GetStaticPaths } from 'astro';
import { allTemplates, includedTemplates, toTemplateApiItem } from '../../../../lib/templates';
import { jsonResponse } from '../../../../lib/api';

export const getStaticPaths = (async () => {
  const templates = includedTemplates(await allTemplates());
  return templates.map((doc) => ({ params: { slug: doc.data.slug }, props: { doc } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => jsonResponse(toTemplateApiItem((props as any).doc));
