type CountResponse = { counts?: Record<string, number> };

declare global {
  interface Window {
    __grokbotVoteCountsHydrating?: boolean;
  }
}

const MAX_SLUGS_PER_REQUEST = 50;

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

function voteBlocks() {
  return [...document.querySelectorAll<HTMLAnchorElement>('[data-vote-slug][data-vote-count-link]')];
}

function applyCounts(counts: Record<string, number>) {
  for (const block of voteBlocks()) {
    const slug = block.dataset.voteSlug;
    if (!slug || !(slug in counts)) continue;
    const count = Math.max(0, Number(counts[slug] ?? 0));
    const countSlot = block.querySelector<HTMLElement>('[data-vote-count]');
    if (countSlot) countSlot.textContent = String(count);
    block.setAttribute('aria-label', `${count} ${count === 1 ? "upvote" : "upvotes"} — open use case to vote`);
    block.dataset.voteHydrated = 'true';
  }
}

async function hydrateVoteCounts() {
  if (window.__grokbotVoteCountsHydrating) return;
  window.__grokbotVoteCountsHydrating = true;
  try {
    const slugs = [...new Set(voteBlocks().map((block) => block.dataset.voteSlug).filter(Boolean))] as string[];
    for (let index = 0; index < slugs.length; index += MAX_SLUGS_PER_REQUEST) {
      const chunk = slugs.slice(index, index + MAX_SLUGS_PER_REQUEST);
      applyCounts(await fetchCounts(chunk));
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
