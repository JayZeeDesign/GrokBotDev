// §7.1 — all use cases, full prompt text in `prompt` (§7.1.3).
import type { APIRoute } from 'astro';
import { allUseCases } from '../../../lib/entries';
import { apiSort, envelope, included, jsonResponse, toApiItem } from '../../../lib/api';

export const GET: APIRoute = async () =>
  jsonResponse(envelope(apiSort(included(await allUseCases())).map(toApiItem)));
