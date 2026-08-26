import { createHmac, timingSafeEqual } from 'node:crypto';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';

const COOKIE_RE = /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.([0-9a-f]{64})$/i;

export function signIdentity(identityId: string, pepper: string): string {
  return createHmac('sha256', pepper).update(identityId).digest('hex');
}

export function makeVoterCookie(identityId: string, pepper: string): string {
  return `${identityId}.${signIdentity(identityId, pepper)}`;
}

export function verifyVoterCookie(value: string | undefined, pepper: string): string | null {
  if (!value) return null;
  const match = COOKIE_RE.exec(value.trim());
  if (!match) return null;
  const identityId = match[1].toLowerCase();
  const mac = match[2].toLowerCase();
  if (!uuidValidate(identityId) || uuidVersion(identityId) !== 7) return null;
  const expected = signIdentity(identityId, pepper);
  const a = Buffer.from(mac, 'hex');
  const b = Buffer.from(expected, 'hex');
  if (a.length !== b.length) return null;
  return timingSafeEqual(a, b) ? identityId : null;
}
