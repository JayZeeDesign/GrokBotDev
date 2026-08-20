# BUILD-NOTES

## 2026-08-20 — M0 scaffold notes
- Dev-box deviation: PRD local port 4380 is reserved on this box; M0 dev verification runs `npm run dev` under pm2 with `PORT=4381` at `http://localhost:4381/`.
- Stale M0.3 parenthetical resolved: §11's "near-black, off-white, one green accent" text predates Addendum A; tokens use the light-first Ash Amber A1 values and A5 category tokens.
- Fontsource resolution for A2: display wordmark/headlines use `@fontsource/geist`, UI chrome uses `@fontsource/geist-mono`, body copy uses `@fontsource/inter`.
- Addendum A6 rails-capable layout is wired behind `ENABLE_RAILS = false` in `src/lib/buildFlags.ts`; no sponsor components render.
- Non-blocking npm audit warning observed during M0: `npm ci` reports 3 vulnerabilities in the Astro 5 dependency chain; `npm audit fix --force` would install Astro 7 and violate the PRD's Astro 5 pin, so no version override was applied in M0.
