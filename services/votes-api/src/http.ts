import type { Context, Next } from 'hono';

export async function requestTimeout(c: Context, next: Next) {
  const timeout = new Promise<Response>((resolve) => {
    setTimeout(() => resolve(c.json({ ok: false, error: 'request_timeout' }, 504)), 5000).unref();
  });
  return Promise.race([next().then(() => c.res), timeout]);
}

export function jsonError(c: Context, status: number, error: string, extra: Record<string, unknown> = {}) {
  return c.json({ ok: false, error, ...extra }, status as never);
}
