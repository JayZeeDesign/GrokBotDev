// THE manifest the production votes-api should load: every slug that may receive a vote,
// across every votable type.
//
// WHY THIS EXISTS SEPARATELY FROM use-case-slugs.json. That file is what production's
// `SLUGS_FILE` points at today, and it is left byte-identical on purpose — anything already
// reading it keeps getting exactly what its name promises. This one is the union, and the
// deploy step is a ONE-LINE env change:
//
//   SLUGS_FILE=/opt/projects/user/grokbot/current/api-meta/votable-slugs.json
//
// ORDER MATTERS: promote the site FIRST, then repoint. Repointing first aims the registry at a
// path that does not exist yet, and `SlugRegistry.loadFallbacks()` would quietly fall through
// to the service checkout's own content directory — i.e. silently back to use-cases only.
// No votes-api code change is needed, and no redeploy: the registry re-reads on
// SLUG_REFRESH_MS (10 min) and `current/` is swapped atomically by the promote.
//
// Until the repoint happens, template slugs are unknown to the registry. That is survivable by
// design: `src/scripts/vote-counts.ts` requests each kind in its own batch and bisects a
// rejected chunk, so unknown template slugs read 0 rather than breaking the use-case counts
// beside them.
import type { APIRoute } from 'astro';
import { allUseCases } from '../../lib/entries';
import { allTemplates, includedTemplates } from '../../lib/templates';
import { included, jsonResponse } from '../../lib/api';

export const GET: APIRoute = async () => {
  const [useCases, templates] = await Promise.all([allUseCases(), allTemplates()]);
  const useCaseSlugs = included(useCases).map((doc) => doc.data.slug);
  const templateSlugs = includedTemplates(templates).map((doc) => doc.data.slug);
  // Global slug uniqueness is enforced by validate.mjs (§5.6 #2) across every collection, so
  // the union cannot collide. Deduped anyway: this file's job is to be trustworthy.
  const slugs = [...new Set([...useCaseSlugs, ...templateSlugs])].sort();

  return jsonResponse({
    generated_at: new Date().toISOString(),
    slugs,
    counts: {
      use_cases: useCaseSlugs.length,
      templates: templateSlugs.length,
      total: slugs.length,
    },
  });
};
