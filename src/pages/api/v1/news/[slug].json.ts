// Per-news detail endpoint: full markdown body plus source receipts.
import type { APIRoute, GetStaticPaths } from 'astro';
import { allNews, toNewsApiItem } from '../../../../lib/news';
import { jsonResponse } from '../../../../lib/api';

export const getStaticPaths = (async () => {
  const news = await allNews();
  return news.map((doc) => ({ params: { slug: doc.data.slug }, props: { doc } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => jsonResponse(toNewsApiItem((props as any).doc));
