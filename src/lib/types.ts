// Shared UI types for the §4.2 component inventory.
// Frontmatter is snake_case (§05); TypeScript internals are camelCase (CONTEXT) —
// the rename happens at the content-collection boundary (§4.2.10). M2 owns the Zod
// schemas in src/content.config.ts; these interfaces mirror them field for field.

export type EntryType = 'plugin' | 'use-case' | 'collection';
export type EntryStatus = 'live' | 'needs-update' | 'deprecated';

export interface EntryAuthor {
  handle: string;
  url: string;
  platform: 'x' | 'github' | 'web';
}

export interface ScoutedBy {
  handle: string;
  platform: 'x' | 'github';
}

export interface SourceTweet {
  url: string;
  authorHandle: string;
  excerpt: string;
  postedAt?: string;
}

/**
 * F17 — the §5 `primary_source` union, mirrored in camelCase.
 *
 * The `x-post` arm is `SourceTweet` plus a discriminant on purpose: an x-post primary IS one
 * of the entry's credited posts (the schema enforces it), so it must carry the same excerpt
 * and handle the credit line shows. `primarySourceOf()` performs that join.
 *
 * The `youtube-video` arm carries two fields frontmatter does not: `videoId` and
 * `startSeconds`, both DERIVED at resolve time from `url` and `timestamp`. They are on the
 * resolved type rather than in frontmatter because a contributor should paste a URL they can
 * see in their address bar, not extract an id — and because a derived value stored in content
 * is a value that can be wrong.
 */
export type PrimarySource =
  | {
      kind: 'x-post';
      url: string;
      authorHandle: string;
      excerpt: string;
      postedAt?: string;
    }
  | {
      kind: 'youtube-video';
      url: string;
      /** Derived from `url` — the 11-char id, never authored by hand. */
      videoId: string;
      title: string;
      channel: string;
      channelUrl?: string;
      /** The human receipt as written, e.g. `4:12`. Rendered; not used to build the URL. */
      timestamp?: string;
      /** Derived from `timestamp` — what actually becomes `start=`. */
      startSeconds?: number;
      postedAt?: string;
    };

/** The kind discriminant, on its own — what the API and the feeds expose. */
export type PrimarySourceKind = PrimarySource['kind'];

export interface CollectionMember {
  slug: string;
  reason: string;
}

interface EntryBase {
  name: string;
  slug: string;
  tagline: string;
  category: string;
  subcategory: string;
  featured: boolean;
  sponsor?: boolean;
  addedAt: string;
  updatedAt: string;
  verifiedAt?: string;
  status: EntryStatus;
}

export interface PluginEntry extends EntryBase {
  type: 'plugin';
  installSteps: string[];
  prompt?: string;
  worksWith: string[];
  projectUrl: string;
  repoUrl?: string;
  author: EntryAuthor;
  scoutedBy?: ScoutedBy;
  sourceUrl?: string;
  pricingNote?: string;
  setupMinutes?: number;
}

export interface UseCaseEntry extends EntryBase {
  type: 'use-case';
  botName?: string;
  whatItDoes: string;
  integrations: string[];
  schedule: 'none' | 'adhoc' | 'hourly' | 'daily' | 'weekly' | 'biweekly' | 'monthly';
  autonomy: 'readonly' | 'proposes' | 'acts-with-approval' | 'autonomous';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  setupMinutes: number;
  costNote?: string;
  sourceTweets: SourceTweet[];
  /** F17 — resolved, never raw: absent frontmatter resolves to `sourceTweets[0]` as `x-post`. */
  primarySource?: PrimarySource;
  author?: EntryAuthor;
  scoutedBy?: ScoutedBy;
  replicability: string;
  // FINAL Awesome Use Case model — see documents/grokbot-dev/awesome-use-case-model.md.
  headline?: string;
  summary?: string;
  categories?: string[];
  awesomeScore?: number;
  format?: 'use-case' | 'guide';
  /** Resolved for the card: who/where it came from. */
  source?: { label: string; platform: 'x' | 'youtube'; url?: string };
}

export interface CollectionEntry extends EntryBase {
  type: 'collection';
  members: CollectionMember[];
  prompt?: string;
}

export type Entry = PluginEntry | UseCaseEntry | CollectionEntry;

/** §4.2.17 / §4.2.4 — build-time counts. */
export interface SiteStats {
  plugins: number;
  useCases: number;
  collections: number;
  generatedAt: string;
}

/** §4.2.9 */
export interface FacetOption {
  label: string;
  href: string;
  count: number;
  current: boolean;
}

/** §4.2.19 — Astro `paginate()` output. */
export interface PageInfo {
  current: number;
  total: number;
  prevUrl?: string;
  nextUrl?: string;
  baseUrl: string;
}

/** §4.2.5 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/** §4.2.23 */
export interface ContributeStep {
  title: string;
  body: string;
  code?: string;
}

/** §9.2 `source` enum — the surfaces the waitlist form reports. */
export type WaitlistSource =
  | 'home'
  | 'plugins-index'
  | 'use-cases-index'
  | 'collections-index'
  | 'plugin-detail'
  | 'use-case-detail'
  | 'collection-detail'
  | 'hub'
  | 'contribute';
