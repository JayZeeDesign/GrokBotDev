// §7.1.4 — the category tree with per-hub counts. Hub counts are {plugins, use_cases}:
// collections are NOT members of category hubs (§6.2).
import type { APIRoute } from 'astro';
import categories from '../../../data/categories.json';
import { hubEligible, kindOf } from '../../../lib/entries';
import { SITE_URL, envelope, included, jsonResponse } from '../../../lib/api';

export const GET: APIRoute = async () => {
  const pool = included(await hubEligible());
  const countFor = (predicate: (doc: (typeof pool)[number]) => boolean) => {
    const matched = pool.filter(predicate);
    return {
      plugins: matched.filter((d) => kindOf(d) === 'plugin').length,
      use_cases: matched.filter((d) => kindOf(d) === 'use-case').length,
    };
  };

  const items = categories.map((category) => ({
    slug: category.slug,
    name: category.label,
    url: `${SITE_URL}/categories/${category.slug}/`,
    counts: countFor((doc) => doc.data.category === category.slug),
    subcategories: category.subcategories.map((sub) => ({
      slug: sub.slug,
      name: sub.label,
      url: `${SITE_URL}/categories/${category.slug}/${sub.slug}/`,
      counts: countFor(
        (doc) => doc.data.category === category.slug && doc.data.subcategory === sub.slug
      ),
    })),
  }));

  return jsonResponse(envelope(items));
};
