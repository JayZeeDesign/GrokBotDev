type CountResponse = { counts?: Record<string, number> };
type MineResponse = { slugs?: string[] };
type VoteResponse = { ok?: boolean; voted?: boolean; visible_count?: number; count?: number; error?: string };

declare global {
  interface Window {
    turnstile?: {
      render: (target: HTMLElement, options: Record<string, unknown>) => string;
      execute: (widgetId: string) => void;
      remove?: (widgetId: string) => void;
    };
    __grokbotTurnstilePromise?: Promise<void>;
  }
}

const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (window.__grokbotTurnstilePromise) return window.__grokbotTurnstilePromise;
  window.__grokbotTurnstilePromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('turnstile_load_failed')), { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = TURNSTILE_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('turnstile_load_failed'));
    document.head.appendChild(script);
  });
  return window.__grokbotTurnstilePromise;
}

async function turnstileToken(root: HTMLElement, sitekey: string): Promise<string> {
  await loadTurnstile();
  if (!window.turnstile) throw new Error('turnstile_unavailable');
  const box = root.querySelector<HTMLElement>('[data-upvote-turnstile]');
  if (!box) throw new Error('turnstile_mount_missing');
  box.innerHTML = '';
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error('turnstile_timeout')), 10_000);
    const widgetId = window.turnstile!.render(box, {
      sitekey,
      size: 'invisible',
      callback: (token: string) => {
        window.clearTimeout(timeout);
        resolve(token);
        window.turnstile?.remove?.(widgetId);
      },
      'error-callback': () => {
        window.clearTimeout(timeout);
        reject(new Error('turnstile_error'));
        window.turnstile?.remove?.(widgetId);
      },
      'expired-callback': () => {
        window.clearTimeout(timeout);
        reject(new Error('turnstile_expired'));
        window.turnstile?.remove?.(widgetId);
      },
    });
    window.turnstile!.execute(widgetId);
  });
}

async function postJson<T>(url: string, body?: unknown): Promise<{ status: number; data: T | null }> {
  const res = await fetch(url, {
    method: body ? 'POST' : 'GET',
    credentials: 'same-origin',
    headers: body ? { 'content-type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  let data: T | null = null;
  try {
    data = (await res.json()) as T;
  } catch {
    data = null;
  }
  return { status: res.status, data };
}

function render(button: HTMLButtonElement, countSlot: HTMLElement, live: HTMLElement, state: { voted: boolean; count: number | null; busy: boolean; error?: string }) {
  const countLabel = state.count == null ? '' : state.count >= 3 ? String(state.count) : 'be the first';
  const verb = state.voted ? 'upvoted' : 'upvote';
  const label = state.busy ? 'saving…' : state.error ? 'retry upvote' : `▲ ${verb}${countLabel ? ` · ${countLabel}` : ''}`;
  button.textContent = label;
  button.disabled = state.busy;
  button.setAttribute('aria-pressed', state.voted ? 'true' : 'false');
  button.dataset.voted = state.voted ? 'true' : 'false';
  button.closest<HTMLElement>('[data-upvote-root]')?.setAttribute('data-upvote-state', state.voted ? 'voted' : 'idle');
  countSlot.textContent = countLabel;
  live.textContent = state.error ? 'Upvote failed. Try again.' : state.busy ? 'Saving upvote.' : state.voted ? 'Upvoted.' : 'Upvote ready.';
}

async function hydrate(root: HTMLElement) {
  if (root.dataset.upvoteReady === 'true') return;
  root.dataset.upvoteReady = 'true';
  const slug = root.dataset.slug;
  const sitekey = root.dataset.sitekey;
  const button = root.querySelector<HTMLButtonElement>('[data-upvote-button]');
  const countSlot = root.querySelector<HTMLElement>('[data-upvote-count]');
  const live = root.querySelector<HTMLElement>('[data-upvote-live]');
  if (!slug || !sitekey || !button || !countSlot || !live) return;

  const state = { voted: false, count: null as number | null, busy: false, error: undefined as string | undefined };
  root.hidden = false;
  render(button, countSlot, live, state);

  const counts = await postJson<CountResponse>(`/api/v1/votes/counts?slugs=${encodeURIComponent(slug)}`);
  if (counts.status === 200 && counts.data?.counts) {
    state.count = counts.data.counts[slug] ?? 0;
    render(button, countSlot, live, state);
  }

  const mine = await postJson<MineResponse>('/api/v1/votes/mine');
  if (mine.status === 200 && mine.data?.slugs?.includes(slug)) {
    state.voted = true;
    render(button, countSlot, live, state);
  }

  async function ensureIdentity() {
    const token = await turnstileToken(root, sitekey);
    const identity = await postJson<{ ok?: boolean; error?: string }>('/api/v1/identity', { turnstileToken: token });
    if (identity.status !== 200 || !identity.data?.ok) throw new Error(identity.data?.error || 'identity_failed');
  }

  async function sendVote(): Promise<VoteResponse> {
    const action = state.voted ? 'uncast' : 'cast';
    let vote = await postJson<VoteResponse>('/api/v1/votes', { slug, action });
    if (vote.status === 401) {
      await ensureIdentity();
      vote = await postJson<VoteResponse>('/api/v1/votes', { slug, action });
    }
    if (vote.status !== 200 || !vote.data?.ok) throw new Error(vote.data?.error || `vote_failed_${vote.status}`);
    return vote.data;
  }

  button.addEventListener('click', async () => {
    if (state.busy) return;
    state.busy = true;
    state.error = undefined;
    render(button, countSlot, live, state);
    try {
      const data = await sendVote();
      state.voted = Boolean(data.voted);
      state.count = Number(data.visible_count ?? data.count ?? state.count ?? 0);
    } catch {
      state.error = 'retry';
    } finally {
      state.busy = false;
      render(button, countSlot, live, state);
    }
  });
}

export function initUpvoteButtons() {
  document.querySelectorAll<HTMLElement>('[data-upvote-root]').forEach((root) => {
    void hydrate(root);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initUpvoteButtons, { once: true });
} else {
  initUpvoteButtons();
}
