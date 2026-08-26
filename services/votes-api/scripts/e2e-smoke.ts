#!/usr/bin/env tsx
import { loadConfig } from '../src/config.js';
import { verifyVoterCookie } from '../src/security/cookies.js';

const cfg = loadConfig();
const base = (process.env.E2E_BASE_URL ?? 'https://grokbot-upvotes.anacreon.ai').replace(/\/$/, '');
const slug = process.env.E2E_SLUG ?? 'account-expert';
const token = process.env.E2E_TURNSTILE_TOKEN ?? 'test-token';
const requireEmptyStart = process.env.E2E_REQUIRE_EMPTY_START === '1';

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

const before = await counts();
if (requireEmptyStart && before !== 0) {
  throw new Error(`expected ${slug} to start at 0 for E2E; got ${before}`);
}
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

const cast = await json<{ ok?: boolean; slug?: string; my_vote?: boolean; count?: number; voted?: boolean; visible_count?: number }>('/api/v1/votes', {
  method: 'POST',
  headers: { 'content-type': 'application/json', cookie: `voter=${voter}` },
  body: JSON.stringify({ slug, action: 'cast' }),
});
if (cast.status !== 200 || !cast.data.ok || !cast.data.my_vote || !cast.data.voted) throw new Error(`cast failed: ${cast.status}`);
if (cast.data.slug !== slug) throw new Error(`cast returned wrong slug: ${cast.data.slug}`);
if ((cast.data.count ?? -1) !== before + 1) throw new Error(`count did not increment: before=${before} after=${cast.data.count}`);
if (requireEmptyStart && cast.data.count !== 1) throw new Error(`fresh cast count should be 1; got ${cast.data.count}`);

const mine = await json<{ slugs?: string[] }>('/api/v1/votes/mine', { headers: { cookie: `voter=${voter}` } });
if (mine.status !== 200 || !mine.data.slugs?.includes(slug)) throw new Error(`mine failed: ${mine.status}`);

const uncast = await json<{ ok?: boolean; slug?: string; my_vote?: boolean; count?: number; voted?: boolean; visible_count?: number }>('/api/v1/votes', {
  method: 'POST',
  headers: { 'content-type': 'application/json', cookie: `voter=${voter}` },
  body: JSON.stringify({ slug, action: 'uncast' }),
});
if (uncast.status !== 200 || !uncast.data.ok || uncast.data.my_vote || uncast.data.voted) throw new Error(`uncast failed: ${uncast.status}`);
if (uncast.data.slug !== slug) throw new Error(`uncast returned wrong slug: ${uncast.data.slug}`);
if ((uncast.data.count ?? -1) !== before) throw new Error(`count did not decrement: before=${before} after=${uncast.data.count}`);

const hub = await hubCountsHydrationContract();

console.log(JSON.stringify({
  ok: true,
  base,
  slug,
  count_before: before,
  count_after_cast: cast.data.count,
  count_after_uncast: uncast.data.count,
  post_response_contract: { slug: cast.data.slug, my_vote: cast.data.my_vote, count: cast.data.count },
  ...hub,
}, null, 2));
