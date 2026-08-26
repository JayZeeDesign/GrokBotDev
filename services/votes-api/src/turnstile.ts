import { TURNSTILE_TEST_SECRET } from './config.js';

export interface TurnstileResult {
  success: boolean;
  errorCodes?: string[];
}

export type TurnstileVerifier = (token: string, remoteIp: string) => Promise<TurnstileResult>;

export function createTurnstileVerifier(secret: string): TurnstileVerifier {
  return async (token: string, remoteIp: string) => {
    // Deterministic local/unit path for the official always-pass Turnstile test secret.
    if (secret === TURNSTILE_TEST_SECRET && token === 'test-token') return { success: true };

    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp && remoteIp !== 'unknown') body.set('remoteip', remoteIp);
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return { success: false, errorCodes: [`http_${response.status}`] };
    const parsed = (await response.json()) as { success?: boolean; 'error-codes'?: string[] };
    return { success: Boolean(parsed.success), errorCodes: parsed['error-codes'] };
  };
}
