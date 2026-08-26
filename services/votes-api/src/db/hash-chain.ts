import { createHash } from 'node:crypto';

export interface EventPayload {
  seq: string | number | bigint;
  at: string | Date;
  identityId: string;
  slug: string;
  action: 'cast' | 'uncast';
  weight: number;
  ipHash: Buffer | Uint8Array | string;
  ip24Hash: Buffer | Uint8Array | string;
  uaHash: Buffer | Uint8Array | string;
  asn: number | null;
  signals: unknown;
}

function bytesHex(value: Buffer | Uint8Array | string): string {
  if (typeof value === 'string') return value.startsWith('\\x') ? value.slice(2).toLowerCase() : value.toLowerCase();
  return Buffer.from(value).toString('hex');
}

function normalize(value: unknown): unknown {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'bigint') return value.toString();
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return Object.fromEntries(Object.keys(record).sort().map((key) => [key, normalize(record[key])]));
  }
  return value;
}

export function canonicalJson(value: unknown): string {
  return JSON.stringify(normalize(value));
}

export function chainPayload(event: EventPayload) {
  return {
    action: event.action,
    asn: event.asn,
    at: event.at instanceof Date ? event.at.toISOString() : new Date(event.at).toISOString(),
    identity_id: event.identityId,
    ip24_hash: bytesHex(event.ip24Hash),
    ip_hash: bytesHex(event.ipHash),
    seq: event.seq.toString(),
    signals: event.signals ?? {},
    slug: event.slug,
    ua_hash: bytesHex(event.uaHash),
    weight: event.weight,
  };
}

export function rowHash(prevHash: Buffer | Uint8Array | null, event: EventPayload): Buffer {
  const prev = prevHash ? Buffer.from(prevHash) : Buffer.alloc(32, 0);
  return createHash('sha256').update(prev).update(canonicalJson(chainPayload(event))).digest();
}

export function hex(value: Buffer | Uint8Array | string | null | undefined): string | null {
  if (!value) return null;
  if (typeof value === 'string') return value.startsWith('\\x') ? value.slice(2).toLowerCase() : value.toLowerCase();
  return Buffer.from(value).toString('hex');
}
