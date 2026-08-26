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

async function issueIdentity() {
  const identity = await json<{ ok?: boolean }>('/api/v1/identity', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ turnstileToken: token }),
  });
  if (identity.status !== 200 || !identity.data.ok) throw new Error(`identity failed: ${identity.status}`);
  const voter = /voter=([^;]+)/.exec(identity.headers.get('set-cookie') ?? '')?.[1];
  if (!voter) throw new Error('identity did not set voter cookie');
  const identityId = verifyVoterCookie(voter, cfg.pepper);
  if (!identityId) throw new Error('identity cookie did not verify locally');
  return voter;
}

async function voteWithCookie(voter: string, voteSlug: string, action: 'cast' | 'uncast') {
  return json<{ ok?: boolean; slug?: string; my_vote?: boolean; count?: number; voted?: boolean; visible_count?: number }>('/api/v1/votes', {
    method: 'POST',
    headers: { 'content-type': 'application/json', cookie: `voter=${voter}` },
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

function chooseLowScoreSlugThatMoves(cards: UpvotedCard[], countsBySlug: Record<string, number>) {
  const beforeOrder = orderByUpvotes(cards, countsBySlug);
  const lowScoreFirst = [...cards].sort((a, b) => a.score - b.score || a.addedAt - b.addedAt || a.slug.localeCompare(b.slug));
  for (const card of lowScoreFirst) {
    const beforeRank = rank(beforeOrder, card.slug);
    const simulated = { ...countsBySlug, [card.slug]: (countsBySlug[card.slug] ?? 0) + 1 };
    const afterOrder = orderByUpvotes(cards, simulated);
    const afterRank = rank(afterOrder, card.slug);
    if (afterRank > 0 && afterRank < beforeRank) {
      return { slug: card.slug, score: card.score, beforeRank, expectedAfterRank: afterRank };
    }
  }
  throw new Error('could not find a low-score slug that moves after one API cast');
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
  return (typeof parsed === 'string' ? JSON.parse(parsed) : parsed) as T;
}

function rankScript(target: string) {
  return `(() => {
    const target = ${JSON.stringify(target)};
    const cards = [...document.querySelectorAll('[data-upvoted-sort-card]')];
    return JSON.stringify({
      hydrated: document.querySelector('[data-upvoted-sort-root]')?.dataset.upvotedSortHydrated === 'true',
      total: cards.length,
      first: cards[0]?.dataset.upvotedSortSlug ?? null,
      targetRank: cards.findIndex((card) => card.dataset.upvotedSortSlug === target) + 1,
      targetCount: Number(cards.find((card) => card.dataset.upvotedSortSlug === target)?.querySelector('[data-vote-count]')?.textContent ?? -1)
    });
  })()`;
}

async function upvotedRouteReordersAfterApiCast() {
  const res = await fetch(`${base}/use-cases/upvoted/`);
  if (!res.ok) throw new Error(`/use-cases/upvoted/ failed: ${res.status}`);
  const html = await res.text();
  if (!html.includes('content="noindex,follow"')) throw new Error('/use-cases/upvoted/ is missing noindex,follow');
  if (!html.includes('/use-cases/upvoted/') || !html.includes('upvotes')) throw new Error('/use-cases/upvoted/ is missing the upvotes sort link');

  const cards = parseUpvotedCards(html);
  const countsBefore = await countsFor(cards.map((card) => card.slug));
  const target = chooseLowScoreSlugThatMoves(cards, countsBefore);

  await browser(['open', `${base}/use-cases/upvoted/`]);
  await browser(['wait', '--fn', "document.querySelector('[data-upvoted-sort-root]')?.dataset.upvotedSortHydrated === 'true'"]);
  const browserBefore = parseBrowserJson<{ hydrated: boolean; total: number; first: string | null; targetRank: number; targetCount: number }>(
    await browser(['eval', rankScript(target.slug)])
  );
  if (!browserBefore.hydrated || browserBefore.total !== cards.length) throw new Error('browser did not hydrate the upvoted route');

  const voter = await issueIdentity();
  const cast = await voteWithCookie(voter, target.slug, 'cast');
  if (cast.status !== 200 || !cast.data.ok || cast.data.slug !== target.slug || !cast.data.my_vote) {
    throw new Error(`upvoted-route cast failed: ${cast.status}`);
  }

  const countsAfter = await countsFor(cards.map((card) => card.slug));
  const expectedAfterRank = rank(orderByUpvotes(cards, countsAfter), target.slug);
  if (expectedAfterRank <= 0 || expectedAfterRank >= browserBefore.targetRank) {
    throw new Error(`expected ${target.slug} to move up; before=${browserBefore.targetRank} expectedAfter=${expectedAfterRank}`);
  }

  await browser(['reload']);
  await browser(['wait', '--fn', "document.querySelector('[data-upvoted-sort-root]')?.dataset.upvotedSortHydrated === 'true'"]);
  const browserAfter = parseBrowserJson<{ hydrated: boolean; total: number; first: string | null; targetRank: number; targetCount: number }>(
    await browser(['eval', rankScript(target.slug)])
  );
  if (!browserAfter.hydrated) throw new Error('browser lost hydrated state after upvoted route reload');
  if (browserAfter.targetRank !== expectedAfterRank) {
    throw new Error(`browser rank mismatch for ${target.slug}: expected ${expectedAfterRank}, got ${browserAfter.targetRank}`);
  }
  if (browserAfter.targetRank >= browserBefore.targetRank) {
    throw new Error(`browser did not move ${target.slug} up: before=${browserBefore.targetRank} after=${browserAfter.targetRank}`);
  }
  if (browserAfter.targetCount !== countsAfter[target.slug]) {
    throw new Error(`browser count mismatch for ${target.slug}: expected ${countsAfter[target.slug]}, got ${browserAfter.targetCount}`);
  }

  return {
    upvoted_route_cards: cards.length,
    upvoted_route_target: target.slug,
    upvoted_route_target_score: target.score,
    upvoted_route_rank_before: browserBefore.targetRank,
    upvoted_route_rank_after: browserAfter.targetRank,
    upvoted_route_count_after: browserAfter.targetCount,
  };
}

const before = await counts();
if (requireEmptyStart && before !== 0) {
  throw new Error(`expected ${slug} to start at 0 for E2E; got ${before}`);
}
const voter = await issueIdentity();

const cast = await voteWithCookie(voter, slug, 'cast');
if (cast.status !== 200 || !cast.data.ok || !cast.data.my_vote || !cast.data.voted) throw new Error(`cast failed: ${cast.status}`);
if (cast.data.slug !== slug) throw new Error(`cast returned wrong slug: ${cast.data.slug}`);
if ((cast.data.count ?? -1) !== before + 1) throw new Error(`count did not increment: before=${before} after=${cast.data.count}`);
if (requireEmptyStart && cast.data.count !== 1) throw new Error(`fresh cast count should be 1; got ${cast.data.count}`);

const mine = await json<{ slugs?: string[] }>('/api/v1/votes/mine', { headers: { cookie: `voter=${voter}` } });
if (mine.status !== 200 || !mine.data.slugs?.includes(slug)) throw new Error(`mine failed: ${mine.status}`);

const uncast = await voteWithCookie(voter, slug, 'uncast');
if (uncast.status !== 200 || !uncast.data.ok || uncast.data.my_vote || uncast.data.voted) throw new Error(`uncast failed: ${uncast.status}`);
if (uncast.data.slug !== slug) throw new Error(`uncast returned wrong slug: ${uncast.data.slug}`);
if ((uncast.data.count ?? -1) !== before) throw new Error(`count did not decrement: before=${before} after=${uncast.data.count}`);

const hub = await hubCountsHydrationContract();
const upvotedRoute = await upvotedRouteReordersAfterApiCast();

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
