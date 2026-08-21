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

## 2026-08-20 — M2 content model + seed import

### ⛔ ESCALATION (§12.8) — 24 of 26 use cases are HELD, not imported

**The blocker, stated plainly: the seed corpus contains no prompts.** All 26 files in
`seed-use-cases/` plus the three `candidates/wave-*.md` sweeps contain **zero fenced code
blocks** (`grep -c '```'` → 0 on every file). They are 65–120-word research notes: source
URL, author, engagement, a "WHAT" summary, receipts, category, verdict. Seed 001 is the one
exception — it carries the verbatim thread.

§5.3 requires every use case to ship `## How it's set up` (≥300 chars), `## Prompt` (exactly
one fenced block, ≥200 chars) and `## Why it's cool` (≥150 chars). §11 M2.3 requires "real
prompts … no lorem ipsum". Producing those for 24 entries means **writing prompts the named
authors never published** and shipping them under `status: live` + `verified_at` + a dofollow
author link + an embedded source post. That is the exact thing Addendum B4 exists to prevent
("nothing fictional ever carries a verification claim") and it fails §10.1 item 1, which
defines verification as having *read the complete prompt*.

**Second, smaller blocker:** `x.com` is not fetchable from this environment (HTTP 402 on
every status URL tried). So the §10.1 item-2 link re-resolution cannot be performed for any
X-sourced entry, and no post text can be captured to quote. GitHub *is* fetchable, which is
why the repo-backed entries below could be verified properly.

This is a **product decision, not an executor call**: nothing in §4's entry template
distinguishes "the author's published prompt" from "our reconstruction", so shipping
reconstructions silently misleads on the one axis the site sells (receipts). Options for the
operator, cheapest first:

1. **Capture the prompts** — a Scout pass that opens each source post/thread and saves the
   published prompt text, then import. Highest fidelity; needs X access this box does not have.
2. **Ship reconstructions with a visible provenance line** — e.g. "prompt reconstructed by the
   Curator from @handle's post" rendered next to the PromptBlock. Requires a §4 component/copy
   change and a §10.1 amendment defining this class of entry. Honest, but it is new policy.
3. **Import only repo-backed entries** (what M2 did) and let the rest land as the Scouts
   capture them. Slowest to volume, zero trust cost.

Nothing was guessed and nothing fictional was written. The 24 held entries are listed in
`seed-use-cases/INDEX.md` and remain untouched.

### Imported (8 entries — all real, all source-attributed, zero demo)

| Type | Slug | Basis |
|---|---|---|
| plugin | `compound-engineering` | repo + project page verified |
| plugin | `knowz-and-knowzcode` | repo + product page verified |
| plugin | `discord-grok-bot-bridge` | repo verified; forum receipt |
| plugin | `imessage-grok-bot` | repo verified |
| plugin | `aaron-marketing-skills` | **swap-in** (see checklist) |
| use-case | `grok-ship` | verbatim thread (seed 001) + public repo `GROK_SHIP.md` |
| use-case | `firstmate` | public repo `GROK_BOT_FIRSTMATE.md` charter |
| collection | `grok-ship-firstmate` | B4's designated pairing; both members exist |

`collection-02-research-you-can-trust` is **held**: its members (`x-to-notion-research-bot`,
`tiered-research-swarm`, `factored-digest`) are three of the 24 held use cases, and §5.6 rule
9 makes a dangling member a build failure. It imports the moment those three land.

### §10.1 read-level checklist — per-entry outcomes (run 2026-08-20, via live fetches)

| Entry | 1 read | 2 links resolve | 3 no funneling | 4 no injection | 5 attribution | Verdict |
|---|---|---|---|---|---|---|
| `compound-engineering` | README read; Grok Bot section confirmed ("uses your Cursor account and plugin library") | both 200, real content | guide has newsletter CTAs but the listing's subject is the open plugin repo | none | EveryInc, matches repo owner | **PASS** |
| `knowz-and-knowzcode` | README read; "Knowz + KnowzCode for Grok Bot and Cursor"; install path documented | both 200 | knowz.io is a real product, not a signup wall | none — README explicitly says "do not paste API keys in chat" | knowz-io | **PASS** |
| `discord-grok-bot-bridge` | README read; Discord ↔ Grok Bot connector; token handling documented | 200 | open source, MIT, self-hosted | none — fail-closed callback auth, `.gitignore` excludes `.env` | FlyOverCoderKY | **PASS** (labelled advanced/unofficial in the body) |
| `imessage-grok-bot` | README read; launchd helper, nonce + native macOS send dialog | both 200 | open source | none — structured JSON protocol, message content never parsed as instructions | jeffhuber | **PASS** |
| `appeeky-aso-skills` | README read: targets "Cursor, Claude Code, or any Agent Skills-compatible AI assistant" — **does not name Grok Bot** | repo 200 | n/a | none found | Eronred/@imeronn mapping unconfirmed | **FAIL** — fails "repo README matches claims" + the uses-Grok≠runs-on-GrokBot rule. Its only Grok Bot tie was seed #018's X post, which cannot be opened (402). **Dropped.** |
| `aaron-marketing-skills` | README read; names "xAI's **Grok Bot**" as a named-bot host and ships a Grok Bot setup pack (`grok/bot-cards.md`) | 200, 2.6k stars, Apache-2.0 | keyless by default; paid connectors opt-in | none | aaron-he-zhu | **PASS** — swapped in per the operator ruling |
| `grok-ship` | full thread captured in seed 001 + `GROK_SHIP.md` fetched and read | repo 200; **X URL not re-resolvable (402)** | open repo | none | @kunchenguid, thread is the genuine origin | **PASS** (with the X caveat) |
| `firstmate` | `GROK_BOT_FIRSTMATE.md` charter fetched and read | repo 200; **X URL not re-resolvable (402)** | open repo | none | @kunchenguid | **PASS** (with the X caveat) |

`firstmate` ships with **no `source_tweets`**: its source post exists but its text was never
captured, and inventing an excerpt would mean fabricating a quote attributed to a real
person. Seed 002's own file says "TODO before publish: thread capture". The entry stands on
the public repo with the author credited; add the tweet when the capture lands.

### Post-launch re-verification (agent team)

Smoke tests owed on every imported plugin — none has been run in a live Grok Bot account
(this box has no Grok Bot / Cursor session). From `seed-plugins-collections/REVIEW.md`:

1. `compound-engineering` — install in Cursor, open Grok Bot on the same account, confirm the plugin appears in the Bot's tools and run one small plan/review workflow.
2. `knowz-and-knowzcode` — install both separately, run status/setup, confirm no key-paste path is required.
3. `discord-grok-bot-bridge` — confirm the gateway is private, tokens never enter chat, and one Discord message round-trips in a private allowlisted server.
4. `imessage-grok-bot` — latest release on supported macOS: confirm read-only triage, Full Disk Access path, allowlist behaviour and the native send confirmation.
5. `aaron-marketing-skills` — run the projection script, install one bot card in Grok Bot, confirm an auditor gate fires on a deliberately weak draft.
6. `grok-ship` / `firstmate` — re-open both source threads once X access exists; capture the Firstmate post text so `firstmate` can carry its `source_tweets` entry.

### Deviations & decisions (M2)

- **Timestamps must be QUOTED in frontmatter.** §5.3's skeleton shows them unquoted, but
  Astro parses frontmatter with a YAML 1.1 loader, which turns an unquoted ISO timestamp into
  a `Date` — and §5.2's schema is `z.string().datetime()`, so the build fails with a type
  error. §5.2 is canonical and owns the schema, so the fix went into the content, not the
  schema. `validate.mjs` now rejects unquoted timestamps directly, because the standalone
  parser (yaml 2.x, YAML 1.2) reads them as strings and would otherwise pass a file the build
  rejects. **§5.3's skeleton is stale on this point.**
- **Status enum gains `demo`** (B4) plus a rule the addendum implies but never wrote: a demo
  entry with `verified_at` is now a hard schema error, in both `content.config.ts` and
  `validate.mjs`. Everything else in `content.config.ts` is §5.2 verbatim.
- **Dependency justification (§12.5):** `yaml` moved from a transitive Astro dependency to an
  explicit `devDependency`. Zero new installs — `validate.mjs` must parse frontmatter without
  booting Astro, and relying on a hoisted transitive package is fragile.
- **`--root` flag on `validate.mjs`** so the same rules run against `scripts/fixtures/`
  (M2.5). Fixtures live outside `content/` and are never loaded by Astro.
- **M2 route stubs for the three entry types** (`src/pages/{plugins,use-cases,collections}/[slug].astro`)
  — M2.4 requires `dist/<lane>/<slug>/index.html` to exist, which needs a route. These are
  deliberately minimal (h1, tagline, chips, body) and carry `data-pagefind-body` per §4.2.8a.
  **M3 replaces them with the full §4.3.3 / §4.3.5 / §4.3.7 templates.** Their category chip
  renders without an href because the `/categories/` hubs do not exist until M3.
- **§5.8's fictional names ship nowhere**: `grep -ril "mail-sorter\|r2-chief-of-staff\|lando"
  content/` returns nothing. The only place those names still appear is the M1 dev-only
  component gallery, which never reaches production.
- **Carry-over still standing:** M0's route stubs carry `data-pagefind-body` although §4.2.8a
  limits it to entry detail pages + `/plugin-builder/`. M3.7 asserts the indexed-page count,
  so M3 must strip it from the non-entry pages. Current index: 22 pages.

### M2 exit criteria — evidence (2026-08-20)

- **M2.1 — schemas + vocabularies.** `src/content.config.ts` implements §5.2 verbatim (+ the
  B4 `demo` amendment). `src/data/categories.json` is §5.4's tree verbatim: 10 categories,
  49 subcategories. `src/data/integrations.json` carries all 24 §5.5 canonical names with
  aliases, urls and auth_types.
- **M2.2 — `npm run validate` exits 0** on the corpus: `validate: 8 entries — 5 plugins,
  2 use cases, 1 collections (0 demo)` → `validate: OK`.
- **M2.3 — entry count: 8, not 12.** Amended per the live-manifest rule and the escalation
  above: 5 plugins (target met, one swap) + 2 use cases + 1 collection. Expected under the
  manifest was 26 + 5 + 2 = 33; **25 are held** (24 use cases + 1 collection). Every imported
  entry has all required §5 fields populated with real, source-attributed content.
- **M2.4 — `npm run build` emits an entry page per seed.** All 8 exist:
  `dist/plugins/{aaron-marketing-skills,compound-engineering,discord-grok-bot-bridge,imessage-grok-bot,knowz-and-knowzcode}/index.html`,
  `dist/use-cases/{firstmate,grok-ship}/index.html`, `dist/collections/grok-ship-firstmate/index.html`.
- **M2.5 — negative fixtures.** `node scripts/validate.mjs --root scripts/fixtures` exits **1**
  with 6 problems across all four required failure classes: bad slug (both the kebab-case and
  filename rules), unknown integration (**closest-match suggestions visible** — "did you mean
  `GitHub`?" for `Github`, "did you mean `Google Calendar`?" for the alias `gcal`), duplicate
  `project_url` (caught through trailing-slash + query + fragment + case normalization), and
  raw `<script>` HTML in a body (§8.5 check 7).
- **Also green:** `npx astro check` → 0 errors, 0 warnings; `npm run build` → exit 0 (validate,
  contrast, links and audit-scripts gates all pass); zero `demo` entries.

## 2026-08-21 — M3 phase 1 (hero + home + hub system + SEO head)

M3 is being delivered in phases; this is phase 1. **Not yet built** (phase 2): the lane
index pages, the full §4.3.3/4.3.5/4.3.7 entry templates, `/wall/`, `/agent/`,
`/contribute/`, `/submit/`, `/plugin-builder/`, `/about/`, `/search/` page-mode, `404`,
the 83 hub intros, per-entry OG images, `llms.txt` / `llms-full.txt`, the sitemap
`serialize()` lastmod hook + `filter()`, redirects generation, and
`check-keyword-placements.mjs`. Lane indexes and entry pages currently render their M0/M2
stubs, so every URL still resolves and the build stays green.

### Addendum A4 — the living hero (BINDING lift)

`src/components/HeroStage.astro` + `src/scripts/hero.js`. Lifted per `integration-notes.md`:
the stage/bot/paint CSS, the halftone `<defs>`, the `.content` markup pattern and the whole
script IIFE. Dropped as instructed: the demo topbar, the re-roll and theme-toggle controls
and their listeners. **Verified present in `dist`:** `touch-action:pan-y`,
`pointer-events:none` on `#botlayer`, `will-change:transform`, the `.s-*` paint rules, the
clamped stage height, `INFLATE`, `strokeInset`, `dropZone` 0.22/0.78, `botCount()` 10/6,
resize reseed-with-the-same-seed, `?static=1`, the wheel-listener removal, and the visible
seed label (A4 calls the visible seed a deliberate differentiator, so it is rendered in the
stage's top-right rather than the demo's topbar).

Three deviations, all forced and all documented:

1. **`onerror="window.__GB_NO_MATTER=1"` cannot ship.** It is an inline event handler and
   §10.7's CSP (`script-src 'self'`, no `'unsafe-inline'`) blocks those. The island now
   injects `/vendor/matter.min.js` itself and sets the identical flag from an `error`
   listener, so the static-pile fallback behaves exactly as specified. Injecting from the
   island also **fixes a load-order bug** the tag form would have had: Astro hoists island
   modules into `<head>`, so a body-level `defer` tag would have run *after* the sim and
   `HAS_MATTER` would always have been false.
2. **matter.js is self-hosted** at `public/vendor/matter.min.js` (copied from the pinned
   `matter-js@0.20.0` dependency — §12.5 justification: A4 mandates self-hosting, and a
   pinned npm copy is auditable where a vendored blob is not). No CDN origin.
3. **The sim lives in `src/scripts/hero.js`, not in the `.astro` script block.** The lift is
   ES5-style vanilla JS and `astro/tsconfigs/strict` rejects it wholesale; retyping 490
   lines of tuned physics is exactly what A4's "do not retune" rule forbids. As a `.js`
   module it is still bundled by Astro to `/_astro/*.js` (no `is:inline`, CSP-clean).

Token remap is in ONE place (notes §1): a `--ink/--paper/--accent/--muted/--hair/--surface`
alias block on `.stage`. The hero CSS ships `is:global` because the bots are created at
runtime and would never match Astro's scoped-style attributes.

**Overflow seed check after final copy (A4):** re-run with the real B1 h1 + CP-002 subline +
the CTA row. `#content` is measured live via `getBoundingClientRect()` on every build and
resize, and the CTA row, friction line and search input are all *inside* `#content`, so they
are inside the static body. Verified structurally in `dist`; the visual pass across seeds and
breakpoints belongs to M3.8's manual QA and is recorded there.

### Copy applied (phase 1)

CP-113 (FENCED h1, plain spaces — no `&nbsp;`, so the string greps) · CP-002 (hero subline,
money phrase first) · CP-003 (`plug your Grok Bot in`, opens the site-level InstallModal) ·
CP-004 (friction line) · CP-005/006/007/008/011/013 (KEEP) · CP-009 (`what's in here`) ·
CP-010 + CP-012 (live `{n}` from the same source as StatBar — never hard-coded) ·
CP-072/073 (home meta) · CP-074…CP-091 wired into `src/lib/seo.ts` for the pages that
consume them. CP-030 (`/use-cases/` intro, the build-breaker) lands with the lane indexes in
phase 2, which is when `check-keyword-placements.mjs` can first pass.

### Hub system

`/categories/<cat>/`, `/categories/<cat>/<subcat>/` and `/integrations/<tool>/` are built —
**83 hubs**, all resolving. Thin-hub rule (§6.2) is live: fewer than 3 non-deprecated entries
→ `noindex,follow`. Collections are excluded from hubs per §6.2.

**Recomputed hub math at 8 entries** (§11 M3.6's numbers assumed 12 seeds): exactly **two**
hubs qualify as indexable — `/categories/engineering/` (4 entries) and
`/categories/engineering/agents-ops/` (3). The other 81 are `noindex,follow` and flip
automatically as M2b lands. `/categories/support/` (1 entry) is the M3.6 below-3 case;
`/categories/engineering/` is the at-or-above-3 case.

**Hub-intro gate is REPORT-ONLY for now.** §6.2 requires all 83 intro files to exist and
fails the build on a missing/short/long one. The intros are phase-2 copy, so `hubIntros.ts`
renders an intro when present and omits it when not. `HUB_INTRO_GATE=1` must be on by M7.

### SEO head (§6.3/§6.4/§6.10)

`BaseLayout` now emits the self-referencing absolute canonical, `robots` when set, the full
OG/Twitter set with a per-page `og:image`, RSS autodiscovery (plus the lane feed where
given), and one `application/ld+json` `@graph` per page — `WebSite` + `Organization`
sitewide, plus `CollectionPage`/`WebPage`, `BreadcrumbList` and `ItemList` per page type.
`src/lib/seo.ts` holds every §6.3 template; `src/lib/entries.ts` holds the §5.6 rule 11
ordering, §6.10 related/appears-in selection and the §5.6 rule 8 dofollow-by-status rule.

`data-pagefind-body` removed from the home page (§4.2.8a). The remaining M0 stubs lose it as
phase 2 rewrites them.

## 2026-08-21 — M3 phase 2 (pages, SEO artifacts, gates) — M3 COMPLETE

Phase 1 shipped the hero, home, the 83-hub system and the SEO head. Phase 2 adds every
remaining page plus the SEO artifacts and gates.

**Built:** lane indexes (`/plugins/`, `/use-cases/`, `/collections/` + their paginated
routes, 24/page) · the full §4.3.3 / §4.3.5 / §4.3.7 entry templates · `/wall/` (B2) ·
`/agent/` (§7.3 verbatim contract + CP-042 intro + copyable endpoint table + MCP section) ·
`/contribute/` · `/submit/` · `/plugin-builder/` · `/about/` · `/search/` (Pagefind
page-mode) · `404` · `/subscribed/` · `/categories/` and `/integrations/` indexes ·
`llms.txt` + `llms-full.txt` · per-entry OG images · the sitemap `serialize()` + `filter()`
hooks · `check-keyword-placements.mjs` · `list-urls.mjs` · `check-hub-intros.mjs`.

Hub intros are **not** in this commit: a content executor is drafting them into
`documents/grokbot-dev/hub-intros-draft/`, and the gate stays report-only until they land.

### Decisions worth reading

- **The use-case prompt is hoisted out of the body.** §5.3 guarantees exactly one fenced
  block per use-case body and §4.3.5 wants it rendered through `PromptBlock` (copy button,
  microhint, canonical CTA). Rendering `<Content />` *and* a PromptBlock would print the
  prompt twice, so the body's single `pre` is hidden by a scoped rule and the extracted
  prompt is re-rendered properly below. Deterministic: the schema forbids a second block.
- **`llms.txt` / `llms-full.txt` are Astro endpoints, not a postbuild script.** §3.2's repo
  layout lists `src/pages/llms.txt.ts` and `llms-full.txt.ts`; §6.7 calls for
  `scripts/build-llms.mjs`. §3.2 owns repo layout, so the endpoints win — same `dist` output,
  and they read the content collections directly instead of re-parsing frontmatter.
- **OG fonts are a stand-in.** §6.6 wants the §4 mono + sans as committed subsets, but
  `@fontsource` ships woff2 only and satori needs TTF/OTF. DejaVu Sans/Mono are committed
  under `src/assets/og-fonts/` so the cards render now; the composition, tokens and layout
  are final and the typeface is a one-line swap once Geist/Inter TTF subsets exist.
  **Open item for M7.**
- **Empty hubs had to be seeded into the sitemap exclusion set.** A hub with zero entries
  never appeared in the per-hub bucket, so the thin-hub filter skipped it and it slipped into
  the sitemap. `sitemap-data.mjs` now enumerates all 83 hub URLs up front.
- **`build-og.mjs` defaults every node to `display: flex`** — satori throws on any div with
  more than one child and no explicit display, and a layout tweak would otherwise break the
  build long after the fact.

### §11 M3 exit criteria — evidence (2026-08-21, 8 live entries)

1. **Every §6 URL builds.** `node scripts/list-urls.mjs` enumerates **110** URLs (106 HTML
   pages + `llms.txt`, `llms-full.txt`, `robots.txt`, `sitemap-index.xml`, `rss.xml`); the
   enumeration is taken from `dist` itself, so every listed URL exists by construction.
   `check-links` walks all 106 pages: **0 broken internal links**.
2. **Sitemaps.** `dist/sitemap-index.xml` + `dist/sitemap-0.xml` exist and are well-formed
   (`xmllint` is not installed on this box; parsed with Node instead). **22 `<url>` entries,
   22 `<lastmod>`** — equal and non-zero. Entry lastmod is the real `updated_at`
   (`/plugins/compound-engineering/` → `2026-08-20T23:45:00.000Z`), hubs carry
   `max(updated_at)`, everything else the build stamp. Thin hubs are excluded
   (`/categories/data/` → 0 hits); indexable hubs are present (`/categories/engineering/`).
3. **`robots.txt`, `llms.txt`, `llms-full.txt`, redirects** all emitted;
   `build-redirects.mjs` runs clean on an empty redirect map.
4. **Structured data.** Plugin page: `SoftwareApplication`, `Offer`, `Person`,
   `BreadcrumbList`, `ListItem`, `WebSite`, `Organization`. Hub: `CollectionPage`,
   `ItemList`, `BreadcrumbList`, + sitewide. Home: `CollectionPage`, `ItemList`, + sitewide.
   Use-case pages additionally carry `HowTo` + `CreativeWork`.
5. **Per-entry OG images.** `build-og.mjs` emits **10** PNGs: one per entry (8), plus
   `default.png` and the `logo-512.png` `Organization.logo` raster. Each entry page's
   `og:image` points at its own file (`/og/use-cases/grok-ship.png`).
6. **Thin-hub rule, both ways.** `/categories/support/` (1 entry) → `noindex` present.
   `/categories/engineering/` (4 entries) → no `noindex`. **Recomputed at 8 entries: two
   hubs qualify as indexable** — `/categories/engineering/` and
   `/categories/engineering/agents-ops/`; the other 81 are `noindex,follow` and flip
   automatically as M2b lands.
7. **Pagefind.** `dist/pagefind/pagefind-entry.json` reports **`page_count: 9`** = 8 entry
   detail pages + `/plugin-builder/`, exactly matching §4.2.8a. The M0 `data-pagefind-body`
   carry-over is now resolved: it appears only on entry pages and the builder page.
8. **Wireframe QA at the §4 breakpoints:** manual pass NOT run (no browser session here) —
   this is the one M3 criterion outstanding, along with the hero's multi-seed visual sweep.
   Both belong with M7.1's QA pass and are flagged there.

**Also green:** `astro check` 0 errors / 0 warnings · `npm run build` exit 0 ·
`check-keyword-placements` **OK** (all four §6.11 placements present: hero subline,
`/use-cases/` intro, `/agent/` intro, `llms.txt` blockquote) · `validate` OK ·
`check-contrast` OK · `audit-scripts` OK (8 island bundles, 0 inline JS, ld+json allowed).

## 2026-08-21 — M2b-1 ungated capture import (3 of 4 imported, 1 held)

Capture pass returned 4 PROMPT_CAPTURED seeds. **Three imported, one held** — see the 016
finding below, which is the reason the total is 9 live entries and not 10.

### Imported / enriched

- **NEW `agentos-blueprint`** (seed 009, @iannuttall). The gist is a byte-concordant HTTP
  artifact (two passes, matching sha256). It is ~51 KB — far past the schema's 8,000-char
  prompt cap — so the shipped prompt points the Bot at the gist and quotes the author's own
  framing and provenance lines verbatim, which is what the artifact is for. **The body says
  out loud that the blueprint labels its own role contracts as reconstructed from Danny
  Postma's talk rather than his verbatim files**, because the author put that warning in the
  file himself and it is the most credible thing about the entry. `prompt_provenance: author`
  — it is Ian Nuttall's published implementation prompt.
- **`firstmate` enriched.** The composed prompt is **replaced by the author's real published
  charter** (`GROK_BOT.md`, 4,091 chars, sha256-identical across two fetches). The
  missing-excerpt gap from M2 is closed: the entry now carries its real `source_tweets`
  excerpt, quoted verbatim from the captured post, so it appears on the wall and carries the
  scouted chip. This is a straight upgrade — a reconstruction replaced by primary source.
- **`grok-ship` enriched** with the capture's artifact inventory: the installer, both bot
  charters and all four shipped workflow skills (`lavish-session`, `adversarial-review`,
  `project-management`, `ahoy`) are named as readable-before-you-run-it files.

### ⚠️ HELD: seed 016 factored-digest — the capture is OCR-degraded

The captured "Factored digest schedule template" is **visibly character-corrupted**:
`actuallv said` · `endina with its source` · `vour read` · `backqround knowledqe` ·
`[SINGLE-SOURCE1` · `->$1` (should be `→S1`) · `nothing rea rather than filling space` ·
`multi-agent process thar was really one pass`. Those are classic OCR substitutions (y→v,
g→a, g→q, ]→1), not typing errors — the text was almost certainly read out of a screenshot.

The author does say in the thread "There are a few grammatical errors as I wrote this by
hand", which covers *some* of it, but not glyph-level substitutions. Both capture passes
agree because both read the same degraded source; agreement between two passes of a
corrupted original does not make it clean.

Shipping it verbatim means publishing a broken copy-paste prompt under a real person's name
with a `verified_at` on it, beneath a CTA that says "Copy the prompt and paste it into
Grok". Silently repairing it means publishing my reconstruction of someone's text as if it
were theirs — the exact thing the standing ruling forbids. So it is **held**, and it needs a
clean re-capture (the post's own text, not an image) or the author's file. Flagged to the
orchestrator rather than resolved locally.

### Schema addition

`prompt_provenance: 'author' | 'curator'` (optional) is now in the use-case Zod schema and
in `validate.mjs`. The **render path is built**: when the value is `curator`, the use-case
page prints a mono line above the PromptBlock — "prompt reconstructed by the Curator from
@handle's published setup — not their verbatim text". **Zero entries ship `curator`**; the
path exists so that if the operator sanctions option 2 the page is already honest, and so
that nothing can ship as a reconstruction without saying so.

### Counts + gates

- **9 live entries**: 5 plugins · 3 use cases · 1 collection (0 demo). Expected 10; 016 held.
- **Hub math unchanged at 9 entries**: still exactly two indexable hubs —
  `/categories/engineering/` (now 5 entries) and `/categories/engineering/agents-ops/` (4).
  `agentos-blueprint` is engineering/agents-ops, so it deepened the two hubs that already
  qualified rather than tipping a new one over the ≥3 threshold.
- Sitemap 23 URLs (+1). Pagefind `page_count: 10` = 9 entry pages + `/plugin-builder/`.
  OG cards 9 + default + logo. `astro check` 0/0 · build exit 0 · validate, contrast,
  keyword, links, audit-scripts all OK.

## 2026-08-21 — M3x hub intros import (83/83, WR-approved)

All 83 WR-approved intros imported from `documents/grokbot-dev/hub-intros-draft/` into
`src/data/hub-intros/` — 59 category/subcategory files (10 + 49) + 24 integration files.
Filenames already matched the loader convention (`categories/<cat>.md`,
`categories/<cat>--<subcat>.md`, `integrations/<tool>.md`), so nothing was renamed.

`integrations/slack.md` — the reviewer's direct edit — imported **verbatim**, byte-identical
to the draft (`diff -q` clean). It measures 87 words, inside §6.2's 60–160 band, declarative
voice, no money-phrase stuffing. It breaks no gate.

**Gate report (still report-only, per the standing plan):**
- `check-hub-intros`: **83/83 present · 0 out of range**. Verified that the gate would also
  pass when armed: `HUB_INTRO_GATE=1 node scripts/check-hub-intros.mjs` exits **0**. The M7
  flip is now a formality rather than a risk.
- `check-keyword-placements`: **OK** — 4 required placements + **83 hub intros compared, 0
  shingle collisions** on the §6.2 40-character anti-boilerplate rule. This is the first run
  where that half of the check had anything to compare, and the corpus is clean.

All 83 hub pages now render their intro (verified by markup presence on 83/83). Build
green: 107 HTML pages, 0 broken links, `astro check` 0/0, validate/contrast/OG/audit all OK.
