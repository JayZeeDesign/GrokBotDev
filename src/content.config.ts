// src/content.config.ts — CANONICAL. §5 of the PRD owns this file.
// Copied from §5.2 with exactly one documented amendment: Addendum B4 adds `demo` to the
// status enum and forbids `verified_at` on demo entries ("nothing fictional ever carries a
// verification claim"). Everything else is verbatim §5.2.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import categories from './data/categories.json';
import integrations from './data/integrations.json';
import { TIMESTAMP_RE, X_STATUS_RE, YOUTUBE_URL_RE } from './lib/sources';

// ---------- shared primitives ----------
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const slug = z.string().regex(SLUG_RE, 'kebab-case only').max(64);
const isoDate = z.string().datetime(); // ISO 8601, UTC "Z" only (no offsets)
const httpsUrl = z.string().url().startsWith('https://');
const tagline = z.string().min(10).max(90); // hand-written, ≤90 chars — also the meta-description base (§6.3)

const categorySlugs = categories.map((c) => c.slug) as [string, ...string[]];

const integrationName = z.string().refine(
  (v) => integrations.some((i) => i.canonical_name === v),
  (v) => ({
    message: `Unknown integration "${v}" — must exactly match a canonical_name in src/data/integrations.json (§5.5)`,
  })
);

const author = z
  .object({
    handle: z.string().min(1).max(40), // no leading @
    url: httpsUrl, // rendered DOFOLLOW when verified (§6.10, §5.6 rule 8)
    platform: z.enum(['x', 'github', 'web']).default('x'),
  })
  .strict();

const scoutedBy = z
  .object({
    handle: z.string().min(1).max(40),
    platform: z.enum(['x', 'github']).default('x'),
  })
  .strict();

// Addendum B4: `demo` joins the enum. A demo entry is an explicitly-labelled example —
// it never carries verified_at and is excluded from the API, feeds, wall and sitemap.
const status = z.enum(['live', 'needs-update', 'deprecated', 'demo']).default('live');

// ---------- PRIMARY SOURCE (F17) ----------
// The ONE thing an entry was found in. A discriminated union rather than a `kind` field
// beside optional siblings, for one reason: it makes "a YouTube source without a title" and
// "an X source carrying a channel name" UNREPRESENTABLE instead of merely discouraged. Zod
// also reports the right error — it narrows on `kind` first and then complains about that
// branch's fields, rather than listing every field of both shapes.
//
// EXACTLY ONE per entry is structural: it is an object, not an array. Nothing to enforce.
//
// ADDITIVE BY DESIGN — the whole field is `.optional()`. Absent means `{ kind: 'x-post', url:
// source_tweets[0].url }`, which is precisely the rule the codebase already followed
// implicitly, so every existing content file keeps its current behaviour untouched and NOT
// ONE of them had to be edited to land F17. `primarySourceOf()` in lib/entries.ts is the one
// place that fallback lives.
const primarySource = z.discriminatedUnion('kind', [
  z
    .object({
      kind: z.literal('x-post'),
      // Points AT one of the entry's own source_tweets — see `primaryIsCredited` below. It
      // carries no excerpt or handle of its own precisely so the two can never disagree:
      // the credit line stays the single source of that text.
      url: z.string().regex(X_STATUS_RE, 'must be a post URL like https://x.com/<handle>/status/<id>'),
    })
    .strict(),
  z
    .object({
      kind: z.literal('youtube-video'),
      url: z
        .string()
        .regex(
          YOUTUBE_URL_RE,
          'must be a YouTube video URL — youtube.com/watch?v=…, youtu.be/…, or youtube.com/shorts/… (playlist, channel and /embed/ URLs are not accepted)'
        ),
      // REQUIRED, both of them. The embed's fallback card is also its permanent failure
      // state, and a failure state that cannot name the video is not attribution — it is a
      // dead rectangle. Making these optional would let an entry ship a source that
      // disappears the moment Google is unreachable.
      title: z.string().min(3).max(140),
      channel: z.string().min(1).max(60), // display name, no leading @
      channel_url: httpsUrl.optional(),
      // A receipt, written the way a human reads it off the video: "4:12", "1:02:03".
      // Converted to `start=` seconds at render (lib/sources.js).
      timestamp: z
        .string()
        .regex(TIMESTAMP_RE, 'must be mm:ss or h:mm:ss — e.g. "4:12" or "1:02:03"')
        .optional(),
      posted_at: isoDate.optional(),
    })
    .strict(),
]);

// An `x-post` primary must be one of the entry's OWN credited posts. Without this an entry
// could name a primary source that appears nowhere in its credit line — the reader would see
// an embed attributed to a post the page never claims to be sourced from, which is the exact
// kind of quiet attribution drift §10.1 exists to prevent.
function primaryIsCredited(
  data: { primary_source?: { kind: string; url: string }; source_tweets: Array<{ url: string }> },
  ctx: z.RefinementCtx
) {
  const primary = data.primary_source;
  if (!primary || primary.kind !== 'x-post') return;
  if (!data.source_tweets.some((tweet) => tweet.url === primary.url)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['primary_source', 'url'],
      message: `primary_source points at ${primary.url}, which is not in source_tweets[] — an x-post primary source must be one of this entry's own credited posts (§5.6 rule 10)`,
    });
  }
}

// cross-field checks
function validCategoryPair(data: { category: string; subcategory: string }, ctx: z.RefinementCtx) {
  const cat = categories.find((c) => c.slug === data.category);
  if (!cat || !cat.subcategories.some((s) => s.slug === data.subcategory)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `subcategory "${data.subcategory}" is not valid inside category "${data.category}" (see src/data/categories.json)`,
    });
  }
}

function datesSane(
  data: { added_at: string; updated_at: string; verified_at?: string },
  ctx: z.RefinementCtx
) {
  if (data.updated_at < data.added_at)
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'updated_at must be ≥ added_at' });
  if (data.verified_at && data.verified_at < data.added_at)
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'verified_at must be ≥ added_at' });
}

// no unverified entry ever publishes (§10.1) — deprecated pages are kept but were verified once
function verifiedWhenLive(data: { status: string; verified_at?: string }, ctx: z.RefinementCtx) {
  // Addendum B4: a demo entry must NEVER carry a verification claim.
  if (data.status === 'demo' && data.verified_at) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        'demo entries must not carry verified_at — nothing fictional ever carries a verification claim (Addendum B4, §10.1)',
    });
    return;
  }
  if (data.status !== 'deprecated' && data.status !== 'demo' && !data.verified_at)
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        'verified_at is required unless status is "deprecated" (§5.6 rule 8; verified model in CONTEXT)',
    });
}

// ---------- PLUGIN ----------
const plugins = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/plugins' }),
  schema: z
    .object({
      type: z.literal('plugin').default('plugin'),
      name: z.string().min(3).max(60),
      slug, // MUST equal filename (§8 CI)
      tagline,
      category: z.enum(categorySlugs),
      subcategory: z.string(), // pair-validated below
      install_steps: z.array(z.string().min(10).max(300)).min(1).max(12),
      prompt: z.string().min(120).max(8000).optional(), // verbatim copy-paste prompt (§4.3.3 region 5). Optional — a plugin may ship install steps only.
      works_with: z.array(integrationName).default([]), // controlled vocab (§5.5); API field `integrations` (§7)
      project_url: httpsUrl, // rendered DOFOLLOW when verified (§6.10); dedupe key (§5.6)
      repo_url: httpsUrl.optional(), // rendered DOFOLLOW when verified (§6.10)
      author, // required for plugins
      scouted_by: scoutedBy.optional(),
      source_url: httpsUrl.optional(), // provenance (usually an X post); rendered as a link
      pricing_note: z.string().max(120).optional(), // honest cost line, e.g. "Free tier; API key ~$5/mo"
      setup_minutes: z.number().int().min(1).max(240).optional(), // setup-time chip (§4.2.10, §4.3.3)
      featured: z.boolean().default(false),
      sponsor: z.boolean().default(false), // operator: marks a sponsor tool — badged in listings
      added_at: isoDate,
      updated_at: isoDate,
      verified_at: isoDate.optional(), // MAINTAINER-SET ONLY on community PRs (§8.5 check 9)
      status,
    })
    .strict()
    .superRefine(validCategoryPair)
    .superRefine(datesSane)
    .superRefine(verifiedWhenLive),
});

// ---------- USE CASE ----------
const useCases = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/use-cases' }),
  schema: z
    .object({
      type: z.literal('use-case').default('use-case'),
      // Named-character style is REQUIRED: "<Bot name> · <Role>", separator " · " (U+00B7)
      name: z
        .string()
        .min(5)
        .max(60)
        .regex(/^[^·]+ · .+$/u, 'Use "<Bot name> · <Role>", e.g. "R2 · Chief of Staff"'),
      slug,
      tagline,
      category: z.enum(categorySlugs),
      subcategory: z.string(),
      bot_name: z.string().min(1).max(30).optional(), // default: substring of name before " · "
      what_it_does: z.string().min(80).max(300), // plain-text summary; HowTo description (§6.4)
      integrations: z.array(integrationName).default([]),
      schedule: z.enum(['none', 'adhoc', 'hourly', 'daily', 'weekly', 'biweekly', 'monthly']),
      autonomy: z.enum(['readonly', 'proposes', 'acts-with-approval', 'autonomous']),
      difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
      setup_minutes: z.number().int().min(1).max(240),
      cost_note: z.string().max(120).optional(),
      source_tweets: z
        .array(
          z
            .object({
              // F17: the pattern moved to lib/sources.js so the schema and the primary-source
              // union validate an X URL with the same regex rather than two copies of it.
              url: z.string().regex(X_STATUS_RE),
              author_handle: z.string().min(1).max(15), // no leading @
              excerpt: z.string().min(20).max(280), // short attributed quote — NEVER the full post (§10.6, §5.6 rule 10)
              posted_at: isoDate.optional(),
            })
            .strict()
        )
        .max(5)
        .default([]), // embed source; see rules in §5.6 (floor 6, cap 10)
      // F17 — the ONE source this entry was found in. Optional: absent means the first
      // source_tweet, which is what every entry before F17 meant implicitly.
      primary_source: primarySource.optional(),
      author: author.optional(),
      scouted_by: scoutedBy.optional(),
      replicability: z.string().min(40).max(300), // rendered as Callout info (§4.3.5 region 7)
      // M2b: where the prompt text came from. `author` = the creator published this text
      // (a repo file, a gist, or the post itself). `curator` = grokbot.dev reconstructed it
      // from a documented setup, and the page says so above the prompt. Absent means
      // `author` — nothing ships as `curator` until the operator sanctions that path.
      prompt_provenance: z.enum(['author', 'curator']).optional(),
      featured: z.boolean().default(false),
      added_at: isoDate,
      updated_at: isoDate,
      verified_at: isoDate.optional(), // MAINTAINER-SET ONLY on community PRs (§8.5 check 9)
      status,
    })
    .strict()
    .superRefine(validCategoryPair)
    .superRefine(datesSane)
    .superRefine(verifiedWhenLive)
    .superRefine(primaryIsCredited),
});

// ---------- COLLECTION ----------
const collectionEntries = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/collections' }),
  schema: z
    .object({
      type: z.literal('collection').default('collection'),
      name: z.string().min(3).max(60),
      slug,
      tagline,
      category: z.enum(categorySlugs), // collections ARE categorised (§6.2); not listed on category hubs
      subcategory: z.string(), // pair-validated below
      // members = slugs of plugins and/or use cases (never other collections), each with a
      // one-line rationale; array order = display order
      members: z
        .array(z.object({ slug, reason: z.string().min(20).max(200) }).strict())
        .min(2)
        .max(10)
        .refine((m) => new Set(m.map((x) => x.slug)).size === m.length, 'duplicate member slugs'),
      prompt: z.string().min(120).max(8000).optional(), // optional combined bootstrap prompt (§4.3.7 region 6)
      featured: z.boolean().default(false),
      added_at: isoDate,
      updated_at: isoDate,
      verified_at: isoDate.optional(), // MAINTAINER-SET ONLY on community PRs (§8.5 check 9)
      status,
    })
    .strict()
    .superRefine(validCategoryPair)
    .superRefine(datesSane)
    .superRefine(verifiedWhenLive),
});

export const collections = {
  plugins,
  'use-cases': useCases,
  collections: collectionEntries,
};
