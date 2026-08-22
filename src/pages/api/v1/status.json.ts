// §7.1.6 — status.json: the API's self-description. A bot polls this (it's tiny) to learn
// whether anything changed — new capabilities (e.g. pagination), active notices, deprecations
// — WITHOUT breaking. Version + schema_revision let it detect change with one field; the
// stability promise tells it what it can rely on.
import type { APIRoute } from 'astro';
import { jsonResponse } from '../../../lib/api';
import {
  API_VERSION,
  CAPABILITIES,
  CHANGELOG,
  DEPRECATIONS,
  NOTICES,
  SCHEMA_REVISION,
  STABILITY,
} from '../../../lib/apiMeta';

export const GET: APIRoute = async () =>
  jsonResponse({
    generated_at: new Date().toISOString(),
    api_version: API_VERSION,
    schema_revision: SCHEMA_REVISION,
    stability: STABILITY,
    capabilities: CAPABILITIES,
    notices: NOTICES,
    deprecations: DEPRECATIONS,
    changelog: CHANGELOG,
  });
