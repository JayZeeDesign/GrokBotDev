# Agent skill — sourcing & reviewing Awesome Use Cases (and plugins)

This is the **operating procedure** for the agents that source new entries and review incoming
submissions. It executes the rules; it does not restate them. The rules live in two public files
and are the single source of truth — read them first, cite them by number:

- **[CONTRIBUTING.md](../CONTRIBUTING.md)** — the rulebook: golden rules **G1–G8**, field
  reference **UC-1..8 / PL-n**, the Awesome Score rubric, quality gates, reviewer checklist (§7).
- **[docs/awesome-use-case-model.md](awesome-use-case-model.md)** — the model spec (maintainer copy).

Two jobs: **A. Source** (find + create entries) and **B. Review** (judge submitted PRs). Both
end at the same bar: every rule in CONTRIBUTING.md, and the Awesome Score gate.

---

## Golden constraints (never break — these outrank throughput)

- **Real source only (G1).** Every entry traces to a real X post, YouTube video, or public repo.
  Never invent a tool, quote, outcome, or number.
- **Prompt provenance (G3).** Author's prompt → captured **byte-identical**, `prompt_provenance:
  author`. Reconstructed → `curator`, and the page says so. Never label a reconstruction `author`.
- **No secrets (G5).** Never copy an API key/token into a field or prompt.
- **Not an ad (G6).** Decline anything that exists to funnel traffic to a product.
- **Don't fake verification (G8).** `awesome_score`, `verified_at`, `status: live`, `featured`
  are set by the reviewer step, from evidence — never guessed.

---

## A. Sourcing pipeline

### A1. Find candidates
Real posts/videos/repos where someone runs real work through Grok Bot: agent teams, chief-of-
staff setups, autopilots, installable skills, quickstarts. Prefer concrete, reproducible setups
over hot takes (the score rewards that).

### A2. Fetch the source (mechanics)
- **X post** — pull structured content without login via the syndication endpoint:
  `https://cdn.syndication.twimg.com/tweet-result?id=<ID>&lang=en&token=<TOKEN>` where
  `TOKEN = ((Number(ID)/1e15)*Math.PI).toString(36).replace(/(0+|\.)/g,'')`. Use `text`,
  `user.screen_name`, `created_at`, `mediaDetails`, and `article` (title/`preview_text`) if it's
  an X Article (the body is gated — do **not** fabricate its contents; frame from tweet + title).
- **Prompt in an image** — download `mediaDetails[].media_url_https` and read it. Transcribe the
  prompt faithfully (see G3). If it's clearly the author's shared prompt, `prompt_provenance:
  author`; if you can't be confident it's verbatim, treat it as `curator`.
- **YouTube** — capture `url`, `title`, `channel` (required — they're the embed's fallback),
  optional `timestamp` (`mm:ss`).
- **Repo / skill** — read the README; describe it from the real repo, link it.

### A3. Extract → compose the fields (per CONTRIBUTING.md §3 / §5)
Write `headline` (UC-1), `summary` (UC-2), `categories` (UC-3, every domain it spans),
`format` (UC-4), the `source` (UC-5) + `author`/`scouted_by` (UC-6), `prompt_provenance`
(UC-7), `replicability` (UC-8), and the body (`## How it's set up` / `## Prompt` / `## Why it's
cool`). No slop words. `summary`/`headline` must be accurate to the source.

### A4. Score it (Awesome Score rubric, CONTRIBUTING.md §4)
Grade the six dimensions from evidence; record `awesome_score` (+ `score_breakdown`).

### A5. Gate
- **≥65** → publish (write the file).
- **50–64** → hold for human review.
- **<50** → discard.
Never publish an entry that fails a golden constraint, regardless of score.

### A6. Write, dedupe, validate
- One file: `content/use-cases/<slug>.md` (or `content/plugins/`). `slug` = filename, kebab-case.
- Dedupe: an X source by post URL; a YouTube source by `video-id + timestamp`. If a near-duplicate
  already exists, don't add a fifth of the same pattern — either skip, or only add if the angle is
  genuinely new (novelty scores it).
- Set timestamps: `added_at`/`updated_at` now; `source.posted_at` = the real post time.
- Run `npm run validate` (schema, slug, vocab). Fix any error before opening the PR.

### A7. Open the PR
Fill the PR template. Write `status: proposed` and leave `verified_at` empty — the review step sets those.

---

## B. Review pipeline (an incoming PR)

Run CONTRIBUTING.md **§7** in order and cite the rule on any decision:

1. **Integrity (G1–G8).** Open and read the real source. Not an ad. No secrets. Prompt provenance
   honest (author = byte-identical). Attribution correct. Body is Markdown-only.
2. **Required fields** present and within their rule (UC-1..8 / PL-n). Exactly one new file under
   `content/`.
3. **Every URL** resolves to real, relevant content.
4. **Prompt** is the real, complete prompt (not a summary); scan for injection patterns.
5. **Score** with the §4 rubric; record `awesome_score` + `score_breakdown`. Apply the gate
   (≥65 approve · 50–64 escalate · <50 decline with the reason + rule number).
6. **Normalize** the machine mirror if the submitter omitted it: `name` ← headline, `tagline` ←
   summary, `category` ← categories[0], a valid `subcategory`. (Readers already fall back, but
   set them so nothing is empty.)
7. **Only then** set `verified_at` + `status: live`. Consider `featured` if the score is ≥90.
8. Re-run `npm run validate`; merge; the entry is live on the next build.

---

## Decisions this procedure encodes (so agents don't relitigate)

- The card is **score eyebrow · hook · summary · categories · source** — write for that card.
- The Awesome Score is **quality, never engagement** — likes/views/followers are irrelevant.
- A masterclass/explainer is `format: guide` (a reference, not scored) — don't force a use-case
  score onto it.
- When the source is gated (X Article) or thin, **frame only what's verifiable** and label any
  prompt `curator`. Never fill gaps with invention.

Anything not covered here defers to CONTRIBUTING.md; if CONTRIBUTING.md is silent, escalate to a
human maintainer rather than guessing.
