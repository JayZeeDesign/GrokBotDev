type CountResponse = { counts?: Record<string, number> };

declare global {
  interface Window {
    __grokbotUpvotedSortHydrating?: boolean;
  }
}

const MAX_SLUGS_PER_REQUEST = 50;
const ROOT_SELECTOR = '[data-upvoted-sort-root]';
const CARD_SELECTOR = '[data-upvoted-sort-card]';

async function fetchCounts(slugs: string[]) {
  const params = new URLSearchParams({ slugs: slugs.join(',') });
  const res = await fetch(`/api/v1/votes/counts?${params.toString()}`, {
    cache: 'no-store',
    credentials: 'same-origin',
  });
  if (!res.ok) return {};
  const data = (await res.json().catch(() => ({}))) as CountResponse;
  return data.counts ?? {};
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
  root.dataset.upvotedSortHydrated = 'true';
  root.dispatchEvent(new CustomEvent('grokbot:upvoted-sort:hydrated', { bubbles: true }));
}

async function hydrateUpvotedSort() {
  if (window.__grokbotUpvotedSortHydrating) return;
  const root = document.querySelector<HTMLElement>(ROOT_SELECTOR);
  if (!root) return;
  window.__grokbotUpvotedSortHydrating = true;
  try {
    const slugs = [...new Set(sortCards(root).map(slugOf).filter(Boolean))];
    const counts: Record<string, number> = {};
    for (let index = 0; index < slugs.length; index += MAX_SLUGS_PER_REQUEST) {
      Object.assign(counts, await fetchCounts(slugs.slice(index, index + MAX_SLUGS_PER_REQUEST)));
    }
    applyCardCounts(root, counts);
    reorder(root, counts);
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

initUpvotedSort();

export {};
