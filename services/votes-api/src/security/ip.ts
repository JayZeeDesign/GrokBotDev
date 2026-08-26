import { createHmac } from 'node:crypto';
import { isIP } from 'node:net';
import type { Context } from 'hono';

export function clientIp(c: Context): string {
  const cf = c.req.header('cf-connecting-ip');
  if (cf) return cf.trim();
  const forwarded = c.req.header('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  const real = c.req.header('x-real-ip');
  if (real) return real.trim();
  return 'unknown';
}

export function hmacBuffer(value: string, pepper: string): Buffer {
  return createHmac('sha256', pepper).update(value).digest();
}

export function ipHash(ip: string, pepper: string): Buffer {
  return hmacBuffer(ip, pepper);
}

export function networkPrefix(ip: string): string {
  if (isIP(ip) === 4) {
    const parts = ip.split('.');
    return `${parts[0]}.${parts[1]}.${parts[2]}.0/24`;
  }
  if (isIP(ip) === 6) {
    const [head] = ip.split('%');
    const groups = head.toLowerCase().split(':');
    // v1 approximation: stable /48 grouping without pulling in a heavy IP library.
    return `${groups.slice(0, 3).join(':')}::/48`;
  }
  return 'unknown';
}

export function ip24Hash(ip: string, pepper: string): Buffer {
  return hmacBuffer(networkPrefix(ip), pepper);
}

export function uaHash(userAgent: string | undefined, pepper: string): Buffer {
  return hmacBuffer(userAgent || 'unknown', pepper);
}
