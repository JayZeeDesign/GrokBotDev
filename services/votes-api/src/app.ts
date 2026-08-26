import { Hono, type Context } from 'hono';
import { bodyLimit } from 'hono/body-limit';
import { getCookie, setCookie } from 'hono/cookie';
import { v7 as uuidv7 } from 'uuid';
import { z } from 'zod';
import type { Db } from './db/client.js';
import { appendVoteEvent } from './db/events.js';
import { clientIp, ip24Hash, ipHash, uaHash } from './security/ip.js';
import { makeVoterCookie, verifyVoterCookie } from './security/cookies.js';
import { decideWeight } from './weighting.js';
import { createLogger, type Logger } from './logger.js';
import { jsonError } from './http.js';
import { defaultLimits, MemoryRateLimiter } from './rate/limiter.js';
import type { SlugRegistry } from './slug/registry.js';
import type { TurnstileVerifier } from './turnstile.js';

const identityBodySchema = z.object({ turnstileToken: z.string().min(1).max(2048) }).strict();
const voteBodySchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9][a-z0-9-]{0,95}$/),
    action: z.enum(['cast', 'uncast']),
  })
  .strict();
const slugParamSchema = z.string().regex(/^[a-z0-9][a-z0-9-]{0,95}$/);

type Variables = {
  requestId: string;
  clientIp: string;
  ipHash: Buffer;
  ip24Hash: Buffer;
  uaHash: Buffer;
  identityId: string | null;
  identityCookiePresent: boolean;
};

type AppEnv = { Variables: Variables };

type Limits = typeof defaultLimits;

export interface CreateAppDeps {
  db: Db;
  slugRegistry: SlugRegistry;
  turnstileVerifier: TurnstileVerifier;
  pepper: string;
  logger?: Logger;
  limiter?: MemoryRateLimiter;
  limits?: Partial<Limits>;
}

function mergeLimits(overrides: Partial<Limits> | undefined): Limits {
  return {
    identityIp: overrides?.identityIp ?? defaultLimits.identityIp,
    voteIp: overrides?.voteIp ?? defaultLimits.voteIp,
    voteIdentity: overrides?.voteIdentity ?? defaultLimits.voteIdentity,
  };
}

async function jsonBody(c: Context) {
  try {
    return await c.req.json();
  } catch {
    return undefined;
  }
}

function cacheHeaders(c: any, value: string) {
  c.header('Cache-Control', value);
}

async function aggregateCount(sql: Db, slug: string) {
  const [row] = await sql<{ visibleCount: number; rawCount: number }[]>`
    select coalesce(sum(weight), 0)::int as visible_count, count(*)::int as raw_count
    from votes
    where slug = ${slug}
  `;
  return { visible_count: Number(row?.visibleCount ?? 0), raw_count: Number(row?.rawCount ?? 0) };
}

async function storedCount(sql: Db, slug: string) {
  const [row] = await sql<{ visibleCount: number; rawCount: number }[]>`
    select visible_count, raw_count from vote_counts where slug = ${slug}
  `;
  return { visible_count: Number(row?.visibleCount ?? 0), raw_count: Number(row?.rawCount ?? 0) };
}

async function upsertAggregateCount(sql: any, slug: string) {
  const [agg] = await sql<{ visibleCount: number; rawCount: number }[]>`
    select coalesce(sum(weight), 0)::int as visible_count, count(*)::int as raw_count
    from votes
    where slug = ${slug}
  `;
  const visible = Number(agg?.visibleCount ?? 0);
  const raw = Number(agg?.rawCount ?? 0);
  await sql`
    insert into vote_counts (slug, visible_count, raw_count, updated_at)
    values (${slug}, ${visible}, ${raw}, now())
    on conflict (slug) do update set
      visible_count = excluded.visible_count,
      raw_count = excluded.raw_count,
      updated_at = excluded.updated_at
  `;
  return { visible_count: visible, raw_count: raw };
}

async function ensureKnownSlug(slugRegistry: SlugRegistry, slug: string) {
  const parsed = slugParamSchema.safeParse(slug);
  return parsed.success && (await slugRegistry.has(parsed.data));
}

export function createApp(deps: CreateAppDeps) {
  const app = new Hono<AppEnv>();
  const logger = deps.logger ?? createLogger('info');
  const limiter = deps.limiter ?? new MemoryRateLimiter();
  const limits = mergeLimits(deps.limits);

  app.use('*', async (c, next) => {
    const requestId = crypto.randomUUID();
    c.set('requestId', requestId);
    const started = Date.now();
    try {
      await next();
    } catch (error) {
      logger.error('request_error', {
        request_id: requestId,
        method: c.req.method,
        path: new URL(c.req.url).pathname,
        error: error instanceof Error ? error.message : String(error),
      });
      return jsonError(c, 500, 'internal_error');
    } finally {
      logger.info('request', {
        request_id: requestId,
        method: c.req.method,
        path: new URL(c.req.url).pathname,
        status: c.res.status,
        duration_ms: Date.now() - started,
      });
    }
  });

  app.use('/api/v1/*', bodyLimit({
    maxSize: 1024,
    onError: (c) => jsonError(c, 413, 'body_too_large'),
  }));

  // rateLimit layer (route-aware; identity-specific vote limit runs after cookie verification).
  app.use('/api/v1/*', async (c, next) => {
    const ip = clientIp(c);
    const ipH = ipHash(ip, deps.pepper);
    const ip24H = ip24Hash(ip, deps.pepper);
    const uaH = uaHash(c.req.header('user-agent'), deps.pepper);
    c.set('clientIp', ip);
    c.set('ipHash', ipH);
    c.set('ip24Hash', ip24H);
    c.set('uaHash', uaH);

    const path = new URL(c.req.url).pathname;
    if (c.req.method === 'POST' && path === '/api/v1/identity') {
      const result = limiter.check(`identity:ip:${ipH.toString('hex')}`, limits.identityIp.max, limits.identityIp.windowMs);
      if (!result.allowed) {
        c.header('Retry-After', String(result.retryAfterSeconds));
        return jsonError(c, 429, 'rate_limited');
      }
    }
    if (c.req.method === 'POST' && path === '/api/v1/votes') {
      const result = limiter.check(`votes:ip:${ipH.toString('hex')}`, limits.voteIp.max, limits.voteIp.windowMs);
      if (!result.allowed) {
        c.header('Retry-After', String(result.retryAfterSeconds));
        return jsonError(c, 429, 'rate_limited');
      }
    }
    await next();
  });

  // identity layer (HMAC cookie parse only; handlers decide whether it is required).
  app.use('/api/v1/*', async (c, next) => {
    const cookie = getCookie(c, 'voter');
    c.set('identityCookiePresent', Boolean(cookie));
    c.set('identityId', verifyVoterCookie(cookie, deps.pepper));
    await next();
  });

  // reserved bearerAuth V2 seam. Human cookie auth is the only v1 path.
  app.use('/api/v1/*', async (_c, next) => {
    await next();
  });

  app.get('/api/v1/health', async (c) => {
    try {
      await deps.db`select 1`;
      return c.json({ ok: true, service: 'grokbot-votes-api', db: 'ok' });
    } catch {
      return c.json({ ok: false, service: 'grokbot-votes-api', db: 'down' }, 503);
    }
  });

  app.post('/api/v1/identity', async (c) => {
    const parsed = identityBodySchema.safeParse(await jsonBody(c));
    if (!parsed.success) return jsonError(c, 400, 'bad_request');

    const turnstile = await deps.turnstileVerifier(parsed.data.turnstileToken, c.get('clientIp'));
    if (!turnstile.success) return jsonError(c, 403, 'turnstile_failed');

    const id = uuidv7();
    await deps.db`
      insert into identities (id, kind, created_at, turnstile_passed_at)
      values (${id}, 'human', now(), now())
    `;
    setCookie(c, 'voter', makeVoterCookie(id, deps.pepper), {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      path: '/api',
      maxAge: 60 * 60 * 24 * 365 * 2,
    });
    return c.json({ ok: true });
  });

  app.post('/api/v1/votes', async (c) => {
    const identityId = c.get('identityId');
    if (!identityId) return jsonError(c, 401, 'unauthorized');

    const identityLimit = limiter.check(`votes:identity:${identityId}`, limits.voteIdentity.max, limits.voteIdentity.windowMs);
    if (!identityLimit.allowed) {
      c.header('Retry-After', String(identityLimit.retryAfterSeconds));
      return jsonError(c, 429, 'rate_limited');
    }

    const parsed = voteBodySchema.safeParse(await jsonBody(c));
    if (!parsed.success) return jsonError(c, 400, 'bad_request');
    const { slug, action } = parsed.data;
    if (!(await deps.slugRegistry.has(slug))) return jsonError(c, 400, 'unknown_slug');

    const result = await deps.db.begin(async (tx) => {
      const [identity] = await tx<{ id: string; createdAt: Date }[]>`
        select id, created_at from identities where id = ${identityId} and kind = 'human'
      `;
      if (!identity) return { unauthorized: true } as const;

      const [current] = await tx<{ weight: number }[]>`
        select weight from votes where identity_id = ${identityId} and slug = ${slug}
      `;

      if (action === 'cast' && current) {
        return { noOp: true as const, voted: true, counts: await upsertAggregateCount(tx, slug) };
      }
      if (action === 'uncast' && !current) {
        return { noOp: true as const, voted: false, counts: await upsertAggregateCount(tx, slug) };
      }

      if (action === 'cast') {
        const [identityEventCount] = await tx<{ n: number }[]>`
          select count(*)::int as n from vote_events where identity_id = ${identityId} and action = 'cast'
        `;
        const [ip24Casts] = await tx<{ n: number }[]>`
          select count(*)::int as n from vote_events where slug = ${slug} and action = 'cast' and ip24_hash = ${c.get('ip24Hash')}
        `;
        const [recent] = await tx<{ n: number }[]>`
          select count(*)::int as n from vote_events where slug = ${slug} and action = 'cast' and at >= now() - interval '10 minutes'
        `;
        const [baseline] = await tx<{ baseline: number | null }[]>`
          select (count(*)::float / 143.0)::float as baseline
          from vote_events
          where slug = ${slug}
            and action = 'cast'
            and at < now() - interval '10 minutes'
            and at >= now() - interval '24 hours'
        `;
        const decision = decideWeight({
          identityAgeSeconds: (Date.now() - new Date(identity.createdAt).getTime()) / 1000,
          firstVoteForIdentity: Number(identityEventCount?.n ?? 0) === 0,
          ip24SlugCastsBefore: Number(ip24Casts?.n ?? 0),
          slugRecentCasts10mIncludingThis: Number(recent?.n ?? 0) + 1,
          slugTrailingBaseline10m: Number(baseline?.baseline ?? 0),
          asn: null,
        });
        await appendVoteEvent(tx as any, {
          identityId,
          slug,
          action: 'cast',
          weight: decision.weight,
          ipHash: c.get('ipHash'),
          ip24Hash: c.get('ip24Hash'),
          uaHash: c.get('uaHash'),
          asn: null,
          signals: decision.signals,
        });
        await tx`
          insert into votes (identity_id, slug, weight, at)
          values (${identityId}, ${slug}, ${decision.weight}, now())
          on conflict (identity_id, slug) do update set weight = excluded.weight, at = excluded.at
        `;
        return {
          noOp: false as const,
          voted: true,
          weight: decision.weight,
          shadowed: decision.weight === 0,
          signals: decision.signals,
          counts: await upsertAggregateCount(tx, slug),
        };
      }

      await appendVoteEvent(tx as any, {
        identityId,
        slug,
        action: 'uncast',
        weight: 0,
        ipHash: c.get('ipHash'),
        ip24Hash: c.get('ip24Hash'),
        uaHash: c.get('uaHash'),
        asn: null,
        signals: { flags: [], reason: 'user_uncast' },
      });
      await tx`delete from votes where identity_id = ${identityId} and slug = ${slug}`;
      return { noOp: false as const, voted: false, weight: 0, shadowed: false, counts: await upsertAggregateCount(tx, slug) };
    });

    if ('unauthorized' in result) return jsonError(c, 401, 'unauthorized');
    return c.json({
      ok: true,
      voted: result.voted,
      no_op: result.noOp,
      count: result.counts.visible_count,
      visible_count: result.counts.visible_count,
      raw_count: result.counts.raw_count,
      ...('weight' in result ? { weight: result.weight, shadowed: result.shadowed } : {}),
    });
  });

  app.get('/api/v1/votes/counts', async (c) => {
    const slugsRaw = c.req.query('slugs') ?? '';
    const slugs = [...new Set(slugsRaw.split(',').map((s) => s.trim()).filter(Boolean))];
    if (!slugs.length || slugs.length > 50) return jsonError(c, 400, 'bad_request');
    for (const slug of slugs) {
      if (!(await ensureKnownSlug(deps.slugRegistry, slug))) return jsonError(c, 400, 'unknown_slug');
    }
    const rows = await deps.db<{ slug: string; visibleCount: number }[]>`
      select slug, visible_count from vote_counts where slug in ${deps.db(slugs)}
    `;
    const counts: Record<string, number> = Object.fromEntries(slugs.map((slug) => [slug, 0]));
    for (const row of rows) counts[row.slug] = Number(row.visibleCount ?? 0);
    cacheHeaders(c, 'public, max-age=60, stale-while-revalidate=300');
    return c.json({ counts });
  });

  app.get('/api/v1/votes/mine', async (c) => {
    const identityId = c.get('identityId');
    if (!identityId) {
      cacheHeaders(c, 'private, no-store');
      return jsonError(c, 401, 'unauthorized');
    }
    const rows = await deps.db<{ slug: string }[]>`
      select slug from votes where identity_id = ${identityId} order by slug asc
    `;
    cacheHeaders(c, 'private, no-store');
    return c.json({ slugs: rows.map((row) => row.slug) });
  });

  app.notFound((c) => jsonError(c, 404, 'not_found'));

  return app;
}
