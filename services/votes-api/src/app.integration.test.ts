import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { v7 as uuidv7 } from 'uuid';
import { createApp } from './app.js';
import { loadConfig } from './config.js';
import { connect, type Db } from './db/client.js';
import { migrate } from './db/migrate.js';
import { verifyLedger } from './db/recount-core.js';
import { MemoryRateLimiter } from './rate/limiter.js';
import { makeVoterCookie, verifyVoterCookie } from './security/cookies.js';
import { SlugRegistry } from './slug/registry.js';

const cfg = loadConfig({ pepper: 'test-pepper-test-pepper-test-pepper' });
const silentLogger = { debug() {}, info() {}, warn() {}, error() {} };

let adminDb: Db;
let appDb: Db;
let slugDir: string;
let registry: SlugRegistry;

async function resetDb() {
  await adminDb.begin(async (tx) => {
    await tx`delete from votes`;
    await tx`delete from vote_counts`;
    await tx`delete from audit_log`;
    await tx`delete from vote_events`;
    await tx`delete from api_keys`;
    await tx`delete from identities`;
  });
}

function makeApp(limits = {}) {
  return createApp({
    db: appDb,
    slugRegistry: registry,
    pepper: cfg.pepper,
    logger: silentLogger,
    limiter: new MemoryRateLimiter(),
    limits,
    turnstileVerifier: async () => ({ success: true }),
  });
}

async function issueIdentity(app = makeApp(), ip = '203.0.113.10') {
  const res = await app.request('/api/v1/identity', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'cf-connecting-ip': ip },
    body: JSON.stringify({ turnstileToken: 'test-token' }),
  });
  expect(res.status).toBe(200);
  const setCookie = res.headers.get('set-cookie') ?? '';
  const cookie = /voter=([^;]+)/.exec(setCookie)?.[1];
  expect(cookie).toBeTruthy();
  const identityId = verifyVoterCookie(cookie, cfg.pepper);
  expect(identityId).toBeTruthy();
  return { cookie: `voter=${cookie}`, identityId: identityId! };
}

async function ageIdentity(identityId: string) {
  await adminDb`update identities set created_at = now() - interval '2 minutes' where id = ${identityId}`;
}

beforeAll(async () => {
  slugDir = await mkdtemp(join(tmpdir(), 'grokbot-votes-slugs-'));
  for (const slug of ['test-use-case', 'second-use-case', 'third-use-case']) {
    await writeFile(join(slugDir, `${slug}.md`), '---\nstatus: live\n---\n');
  }
  registry = new SlugRegistry({ contentDir: slugDir, refreshMs: 1 });
  await migrate();
  adminDb = connect(cfg.adminDatabaseUrl, 1);
  appDb = connect(cfg.databaseUrl, 2);
  await resetDb();
});

afterAll(async () => {
  await adminDb?.end({ timeout: 5 });
  await appDb?.end({ timeout: 5 });
  await rm(slugDir, { recursive: true, force: true });
});

beforeEach(async () => {
  await resetDb();
});

describe('votes API integration', () => {
  it('issues identity, casts, dedupes, uncasts, recasts, and verifies counts + hash chain', async () => {
    const app = makeApp();
    const { cookie } = await issueIdentity(app);

    const cast = await app.request('/api/v1/votes', {
      method: 'POST',
      headers: { 'content-type': 'application/json', cookie, 'cf-connecting-ip': '203.0.113.10' },
      body: JSON.stringify({ slug: 'test-use-case', action: 'cast' }),
    });
    expect(cast.status).toBe(200);
    expect(await cast.json()).toMatchObject({
      ok: true,
      slug: 'test-use-case',
      my_vote: true,
      voted: true,
      no_op: false,
      count: 1,
      visible_count: 1,
      raw_count: 1,
      weight: 1,
    });
    const [castEvent] = await adminDb<{ signals: { young_identity?: boolean; flags?: string[] } }[]>`
      select signals from vote_events where slug = 'test-use-case' and action = 'cast' order by seq asc limit 1
    `;
    expect(castEvent.signals.young_identity).toBe(true);
    expect(castEvent.signals.flags).toEqual([]);

    const duplicate = await app.request('/api/v1/votes', {
      method: 'POST',
      headers: { 'content-type': 'application/json', cookie, 'cf-connecting-ip': '203.0.113.10' },
      body: JSON.stringify({ slug: 'test-use-case', action: 'cast' }),
    });
    expect(duplicate.status).toBe(200);
    expect(await duplicate.json()).toMatchObject({
      ok: true,
      slug: 'test-use-case',
      my_vote: true,
      voted: true,
      no_op: true,
      count: 1,
      visible_count: 1,
      raw_count: 1,
    });

    const uncast = await app.request('/api/v1/votes', {
      method: 'POST',
      headers: { 'content-type': 'application/json', cookie, 'cf-connecting-ip': '203.0.113.10' },
      body: JSON.stringify({ slug: 'test-use-case', action: 'uncast' }),
    });
    expect(uncast.status).toBe(200);
    expect(await uncast.json()).toMatchObject({
      ok: true,
      slug: 'test-use-case',
      my_vote: false,
      voted: false,
      no_op: false,
      count: 0,
      visible_count: 0,
      raw_count: 0,
    });

    const recast = await app.request('/api/v1/votes', {
      method: 'POST',
      headers: { 'content-type': 'application/json', cookie, 'cf-connecting-ip': '203.0.113.10' },
      body: JSON.stringify({ slug: 'test-use-case', action: 'cast' }),
    });
    expect(recast.status).toBe(200);
    expect(await recast.json()).toMatchObject({
      ok: true,
      slug: 'test-use-case',
      my_vote: true,
      voted: true,
      count: 1,
      visible_count: 1,
      raw_count: 1,
    });

    const counts = await app.request('/api/v1/votes/counts?slugs=test-use-case,second-use-case');
    expect(counts.status).toBe(200);
    expect(counts.headers.get('cache-control')).toContain('max-age=60');
    expect(await counts.json()).toEqual({ counts: { 'test-use-case': 1, 'second-use-case': 0 } });

    const mine = await app.request('/api/v1/votes/mine', { headers: { cookie } });
    expect(mine.status).toBe(200);
    expect(await mine.json()).toEqual({ slugs: ['test-use-case'] });

    expect(await verifyLedger(adminDb)).toMatchObject({ ok: true, events: 3 });
  });

  it('rejects unknown slugs and forged cookies', async () => {
    const app = makeApp();
    const unknown = await app.request('/api/v1/votes/counts?slugs=no-such-use-case');
    expect(unknown.status).toBe(400);

    const forgedId = uuidv7();
    const forged = `voter=${makeVoterCookie(forgedId, cfg.pepper).replace(/.$/, '0')}`;
    const vote = await app.request('/api/v1/votes', {
      method: 'POST',
      headers: { 'content-type': 'application/json', cookie: forged },
      body: JSON.stringify({ slug: 'test-use-case', action: 'cast' }),
    });
    expect(vote.status).toBe(401);
  });

  it('fires 429 identity and vote rate limits', async () => {
    const app = makeApp({
      identityIp: { max: 1, windowMs: 60_000 },
      voteIp: { max: 2, windowMs: 60_000 },
      voteIdentity: { max: 2, windowMs: 60_000 },
    });
    await issueIdentity(app, '198.51.100.2');
    const blockedIdentity = await app.request('/api/v1/identity', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'cf-connecting-ip': '198.51.100.2' },
      body: JSON.stringify({ turnstileToken: 'test-token' }),
    });
    expect(blockedIdentity.status).toBe(429);

    const { cookie, identityId } = await issueIdentity(app, '198.51.100.3');
    await ageIdentity(identityId);
    for (const slug of ['test-use-case', 'second-use-case']) {
      const res = await app.request('/api/v1/votes', {
        method: 'POST',
        headers: { 'content-type': 'application/json', cookie, 'cf-connecting-ip': '198.51.100.3' },
        body: JSON.stringify({ slug, action: 'cast' }),
      });
      expect(res.status).toBe(200);
    }
    const blockedVote = await app.request('/api/v1/votes', {
      method: 'POST',
      headers: { 'content-type': 'application/json', cookie, 'cf-connecting-ip': '198.51.100.3' },
      body: JSON.stringify({ slug: 'third-use-case', action: 'cast' }),
    });
    expect(blockedVote.status).toBe(429);
  });

  it('enforces that votes_app cannot update/delete vote_events', async () => {
    const app = makeApp();
    const { cookie, identityId } = await issueIdentity(app);
    await ageIdentity(identityId);
    const cast = await app.request('/api/v1/votes', {
      method: 'POST',
      headers: { 'content-type': 'application/json', cookie, 'cf-connecting-ip': '203.0.113.44' },
      body: JSON.stringify({ slug: 'test-use-case', action: 'cast' }),
    });
    expect(cast.status).toBe(200);

    await expect(appDb`update vote_events set weight = 0 where seq = 1`).rejects.toThrow(/permission denied/i);
    await expect(appDb`delete from vote_events where seq = 1`).rejects.toThrow(/permission denied/i);
  });
});
