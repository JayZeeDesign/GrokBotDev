/* F9 — pre-paint theme application. Loaded as a BLOCKING, same-origin, classic script from
   <head>, which is what makes it run before first paint and therefore what removes the
   dark-mode flash on repeat visits entirely.

   Why a file in public/ rather than an Astro <script>: Astro compiles component scripts to
   `type="module"`, and modules are deferred — they run after parsing, i.e. after the light
   paint, which is exactly the flash we are avoiding. This is a plain classic script.

   CSP: `script-src 'self'` allows it — it is same-origin and external. Nothing inline, no
   nonce, no hash, no `'unsafe-inline'`. §10.7 is untouched.

   A1: default is LIGHT. `prefers-color-scheme` is deliberately NOT consulted — A1 says
   "default light with a dark toggle", and reading the OS here would silently override the
   product default for a large share of visitors. Only an explicit choice counts. */
(function () {
  try {
    var stored = localStorage.getItem('gb-theme');
    if (stored === 'dark' || stored === 'light') {
      document.documentElement.dataset.theme = stored;
    }
  } catch (err) {
    /* Storage can throw in private mode or with third-party storage blocked. Light is the
       correct fallback (A1's default) and the toggle still works for the session. */
  }
})();
