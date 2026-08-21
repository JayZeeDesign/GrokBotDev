// SANCTIONED ISLAND #1 — the analytics loader, imported once by BaseLayout, sitewide.
// §9.7: the @vemetric/web npm SDK, NOT a script tag — typed API, bundled by Astro to
// /_astro/*.js (so the §10.7 CSP needs no script host, only the ingest host in connect-src).
//
// If PUBLIC_VEMETRIC_TOKEN is unset the module returns before constructing Vemetric and
// installs a no-op stub, so every trackEvent call site stays safe. That is what keeps
// analytics off on staging and clean in local dev (§2 Q10/Q11).
//
// Cookieless; no PII in any event (§10.8).
type TrackProps = Record<string, string>;
type Tracker = (event: string, props?: TrackProps) => void;

declare global {
  interface Window {
    grokbotTrack?: Tracker;
  }
}

const token = import.meta.env.PUBLIC_VEMETRIC_TOKEN ?? '';
const noop: Tracker = () => {};

async function boot() {
  if (!token) {
    window.grokbotTrack = noop;
    return;
  }

  try {
    const { vemetric } = await import('@vemetric/web');
    vemetric.init({
      token,
      trackPageViews: true,
      // Editorial link clicks are tracked explicitly as plugin_link_click (§9.8);
      // auto-tracking would double-count them.
      trackOutboundLinks: false,
      trackDataAttributes: true,
    });

    window.grokbotTrack = (event, props) => {
      try {
        vemetric.trackEvent(event, props ? { eventData: props } : undefined);
      } catch {
        /* analytics must never break a page */
      }
    };

    // §9.2a — the no-JS path lands on /subscribed/?subscribed=1; that is the only place
    // the query value is read, and only to fire the event. It never reaches markup.
    const params = new URLSearchParams(window.location.search);
    if (window.location.pathname === '/subscribed/' && params.get('subscribed') === '1') {
      window.grokbotTrack('newsletter_signup', { source: 'no-js' });
    }
  } catch {
    window.grokbotTrack = noop;
  }
}

void boot();

export {};
