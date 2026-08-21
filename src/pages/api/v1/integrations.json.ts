// §7.1.4 — the integration vocabulary with counts. Zero-usage integrations are omitted.
import type { APIRoute } from 'astro';
import { hubEligible } from '../../../lib/entries';
import { envelope, included, integrationItems, jsonResponse } from '../../../lib/api';

export const GET: APIRoute = async () =>
  jsonResponse(envelope(integrationItems(included(await hubEligible()))));
