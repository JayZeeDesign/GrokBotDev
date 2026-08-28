type CountResponse = { counts?: Record<string, number> };

declare global {
  interface Window {
    __grokbotVoteCountsHydrating?: boolean;
  }
}

const MAX_SLUGS_PER_REQUEST = 50;

/**
 * `/api/v1/votes/counts` is FAIL-CLOSED PER BATCH: the service loops the requested slugs and
 * returns 400 `unknown_slug` for the WHOLE request the moment one of them is not in its
 * registry. Because this script used to sweep every vote block on the page into one batch,
 * a single slug the registry had not learned yet zeroed out EVERY count on that page —
 * including counts for slugs it knew perfectly well.
 *
 * That became load-bearing the day templates arrived: the registry is fed a manifest, and
 * until production repoints `SLUGS_FILE` at `api-meta/votable-slugs.json` it knows use-case
 * slugs only. Two defences, both here, so the worst case is "counts read 0" and never
 * "counts break":
 *
 *   · SCOPE SPLIT — blocks are grouped by `data-vote-kind`, so template and use-case slugs are
 *     never in the same request and one lane cannot poison the other.
 *   · BISECT ON 400 — a rejected chunk is halved and retried, so one unknown slug costs its own
 *     half rather than the whole lane. A chunk that still fails is dropped and its blocks stay
 *     at their server-rendered 0, un-hydrated.
 */
type Chunk = { slugs: string[]; depth: number };

const MAX_BISECT_DEPTH = 4;

/**
 * THE OUTCOME MATTERS, NOT JUST SUCCESS/FAILURE.
 *
 * `rejected` means the service answered 400 — one slug in this batch is unknown to its
 * registry, and the other 49 are probably fine, so bisecting is worth it.
 * `unavailable` means 404, a 5xx, or the network failed — the ENDPOINT is down. There is no bad
 * slug to isolate, so bisecting just re-asks a dead endpoint at 50, 25, 13… and buys nothing but
 * a console full of errors. The first cut of this conflated the two and retry-stormed on the
 * preview, which has no votes backend at all; caught by the e2e pass.
 */
type FetchOutcome =
  | { kind: 'ok'; counts: Record<string, number> }
  | { kind: 'rejected' }
  | { kind: 'unavailable' };

async function fetchCounts(slugs: string[]): Promise<FetchOutcome> {
  const params = new URLSearchParams({ slugs: slugs.join(',') });
  try {
    const res = await fetch(`/api/v1/votes/counts?${params.toString()}`, {
      cache: 'no-store',
      credentials: 'same-origin',
    });
    if (res.status === 400) return { kind: 'rejected' };
    if (!res.ok) return { kind: 'unavailable' };
    const data = (await res.json().catch(() => ({}))) as CountResponse;
    return { kind: 'ok', counts: data.counts ?? {} };
  } catch {
    return { kind: 'unavailable' };
  }
}

function voteBlocks(): HTMLAnchorElement[] {
  return [...document.querySelectorAll<HTMLAnchorElement>('[data-vote-slug][data-vote-count-link]')];
}

/** Group the page's blocks by kind, so each lane is requested independently. */
function slugsByKind(): Map<string, string[]> {
  const byKind = new Map<string, Set<string>>();
  for (const block of voteBlocks()) {
    const slug = block.dataset.voteSlug;
    if (!slug) continue;
    const kind = block.dataset.voteKind ?? 'use-case';
    const set = byKind.get(kind) ?? new Set<string>();
    set.add(slug);
    byKind.set(kind, set);
  }
  return new Map([...byKind].map(([kind, set]) => [kind, [...set]]));
}

function nounFor(kind: string): string {
  return kind === 'template' ? 'shareable bot' : 'use case';
}

function applyCounts(counts: Record<string, number>) {
  for (const block of voteBlocks()) {
    const slug = block.dataset.voteSlug;
    if (!slug || !(slug in counts)) continue;
    const count = Math.max(0, Number(counts[slug] ?? 0));
    const countSlot = block.querySelector<HTMLElement>('[data-vote-count]');
    if (countSlot) countSlot.textContent = String(count);
    // Prefer the entry's own name; fall back to the type noun when a block does not carry one.
    // Without this, hydration would replace 77 good per-row labels with 77 identical ones.
    const target = block.dataset.voteName || nounFor(block.dataset.voteKind ?? 'use-case');
    block.setAttribute(
      'aria-label',
      `${count} ${count === 1 ? 'upvote' : 'upvotes'} — open ${target} to vote`
    );
    block.dataset.voteHydrated = 'true';
  }
}

/**
 * Resolve one lane, bisecting only the chunks the service actively REJECTS.
 *
 * Returns false when the endpoint turned out to be unavailable, so the caller can stop rather
 * than march the other lane into the same wall.
 */
async function hydrateLane(slugs: string[]): Promise<boolean> {
  const queue: Chunk[] = [];
  for (let index = 0; index < slugs.length; index += MAX_SLUGS_PER_REQUEST) {
    queue.push({ slugs: slugs.slice(index, index + MAX_SLUGS_PER_REQUEST), depth: 0 });
  }

  while (queue.length) {
    const chunk = queue.shift()!;
    const outcome = await fetchCounts(chunk.slugs);

    if (outcome.kind === 'ok') {
      applyCounts(outcome.counts);
      continue;
    }
    // Endpoint down: every block on the page stays at its server-rendered 0. Stop immediately —
    // retrying smaller slices of a dead endpoint is noise, not resilience.
    if (outcome.kind === 'unavailable') return false;

    // 400: one slug in here is unknown. Isolate it so it costs only its own half.
    if (chunk.slugs.length === 1 || chunk.depth >= MAX_BISECT_DEPTH) continue;
    const mid = Math.ceil(chunk.slugs.length / 2);
    queue.push(
      { slugs: chunk.slugs.slice(0, mid), depth: chunk.depth + 1 },
      { slugs: chunk.slugs.slice(mid), depth: chunk.depth + 1 }
    );
  }
  return true;
}

async function hydrateVoteCounts() {
  if (window.__grokbotVoteCountsHydrating) return;
  window.__grokbotVoteCountsHydrating = true;
  try {
    for (const slugs of slugsByKind().values()) {
      if (!slugs.length) continue;
      // One dead endpoint is enough to know; do not walk the next lane into it.
      if (!(await hydrateLane(slugs))) break;
    }
  } finally {
    window.__grokbotVoteCountsHydrating = false;
  }
}

export function initVoteCountBlocks() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => void hydrateVoteCounts(), { once: true });
  } else {
    void hydrateVoteCounts();
  }
}

initVoteCountBlocks();

export {};
