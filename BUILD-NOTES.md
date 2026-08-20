# BUILD-NOTES

## 2026-08-20 — M0 scaffold notes
- Dev-box deviation: PRD local port 4380 is reserved on this box; M0 dev verification runs `npm run dev` under pm2 with `PORT=4381` at `http://localhost:4381/`.
- Stale M0.3 parenthetical resolved: §11's "near-black, off-white, one green accent" text predates Addendum A; tokens use the light-first Ash Amber A1 values and A5 category tokens.
- Fontsource resolution for A2: display wordmark/headlines use `@fontsource/geist`, UI chrome uses `@fontsource/geist-mono`, body copy uses `@fontsource/inter`.
- Addendum A6 rails-capable layout is wired behind `ENABLE_RAILS = false` in `src/lib/buildFlags.ts`; no sponsor components render.
- Non-blocking npm audit warning observed during M0: `npm ci` reports 3 vulnerabilities in the Astro 5 dependency chain; `npm audit fix --force` would install Astro 7 and violate the PRD's Astro 5 pin, so no version override was applied in M0.

## 2026-08-20 — M1 component library (§4.2 inventory complete)

### C3.1 pre-task — Addendum-propagation sweep (Addendum C3 item 1, BINDING)

Swept every §4 wireframe, component spec and token table for strings/details that predate
Addenda A/B/C. **26 stale instances found.** In every row the Addenda + copy pack win
(C1 precedence); the §4 inline version is a display placeholder. Rows marked **[C2]** are
the two instances Addendum C2 already confirmed — the other 24 were found by this sweep.

| # | Location | Stale as written | Authoritative | Milestone |
|---|---|---|---|---|
| S1 | §4.3.1[2] h1 (+ legend echo) | `everything people do with Grok Bot.` | B1 / CP-001 / CP-113 (FENCED) `Everything your Grok Bot could be doing` | **[C2]** M3 (already correct in the M0 home stub) |
| S2 | §4.3.1[2] primary CTA | `[ get the /agent contract ]` | CP-003 `[ plug your Grok Bot in ]` + CP-004 friction line, opening the site-level `InstallModal` | **[C2]** M1 built the modal + site variant; M3 places the hero CTA |
| S3 | §4.3.1[2] + legend hero subline | `An open-source directory of ready-to-use Grok Bot prompts, plugins, and collections — that your own Grok Bot can plug into.` | CP-002 (4 sites incl. the §6.11 keyword-gate row and §6.3 SERP row) + CP-073 sentence-cased twin | M3 |
| S4 | §4.1.5 + §4.2.1 `MarkGlyph` | "an inline-SVG filled square", "Variants: none — one square" | A3 Mark A + the 5-variant system (logo/favicon/skeleton/divider/status) | **M1 — done** |
| S5 | §4.1.5 favicon | "the 12×12 square, accent-on-bg" | A3 `favicon` variant: rounded-square tile, accent dot kept at all sizes | M1 built the variant; `public/favicon.svg` / `favicon-32.png` still carry the M0 asset — **flagged for M3 asset regeneration** |
| S6 | §4.1.3 + §4.2 intro | "Decision: JetBrains Mono", `@fontsource-variable/jetbrains-mono` + `inter` | A2: Geist (display) · Geist Mono (all UI chrome) · Inter (body) | applied in M0 |
| S7 | §4.1.1–§4.1.2 | "Dark is the default and only shipped theme", `color-scheme: dark`, green/near-black palette | A1 Ash Amber, **light-first**, dual mode mandatory | applied in M0 |
| S8 | §4.2 inventory table (rows 4.2.1–4.2.23) | no `BracketBadge`, no `InstallModal`, no wall card | A3 adds `BracketBadge`; B3 "adds component to §4.2" (`InstallModal`); B2 "component to §4.2" (the wall card, built as `WallCard`) | **M1 — done** |
| S9 | §4.2 intro + §12.5 island list | "five sanctioned islands" (§11 M1.3) | seven — see the M1.3 amendment below | **M1 — done** |
| S10 | §4.2.2 composition + §4.3.1 header row | nav = plugins / use cases / collections / builder bot | B2 adds `wall` to the header nav (mono, lowercase) | **M1 — done** |
| S11 | §4.3.3 / §4.3.5 / §4.3.7 entry wireframes | no install button, no wall backlink | B3(a) `[ install in grok bot ]` becomes the **primary** button; B2 adds `see it on the wall →` (CP-100) to the source block | M1 built both parts; M3 places them |
| S12 | §4.3.1[2] hero region | static text block | A4 living hero (matter.js sim, `#stage`/`#botlayer`/`#content`) | M3 (explicitly out of M1 scope) |
| S13 | §4.2.11 `Chip` | six variants, no taxonomy colour system | A5: slate = the only taxonomy colour; type = **shape** (plugin filled / use-case outline / collection dashed); optional per-category `glyph` slot | **M1 — done** (glyph prop built, ships label-only per A5) |
| S14 | §4.6 contrast bullet | 16.8:1 / 5.7:1 / 8.7:1 measured against the **old** green/near-black palette | must be re-measured against A1's tokens (§12.5) | **M1 — done**, `scripts/check-contrast.mjs` |
| S15 | §4.1.4 + §4.5 layout/responsive tables | no rail columns | A6 rails-capable grid behind a default-OFF flag | applied in M0 |
| S16 | §4.3.2 / §4.3.4 / §4.3.6 h1s | long descriptive forms | §6.3 short H1s — CP-019 `Plugins` · CP-029 `Awesome Use Cases` · CP-036 `Collections` (C3 item 3) | M3 |
| S17 | §4.3.4 `/use-cases/` intro | lacks the §6.11 retrieval phrase | CP-030 — **build-breaker**: `check-keyword-placements.mjs` fails without it (C3 item 2) | M3 |
| S18 | §4.3.5[7] + legend | `▪ replicability:` | CP-032 `▪ what you need:` — **RENDERED LABEL ONLY** | **M1** — label constant added; the schema/API field name `replicability` is untouched (pack §18.3 hazard) |
| S19 | §4.2.18 defaults | `get the weekly drop` + keyword-tailed subcopy | CP-014 / CP-015 | **M1 — done** |
| S20 | §4.2.21 hub copy | `the bots are on it` | CP-066 `the Scouts are on it` (A7 naming) | **M1 — done** |
| S21 | §4.2.22 | needs-update wording; deprecated banner named but never written | CP-067 + CP-068 (net-new) | **M1 — done** |
| S22 | §4.3.1[5] | `the lanes` + lane tile copy | CP-009 `what's in here` · CP-010 · CP-012 | M3 |
| S23 | §4.3.13[2] | 404 body punctuation | CP-071 (punctuation only — do not rewrite the joke) | M3 |
| S24 | §4.3.8[3] | abridged `/agent` intro echo | CP-042; §7.3's block is the source of truth | M3/M4 |
| S25 | §4.3.9 / §4.3.10 | contribute + submit copy | CP-051…CP-061 | M3 |
| S26 | §4.2.4 footer browse column | no `wall` link | B2 route | already applied in M0 |

Pack §18 hazards observed: the five line-wrapped BEFOREs (CP-010/012/058/059/060) were
**not** flagged as missing — they are wireframe-wrapped, as §18.1 predicts; CP-032 was
applied to the rendered label only (§18.3); the multi-site swaps CP-002/CP-054 are M3 page
copy and are recorded above so they cannot be half-applied.

### §11 M1.3 amendment — sanctioned island count is SEVEN, not five (or six)

M1.3's "five sanctioned islands" predates both the §4.2 D2 call and Addendum B3. The
authoritative list is §4.2's intro + §12.5, which between them name:

1. analytics loader (`BaseLayout`, sitewide) · 2. `CopyButton` · 3. `TweetEmbed` click
loader · 4. `NewsletterRow` enhancement · 5. `SearchInput` in `page` mode ·
6. **`FilterBar`** one-open-menu/Escape control (added by the §4.2 D2 call per adversarial
M5; §12.5 lists it as "the `FilterBar` menu toggle") · 7. **`InstallModal`** (B3 adds it to
§12.5's allowed list).

The executor brief for this milestone amended the count to SIX and omitted `FilterBar`.
Per §12.8 the canonical owner wins: §4.2.9 specifies the enhancement in normative detail
and §12.5 lists it, so **seven** is the count built and audited here. Flagged to the
orchestrator in the M1 report. (A4's hero sim would be an eighth when M3 lands it.)

### §12.8 escalations resolved during M1

1. **`--color-warn` / `--color-danger` collapsed onto accent/muted in M0.** §4.1.2 owns the
   colour table and Addendum A1's table does **not** define warn or danger, so A1 does not
   override them. As shipped by M0, `--color-danger` equalled `--color-text-muted` (info and
   danger `Callout`s were pixel-identical) and `--color-warn` equalled the accent, which also
   breaks A1's own accent law ("amber = now/do", "<2% of any viewport"). **Ruling:** restore
   §4.1.2's documented values — light `#A16207` / `#DC2626`, dark `#EAB308` / `#EF4444`.
   Contrast re-measured per §12.5 (below); the M0.4 raw-hex grep still returns nothing.
2. **`<main id="content">` vs §4.6's `<main id="main">`.** §4.6 owns landmarks and names
   `#main` as the skip-link target. Changed in `BaseLayout`; no other reference existed.
3. **`EntryCard` `needs-update` marker.** §4.2.10 says "`Chip` warn `needs update`", but
   §4.2.11's `variant` enum has no `warn`. §4.2.11 owns Chip's props, so the marker renders
   as a chip-shaped mono span inside `EntryCard` rather than an undocumented Chip variant.
4. **`RelatedList`/`FilterBar`/`EntryCard` data the §4 props cannot supply.** Two optional
   additive props were needed and are documented in-file: `EntryCard.memberCounts` (a
   collection's `members[]` carry slugs only, so member-type counts must come from the page)
   and `PromptBlock.viewFullHref` (the clamped preview's `view full prompt` link needs a
   target). No documented prop was renamed, removed or retyped.

### Deviations & decisions (M1)

- **Astro inlines small island bundles by default**, which the production CSP
  (`script-src 'self'`, no `'unsafe-inline'`, no nonces — §10.7) would block, and which
  §4.2 forbids outright. Fixed with `vite.build.assetsInlineLimit: 0` in `astro.config.mjs`:
  every island now ships as `/_astro/*.js`. `audit-scripts.mjs` fails the build if this
  ever regresses.
- **Analytics loader stubbed, not wired.** `src/scripts/analytics.ts` (the §3.2 filename)
  installs the sitewide `window.grokbotTrack` hook every other island calls, and no-ops when
  `PUBLIC_VEMETRIC_TOKEN` is unset. **No new dependency was added** — §9.7's bundled Vemetric
  SDK and the event transport stay M6's job. Without this module M1.3's page-count check
  cannot be satisfied at all.
- **`/dev/components/` production exclusion** is `INCLUDE_DEV_PAGES` in `src/lib/buildFlags.ts`:
  the route's `getStaticPaths()` returns `[]` unless the dev server is running or
  `INCLUDE_DEV_PAGES=1` is set explicitly. `npm run build` therefore never emits it
  (verified below); `INCLUDE_DEV_PAGES=1 npm run build` does. The sitemap `filter()` also
  drops anything under `/dev/`.
- **`check-links.mjs` now skips `dist/dev/`** — the gallery's sample props deliberately point
  at routes that only exist once M2's seed corpus lands, and the page never ships.
- **New script, justified per §12.5:** `scripts/check-contrast.mjs` re-runs §4.6's measured
  contrast table (including the border floors) straight from `tokens.css`. §12.5 requires
  this after any token edit and prefers a small script over a package. It reports A10's
  known white-on-light-amber 4.16:1 as `A10-PENDING` rather than failing, because A10 says
  "block nothing" and the fix is a one-line token swap.
- **`npm run build` now runs both new gates**: `check-contrast.mjs` before `astro build`
  (fail fast on a token regression, §4.6) and `audit-scripts.mjs` after `check-links`
  (keep M1.3 passing forever, §12.5).
- **`SearchInput`'s page-mode bundle ships on every page** because `SiteHeader` uses the
  component in `link` mode and Astro hoists a component's script wherever the component is
  used. The script is inert without `[data-search-form="page"]`, and it is still a sanctioned
  island, so this is accepted for M1; M3 may split the page-mode island into its own file.
- **A3 `pulse` and A5 `glyph` are built and ship OFF/unused**, exactly as the addenda require.
  `/dev/components/` demonstrates both (dev-only surface, never in production).
- **`WallCard` is new but not invented:** B2 says it "adds … component to §4.2" and the copy
  pack §17 lists `src/pages/wall/index.astro` with CP-099. §4.2's table was never updated
  (sweep row S8).
- **Carried over from M0, for M3:** every M0 route stub still carries `data-pagefind-body`,
  but §4.2.8a limits it to entry detail pages + `/plugin-builder/`. M3.7 asserts the indexed
  count, so M3 must strip it from the non-entry pages. Two new route stubs were added in M1
  (`/submit/`, `/plugin-builder/`) because §4.2.2's header links to both.

### M1 exit criteria — evidence (2026-08-20)

- **M1.1 — every §4 inventory component exists with the exact documented name; no SponsorSlot.**
  `ls src/components/` = 26 files: the 23 §4.2 rows (4.2.1–4.2.23) plus `BracketBadge` (A3),
  `InstallModal` (B3) and `WallCard` (B2). `grep -rn "SponsorSlot" src/` → zero occurrences.
  Random spot-check of three (`shuf`): **EntryCard** — props `entry`/`variant`/`featured`/
  `headingLevel` (default 3) match §4.2.10, stretched link on the title, `FeaturedTag` when
  featured, warn left border on `needs-update`, `deprecated` never renders;
  **SectionHeading** — `title`/`level`(2|3, default 2)/`action`/`id`, variants `default`
  (--text-2xl) and `sub` (--text-xl, h3), never renders h1, matching §4.2.6;
  **BracketBadge** — A3's `[ ⠿ ] grokbot.dev` bracket lockup, `link`/`static` variants.
- **M1.2 — `/dev/components/`.** `INCLUDE_DEV_PAGES=1 npm run build` → exit 0,
  `dist/dev/components/index.html` (166 KB) with 26 labelled sections, one per component,
  every documented variant rendered. `<meta name="robots" content="noindex,nofollow">` present.
  `grep -c "dev/components" dist/sitemap-0.xml` → 0. Plain `npm run build` → `dist/dev` does
  not exist (M7.5's 404 assertion is structurally guaranteed).
- **M1.3 — client JS only from the sanctioned islands.**
  `grep -rl '<script' dist/ | wc -l` → **14**; `find dist -name '*.html' | wc -l` → **14** (equal).
  `node scripts/audit-scripts.mjs` → exit **0**: 7 distinct `<script src>` values, all under
  `/_astro/`, 0 inline JS blocks. The seven correspond exactly to the seven sanctioned islands
  (amendment above): BaseLayout/analytics + CopyButton + TweetEmbed + NewsletterRow +
  SearchInput + FilterBar + InstallModal.
- **M1.4 — `npx astro check`** → **0 errors, 0 warnings** (1 hint: `document.execCommand` is
  deprecated — it is §4.2.14's required clipboard fallback and is deliberately kept).
- **Regression checks:** M0.4 raw-colour grep returns nothing; `npm run build` exits 0;
  `check-links` → 0 broken internal links; `scripts/check-contrast.mjs` → every gated pair
  clears its §4.6 floor in both modes (one A10-PENDING row, by design).
