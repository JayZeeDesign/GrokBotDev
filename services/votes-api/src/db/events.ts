import type { PendingQuery, Row } from 'postgres';
import { rowHash } from './hash-chain.js';

type Sql = <T extends Row[] = Row[]>(strings: TemplateStringsArray, ...args: unknown[]) => PendingQuery<T>;

export interface AppendEventInput {
  identityId: string;
  slug: string;
  action: 'cast' | 'uncast';
  weight: number;
  ipHash: Buffer;
  ip24Hash: Buffer;
  uaHash: Buffer;
  asn: number | null;
  signals: Record<string, unknown>;
}

const CHAIN_LOCK_KEY = 4391_2026;

export async function appendVoteEvent(sql: Sql, input: AppendEventInput) {
  await sql`select pg_advisory_xact_lock(${CHAIN_LOCK_KEY})`;
  const [last] = await sql<{ rowHash: Buffer | null }[]>`select row_hash from vote_events order by seq desc limit 1`;
  const prevHash = last?.rowHash ? Buffer.from(last.rowHash) : Buffer.alloc(32, 0);
  const [seqRow] = await sql<{ seq: string }[]>`select nextval('vote_events_seq_seq')::text as seq`;
  const at = new Date();
  const payload = {
    seq: seqRow.seq,
    at,
    identityId: input.identityId,
    slug: input.slug,
    action: input.action,
    weight: input.weight,
    ipHash: input.ipHash,
    ip24Hash: input.ip24Hash,
    uaHash: input.uaHash,
    asn: input.asn,
    signals: input.signals,
  };
  const hash = rowHash(prevHash, payload);
  await sql`
    insert into vote_events (seq, at, identity_id, slug, action, weight, ip_hash, ip24_hash, ua_hash, asn, signals, prev_hash, row_hash)
    values (${seqRow.seq}, ${at.toISOString()}, ${input.identityId}, ${input.slug}, ${input.action}, ${input.weight}, ${input.ipHash}, ${input.ip24Hash}, ${input.uaHash}, ${input.asn}, ${(sql as any).json(input.signals)}, ${prevHash}, ${hash})
  `;
  return { seq: seqRow.seq, at, rowHash: hash, prevHash };
}
