# Awesome Use Case — FINAL model & blueprint

Status: **FINAL / approved** (2026-08-21). This is the record of truth for how every Awesome
Use Case listing is created — by us now, and by autonomous sourcing agents later. Supersedes
the old "Bot · Role name + one-line tagline + single category" model.

## The card (what a listing shows)

Five parts, each justifiable:

1. **Score eyebrow** — the Awesome Score (0–100) + tier word. Top of the card.
2. **Hook** (`headline`) — the exciting outcome/claim. Not a role label.
3. **Summary** (`summary`) — 2–3 lines, what it does + the twist.
4. **Categories** — 1–3 neutral chips (multi). The only taxonomy.
5. **Source** — `via @handle · 𝕏` or `via <Channel> · YouTube`. No bot name.

Removed vs. old: bot name / "Bot · Role", tags, the metrics strip (setup/difficulty/etc.).

## Fields

Required: `headline`, `summary`, `categories[]`, `awesome_score` + `score_breakdown`,
`format`, `source` (X post / YouTube video + author handle or channel), `slug`, `added_at`,
`updated_at`, `status`.

Optional: `prompt_provenance` (author|curator), `replicability`, author credit, `featured`.

Kept in data, off the card for now (may return if defined crisply): `setup_minutes`,
`difficulty`, `autonomy`, `schedule`.

`format`: `use-case` (scored, actionable) or `guide` (a reference/explainer — badged
"reference", not scored).

## Field rules (agent-executable)

- **headline** — ≤60 chars, sentence case, no trailing period. Lead with the outcome or the
  surprising claim, concrete. Use the source's own vivid framing when strong; never add a claim
  the source doesn't make. No generic role labels. Unique across the directory. Banned slop:
  supercharge, unleash, seamless, effortless, game-changer, revolutionary, 10x (unless literally
  in the source).
- **summary** — 140–240 chars, 1–2 sentences. What the agent does + the specific twist.
  Concrete nouns (tools, roles, cadence, artifact). Any number must come from the source/artifact.
- **categories** — 1–3 from the taxonomy; every domain it genuinely spans, no padding; most
  central first. Taxonomy only; new categories are human-approved additions made only when a
  real cluster needs them. Current 10: work, sales, marketing, engineering, support, finance-ops,
  data, personal, trading-crypto, fun. Watch-list for additions: operations, research, creative.
- **source + credit** — X → `via @handle · 𝕏`; YouTube → `via <Channel> · YouTube`. Store exact
  URL + timestamp; the live embed renders on the detail page. Credit is dofollow once verified.
- **awesome_score** — the six-dimension rubric below; store the breakdown; recompute on change;
  zero input from engagement or author size.
- **integrity (non-negotiable)** — every entry traces to a real source; no fabricated tools,
  quotes, outcomes, or numbers. Author's prompt shown → captured verbatim (`prompt_provenance:
  author`, byte-identical). Reconstructed → `curator`, and the page says so. `verified_at` only
  after source + claims are checked.

## The Awesome Score (quality, never popularity)

| Dimension | Max | Top of range |
|---|---|---|
| Reproducibility | 25 | verbatim author prompt OR complete copy-paste setup + steps (25) · solid curator prompt + clear steps (17) · conceptual only (8) |
| Ambition | 20 | whole business/department/team (20) · real multi-step workflow (13) · single task (7) |
| Concreteness | 20 | names specific tools/roles/cadence/artifact (20) · specific but light (13) · generic (6) |
| Novelty | 15 | genuinely new pattern (15) · fresh take on a known one (9) · near-duplicate (4) |
| Evidence | 10 | inspectable artifact — repo/skill/video demo (10) · screenshot of the real setup (6) · claim only (3) |
| Craft | 10 | setup + prompt + why all strong & clear (10) · mostly (6) · thin (3) |

Bands: 90–100 must-try · 78–89 awesome · 65–77 solid · 50–64 review · <50 skip.

Uses: (1) the eyebrow badge + default sort; (2) featuring — ≥90 are home candidates;
(3) **autonomous publish gate** — agents auto-publish ≥65, queue 50–64 for human review,
discard <50.

## Detail page order

Score eyebrow + hook + summary → categories + verified credit → **the live source embed** →
How it's set up → The Prompt (verbatim or curator-labelled) → Why it's cool → Replicability →
related (via shared categories).

## Pipeline (for autonomous sourcing agents)

1. Source — real X post / YouTube video / public repo. Capture URL, handle/channel, platform,
   timestamp, any prompt shown (verbatim).
2. Extract — core claim, concrete setup, prompt, artifact link, domains touched.
3. Compose — write fields to the rules above.
4. Score — grade the six dimensions → awesome_score + breakdown.
5. Gate — ≥65 publish · 50–64 human review · <50 discard. Never publish without a real source
   and a passed integrity check.
