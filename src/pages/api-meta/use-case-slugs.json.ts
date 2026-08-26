import type { APIRoute } from 'astro';
import { allUseCases } from '../../lib/entries';
import { included, jsonResponse } from '../../lib/api';

export const GET: APIRoute = async () => {
  const slugs = included(await allUseCases()).map((doc) => doc.data.slug).sort();
  return jsonResponse({ generated_at: new Date().toISOString(), slugs });
};
