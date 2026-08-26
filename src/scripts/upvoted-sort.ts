type CountResponse = { counts?: Record<string, number> };

declare global {
  interface Window {
    __grokbotUpvotedSortHydrating?: boolean;
  }
}

const MAX_SLUGS_PER_REQUEST = 50;
const ORDER_TIMEOUT_MS = 2_500;
const LATE_REORDER_GRACE_MS = 2_000;
const ROOT_SELECTOR = '[data-upvoted-sort-root]';
const CARD_SELECTOR = '[data-upvoted-sort-card]';
const STATUS_SELECTOR = '[data-upvoted-sort-status]';

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function previewOnlyDebugDelayMs() {
  const value = Number(new URLSearchParams(window.location.search).get('e2e_sort_delay_ms') ?? 0);
  if (!Number.isFinite(value) || value <= 0) return 0;

  // Deterministic QA hook for the dev preview/throttled-counts E2E only. Ignore on production
  // grokbot.dev so public users cannot accidentally slow their sort with a query string.
  const host = window.location.hostname;
  const isPreviewHost =
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '::1' ||
    host.endsWith('.anacreon.ai');
  return isPreviewHost ? Math.min(Math.round(value), ORDER_TIMEOUT_MS + LATE_REORDER_GRACE_MS + 500) : 0;
}

async function fetchCounts(slugs: string[]) {
  const params = new URLSearchParams({ slugs: slugs.join(',') });
  try {
    const res = await fetch(`/api/v1/votes/counts?${params.toString()}`, {
      cache: 'no-store',
      credentials: 'same-origin',
    });
    if (!res.ok) return {};
    const data = (await res.json().catch(() => ({}))) as CountResponse;
    return data.counts ?? {};
  } catch {
    return {};
  }
}

async function fetchAllCounts(slugs: string[]) {
  const delayMs = previewOnlyDebugDelayMs();
  if (delayMs > 0) await sleep(delayMs);

  const counts: Record<string, number> = {};
  for (let index = 0; index < slugs.length; index += MAX_SLUGS_PER_REQUEST) {
    Object.assign(counts, await fetchCounts(slugs.slice(index, index + MAX_SLUGS_PER_REQUEST)));
  }
  return counts;
}

function sortCards(root: HTMLElement) {
  return [...root.querySelectorAll<HTMLElement>(CARD_SELECTOR)];
}

function slugOf(card: HTMLElement) {
  return card.dataset.upvotedSortSlug || card.querySelector<HTMLElement>('[data-vote-slug]')?.dataset.voteSlug || '';
}

function scoreOf(card: HTMLElement) {
  const value = Number(card.dataset.upvotedSortScore ?? -1);
  return Number.isFinite(value) ? value : -1;
}

function addedAtOf(card: HTMLElement) {
  const value = Date.parse(card.dataset.upvotedSortAddedAt ?? '');
  return Number.isFinite(value) ? value : 0;
}

function countOf(counts: Record<string, number>, slug: string) {
  const value = Number(counts[slug] ?? 0);
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function applyCardCounts(root: HTMLElement, counts: Record<string, number>) {
  for (const block of root.querySelectorAll<HTMLAnchorElement>('[data-vote-slug][data-vote-count-link]')) {
    const slug = block.dataset.voteSlug;
    if (!slug) continue;
    const count = countOf(counts, slug);
    const countSlot = block.querySelector<HTMLElement>('[data-vote-count]');
    if (countSlot) countSlot.textContent = String(count);
    block.setAttribute('aria-label', `${count} upvotes — open use case to vote`);
    block.dataset.voteHydrated = 'true';
  }
}

function statusElement() {
  return document.querySelector<HTMLElement>(STATUS_SELECTOR);
}

function markOrdering(root: HTMLElement) {
  root.dataset.upvotedSortState = 'ordering';
  root.dataset.upvotedSortHydrated = 'false';
  root.dataset.upvotedSortRevealed = 'false';
  root.setAttribute('aria-busy', 'true');

  const status = statusElement();
  if (status) {
    status.hidden = false;
    status.textContent = 'sorting by upvotes…';
  }
}

function reveal(root: HTMLElement, state: 'ready' | 'fallback') {
  root.dataset.upvotedSortState = state;
  root.dataset.upvotedSortHydrated = state === 'ready' ? 'true' : 'false';
  root.dataset.upvotedSortRevealed = 'true';
  root.setAttribute('aria-busy', 'false');

  const status = statusElement();
  if (status) status.hidden = true;

  root.dispatchEvent(
    new CustomEvent('grokbot:upvoted-sort:revealed', {
      bubbles: true,
      detail: { state },
    })
  );
}

function updateRanks(cards: HTMLElement[]) {
  cards.forEach((card, index) => {
    const rank = card.querySelector<HTMLElement>('[data-upvoted-sort-index]');
    if (rank) rank.textContent = String(index + 1).padStart(2, '0');
  });
}

function reorder(root: HTMLElement, counts: Record<string, number>) {
  const cards = sortCards(root);
  const ordered = cards
    .map((card) => ({ card, slug: slugOf(card) }))
    .filter((row) => row.slug)
    .sort((a, b) => {
      const byCount = countOf(counts, b.slug) - countOf(counts, a.slug);
      if (byCount !== 0) return byCount;
      const byScore = scoreOf(b.card) - scoreOf(a.card);
      if (byScore !== 0) return byScore;
      const byAddedAt = addedAtOf(b.card) - addedAtOf(a.card);
      if (byAddedAt !== 0) return byAddedAt;
      return a.slug.localeCompare(b.slug);
    })
    .map((row) => row.card);

  for (const card of ordered) root.appendChild(card);
  updateRanks(ordered);
  root.dispatchEvent(new CustomEvent('grokbot:upvoted-sort:hydrated', { bubbles: true }));
}

async function hydrateUpvotedSort() {
  const root = document.querySelector<HTMLElement>(ROOT_SELECTOR);
  if (!root || root.dataset.upvotedSortHydrated === 'true') return;

  // First synchronous DOM mutation: keep the layout-stable grid hidden and show the status
  // line before any count request/await can expose the stale Awesome Score fallback order.
  markOrdering(root);
  if (window.__grokbotUpvotedSortHydrating) return;
  window.__grokbotUpvotedSortHydrating = true;
  try {
    const slugs = [...new Set(sortCards(root).map(slugOf).filter(Boolean))];
    if (slugs.length === 0) {
      reveal(root, 'fallback');
      return;
    }

    const countsPromise = fetchAllCounts(slugs);
    const counts = await Promise.race([countsPromise, sleep(ORDER_TIMEOUT_MS).then(() => null)]);
    if (counts) {
      applyCardCounts(root, counts);
      reorder(root, counts);
      reveal(root, 'ready');
      return;
    }

    root.dataset.upvotedSortTimedOut = 'true';
    reveal(root, 'fallback');

    const lateCounts = await Promise.race([countsPromise, sleep(LATE_REORDER_GRACE_MS).then(() => null)]);
    if (!lateCounts) return;
    applyCardCounts(root, lateCounts);
    reorder(root, lateCounts);
    reveal(root, 'ready');
  } finally {
    window.__grokbotUpvotedSortHydrating = false;
  }
}

export function initUpvotedSort() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => void hydrateUpvotedSort(), { once: true });
  } else {
    void hydrateUpvotedSort();
  }
}

export {};
