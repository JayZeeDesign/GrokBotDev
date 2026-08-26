import type { Db } from './client.js';
import { rowHash, hex } from './hash-chain.js';

export interface LedgerVerification {
  ok: boolean;
  events: number;
  errors: string[];
}

export async function verifyLedger(sql: Db): Promise<LedgerVerification> {
  const rows = await sql<{
    seq: string;
    at: Date;
    identityId: string;
    slug: string;
    action: 'cast' | 'uncast';
    weight: number;
    ipHash: Buffer;
    ip24Hash: Buffer;
    uaHash: Buffer;
    asn: number | null;
    signals: unknown;
    prevHash: Buffer;
    rowHash: Buffer;
  }[]>`
    select seq::text, at, identity_id, slug, action, weight, ip_hash, ip24_hash, ua_hash, asn, signals, prev_hash, row_hash
    from vote_events
    order by seq asc
  `;

  const errors: string[] = [];
  let expectedPrev = Buffer.alloc(32, 0);
  for (const row of rows) {
    const storedPrev = Buffer.from(row.prevHash);
    if (hex(storedPrev) !== hex(expectedPrev)) {
      errors.push(`seq ${row.seq}: prev_hash mismatch expected ${hex(expectedPrev)} got ${hex(storedPrev)}`);
    }
    const expectedRow = rowHash(storedPrev, {
      seq: row.seq,
      at: row.at,
      identityId: row.identityId,
      slug: row.slug,
      action: row.action,
      weight: Number(row.weight),
      ipHash: row.ipHash,
      ip24Hash: row.ip24Hash,
      uaHash: row.uaHash,
      asn: row.asn,
      signals: row.signals,
    });
    if (hex(expectedRow) !== hex(row.rowHash)) {
      errors.push(`seq ${row.seq}: row_hash mismatch expected ${hex(expectedRow)} got ${hex(row.rowHash)}`);
    }
    expectedPrev = Buffer.from(row.rowHash);
  }
  return { ok: errors.length === 0, events: rows.length, errors };
}

async function flagDecisions(sql: Db) {
  const rows = await sql<{ target: string; action: string; at: Date }[]>`
    select distinct on (target) target, action, at
    from audit_log
    where action in ('bless_flag', 'bury_flag')
    order by target, at desc, id desc
  `;
  const blessed = new Set<string>();
  const buried = new Set<string>();
  for (const row of rows) {
    if (row.action === 'bless_flag') blessed.add(row.target);
    if (row.action === 'bury_flag') buried.add(row.target);
  }
  return { blessed, buried };
}

function signalFlags(signals: unknown): string[] {
  if (!signals || typeof signals !== 'object') return [];
  const raw = (signals as { flags?: unknown }).flags;
  return Array.isArray(raw) ? raw.filter((flag): flag is string => typeof flag === 'string') : [];
}

function effectiveWeight(slug: string, storedWeight: number, signals: unknown, decisions: Awaited<ReturnType<typeof flagDecisions>>) {
  const flags = signalFlags(signals);
  if (!flags.length || storedWeight > 0) return storedWeight;
  const targets = flags.map((flag) => `${slug}:${flag}`);
  if (targets.some((target) => decisions.buried.has(target))) return 0;
  return targets.every((target) => decisions.blessed.has(target)) ? 1 : 0;
}

export async function rebuildMaterializedVotes(sql: Db) {
  const rows = await sql<{
    seq: string;
    at: Date;
    identityId: string;
    slug: string;
    action: 'cast' | 'uncast';
    weight: number;
    signals: unknown;
  }[]>`
    select seq::text, at, identity_id, slug, action, weight, signals
    from vote_events
    order by seq asc
  `;
  const decisions = await flagDecisions(sql);

  const current = new Map<string, { identityId: string; slug: string; weight: number; at: Date }>();
  for (const row of rows) {
    const key = `${row.identityId}\u0000${row.slug}`;
    if (row.action === 'cast') {
      current.set(key, {
        identityId: row.identityId,
        slug: row.slug,
        weight: effectiveWeight(row.slug, Number(row.weight), row.signals, decisions),
        at: row.at,
      });
    } else current.delete(key);
  }

  await sql.begin(async (tx) => {
    await tx`delete from vote_counts`;
    await tx`delete from votes`;
    for (const vote of current.values()) {
      await tx`
        insert into votes (identity_id, slug, weight, at)
        values (${vote.identityId}, ${vote.slug}, ${vote.weight}, ${vote.at.toISOString()})
      `;
    }
    const counts = await tx<{ slug: string; visibleCount: number; rawCount: number }[]>`
      select slug, coalesce(sum(weight), 0)::int as visible_count, count(*)::int as raw_count
      from votes
      group by slug
    `;
    for (const count of counts) {
      await tx`
        insert into vote_counts (slug, visible_count, raw_count, updated_at)
        values (${count.slug}, ${Number(count.visibleCount)}, ${Number(count.rawCount)}, now())
      `;
    }
  });

  return { currentVotes: current.size };
}
