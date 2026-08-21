// §7.1 — all plugins. Envelope + non-lossy items (§7.1.3), `added_at` desc / slug asc.
import type { APIRoute } from 'astro';
import { allPlugins } from '../../../lib/entries';
import { apiSort, envelope, included, jsonResponse, toApiItem } from '../../../lib/api';

export const GET: APIRoute = async () =>
  jsonResponse(envelope(apiSort(included(await allPlugins())).map(toApiItem)));
