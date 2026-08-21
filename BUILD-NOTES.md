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

## 2026-08-21 — M4 machine layer (§7 JSON API + MCP service)

### Card-rendering fix that preceded M4 (commit 6298cc7)

The QA finding "~undefined min setup" was the visible tip of a real defect: §4.2.10 requires
"snake_case frontmatter → camelCase at the collection boundary", and that boundary did not
exist. Pages passed raw collection data to EntryCard's camelCase Props behind an `as never`
cast, which silenced the compiler — so `setupMinutes`, `verifiedAt`, `worksWith` and
`sourceTweets` were ALL undefined at runtime. Only setup-time was loud about it; the
verified chip, integration chips and scouted chip were silently missing from every card.
`toCardEntry()` in `entries.ts` is now that boundary, every call site uses it, and no call
site casts. `setupLabel()` returns null for a non-number and all four renderers omit the
chip on null (mirroring SearchInput's existing guard).

### API (§7.1)

Seven endpoints as Astro endpoints under `src/pages/api/v1/`, with `src/lib/api.ts` holding
the serializers. §7.1.1 calls them a post-build script; §3.2's repo layout puts them at
`src/pages/api/v1/*.json.ts`. §3.2 owns repo layout, so endpoints win — identical `dist`
output, and they read the content collections instead of re-parsing frontmatter (same call
as `llms.txt`, logged in M3).

Non-lossy per §7.1.3: every §5 field and every §5.3 body section is serialized under its
snake_case name, with the two documented renames (`works_with` / `integrations` → API
`integrations`). Body sections map to `description` (plugin), `how_its_set_up` /
`why_its_cool` / `example_output` / `prompt` (use case), `rationale` (collection).
`prompt_provenance` rides along on use-case items and defaults to `author` when absent, so
a consumer can tell a published prompt from a reconstruction without visiting the page.
`deprecated` and `demo` never appear anywhere. Sort is `added_at` desc / slug asc — the
§7.1.6 stable cursor.

### MCP (§7.4)

`services/` is a dependency-free Node process (`node:http`): Streamable HTTP MCP at `/mcp`,
no auth in v1, plus `/healthz`. Four tools — `search_directory`, `whats_new`, `get_entry`,
`list_collections` — each with an `inputSchema` AND an `outputSchema`, and every result
carries `structuredContent` beside the text block plus a `truncated` flag.

It is a READER of the built static API (§12.7 — the engine gets no privileged path): it
loads `dist/api/v1/*.json` through a fixed endpoint allow-list with a 60s in-process cache,
so no tool argument can produce a path traversal. Rate limit is 60/min per IP (§7.4.2) with
the client IP resolved Cloudflare-first (`CF-Connecting-IP` → `X-Forwarded-For` → socket),
per §9.3/§10.9 — and the agent team is subject to it like any consumer (§12.7).

Running under pm2 as `grokbot-services` on this box.

### §7.5 consumption metrics — deploy-time hook

Nothing to build in the app. At deploy, nginx needs the §3.5 log format
`machine '$time_iso8601 $remote_addr "$http_user_agent" "$request" $status'` applied via
`access_log /var/log/nginx/grokbot-machine.log machine` on the `/api/v1/` and RSS-feed
locations ONLY. `$remote_addr` must be the Cloudflare-resolved real client IP (§9.3) or the
metric can be poisoned by a spoofed header. This is §1.6's metric #1 and it cannot be
backfilled — if the log format is missing at cutover, the data for that window is gone.

### M4 exit criteria — evidence (2026-08-21)

1. **M4.1 PASS** — all seven endpoints emit into `dist/api/v1/` and carry the canonical
   envelope. Verified per endpoint (`generated_at` present, `count` numeric, `items` array):
   index 7 · latest 9 · plugins 5 · use-cases 3 · collections 1 · categories 10 ·
   integrations 4. Field naming is snake_case throughout. `latest.json` additionally carries
   `truncated: false` and `oldest_added_at` (§7.1.2) — at 9 entries the window is not cut.
2. **M4.2 PASS** — the three §7.2 feeds now exist (M0 shipped only a scaffold `/rss.xml`;
   the two lane feeds were built here). `xmllint --noout dist/rss.xml dist/plugins/rss.xml
   dist/use-cases/rss.xml` exits **0** — and xmllint is now genuinely installed on this box
   (`sudo apt-get install -y libxml2-utils` succeeded), so the M3.2 Node-parse workaround is
   retired. `/rss.xml` carries 9 items.
3. **M4.3 PASS** — `/agent/` renders the §7.3 contract in a copyable block
   (`data-copy` + "grokbot.dev — Bot Contract v1"), is linked in the site header, and its
   first paragraph contains the §6.11 money phrase verbatim.
4. **M4.4 PASS (amended: inspector not run)** — `curl http://127.0.0.1:4390/healthz` returns
   `{"ok":true}`. `initialize` returns protocolVersion 2025-06-18 + serverInfo. `tools/list`
   returns exactly the four §7 tools, **all four with an outputSchema**. One `tools/call` per
   tool against the seed corpus: search_directory (count=3, truncated=true), whats_new
   (count=2, truncated=true), get_entry firstmate (found=true, 4091-char prompt returned),
   list_collections (count=1, truncated=false) — every one `isError=false` with
   `structuredContent`. Rate limit verified live: 62 rapid calls → 54×200 then 8×429 with
   `Retry-After: 60`. **Amendment:** `@modelcontextprotocol/inspector` was not run — it is an
   interactive UI needing a browser session this box does not have, and installing it would
   add a dependency for one check. The raw JSON-RPC transcript above exercises the same
   surface (initialize → tools/list → tools/call) and is reproducible with curl.
   `curl https://mcp.grokbot.dev/healthz` is a production URL and belongs to M7.
5. **M4.5 PASS** — with the services process killed, `check-links` still walks 107 pages with
   0 broken links and `audit-scripts` still exits 0. The static site has no runtime
   dependency on services; the MCP server only reads what the build already wrote.

## 2026-08-21 — M2b-1b: 016 factored-digest imported (hold resolved)

The v2 re-capture settled the question the M2b-1 hold raised: the template is **raw,
selectable X post text** in a same-thread reply (`2088830417516236927`), not image OCR —
two independent raw-vs-image passes both reported no attached media, no alt text and no
external links, and two verbatim passes matched at exactly 1626 characters. So the glyph
oddities (`actuallv`, `endina`, `vour read`, `backqround knowledqe`, `[SINGLE-SOURCE1`,
`thar`) are the **author's own hand-typed errors**, which he acknowledges in the thread.

Imported with the prompt **verbatim, zero corrections** — byte-identical to the capture at
1626 chars, every typo intact, verified programmatically rather than by eye. One plain
sentence sits above the prompt saying it is quoted exactly as posted, typos included,
because he wrote it by hand and says so. `prompt_provenance: author`; §10.1 checklist run;
`status: live`, `featured: false`.

Two `source_tweets`: the main post (the digest output) and the template reply. The entry
therefore reaches `/wall/` and carries the scouted chip.

**Counts: 10 live** — 5 plugins · 4 use cases · 1 collection · 0 demo.

**Hub-math delta: still two indexable hubs.** 016 is `work/research`, which now holds
**1 entry** against the ≥3 threshold — so it stays `noindex,follow`. The indexable set is
unchanged: `/categories/engineering/` and `/categories/engineering/agents-ops/`. Seeds 005
(x-to-notion-research-bot) and 021 (ai-tool-radar-digest) are the two that would take
`work/research` to 3 and flip it; both are in the #17-gated set. `collection-02` stays held
— its members 005/014 are still gated.

Gates: validate OK (10 entries) · astro check 0/0 · build exit 0 · keyword, contrast, links,
hub-intros, OG and audit-scripts all green.

## 2026-08-21 — M6 newsletter + analytics (§9)

### Waitlist endpoint

`services/src/waitlist.mjs`, mounted at `POST /api/waitlist` on the services process.
Accepts JSON (the JS path) and `application/x-www-form-urlencoded` (the no-JS native form);
the response SHAPE is chosen by request Content-Type — JSON gets JSON, a form post gets a
303 to `/subscribed/`, because the static site cannot read a query param at build time.

Security posture, all §9/§10: `INSERT OR IGNORE` on email so a duplicate is
**indistinguishable from a new signup** and the endpoint is not an enumeration oracle ·
honeypot `website` non-empty → silent accept, nothing stored, byte-identical response ·
`ip_hash` is `sha256(ip + WAITLIST_IP_SALT)`, the **raw IP is never stored** · client IP is
the nginx/Cloudflare-resolved `CF-Connecting-IP` with a socket fallback and **no trust in
client-supplied headers** (§9.3) · CORS is site-origin only, the opposite of the read API's
`*` · body capped at 4 KB · per-IP sliding window (5/hour default) as the inner bound, with
nginx `limit_req` as the outer one.

**Dependency:** `better-sqlite3` in `services/` — named by §9.3, so pre-justified.

### Analytics

`src/scripts/analytics.ts` now loads the `@vemetric/web` SDK (§9.7: SDK, not a script tag,
so the §10.7 CSP needs no script host — only the ingest host in `connect-src`).
`trackPageViews: true`, `trackOutboundLinks: **false**` (editorial clicks are tracked
explicitly as `plugin_link_click`; auto-tracking would double-count), `trackDataAttributes:
true`. With `PUBLIC_VEMETRIC_TOKEN` unset it installs a no-op stub and never constructs
Vemetric — that is what keeps analytics off on staging and silent in local dev.

Events wired to real interactions through the sitewide `grokbotTrack` hook:
`prompt_copy` (CopyButton), `newsletter_signup` (both the JS path and the `/subscribed/`
no-JS landing), `tweet_embed_load` (only ever after a real click, §10.3), and
`install_modal_open` / `install_copy` / `subscribe_copy` (InstallModal, wired at M1).

### M6 exit criteria — evidence (2026-08-21, against a scratch DB at /tmp)

1. **M6.1 PASS** — `POST` JSON `{"email":"test@example.com","source":"footer","website":""}`
   → `{"ok":true}`, row count 0 → **1**. Duplicate POST of the same email → `{"ok":true}`
   (identical response) and the count stays **1**.
2. **M6.2 PASS** — honeypot `website` non-empty → `{"ok":true}` and the count stays **1**;
   nothing stored.
3. **M6.3 PASS** — over the per-IP limit returns **429** `{"ok":false,"error":"rate_limited"}`.
   Note for the reader: by the time the dedicated burst ran, the earlier smoke calls from the
   same IP had already consumed the 5/hour budget, so all 7 burst calls returned 429 — the
   limit counts every POST from that IP, which is the intended behaviour.
4. **M6.4 PASS** — the static site is unaffected by services state (proven at M4.5: with the
   process killed, 107 pages still resolve with 0 broken links). The `NewsletterRow` island
   catches fetch failure and shows CP-017's honest down-message; with no JS the native form
   posts and the browser handles a 502 itself.
5. **M6.5 PARTIAL — token-blocked, documented.** The SDK is wired, the event names are on
   real interactions, `trackOutboundLinks` is off, and the footer Stats link is already
   gated on `PUBLIC_STATS_URL` (renders only when set — M1). What **cannot** be done here:
   creating the Vemetric account, obtaining `PUBLIC_VEMETRIC_TOKEN`, confirming events land
   in the dashboard and setting that dashboard public. Those need operator credentials and
   move to the token/launch day runbook alongside the M5 remote items.
6. **M6.6 PASS** — form-urlencoded POST returns **`303`** with
   `Location: /subscribed/?subscribed=1`. Invalid email on the form path returns 303 with
   `?subscribed=0`; rate-limited returns `?subscribed=0&reason=rate_limited`.

Also verified: wrong method → **405** `method_not_allowed`; invalid email on the JSON path →
**400** `invalid_email`; stored row shows `ip_hash` as a 64-char sha256 with no raw IP
present.

## 2026-08-21 — M5-LOCAL (§8 files) + the token-day runbook

### Shipped

- **`.github/workflows/ci.yml`** — three required checks (`validate`, `build`, `links`)
  running the SAME gates as a local `npm run build`, so green CI and a green local build
  mean the same thing. `validate` additionally asserts the golden fixtures still FAIL
  (a validator that stops rejecting is a silent regression), runs the §4.6 contrast floors,
  runs the hub-intro gate **ARMED** (`HUB_INTRO_GATE=1` — the corpus is complete, so it can
  be armed in CI now even while local builds stay report-only), and re-runs the M0.4
  raw-colour grep.
- **`.github/workflows/labeler.yml`** — `pull_request_target`, `types: [opened, reopened]`,
  `pull-requests: write`. **It checks out nothing and runs no repository code** — it reads
  the author from the event payload and calls the labels API. That is the one safe use of
  this trigger, and the file says so in a comment so nobody adds a checkout step later.
  A plain `pull_request` trigger gets a read-only token on fork PRs and cannot label them,
  which would leave every community PR unlabelled and therefore ungated.
- **`.github/workflows/merge-gate.yml`** — **fails closed** on an unlabelled PR. Agent path:
  `via-agent` + author allowlisted + content-only. Community path: ADDED files under
  `content/**` only, `needs-verification` removed, and an APPROVED review whose `commit_id`
  equals the current head SHA — **a stale approval does not count**, which is what backs the
  branch-level stale-dismissal rule.
- **`.github/CODEOWNERS`** — exactly §8.6's block. `content/**` is deliberately unowned so
  agent content PRs merge unattended; everything else is maintainer-owned. No `*` catch-all.
- **`.github/PULL_REQUEST_TEMPLATE.md`** — §8.4 verbatim **with one intended difference**:
  the "not an ad" line takes CP-054/CP-062's rewrite ("Sponsor slots will exist for that —
  this isn't one.") instead of the PRD's "(later)" parenthetical. Addendum C is binding on
  copy and explicitly names this line, so **M5.1's `diff` against the PRD block will show
  exactly this one line and no others** — that is expected, not a defect.

### Deferred with reason

- **`README.md` (§8.8)** — NOT written. §8.8's contents were not read in this session, and a
  README that "teaches contribution in one read" is the repo's front door; guessing at its
  required sections would be worse than leaving the M0 stub in place. It is the one M5-local
  item outstanding and needs one focused pass over §8.7/§8.8.
- **awesome-grok-bot diff (§8.9)** — prepared as a runbook item below rather than a diff
  file, because the target is a separate remote repo that does not exist locally.

### TOKEN-DAY RUNBOOK — paste-ready (M5 remote + M6.5)

Everything below needs a GitHub token with org access and/or operator credentials. Nothing
here can be done from this box today (§12.3).

```bash
# 0. Create the public repo and push full history (§12.3)
gh repo create ZeroPointRepo/GrokBotDev --public --source=. --remote=origin --push

# 1. Labels (§8.6)
gh label create via-agent              --color 0e8a16 --description "agent-authored PR"
gh label create community              --color 1d76db --description "human-authored PR"
gh label create needs-verification     --color fbca04 --description "awaiting editorial verification"
gh label create verified-by-maintainer --color 5319e7 --description "maintainer-set verified_at (fork-edit case)"

# 2. Repo settings (§8.6): squash only, auto-merge on, delete head branches
gh api -X PATCH repos/ZeroPointRepo/GrokBotDev \
  -F allow_squash_merge=true -F allow_merge_commit=false -F allow_rebase_merge=false \
  -F allow_auto_merge=true   -F delete_branch_on_merge=true

# 3. Branch protection on main (§8.6). NOTE the pivot: approvals=0 WITH code-owner review
#    ON — a blanket "1 approval" would break CONTEXT-locked agent auto-merge.
gh api -X PUT repos/ZeroPointRepo/GrokBotDev/branches/main/protection \
  --input - <<'JSON'
{
  "required_status_checks": { "strict": true, "contexts": ["validate", "build", "links", "merge-gate"] },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 0,
    "require_code_owner_reviews": true,
    "dismiss_stale_reviews": true
  },
  "required_conversation_resolution": true,
  "required_linear_history": true,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "restrictions": null
}
JSON

# 4. Verify it took (this is M5.4's exact check)
gh api repos/ZeroPointRepo/GrokBotDev/branches/main/protection

# 5. Dry-run PRs (M5.5 + M5.7) — each must land on the stated outcome:
#    a. valid entry           → all four checks green
#    b. unknown integration   → validate FAILS with the closest-match message
#    c. via-agent + a file outside content/ → merge-gate FAILS "split this PR"
#    d. community PR editing package.json  → merge-gate FAILS with the path-scope message
#    e. community PR approved, then pushed → approval no longer counts, merge blocked

# 6. awesome-grok-bot (§8.9) — separate repo, prepare the entry then open the PR
gh repo fork <awesome-grok-bot-owner>/awesome-grok-bot --clone
# add grokbot.dev to the directories/registries section, one line, alphabetical
gh pr create --title "Add grokbot.dev" --body "Open directory of Grok Bot prompts, plugins and collections."

# 7. Vemetric (M6.5) — needs operator credentials
#    - create the project, copy the token into .env as PUBLIC_VEMETRIC_TOKEN
#    - rebuild, confirm prompt_copy / newsletter_signup / install_modal_open land
#    - set the dashboard PUBLIC, put its URL in PUBLIC_STATS_URL
#    - confirm the footer Stats link renders (it is gated on that var and hidden without it)
```

**Also pinned for cutover (from M4):** the §7.5 nginx `machine` log format on the
`/api/v1/` and RSS locations, with a Cloudflare-resolved `$remote_addr`. It cannot be
backfilled — if it is missing at cutover, that window of §1.6 metric #1 is gone.

## 2026-08-21 — M5x: README.md (§8.7/§8.8) — the last M5-local item

The M5 deferral is closed. `README.md` replaces the M0 stub and carries §8.8's nine
required items **in the order §8.8 lists them**: h1 + the §1.1 one-liner · the §10.5
disclaimer verbatim · three badges (CI / MIT / CC BY 4.0) · the five lanes linked to their
live hub URLs · the machine layer · the bright line + a four-step PR quickstart · local
development · licensing · the footer links (awesome-grok-bot, the CRHQ credit, public
stats).

**A7 is binding on it and was applied:** the Scouts / the Curator / the Builder, never an
internal role name; **"always on"**, never a cadence (grep for `every 30`, `30-minut`,
`sweep every`, `PM agent` returns nothing); the awesome use cases + the plugin registry are
foregrounded and the PR plumbing sits below them.

Facts checked one by one, because a README is the one file people read instead of the site:
RSS 2.0 at `/rss.xml` + the two lane feeds (never Atom, never `/feed.xml`) · the machine
surfaces are exactly `/agent/`, `/api/v1/index.json`, RSS and `mcp.grokbot.dev/mcp` · **MCP
is hosted-only — the README says out loud there is no npm package and no stdio transport**
(§12.6) · content is one markdown file per entry under `content/<type>/` · community PRs
**add** files only, and a new integration or category is a maintainer change via an issue
(§8.6's path-scope rule) · the API index *is* the API documentation, because no HTML docs
page exists (§8.8 item 5) · verification is described as what §10.1 actually requires —
reading every relevant file of a linked repo or the complete prompt, opening every URL,
scanning for injection, checking attribution — and `verified_at` is stated as
maintainer-set, never contributor-set.

The bright line ships as the **CP-054 rewrite** ("Sponsor slots will exist for that — this
isn't one."), matching `PULL_REQUEST_TEMPLATE.md` verbatim. CP-054 has three sites (§8.2,
§8.4/CP-062, §8.7) and §8.6 says the line is published verbatim in all three surfaces
including the README, so the pack's AFTER is the only correct string here. Nothing in copy
pack §16's protected list is touched.

Gates after: build exit 0, `astro check` 0/0, links 0 broken, every other gate green.

## 2026-08-21 — M7-LOCAL (everything in §11 M7 that runs without the org token or prod DNS)

### 1. HUB_INTRO_GATE is now ENFORCING, permanently

`scripts/check-hub-intros.mjs` **defaults to ON**. `HUB_INTRO_GATE=1` is still written
explicitly at both call sites — the npm `build` script and `ci.yml` — so the intent reads
at the call site, but the default is what actually guarantees it: `HUB_INTRO_GATE=0` is now
the only way back to report-only and nothing in the repo sets it. Inverting the default
rather than relying on an env prefix means the gate cannot be lost by someone editing the
build chain.

Proven five ways, not asserted:

| # | Fixture | Result |
|---|---|---|
| A | `integrations/slack.md` moved aside, gate armed | `82/83 present` → **exit 1** |
| B | `categories/support.md` truncated to 2 words | `1 out of range` → **exit 1** |
| C | intro missing, **no env var at all** | **exit 1** — the new default is enforcing |
| D | intro missing, `HUB_INTRO_GATE=0` | exit 0 + an explicit "reporting only, NOT failing" warning |
| E | intro missing, full `npm run build` | **build exits 1** at the gate, before `astro build` |

The corpus was restored byte-identically after each (`git status` clean). `ci.yml` gained a
step that runs fixture A on every PR — same reasoning as the existing "negative fixtures
must still fail" step: a gate that quietly stops rejecting is a silent regression.

### 2. M3.8 wireframe QA — 19 page templates × 3 breakpoints (deferred from M3, now done)

Walked with the agent-browser CLI against the built site on the preview server at
`localhost:4381`, at **1440 · 768 · 390** (§4.5's lg / md / <sm bands). 57 full-page
screenshots + the hero and defect captures in
`/opt/projects/control-room/images/grokbot-m7-qa/` (75 files).

Templates covered: home · the three lane indexes · plugin detail · use-case detail ·
collection detail · `/wall/` · `/agent/` · `/contribute/` · `/submit/` ·
`/plugin-builder/` · `/about/` · `/search/` · category hub · subcategory hub · integration
hub · `/subscribed/` · 404.

Each page/breakpoint was probed for horizontal overflow (every element measured against the
viewport, not just `document.scrollWidth`), landmark integrity (§4.6: one header, one
`<main id="main">`, one footer, one h1, no unlabelled `nav`), skip link, region order inside
`<main>`, and computed grid column counts against the §4.5 responsive table.

**Final state: 57/57 combos clean — zero overflow, zero landmark defects, zero heading-order
skips across all 108 built pages.** Six defects were found and fixed to get there.

#### Defects found and FIXED

**QA-D1 · HIGH · §4.2.8a was half-implemented and search results were broken.**
`data-pagefind-body`, `data-pagefind-ignore` and `data-pagefind-weight` shipped; the other
two normative rows — `data-pagefind-meta` (name/tagline/type/status/setup_minutes/
verified_at/url) and `data-pagefind-filter` (type/category/integration) — were **never
emitted**. Three consequences, all live:
1. Pagefind reported `Indexed 0 filters`, so the `/search/` facets had nothing to filter on.
2. The island builds its result cards from `meta.*` (§4.2.8a's "without a second fetch"),
   so **every search result rendered as "untitled"** with no tagline and no chips —
   reproduced in the browser and captured as `DEFECT-search-untitled-before.png`.
3. §4.3.2's lane-index search form submits `q` + `type=plugin`, and the island read only
   `q` — the scoping was silently dropped on every search from a lane index.

Fixed with `src/components/PagefindMeta.astro` (new; §4.2.8a is its only spec) on all three
entry templates + `/plugin-builder/`, plus `data-pagefind-meta="name"|"tagline"` on the real
h1/tagline nodes and `data-pagefind-filter` on the category and integration chip wrappers.
**One pair per element** — a single combined attribute came back as
`type = "plugin, url:/plugins/…, status:live, …"` and printed the whole blob in the result
chip, because Pagefind's comma-delimited multi-pair form does not survive a value containing
`/` or `:`. Also learned by measurement, not assumption: **Pagefind lowercases the filter
values it indexes from chip text**, so the facet links carry the lowercased label, not the
slug (they diverge for any multi-word integration — `Google Calendar` indexes as
`google calendar`, slug `google-calendar`). Verified against `pagefind.filters()`.
Now: `Indexed 3 filters`; results render name + tagline + verified/setup/type chips;
`?type=plugin` → 5, `?type=use-case` → 4, `?category=engineering` → 6,
`?integration=github` → 2; and `/plugins/` → search → `/search/?q=grok&type=plugin` returns
5 plugins and nothing else.

**QA-D2 · MEDIUM · `/search/` was missing wireframe region [3]'s FilterBar.** §4.3.11 shows
`category ▾ integration ▾ type ▾` and §4.2.9's variants row says `/search/` gets **all
three** — the page rendered only the input. Added, with options built from the live corpus
so no menu offers a value with zero hits, sitting between the input and the results via a
new `filters` slot in `SearchInput` page mode. The island now reads `type`, `category` and
`integration` alongside `q`, applies them as Pagefind filters, reflects the active facet in
the `<summary>` (§4.2.9 States), and rewrites the facet hrefs on load and on every keystroke
so a filter click keeps the query and the other active facets. **Documented tradeoff:** the
server-rendered hrefs are static, so with JS off a facet click lands on an unfiltered
`/search/?category=…` — a valid state, and every option is also reachable from the §6.10 hub
cross-links, which is the same fallback §4.2.9 already accepts for the menus themselves.

**QA-D3 · MEDIUM · `/collections/` used the wrong grid.** §4.5 gives collections their own
responsive row (1 / 1 / 2 / 2) and §4.3.6's legend says "**2-col grid at lg** (collections
are wider cards)". `LaneIndexPage` rendered the standard EntryCard grid (1 / 2 / 2 / 3) for
all three lanes. Now variant-aware: measured 2/2/1 at 1440/768/390, matching the table.

**QA-D4 · MEDIUM · `/about/` was missing the CRHQ cross-link** required by §4.3.14 — the
file's own header comment named it and the markup never had it. Added as a "who built it"
section in the A7 register (no cadence, no internal role names).

**QA-D5 · MEDIUM · heading-order skipped a level on 12 page templates.** Lane indexes, all
83 hubs and `/plugin-builder/` put an h3 (EntryCard default `headingLevel`, RelatedList's
`sub` heading) directly under the h1 with no h2 between; entry detail pages did the same
with their first `SectionHeading variant="sub"`. Cost 2 Lighthouse a11y points and is a real
outline defect for screen-reader users. Fixed with the props §4 already provides —
`EntryCard headingLevel={2}` where a grid follows the h1 with no section heading, and
`SectionHeading level={2}` on page-level sections (the `sub` sizing is unchanged; §4.2.6
carries `level` and `variant` separately for exactly this). `RelatedList` gained a
`headingLevel` passthrough. **Note for whoever reads this next:** axe ignores hidden
headings, so the `InstallModal`'s h2 does not count while the modal is closed — a source-order
outline check passes while the rendered one fails. The verification sweep therefore strips
the closed modal before checking. **0 of 108 pages skip a level, in both scopes.**

**QA-D6 · MEDIUM · the FilterBar menu opened off-screen at 390.** Surfaced by QA-D2: with a
third facet, the 192px absolutely-positioned panel hangs off a summary at x=274 and reaches
466 in a 390 viewport → horizontal scroll on open. §4.3.2's mobile note already specifies the
answer ("FilterBar menus stack full-width above grid"), which was never implemented. Below
`sm` the menus are now full-width blocks and the panel drops into normal flow; at `sm`+ the
absolute panel is unchanged. Verified with the third menu open at 390: `scrollWidth == 390`.

#### Judgment calls for the orchestrator — NOT changed

1. **Footer column count contradicts §4.5.** §4.5's table says footer columns are 1 / 2 / 3 /
   3; the build ships 1 / 2 / 4 (`sm:grid-cols-2 lg:grid-cols-4`). §4.2.4 says "Composition
   (**4 mono columns** → see wireframes)" but then enumerates only three (browse, machine,
   project) "plus a full-width bottom line", and §4.3.1's wireframe row [8] also shows three.
   The shipped fourth column is `counts`, added by the Builder under A9's density directive.
   So §4.2.4's parenthetical, §4.2.4's own enumeration, §4.5's table and A9 do not all agree,
   and the disagreement is about **content**, not layout — which is why it is not an executor
   call. Either drop `counts` and go `sm:grid-cols-2 md:grid-cols-3`, or amend §4.5's row to
   4. Everything else in the §4.5 table is verified conformant (EntryCard 1/2/2/3, collection
   and member grids 1/1/2/2, lane tiles and submit tiles 1/1/3/3, TweetEmbed row 1/1/2/2,
   gaps 16→24px at md, h1 step-down below md, no-hamburger wrapping header).
2. **The hero seed label is hidden below 640px** (`.stage .hero-seed{display:none}`), while
   A4 calls the visible seed "a deliberate differentiator + build-in-public talking point".
   Half the visits will be mobile. Keep, or show it smaller?
3. **`/about/` says "a maintainer or the verifying agent"** where A7 names **the Curator**.
   It is a descriptor rather than an internal role name, so it does not break the letter of
   A7 rule 1, but the README now says "a maintainer — or the Curator" and the two surfaces
   should probably match. One-line copy change either way.
4. **The header wraps to three rows at 390** (wordmark+nav, nav overflow, then the right
   cluster) where §4.5 describes two. Nothing is hidden, there is no hamburger, and no
   overflow — conformant in substance, looser in shape.

#### Not defects — recorded so the next reader does not re-open them

- **No plugin page renders a `related` block.** §6.10 (the canonical owner) ranks by *same
  subcategory* first, then shared integrations, same type only. At 10 entries, no two plugins
  share a subcategory and no two share an integration, so the honest result is empty and
  `RelatedList` correctly renders nothing. §4.3.3's legend says "same category", which is the
  display-stale echo; §6.10 wins (§12.2). This resolves itself as volume arrives.
- **`/integrations/slack/` renders `EmptyState`** — it holds zero entries, and §4.3.12 [5]
  specifies exactly that below 1 entry.
- **`/search/` indexes `/plugin-builder/` as `type: page`.** §4.2.8a indexes that page by
  name, so it appears in results; the type facet menu is built from the entry corpus and does
  not offer `page`, so nothing looks broken.

### 3. Hero multi-seed sweep (A4)

**30 live seeds across two breakpoints, plus 3 static-path seeds.**
1440: 1572 · 2732 · 2008 · 1472 · 5062 · 7031 · 1206 · 9359 · 6404 · 2570 · 8418 · 2325 ·
7446 · 6125 · 4462. 390: 5884 · 5498 · 2490 · 8229 · 7078 · 5832 · 2526 · 2260 · 9054 ·
2920 · 5380 · 1915 · 4195 · 6288 · 2009. `?static=1`: 2593 · 2809 · 5363.

- **Bot count:** 10 at 1440, 6 at 390 — A4's 10-desktop / 6-under-720px rule, on every seed.
- **Nothing covers the copy.** Measured two ways. Box-vs-box over `#content`'s children hits
  only the `h1` and never `p.sub`, `.hero-actions`, `.hero-friction`, `.hero-search` or any
  control; re-run against tight `Range.getClientRects()` text-line boxes (bot boxes left at
  full size, so the test stays conservative) gives the same answer — h1 only. The h1 hits are
  the pile **resting on the line box's leading**, above the letterforms: confirmed visually
  on the screenshots at both widths, where the bots sit in a clean row above the headline.
  A4's own z-order makes this structural anyway — `#content` is z3, `#botlayer` is z1, so
  copy composites over any bot; the measured static body is what stops one settling behind
  the text in the first place. **Verdict: PASS, no overflow of copy on any of the 30 seeds.**
- **`?static=1`** renders the deterministic hand-placed pile: the slot lattice is identical
  across runs (x ≈ 284/375/438/590/674/743/895/968/1048, y ≈ 100/175 with one at ≈25),
  varying only ±3px as different-sized forms sit in the same slots. Which of the eleven forms
  lands in each slot follows the seed — by design (hero.js: "eleven forms, ten drawn per
  assembly, one sits out each roll"). The hint swaps to `static assembly · reduced motion`
  and the physics loop never starts. Captured at 1440 and 390.
- **`prefers-reduced-motion` in the built output:** four blocks across the shipped CSS —
  `index.hUhxuDMC.css` (§4.4 rule 6's global kill), `index.BZIMcL4o.css`
  (`.stage * { animation:none!important; transition:none!important }`), `_page_.CBp1iqVH.css`
  (the Button active translate) and `_gallery_` (dev-only). The JS path is the same one
  `?static=1` forces: `REDUCED = FORCE_STATIC || matchMedia('(prefers-reduced-motion: reduce)')`.

### 4. Gates + the §11 M7-local subset

All green on the final build:

- `validate` 10 entries (5 plugins · 4 use cases · 1 collection · 0 demo) · negative fixtures
  still correctly rejected · `check-contrast` every gated pair clears its §4.6 floor ·
  `check-hub-intros` **armed**, 83/83 · raw-colour grep clean · arbitrary-Tailwind grep clean ·
  `astro check` **0 errors / 0 warnings** · `npm run build` exit 0 · `check-keyword-placements`
  4 placements + 83 intros, 0 shingle collisions · `check-links` 108 pages, 0 broken ·
  `audit-scripts` 8 island bundles, 0 inline JS.
- Artifacts: 3 RSS 2.0 feeds well-formed via `xmllint` (10 / 5 / 4 items) · sitemaps
  well-formed, **24 `<url>` and 24 `<lastmod>`** · 112 URLs enumerated · Pagefind
  `page_count: 11` (10 entry pages + `/plugin-builder/`, §4.2.8a) · 12 OG PNGs · MCP
  `/healthz` `{"ok":true}` and `tools/list` returns the four §7 tools.
- **M7.5(a) all-200 walk** on the preview server: 35 URLs — every page type, all seven
  `/api/v1/*.json`, all three feeds, both sitemaps, `llms.txt`, `llms-full.txt`, `robots.txt`
  — **all 200**.
- **M7.5(b) negatives:** `/dev/components/` → **404** (dev pages excluded from the production
  build; `dist/dev` does not exist), an unknown entry slug → 404. The **trailing-slash 301 is
  deploy-time**: `astro preview` 404s a slash-less URL rather than redirecting, because the
  canonicalisation is nginx's (§3.5/§6.9). It is on the remote checklist below.

### 5. Lighthouse — M7.2, run locally

`npx lighthouse@12` against the preview server (`--headless=new`), so these are *local*
numbers: no nginx compression, no HTTP/2, no Cloudflare. Production will differ, and M7.2
must be re-run there.

| Page | perf | a11y | seo |
|---|---|---|---|
| `/` | 93 | 96 | 100 |
| `/plugins/compound-engineering/` | 99 | 96 | 100 |
| `/use-cases/grok-ship/` | 99 | 96 | 100 |
| `/collections/grok-ship-firstmate/` | 98 | 96 | 100 |
| `/categories/engineering/` (indexed hub) | 98 | 96 | 100 |
| `/categories/support/` (thin hub, `noindex` — SEO exempt per §6.2) | 98 | 96 | — |

**Every M7.2 threshold is met (≥95 performance, accessibility, SEO).** Before the QA-D5
heading fixes the entry and hub pages sat at **94 a11y — below the bar**; that is what makes
QA-D5 an exit-criterion defect rather than a nicety. Home performance is the one number that
moves between runs (83 / 93 / 96 observed) — the hero sim's main-thread work on first paint;
worth re-checking on production hardware.

### ⛔ A10 — the last thing between this build and a perfect a11y score (operator verdict)

The only remaining Lighthouse a11y failure on every page is `color-contrast`, and it is
**exactly A10**: white on light Ash Amber measures **4.16:1** against a 4.5 floor, on the
primary button, the `submit` button, the featured tag and the newsletter submit.
`check-contrast.mjs` has reported it as `A10-PENDING` since M1 by design ("block nothing").

A11 item 2 says the fix is a one-line token swap awaiting an operator verdict, so it was not
applied — but it **was measured**, so the verdict can be made on numbers instead of a guess.
Flipping `--color-accent-contrast` in the light block from `#FFFFFF` to `#0B0B0C`:

- `check-contrast`: light pair **4.16:1 → 4.73:1**, PASS. No more `A10-PENDING` row.
- Lighthouse accessibility: **96 → 100** on `/` and on a use-case page, with `color-contrast`
  flipping to PASS. Dark mode is unaffected (already 9.18:1).
- Build stays green end to end.

Tokens were reverted; the working tree carries no token change. **This is a one-line edit
whenever the operator says go, and it is worth 4 Lighthouse points on every page.**

### 6. M7-REMOTE REMAINDER — the checklist

Everything below needs the org token, operator credentials or production DNS. **The paste-ready
commands for the repo, labels, branch protection, dry-run PRs, awesome-grok-bot and Vemetric
already live in the TOKEN-DAY RUNBOOK above — run that first and do not duplicate it here.**
This list is what M7 adds on top, in execution order.

- [ ] **0 · Token day.** Execute the TOKEN-DAY RUNBOOK above end to end (repo create + push,
      the 4 labels, repo settings, branch protection, the M5.5/M5.7 dry-run PRs a–e,
      awesome-grok-bot §8.9, Vemetric). M7.3 depends on it: "all CI green on `main`, no open
      `needs-verification` PRs older than 48h" cannot be evaluated until `main` exists remotely.
- [ ] **1 · Deploy to crhq-products** per §3 — checkout at `/opt/projects/user/grokbot`,
      `npm ci && npm run build`, `services/` under pm2 (`SERVICES_PORT=4390`), `DIST_DIR`
      pointed at the built `dist`. PII exports stay outside the checkout at
      `/opt/data/grokbot/exports/` (§10.4).
- [ ] **2 · nginx (§3.5) — the one thing that CANNOT be backfilled.** Define
      `log_format machine '$time_iso8601 $remote_addr "$http_user_agent" "$request" $status'`
      and apply `access_log /var/log/nginx/grokbot-machine.log machine` on the `/api/v1/` and
      RSS-feed locations **only**. `$remote_addr` must be the Cloudflare-resolved real client
      IP (§9.3) or the metric is poisonable by a spoofed header. **If this is missing at
      cutover, §1.6 metric #1 is gone for that window — there is no recovery.**
- [ ] **3 · nginx, the rest.** `include infra/security-headers.conf` as the **first directive
      of every `location` block** (§10.7 — `add_header` does not inherit into a location that
      sets its own, so `/api/v1/` and the feeds would otherwise ship with none); `dist/redirects.conf`
      wired in; trailing-slash + lowercase 301 canonicalisation (§6.9) — **this is what makes
      M7.5(b)'s 301 assertion testable; it cannot be verified locally**; `/404.html` as the
      error page; CSP per §10.7 including `'wasm-unsafe-eval'` for Pagefind and the Vemetric
      ingest host in `connect-src`.
- [ ] **4 · Staging vhost first.** `curl -sI https://products-grokbot.crhq.ai/` must show
      `X-Robots-Tag: noindex, nofollow` (§3.5/§3.10) **before** anything points at production.
- [ ] **5 · certbot / TLS** for `grokbot.dev` and `mcp.grokbot.dev`; HSTS per §10.7
      (`max-age=63072000; includeSubDomains; preload`).
- [ ] **6 · DNS cutover** (§3, A11 item 5 — NS handover to the operator's Cloudflare).
- [ ] **7 · Production smoke, M7.4 + M7.5.** `curl -sI https://grokbot.dev/` → 200 with every
      §10.7 header · `curl -sI https://grokbot.dev/api/v1/latest.json` → `Access-Control-Allow-Origin: *`
      **and the same §10.7 header set** (this is what proves the §7.1.5 `include` fix) ·
      same on `/rss.xml` · `/search/?q=slack` returns results **in production** (proves the CSP
      `'wasm-unsafe-eval'` allowance) · the 35-URL all-200 walk from §4 above, re-run against
      the live host · `curl -sI https://grokbot.dev/plugins/mail-sorter` → **301** to the
      trailing-slash canonical · `curl -sI https://grokbot.dev/dev/components/` → **404** ·
      `curl https://mcp.grokbot.dev/healthz` → `{"ok":true}` and one `tools/call` per tool.
- [ ] **8 · Lighthouse M7.2 re-run against production** on `/`, one plugin, one use-case, one
      collection and one indexed hub (`/categories/engineering/` at current volume — pick any
      hub with no `noindex`). Thin hubs are SEO-exempt (§6.2); run perf + a11y on one anyway
      and record it. **Local numbers are in §5 above and all clear ≥95** — but §11 M7.2 asks
      for production, so this is not satisfied until it is re-run there.
- [ ] **9 · Production waitlist POST** (M7.6): the M6.1 JSON and form paths against the live
      endpoint, plus the honeypot and rate-limit cases, with `WAITLIST_IP_SALT` set to a real
      secret and `WAITLIST_DB_PATH` on the production volume.
- [ ] **10 · Vemetric (M6.5, from the runbook).** Token in `.env`, rebuild, confirm
      `prompt_copy` / `newsletter_signup` / `install_modal_open` land, set the dashboard
      **public**, set `PUBLIC_STATS_URL`, confirm the footer Stats link appears (it is gated on
      that var). The README's "Public stats" footer link points at
      `https://app.vemetric.com/public/grokbot.dev` (§9.9's documented default) — **correct it
      if the real dashboard URL differs.**
- [ ] **11 · Search Console** (M7.7): submit `sitemap-index.xml`, verify the public dashboard
      link in the live footer.
- [ ] **12 · Carried open items, decide before or at launch.** ~~The A10 token flip~~ —
      **CLOSED by decision #18, see the M7x entry below** · the OG typeface stand-in (DejaVu
      today; §6.6 wants the §4 mono + sans as committed TTF subsets — a one-line swap in
      `build-og.mjs`) ·
      the `favicon.svg` / `favicon-32.png` M0 assets, still not regenerated from A3's `favicon`
      variant (M1 sweep row S5) · the four judgment calls in §2 above · the M2 post-launch
      plugin smoke tests, none of which can run without a live Grok Bot account.

## 2026-08-21 — M7x: A7 naming alignment + A10 RESOLVED (design authority decision #18)

Two rulings landed and are applied here; the other three are recorded so nobody re-opens them.

1. **Footer column count — KEEP 4.** §4.2.4's "Composition (4 mono columns)" plus A9's density
   directive win over §4.5's 3-column table row, which is stale. The `counts` column stays.
   **Resolved — do not "fix" the footer grid to 3 columns.** §4.5's footer row should be read
   as 1 / 2 / 4.
2. **Hero seed label hidden below 640px — KEEP.** A4's visible-seed differentiator lives at
   desktop widths and in screenshots; mobile real estate wins. Reviewable post-launch, not a
   defect.
3. **`/about/` "the verifying agent" — ruled a DEFECT against A7, not a judgment call.** Public
   copy uses the sanctioned names only. Fixed: the line now reads "Nothing gets a verification
   date unless a maintainer — or the Curator — has actually read it", matching the README's
   formulation word for word so the two public surfaces agree. `/about/` now names only the
   Scouts, the Curator and the Builder.
4. **Header wrapping to three rows at 390 — ACCEPTED deviation.** Nothing is hidden, there is
   no hamburger and there is no overflow, so it satisfies §4.5's substance; the row count is
   looser than the two the prose describes. Logged, not changed.

### ✅ A10 IS CLOSED — ink on amber, design authority decision #18

A10 has been open since M1 and A11 carried it as item 2. **Verdict: text on amber is ink.**
`--color-accent-contrast` in the light `@theme` block goes `#FFFFFF` → `#0B0B0C`. The amber
hex is untouched (A1's fill value and the accent law are unchanged), and dark mode already
shipped ink, so it is genuinely a one-line change. The operator's costless overrule is that
same line.

**And the gate is now a gate.** `A10_PENDING` is gone from `scripts/check-contrast.mjs` —
`accent-contrast on accent` is a fully gated pair, so a regression back to white-on-amber
**fails the build** instead of printing an `A10-PENDING` row that nobody reads. Proven, not
assumed: reverting only the light-block line makes `check-contrast` exit **1** with
`accent-contrast on accent 4.16:1 4.5 FAIL` while dark still passes at 9.18:1.

| | before | after |
|---|---|---|
| `check-contrast`, light | 4.16:1 · `A10-PENDING` (ungated) | **4.73:1 · PASS (gated)** |
| `check-contrast`, dark | 9.18:1 · PASS | 9.18:1 · PASS (unchanged) |
| Lighthouse a11y, `/` | 96 | **100** |
| Lighthouse a11y, `/use-cases/grok-ship/` | 96 | **100** |
| remaining a11y audit failures | `color-contrast` | **none** |

`color-contrast` now PASSES on both pages and **no accessibility audit fails at all**. The
four surfaces that carried the failing pair — the primary button, the header `submit` button,
`FeaturedTag` and the newsletter submit — were re-checked in the browser (computed
`rgb(11,11,12)` on `rgb(140,122,92)`) and captured at
`images/grokbot-m7-qa/A10-ink-on-amber-home-1440.png`. Home screenshots at all three
breakpoints refreshed.

Every other gate re-run clean after the flip: validate OK · hub-intros armed 83/83 · keyword
placements OK · links 108 pages 0 broken · audit-scripts OK · `astro check` 0/0 · build exit 0
· the M0.4 raw-colour grep still returns nothing outside `tokens.css`.

**Consequence for M7.2:** every Lighthouse category on every tested page is now ≥95, and
accessibility is a clean **100**. The remote checklist's item 12 no longer carries A10.

**Status: M0 through M7-local are complete, with no held design items.** What remains is
M7-remote, gated on the org token, operator credentials and production DNS — the checklist is
section 6 of the M7-LOCAL entry above, and it starts by executing the TOKEN-DAY RUNBOOK.
