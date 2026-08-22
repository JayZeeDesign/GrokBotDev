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

export const GET: APIRoute = async () => {
  // Drop notices whose expires_at is already in the past (evaluated at build). Bots also skip
  // expired ones at fetch time, so a promo ends cleanly even between rebuilds.
  const now = new Date().toISOString();
  const notices = NOTICES.filter((n) => !n.expires_at || n.expires_at > now);
  return jsonResponse({
    generated_at: now,
    api_version: API_VERSION,
    schema_revision: SCHEMA_REVISION,
    stability: STABILITY,
    capabilities: CAPABILITIES,
    notices,
    deprecations: DEPRECATIONS,
    changelog: CHANGELOG,
  });
};
