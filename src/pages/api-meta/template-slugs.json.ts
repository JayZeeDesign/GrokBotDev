// The votes-api slug registry's template manifest. Same shape as use-case-slugs.json.
// `includedTemplates` semantics: only live / needs-update templates are votable, so a demo or
// proposed entry can never accrue a vote it should not have.
import type { APIRoute } from 'astro';
import { allTemplates, includedTemplates } from '../../lib/templates';
import { jsonResponse } from '../../lib/api';

export const GET: APIRoute = async () => {
  const slugs = includedTemplates(await allTemplates())
    .map((doc) => doc.data.slug)
    .sort();
  return jsonResponse({ generated_at: new Date().toISOString(), slugs });
};
