#!/usr/bin/env tsx
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { loadConfig } from '../src/config.js';
import { verifyVoterCookie } from '../src/security/cookies.js';

const cfg = loadConfig();
const base = (process.env.E2E_BASE_URL ?? 'https://grokbot-upvotes.anacreon.ai').replace(/\/$/, '');
const slug = process.env.E2E_SLUG ?? 'account-expert';
const token = process.env.E2E_TURNSTILE_TOKEN ?? 'test-token';
const requireEmptyStart = process.env.E2E_REQUIRE_EMPTY_START === '1';
const execFileAsync = promisify(execFile);
const browserSession = process.env.E2E_BROWSER_SESSION;
const ipRunOctet = 20 + Math.floor(Math.random() * 180);

async function json<T>(path: string, init: RequestInit = {}): Promise<{ status: number; data: T; headers: Headers }> {
  const res = await fetch(`${base}${path}`, init);
  const data = (await res.json().catch(() => ({}))) as T;
  return { status: res.status, data, headers: res.headers };
}

async function counts() {
  const res = await json<{ counts: Record<string, number> }>(`/api/v1/votes/counts?slugs=${encodeURIComponent(slug)}`);
  if (res.status !== 200) throw new Error(`counts failed: ${res.status}`);
  return res.data.counts[slug] ?? 0;
}

async function countsFor(slugs: string[]) {
  const countsBySlug: Record<string, number> = {};
  for (let index = 0; index < slugs.length; index += 50) {
    const chunk = slugs.slice(index, index + 50);
    const params = new URLSearchParams({ slugs: chunk.join(',') });
    const res = await json<{ counts: Record<string, number> }>(`/api/v1/votes/counts?${params.toString()}`);
    if (res.status !== 200) throw new Error(`counts batch failed: ${res.status}`);
    Object.assign(countsBySlug, res.data.counts);
  }
  return countsBySlug;
}

function e2eIp(index: number) {
  return `203.${ipRunOctet}.${20 + index}.10`;
}

async function issueIdentity(ip?: string) {
  const identity = await json<{ ok?: boolean }>('/api/v1/identity', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...(ip ? { 'cf-connecting-ip': ip } : {}) },
    body: JSON.stringify({ turnstileToken: token }),
  });
  if (identity.status !== 200 || !identity.data.ok) throw new Error(`identity failed: ${identity.status}`);
  const voter = /voter=([^;]+)/.exec(identity.headers.get('set-cookie') ?? '')?.[1];
  if (!voter) throw new Error('identity did not set voter cookie');
  const identityId = verifyVoterCookie(voter, cfg.pepper);
  if (!identityId) throw new Error('identity cookie did not verify locally');
  return voter;
}

async function voteWithCookie(voter: string, voteSlug: string, action: 'cast' | 'uncast', ip?: string) {
  return json<{ ok?: boolean; slug?: string; my_vote?: boolean; count?: number; voted?: boolean; visible_count?: number }>('/api/v1/votes', {
    method: 'POST',
    headers: { 'content-type': 'application/json', cookie: `voter=${voter}`, ...(ip ? { 'cf-connecting-ip': ip } : {}) },
    body: JSON.stringify({ slug: voteSlug, action }),
  });
}

async function hubCountsHydrationContract() {
  const res = await fetch(`${base}/use-cases/`);
  if (!res.ok) throw new Error(`hub page failed: ${res.status}`);
  const html = await res.text();
  const slugs = [...new Set([...html.matchAll(/data-vote-slug=\"([^\"]+)\"/g)].map((m) => m[1]))];
  if (slugs.length === 0) throw new Error('hub page has no data-vote-slug blocks');
  const chunk = slugs.slice(0, 50);
  const params = new URLSearchParams({ slugs: chunk.join(',') });
  const countRes = await json<{ counts: Record<string, number> }>(`/api/v1/votes/counts?${params.toString()}`);
  if (countRes.status !== 200) throw new Error(`hub counts batch failed: ${countRes.status}`);
  for (const s of chunk) {
    if (typeof countRes.data.counts?.[s] !== 'number') throw new Error(`missing hub count for ${s}`);
  }
  return { hub_vote_blocks: slugs.length, hub_checked_batch: chunk.length };
}

type UpvotedCard = { slug: string; score: number; addedAt: number };

function parseUpvotedCards(html: string): UpvotedCard[] {
  const cards = [
    ...html.matchAll(
      /data-upvoted-sort-card="true"[^>]*data-upvoted-sort-slug="([^"]+)"[^>]*data-upvoted-sort-score="([^"]+)"[^>]*data-upvoted-sort-added-at="([^"]+)"/g
    ),
  ].map((match) => ({
    slug: match[1],
    score: Number(match[2]),
    addedAt: Date.parse(match[3]),
  }));
  if (cards.length === 0) throw new Error('/use-cases/upvoted/ has no upvoted-sort cards');
  return cards;
}

function orderByUpvotes(cards: UpvotedCard[], countsBySlug: Record<string, number>) {
  return [...cards]
    .sort((a, b) => {
      const byCount = (countsBySlug[b.slug] ?? 0) - (countsBySlug[a.slug] ?? 0);
      if (byCount !== 0) return byCount;
      const byScore = b.score - a.score;
      if (byScore !== 0) return byScore;
      const byAddedAt = b.addedAt - a.addedAt;
      if (byAddedAt !== 0) return byAddedAt;
      return a.slug.localeCompare(b.slug);
    })
    .map((card) => card.slug);
}

function rank(order: string[], target: string) {
  return order.indexOf(target) + 1;
}

function chooseLowScoreSlugForTop(cards: UpvotedCard[], countsBySlug: Record<string, number>) {
  const lowScoreCandidates = [...cards]
    .sort((a, b) => a.score - b.score || a.addedAt - b.addedAt || a.slug.localeCompare(b.slug))
    .slice(0, Math.max(1, Math.ceil(cards.length * 0.2)));
  return lowScoreCandidates.sort(
    (a, b) =>
      (countsBySlug[b.slug] ?? 0) - (countsBySlug[a.slug] ?? 0) ||
      a.score - b.score ||
      a.addedAt - b.addedAt ||
      a.slug.localeCompare(b.slug)
  )[0];
}

async function browser(args: string[]) {
  const browserArgs = browserSession ? ['--session', browserSession, ...args] : args;
  const { stdout } = await execFileAsync('agent-browser', browserArgs, {
    timeout: 45_000,
    maxBuffer: 1024 * 1024,
  });
  return stdout.trim();
}

function parseBrowserJson<T>(stdout: string): T {
  const parsed = JSON.parse(stdout);
  if (typeof parsed !== 'string') return parsed as T;
  try {
    return JSON.parse(parsed) as T;
  } catch {
    return parsed as T;
  }
}

async function delay(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForUpvotedState(expected: 'ordering' | 'ready' | 'fallback', timeoutMs = 6_000) {
  const started = Date.now();
  let last: string | null = null;
  while (Date.now() - started < timeoutMs) {
    last = parseBrowserJson<string | null>(
      await browser(['eval', "document.querySelector('[data-upvoted-sort-root]')?.dataset.upvotedSortState ?? null"])
    );
    if (last === expected) return;
    await delay(100);
  }
  throw new Error(`timed out waiting for upvoted sort state ${expected}; last=${last}`);
}

function upvotedStateScript(target: string) {
  return `(() => {
    const target = ${JSON.stringify(target)};
    const root = document.querySelector('[data-upvoted-sort-root]');
    const status = document.querySelector('[data-upvoted-sort-status]');
    const cards = [...document.querySelectorAll('[data-upvoted-sort-card]')];
    const rootStyle = root ? getComputedStyle(root) : null;
    const statusStyle = status ? getComputedStyle(status) : null;
    return JSON.stringify({
      state: root?.dataset.upvotedSortState ?? null,
      hydrated: root?.dataset.upvotedSortHydrated === 'true',
      revealed: root?.dataset.upvotedSortRevealed === 'true',
      rootVisibility: rootStyle?.visibility ?? null,
      statusVisible: Boolean(status && !status.hidden && statusStyle?.display !== 'none' && statusStyle?.visibility !== 'hidden'),
      statusText: status?.textContent?.trim() ?? null,
      total: cards.length,
      first: cards[0]?.dataset.upvotedSortSlug ?? null,
      targetRank: cards.findIndex((card) => card.dataset.upvotedSortSlug === target) + 1,
      targetCount: Number(cards.find((card) => card.dataset.upvotedSortSlug === target)?.querySelector('[data-vote-count]')?.textContent ?? -1)
    });
  })()`;
}

async function upvotedRouteHidesUntilOrderedAfterApiCast() {
  const res = await fetch(`${base}/use-cases/upvoted/`);
  if (!res.ok) throw new Error(`/use-cases/upvoted/ failed: ${res.status}`);
  const html = await res.text();
  if (!html.includes('content="noindex,follow"')) throw new Error('/use-cases/upvoted/ is missing noindex,follow');
  if (!html.includes('/use-cases/upvoted/') || !html.includes('upvotes')) throw new Error('/use-cases/upvoted/ is missing the upvotes sort link');
  if (!html.includes('sorting by upvotes…')) throw new Error('/use-cases/upvoted/ is missing the ordering placeholder');
  if (!html.includes('<noscript>') || !html.includes('data-upvoted-sort-root') || !html.includes('visibility: visible')) {
    throw new Error('/use-cases/upvoted/ is missing the no-JS reveal fallback');
  }

  const cards = parseUpvotedCards(html);
  const countsBefore = await countsFor(cards.map((card) => card.slug));
  const target = chooseLowScoreSlugForTop(cards, countsBefore);
  if (!target) throw new Error('could not choose a low-score target for /use-cases/upvoted/');
  const maxBefore = Math.max(0, ...Object.values(countsBefore).map((value) => Number(value) || 0));
  const neededCasts = Math.max(1, maxBefore + 1 - (countsBefore[target.slug] ?? 0));

  for (let index = 0; index < neededCasts; index += 1) {
    const ip = e2eIp(index);
    const voter = await issueIdentity(ip);
    const cast = await voteWithCookie(voter, target.slug, 'cast', ip);
    if (cast.status !== 200 || !cast.data.ok || cast.data.slug !== target.slug || !cast.data.my_vote) {
      throw new Error(`upvoted-route cast failed: ${cast.status}`);
    }
  }

  const countsAfter = await countsFor(cards.map((card) => card.slug));
  const expectedAfterRank = rank(orderByUpvotes(cards, countsAfter), target.slug);
  if (expectedAfterRank !== 1) {
    throw new Error(`expected ${target.slug} to be rank 1 after seeding votes; got ${expectedAfterRank}`);
  }

  await browser(['open', `${base}/use-cases/upvoted/?e2e_sort_delay_ms=1800`]);
  const browserInitial = parseBrowserJson<{
    state: string | null;
    hydrated: boolean;
    revealed: boolean;
    rootVisibility: string | null;
    statusVisible: boolean;
    statusText: string | null;
    total: number;
    first: string | null;
    targetRank: number;
    targetCount: number;
  }>(await browser(['eval', upvotedStateScript(target.slug)]));
  if (browserInitial.total !== cards.length) throw new Error('browser did not render all upvoted route cards');

  // agent-browser's `open` can return after the 1.8s QA delay on a loaded daemon. If we catch the
  // pre-reveal state, assert placeholder + hidden grid; if it already revealed, assert that the
  // first visible card is the seeded upvote winner. The static HTML checks above cover the
  // no-JS/no-flicker default (`data-upvoted-sort-state="ordering"` + hidden grid).
  if (browserInitial.state === 'ordering') {
    if (browserInitial.rootVisibility !== 'hidden' || !browserInitial.statusVisible) {
      throw new Error(
        `upvoted route exposed fallback order before counts: state=${browserInitial.state} visibility=${browserInitial.rootVisibility} status=${browserInitial.statusVisible}`
      );
    }
  } else if (browserInitial.state === 'ready') {
    if (browserInitial.first !== target.slug || browserInitial.rootVisibility !== 'visible') {
      throw new Error(`first visible upvoted state was not the seeded winner: ${JSON.stringify(browserInitial)}`);
    }
  } else {
    throw new Error(
      `unexpected initial upvoted state: state=${browserInitial.state} visibility=${browserInitial.rootVisibility} status=${browserInitial.statusVisible}`
    );
  }

  if (browserInitial.state !== 'ready') await waitForUpvotedState('ready');
  const browserAfter = parseBrowserJson<{
    state: string | null;
    hydrated: boolean;
    revealed: boolean;
    rootVisibility: string | null;
    statusVisible: boolean;
    statusText: string | null;
    total: number;
    first: string | null;
    targetRank: number;
    targetCount: number;
  }>(
    await browser(['eval', upvotedStateScript(target.slug)])
  );
  if (!browserAfter.hydrated || !browserAfter.revealed || browserAfter.rootVisibility !== 'visible') {
    throw new Error(`browser did not reveal the ordered upvoted route: ${JSON.stringify(browserAfter)}`);
  }
  if (browserAfter.first !== target.slug) throw new Error(`first visible ordered card should be ${target.slug}; got ${browserAfter.first}`);
  if (browserAfter.targetRank !== 1) throw new Error(`browser rank mismatch for ${target.slug}: expected 1, got ${browserAfter.targetRank}`);
  if (browserAfter.targetCount !== countsAfter[target.slug]) {
    throw new Error(`browser count mismatch for ${target.slug}: expected ${countsAfter[target.slug]}, got ${browserAfter.targetCount}`);
  }

  return {
    upvoted_route_cards: cards.length,
    upvoted_route_target: target.slug,
    upvoted_route_target_score: target.score,
    upvoted_route_seeded_casts: neededCasts,
    upvoted_route_initial_state: browserInitial.state,
    upvoted_route_initial_visibility: browserInitial.rootVisibility,
    upvoted_route_placeholder_visible: browserInitial.statusVisible,
    upvoted_route_rank_after: browserAfter.targetRank,
    upvoted_route_count_after: browserAfter.targetCount,
  };
}

const before = await counts();
if (requireEmptyStart && before !== 0) {
  throw new Error(`expected ${slug} to start at 0 for E2E; got ${before}`);
}
const primaryIp = e2eIp(200);
const voter = await issueIdentity(primaryIp);

const cast = await voteWithCookie(voter, slug, 'cast', primaryIp);
if (cast.status !== 200 || !cast.data.ok || !cast.data.my_vote || !cast.data.voted) throw new Error(`cast failed: ${cast.status}`);
if (cast.data.slug !== slug) throw new Error(`cast returned wrong slug: ${cast.data.slug}`);
if ((cast.data.count ?? -1) !== before + 1) throw new Error(`count did not increment: before=${before} after=${cast.data.count}`);
if (requireEmptyStart && cast.data.count !== 1) throw new Error(`fresh cast count should be 1; got ${cast.data.count}`);

const mine = await json<{ slugs?: string[] }>('/api/v1/votes/mine', { headers: { cookie: `voter=${voter}` } });
if (mine.status !== 200 || !mine.data.slugs?.includes(slug)) throw new Error(`mine failed: ${mine.status}`);

const uncast = await voteWithCookie(voter, slug, 'uncast', primaryIp);
if (uncast.status !== 200 || !uncast.data.ok || uncast.data.my_vote || uncast.data.voted) throw new Error(`uncast failed: ${uncast.status}`);
if (uncast.data.slug !== slug) throw new Error(`uncast returned wrong slug: ${uncast.data.slug}`);
if ((uncast.data.count ?? -1) !== before) throw new Error(`count did not decrement: before=${before} after=${uncast.data.count}`);

const hub = await hubCountsHydrationContract();
const upvotedRoute = await upvotedRouteHidesUntilOrderedAfterApiCast();

console.log(JSON.stringify({
  ok: true,
  base,
  slug,
  count_before: before,
  count_after_cast: cast.data.count,
  count_after_uncast: uncast.data.count,
  post_response_contract: { slug: cast.data.slug, my_vote: cast.data.my_vote, count: cast.data.count },
  ...hub,
  ...upvotedRoute,
}, null, 2));
