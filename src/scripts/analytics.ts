// SANCTIONED ISLAND #1 — the analytics loader, imported once by BaseLayout, sitewide.
//
// ── Plausible (operator switch from Vemetric, direct round). Privacy-friendly, cookieless,
// no PII in any event (§10.8). The loader lives in THIS Astro-bundled module (/_astro/*.js),
// and it INJECTS the plausible.io script at runtime via createElement — exactly the shape
// TweetEmbed (widgets.js) and HeroStage (matter.min.js) already use. Consequences:
//   · no inline <script> and no hand-placed <script src> in the built HTML → audit-scripts
//     stays green with no new allow-list entry;
//   · the ONLY §10.7 CSP change is the plausible.io host — in script-src-elem (to load the
//     injected script), script-src (to run it) and connect-src (its /api/event ingest).
// Plausible ignores localhost, so `npm run dev` never pollutes the dashboard.
type TrackProps = Record<string, string>;
type Tracker = (event: string, props?: TrackProps) => void;

interface PlausibleFn {
  (event: string, options?: { props?: TrackProps }): void;
  q?: unknown[];
  init?: (opts?: unknown) => void;
  o?: unknown;
}

declare global {
  interface Window {
    grokbotTrack?: Tracker;
    plausible?: PlausibleFn;
  }
}

// Public, client-side site script (not a secret). Same key the live landing uses, so dev and
// prod report into one Plausible property with zero cutover change.
const PLAUSIBLE_SRC = 'https://plausible.io/js/pa-59EQrQNZCDtI217RVb6EZ.js';

function boot() {
  const w = window;
  // The standard Plausible queue stub, expressed in TS instead of an inline tag.
  w.plausible =
    w.plausible ||
    (((...args: unknown[]) => {
      (w.plausible!.q = w.plausible!.q || []).push(args);
    }) as PlausibleFn);
  w.plausible.init = w.plausible.init || ((i?: unknown) => { w.plausible!.o = i || {}; });

  const tag = document.createElement('script');
  tag.src = PLAUSIBLE_SRC;
  tag.async = true;
  document.head.appendChild(tag);
  w.plausible.init();

  // Custom events (§9.7/§9.8) route through Plausible's props API. Analytics must never
  // break a page, so every call is guarded.
  window.grokbotTrack = (event, props) => {
    try {
      w.plausible?.(event, props ? { props } : undefined);
    } catch {
      /* swallow */
    }
  };

  // §9.2a — the no-JS waitlist path lands on /subscribed/?subscribed=1; fire the event once.
  const params = new URLSearchParams(window.location.search);
  if (window.location.pathname === '/subscribed/' && params.get('subscribed') === '1') {
    window.grokbotTrack('newsletter_signup', { source: 'no-js' });
  }
}

void boot();

export {};
