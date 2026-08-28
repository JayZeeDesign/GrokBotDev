// §7.1 — all shareable bots. Envelope + non-lossy items (§7.1.3), `added_at` desc / slug asc.
import type { APIRoute } from 'astro';
import { allTemplates, includedTemplates, templateEnvelope } from '../../../lib/templates';
import { jsonResponse } from '../../../lib/api';

export const GET: APIRoute = async () =>
  jsonResponse(templateEnvelope(includedTemplates(await allTemplates())));
