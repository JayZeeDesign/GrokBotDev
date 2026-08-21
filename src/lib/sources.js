// F17 — the PRIMARY SOURCE vocabulary, in one file.
//
// An entry's primary source is the single thing it was found in. Until F17 that was always a
// post on X and the concept was implicit — `source_tweets[0]`. F17 makes it explicit and
// kind-aware so a use case can be sourced from a YouTube video instead, WITHOUT rewriting a
// single existing content file: when `primary_source` is absent the resolver derives
// `{ kind: 'x-post', url: source_tweets[0].url }`, which is exactly what the old implicit rule
// meant. Additive by construction.
//
// Everything that has to agree about what a valid source URL looks like reads from here:
//   · `src/content.config.ts` (build-time Zod validation of contributor frontmatter)
//   · `src/lib/entries.ts`    (the resolver the pages and the API call)
//   · `YouTubeEmbed.astro`    (nothing — it is handed a resolved id, see below)
// One regex per shape, one place to fix it. A second copy of a URL pattern is a licence for
// the validator and the renderer to disagree about the same string.
//
// WHY THIS IS `.js` AND NOT `.ts`. `scripts/validate.mjs` runs under plain node, with no TS
// loader, and it needs `youtubeVideoId()` to dedupe sources by VIDEO ID (see below). A `.ts`
// module would have forced a second copy of these regexes into the validator — the exact
// thing this file exists to prevent — so the types are JSDoc and every consumer, TS or node,
// imports the same functions. `astro check` type-checks it either way.

/** §5 `source_tweets[].url` — the shape already enforced inline in the use-case schema. */
/** @type {RegExp} */
export const X_STATUS_RE = /^https:\/\/(x|twitter)\.com\/[A-Za-z0-9_]{1,15}\/status\/\d+$/;

/**
 * The three YouTube shapes a contributor will actually paste. Deliberately NOT permissive:
 *   · `youtube.com/watch?v=<id>`  — the canonical desktop URL
 *   · `youtu.be/<id>`             — the share-sheet URL
 *   · `youtube.com/shorts/<id>`   — a short
 * `www.` optional, id is exactly 11 chars of YouTube's base64url alphabet, and anything after
 * the id (`&t=`, `?si=`, `#`) is tolerated because the share sheet always appends something.
 * Playlists, channels and `/embed/` URLs are rejected on purpose — an entry cites ONE video,
 * and `/embed/` is our output, not a contributor's input.
 */
/** @type {RegExp} */
export const YOUTUBE_URL_RE =
  /^https:\/\/(?:www\.youtube\.com\/watch\?v=|youtu\.be\/|www\.youtube\.com\/shorts\/|youtube\.com\/watch\?v=|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})(?:[&?#].*)?$/;

/**
 * `mm:ss` or `h:mm:ss` / `hh:mm:ss`. This is a RECEIPT, not a player control: the operator's
 * framing is that a timestamp is how a curator says "the claim is at 4:12", so it is written
 * the way a human reads it back off the video and converted to `start=` seconds for the URL.
 */
/** @type {RegExp} */
export const TIMESTAMP_RE = /^(?:([0-9]{1,2}):)?([0-5]?[0-9]):([0-5][0-9])$/;

/**
 * `https://youtu.be/dQw4w9WgXcQ?si=x` → `dQw4w9WgXcQ`. Null when the URL is not one of ours.
 *
 * THIS IS THE DEDUPE KEY, and it has to be — §5.6 rule 3 dedupes URLs through
 * `normalizeUrl()`, which strips the query string. For a YouTube watch URL the video id LIVES
 * in the query, so normalising would collapse every `youtube.com/watch?v=…` in the corpus to
 * the single key `https://www.youtube.com/watch` and report every entry after the first as a
 * duplicate. The id is also the only key that catches the same video submitted once as
 * `youtu.be/X` and once as `youtube.com/watch?v=X` — which URL normalisation cannot do at all.
 *
 * @param {string} url
 * @returns {string | null}
 */
export function youtubeVideoId(url) {
  return YOUTUBE_URL_RE.exec(url)?.[1] ?? null;
}

/**
 * `'4:12'` → `252`. `'1:02:03'` → `3723`. Null when the string is not a valid receipt.
 * @param {string} timestamp
 * @returns {number | null}
 */
export function timestampToSeconds(timestamp) {
  const match = TIMESTAMP_RE.exec(timestamp);
  if (!match) return null;
  const [, hours, minutes, seconds] = match;
  return Number(hours ?? 0) * 3600 + Number(minutes) * 60 + Number(seconds);
}

/**
 * The player URL we actually frame.
 *
 * `youtube-nocookie.com` is not cosmetic — it is the host the /about privacy copy names, and
 * the ONLY YouTube host in the §10.7 `frame-src` allowlist. Building this URL in one function
 * is what stops a later edit quietly framing `youtube.com` instead: that would be blocked by
 * the CSP in production only, which is the expensive way to find out.
 *
 * Query params, each deliberate:
 *   · `start`     — the receipt, in seconds. Omitted entirely when there is no timestamp.
 *   · `rel=0`     — keep "up next" inside the same channel rather than the open web.
 *   · `modestbranding=1` — YouTube ignores this now; kept because it costs nothing and is
 *                          still honoured by some embedded contexts.
 *   · NOTHING autoplaying. The frame is created when the reader scrolls to it; a video that
 *     started talking at that moment would be an ambush, not a lazy-load.
 */
/**
 * @param {string} videoId
 * @param {number | null} [startSeconds]
 * @returns {string}
 */
export function youtubeEmbedUrl(videoId, startSeconds) {
  const params = new URLSearchParams({ rel: '0', modestbranding: '1' });
  if (startSeconds && startSeconds > 0) params.set('start', String(startSeconds));
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

/**
 * The canonical human-facing link. Always `youtube.com/watch`, always with the receipt.
 * @param {string} videoId
 * @param {number | null} [startSeconds]
 * @returns {string}
 */
export function youtubeWatchUrl(videoId, startSeconds) {
  const base = `https://www.youtube.com/watch?v=${videoId}`;
  return startSeconds && startSeconds > 0 ? `${base}&t=${startSeconds}s` : base;
}
