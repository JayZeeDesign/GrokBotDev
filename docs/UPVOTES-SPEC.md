# Upvotes for grokbot.dev — Build Spec v1.1 (APPROVED)

Operator-approved 2026-08-26. This file is the source of truth for the `feat/upvotes` build.
Read ALL of it before writing code. The reviewer (Project Builder agent) signs off against it.

## Non-negotiable constraints

1. **Branch discipline:** ALL work on `feat/upvotes`. NEVER touch `main` or `production`.
   NEVER run `infra/deploy-staging.sh`, `infra/promote.sh`, or anything against
   crhq-products / grokbot.dev / Cloudflare. This ships ONLY after operator review.
2. **Working copy:** use a git worktree at `/opt/projects/grokbotdev-upvotes`
   (`git worktree add /opt/projects/grokbotdev-upvotes feat/upvotes` from /opt/projects/grokbotdev).
   The main tree at /opt/projects/grokbotdev stays on `main` (content publishing continues there) —
   do not touch it.
3. **Local test target (dev box only):** Astro preview of this branch on port **4382**
   (pm2 name `grokbotdev-upvotes-web`), votes-api on **127.0.0.1:4391**, Postgres 16 via docker
   (container `grokbot-votes-pg`, host port **54390**, volume outside the worktree). Add an nginx
   vhost on THIS dev box only: `grokbot-upvotes.anacreon.ai` → 4382 with `location /api/v1/` →
   4391 (mirror the existing grokbotdev.anacreon.ai vhost; same TLS approach).
4. **Commit + push `feat/upvotes` frequently.** Trailer: `Co-Authored-By: CRHQ <noreply@crhq.ai>`.
5. **Site invariants hold on the branch:** `npm run build` full gate must stay green
   (validate, contrast, links, **audit-scripts: still 0 inline JS** — the vote island is a
   bundled Astro script; Turnstile's `challenges.cloudflare.com` script-src gets added to the
   §10.7 CSP allowlist in `scripts/audit-scripts.mjs` + headers config CONSCIOUSLY, with a comment).
6. **No secrets in the repo.** Local env file `services/votes-api/.env` (gitignored) +
   `.env.example` committed. Generate HMAC pepper locally (`openssl rand -hex 32`).
   Use Cloudflare Turnstile OFFICIAL TEST KEYS locally
   (sitekey `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA` — always pass).
   Production keys are provisioned by the operator at deploy time — parameterize, don't hardcode.

## What you are building (P1 MVP)

A same-origin votes API + Postgres + an upvote island on use-case detail pages.
One upvote per person per use case. Anonymous but hard to game. Fully audited.

### Service — `services/votes-api/`
- Node 22, **Hono** (or Fastify), TypeScript, ~small. Binds 127.0.0.1:4391. pm2 ecosystem file.
- Middleware layers kept distinct: rateLimit → identity (cookie HMAC) → [reserved: bearerAuth for V2] → handlers.
- Structured JSON logs to stdout (pm2 captures). `/api/v1/health` endpoint.
- Strict validation (zod), 1KB body cap, 5s timeouts, prepared statements only (use `postgres` or `pg` with params).

### Endpoints (v1)
- `POST /api/v1/identity` — body: `{turnstileToken}`. Verifies token server-side (secret from env;
  local = test secret). Issues cookie `voter=<uuidv7>.<hmac-sha256(uuid, pepper)>`;
  httpOnly, Secure, SameSite=Lax, Path=/api, Max-Age 2y. Inserts identities row (kind='human').
  Rate limit: 3/day per ip_hash (429 after).
- `POST /api/v1/votes` — body `{slug, action: 'cast'|'uncast'}`. Requires valid voter cookie
  (401 otherwise → island then calls /identity first). Validates slug against the live use-case
  slug list (see "slug source" below). Appends to vote_events with computed weight + signals;
  upserts votes + vote_counts. Idempotent: repeat cast = no-op success. Toggle allowed.
  Limits: 60/hr per ip_hash, 30/day per identity.
- `GET /api/v1/votes/counts?slugs=a,b,c` (≤50 slugs) — `{counts: {slug: n}}`. Cache-Control:
  public, max-age=60, stale-while-revalidate=300.
- `GET /api/v1/votes/mine` — voter's own cast slugs (for island state). Private, no-store.
- Admin: NO admin HTTP endpoints in v1. Admin = CLI scripts (`services/votes-api/bin/`):
  `recount.ts` (rebuild counts from ledger + verify hash chain), `review-flags.ts`
  (list flagged batches, bless/bury with reason → audit_log), `digest.ts` (daily stats).

### Slug source
The API validates slugs against real use cases. Simplest robust approach: at Astro build time,
emit `dist/api-meta/use-case-slugs.json` (tiny script in the build) AND have votes-api load the
same list from the deployed site's `/api/v1/index.json` equivalent — for local dev, read the
worktree's `content/use-cases/*.md` filenames directly, refreshed every 10 min. Unknown slug = 400.

### Database — Postgres 16 (docker, local)
Migrations in `services/votes-api/migrations/*.sql`, applied by a tiny migrate script (no heavy ORM).
```sql
identities  (id uuid PK, kind text NOT NULL DEFAULT 'human' CHECK (kind IN ('human','bot')),
             created_at timestamptz, turnstile_passed_at timestamptz,
             x_user_id text NULL, x_handle text NULL, trust_tier smallint DEFAULT 0)
api_keys    (id uuid PK, identity_id uuid FK, key_hash bytea, label text, created_at,
             last_used_at, revoked_at)             -- V2 stub: CREATE now, unused in v1
vote_events (seq bigserial PK, at timestamptz DEFAULT now(), identity_id uuid, slug text,
             action text CHECK (action IN ('cast','uncast')), weight real,
             ip_hash bytea, ip24_hash bytea, ua_hash bytea, asn int NULL,
             signals jsonb, prev_hash bytea, row_hash bytea)
votes       (identity_id uuid, slug text, weight real, at timestamptz,
             PRIMARY KEY (identity_id, slug))
vote_counts (slug text PK, visible_count int, raw_count int, updated_at)
audit_log   (id bigserial, at timestamptz, actor text, action text, target text, detail jsonb)
```
- Roles: `votes_app` = INSERT on vote_events; SELECT everywhere; INSERT/UPDATE on votes,
  vote_counts, identities; INSERT on audit_log. **NO UPDATE/DELETE on vote_events. Ever.**
  `votes_admin` separate role for CLI scripts.
- Hash chain: `row_hash = sha256(prev_hash || canonical_json(row))`; verified by recount.ts.
- ip_hash = HMAC(ip, pepper); ip24_hash = HMAC(/24 or /48 for v6, pepper). NEVER store raw IPs.

### Weighting (write-time signals → shadow-discount)
Compute at cast; store in signals jsonb; weight ∈ {0, 1}:
- identity younger than 60s at first vote → weight 0 (still accepted)
- >2 casts on same slug from same ip24_hash → weight 0 for the 3rd+
- per-slug velocity: if slug got >15 casts in 10 min AND that's >10x its trailing baseline →
  flag batch `velocity` (weight 0, reviewable via review-flags.ts bless)
- datacenter ASN (small static list ok for v1, or skip ASN in v1 and leave column NULL)
- visible_count = SUM(weight); raw_count = COUNT(action='cast' current)

### Astro island — `src/components/UpvoteButton.astro`
- Placement: use-case detail page (`src/pages/use-cases/[slug].astro`), in the chip/action row
  near the title. NOT on plugins, NOT on cards/hubs (v1).
- Neutral bordered pill per site conventions (mono, lowercase, 44px target, tokens, both themes;
  respect one-accent rule — the amber stays on "install in grok bot"). States: idle
  `▲ upvote` / `▲ upvote · N` (count hidden when N<3 → "be the first"), voted = filled/pressed
  (still neutral, e.g. inverted border+bg), busy, error (quiet retry).
- Bundled `<script>` (Astro-hoisted, keeps CSP gate at 0 inline). Flow: onload fetch counts
  (+ mine if cookie present); on click → if no cookie: load Turnstile invisibly
  (script from challenges.cloudflare.com, sitekey from PUBLIC_ env), get token,
  POST /identity, then POST /votes. Progressive enhancement: no JS → no button.
- Also show count on the page statically? NO — counts are dynamic only (island), build stays static.

### nginx (dev vhost only in this phase)
`infra/nginx-grokbot-upvotes-dev.conf` (new file, applied to dev box nginx):
preview 4382 + `location /api/v1/ { proxy_pass http://127.0.0.1:4391; }` with
`limit_req` zones (identity 3/min burst, votes 30/min burst) as defense-in-depth.
ALSO author (but DO NOT APPLY) the production nginx diff as
`infra/nginx-grokbot.dev.votes.snippet.conf` + update `infra/DEPLOYMENT.md` with the
prod rollout steps (operator applies later).

### Tests (must pass; add `npm test` in services/votes-api)
- Unit: HMAC cookie sign/verify + tamper reject; weighting rules; slug validation.
- Integration (against local pg, e.g. vitest + testcontainers or the running docker pg):
  identity issue → cast → duplicate cast idempotent → uncast → recast; counts correct;
  ledger hash chain verifies; rate limits fire (429); unknown slug 400; forged cookie 401;
  votes_app role genuinely cannot UPDATE/DELETE vote_events (test it).
- E2E happy path via the running dev vhost (curl or playwright): fresh browser context →
  button appears → vote → count increments → reload → state persists → unvote.

### Runbook — `services/votes-api/RUNBOOK.md`
Start/stop, migrate, backup (pg_dump nightly cron example), restore drill, recount,
flag review, key rotation (pepper), what to do on a surge alert.

## Future (V2+) — design for it, don't build it
- **Bots vote via API keys** (operator direction): bot generates key (`gb_live_…`, hashed at
  rest) attached to identities kind='bot'; votes via `Authorization: Bearer`; bot votes
  labeled/segmentable in counts; read endpoints stay public keyless forever; advanced ops
  (bot voting, favorites, submissions, higher limits) require the key. Your job in v1: the
  `kind` column, the `api_keys` table, and a clean auth middleware seam.
- P2: counts on hub cards, sort-by-upvotes, nightly bake. P3: X-verify, favorites, accounts.

## Definition of done (P1)
1. Full gate green on the branch (`npm run build` incl. audit-scripts).
2. All tests green; E2E demo works at grokbot-upvotes.anacreon.ai (screenshot the states:
   idle, voted, count, "be the first", mobile).
3. Ledger verified: recount.ts output clean after the E2E session.
4. RUNBOOK + prod rollout steps written. NOTHING deployed to staging/prod.
5. Report back: what was built, test results, screenshots, the exact list of things the
   OPERATOR must provide/do at deploy time (Turnstile prod keys, prod nginx apply, pg on
   crhq-products, DNS none, etc.).
