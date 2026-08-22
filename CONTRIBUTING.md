# Contributing to grokbot.dev — the submission rulebook

This is the **single rulebook**. If you're **submitting** a plugin or use case, it tells you
exactly what to write and how it's judged. If you're a **reviewer** — human or one of our
agents — you review against these same rules. Rules are numbered so anyone can cite them
(e.g. "closing this: fails **G6**" or "missing **UC‑1**").

Read it on the site too: [grokbot.dev/submit](https://grokbot.dev/submit/). This file and the
Submit page say the same thing.

---

## 0. The 60-second version

1. Add **one** Markdown file under `content/plugins/`, `content/use-cases/`, or
   `content/collections/`. The **filename is the slug** (kebab-case) and must match the `slug`
   field.
2. It must come from a **real source** and be **real / working** — no fabrication, no ads.
3. Run `npm run validate` (schema, slug, vocab). Open a PR and fill in the template.
4. A reviewer verifies it, scores it, flips `status: proposed → live`, and sets `verified_at`. **You never set those.**

Fastest path with no local setup: use the "add a file" links on
[grokbot.dev/submit](https://grokbot.dev/submit/) — they open a new file in the right folder
straight on GitHub.

---

## 1. How the directory works

There is **no database**. Every plugin, use case, and collection is one Markdown file. At build
time each file is validated against a strict schema (`src/content.config.ts`); a missing or
invalid field fails the build, so nothing broken or fabricated ships. The same files generate
the website, the JSON API, the RSS feeds, and the MCP host — write once, appear everywhere.

- Folders: `content/plugins/` · `content/use-cases/` · `content/collections/`.
- The filename **is** the URL: `content/plugins/postiz.md` → `grokbot.dev/plugins/postiz/`.
- Community PRs **add** files. Editing/renaming an existing entry, or adding a new category or
  integration, is a maintainer change — open an issue instead.

---

## 2. The golden rules (integrity) — G1–G8

These are absolute. A submission that breaks one is closed.

- **G1 — Real source.** Every entry traces to a real X post, YouTube video, or public repo.
  Never fabricate a tool, a quote, an outcome, or a number.
- **G2 — Real and working.** You ran or used it end to end. It works today.
- **G3 — Prompt provenance.** If you paste the author's **actual** prompt, it must be
  **byte-identical** and `prompt_provenance: author`. If you reconstructed it from a described
  setup, it's `prompt_provenance: curator`, and the page says so. Never pass a reconstruction
  off as the author's words.
- **G4 — Attribution.** `author` is the person who built it. If it's someone else's work,
  `author` is still them and `scouted_by` is you — you both get credit, and the origin is linked.
- **G5 — No secrets.** Never put an API key, token, password, or cookie in a prompt or field.
  Prompts reference *"my API key"*; they never contain one.
- **G6 — Not an ad.** A listing that exists to funnel traffic to your product gets closed.
  Sponsor slots exist for that — this isn't one.
- **G7 — Markdown only.** The body is plain Markdown. No raw HTML (`<script>`, `<iframe>`,
  `<style>`, `<form>`, inline `on…=` handlers). CI rejects it.
- **G8 — You don't self-verify.** Never set `verified_at`, `status: live`, `awesome_score`, or
  `featured`. A reviewer sets those after checking your entry.

---

## 3. Submitting an AWESOME USE CASE

This is the **final model** (approved 2026-08-21). The card a reader sees is: **score eyebrow ·
hook · summary · categories · source.** Design your entry around those.

### 3.1 Fields you write

| Field | Req? | Rule (UC-n) |
|---|---|---|
| `type: use-case` | ✓ | literal. |
| `slug` | ✓ | kebab-case; **must equal the filename**. |
| `headline` | ✓ | **UC-1** The hook: 10–100 chars, sentence case, no trailing period. Lead with the outcome or the surprising claim, concrete. No generic role labels ("Sales bot"). Use the source's own vivid framing when it's strong; never a claim the source doesn't make. Unique across the directory. **No slop:** supercharge, unleash, seamless, effortless, game-changer, revolutionary, 10x (unless literally in the source). |
| `summary` | ✓ | **UC-2** 2–3 lines, 80–320 chars. What the agent actually does + the specific twist. Concrete nouns (name the tools, roles, cadence, artifact). Any number must come from the source. |
| `categories` | ✓ | **UC-3** 1–3 slugs from the taxonomy (§6). Every domain it genuinely spans, most-central first. No padding. |
| `format` | ✓ | **UC-4** `use-case` (an actionable setup, scored) or `guide` (a reference/explainer — badged, not scored). Default `use-case`. |
| a **source** | ✓ | **UC-5** Exactly one origin. X → `source_tweets:` with `url`, `author_handle` (no `@`), `excerpt` (a short real quote, 20–280 chars, **never the whole post**). YouTube → `primary_source: { kind: youtube-video, url, title, channel }` (title + channel required — they're the fallback if the player never loads; `timestamp` optional, `mm:ss`). |
| `author` | rec | **UC-6** The creator: `{ handle, url, platform: x\|github\|web }`. Required if there's no embeddable post (a curator reconstruction of a named person's build is credited here). Add `scouted_by` if you're submitting someone else's work. |
| `prompt_provenance` | ✓* | **UC-7** `author` or `curator` (see G3). |
| `replicability` | rec | **UC-8** 40–300 chars: how to adapt it to your own stack; if curator, say the prompt is a reconstruction. |
| `added_at`, `updated_at` | ✓ | ISO 8601 UTC (`…Z`). |
| `status` | ✓ | write **`proposed`**. It validates without `verified_at` and stays invisible until a reviewer flips it to `live` and sets `verified_at`. |

### 3.2 The body (Markdown, in this order)

```
## How it's set up      # numbered, concrete steps (≥300 chars)
## Prompt               # exactly one ```text fenced block — the real, complete prompt (G3)
## Why it's cool        # one paragraph on why it matters (≥150 chars)
```

### 3.3 Set by the reviewer, not you

`awesome_score` (+ `score_breakdown`) · `verified_at` · `status: live` · `featured`. The reviewer
also mirrors the machine-layer fields (`name`, `tagline`, `category`) from your `headline` /
`summary` / `categories` if you leave them out, so the API/RSS stay populated.

### 3.4 Template

```markdown
---
type: use-case
slug: my-entry-slug
headline: "The exciting one-line hook"
summary: "Two to three lines on what the agent does and the specific twist that makes it worth copying — concrete nouns, no fluff."
categories: [marketing, sales]
format: use-case
source_tweets:
  - url: https://x.com/handle/status/123
    author_handle: handle
    excerpt: "A short, real quote from the post — not the whole thing."
    posted_at: "2026-08-21T12:00:00Z"
author:
  handle: handle
  url: https://x.com/handle
  platform: x
prompt_provenance: author
replicability: "How to adapt this to your own stack in a sentence or two."
added_at: "2026-08-21T12:00:00Z"
updated_at: "2026-08-21T12:00:00Z"
status: proposed
---

## How it's set up

1. …

## Prompt

```text
The real, complete prompt goes here.
```

## Why it's cool

…
```

---

## 4. The Awesome Score (how use cases are ranked)

Quality, **never** popularity — views/likes are ignored (they reward big accounts and drift).
The reviewer grades six dimensions from this rubric; they sum to 100.

| Dimension | Max | Top of the range |
|---|---|---|
| Reproducibility | 25 | verbatim author prompt **or** a complete copy-paste setup + steps · solid curator prompt + clear steps (17) · conceptual only (8) |
| Ambition | 20 | runs a whole business/department/team · a real multi-step workflow (13) · a single task (7) |
| Concreteness | 20 | names specific tools/roles/cadence/artifact · specific but light (13) · generic (6) |
| Novelty | 15 | a genuinely new pattern · a fresh take on a known one (9) · near-duplicate (4) |
| Evidence | 10 | inspectable artifact — repo/skill/video demo · screenshot of the real setup (6) · claim only (3) |
| Craft | 10 | setup + prompt + why all strong & clear · mostly (6) · thin (3) |

**Bands:** 90–100 must-try · 78–89 awesome · 65–77 solid · 50–64 review · <50 not published.
The score is the card eyebrow, the default sort, and the **publish gate**: ≥65 publishes,
50–64 goes to human review, <50 is declined.

---

## 5. Submitting a PLUGIN

A plugin is a tool a Grok Bot connects to. The prompt tells the bot to read the tool's real
docs (linked) and wire it up via the tool's API/MCP.

| Field | Req? | Rule (PL-n) |
|---|---|---|
| `type: plugin` · `slug` | ✓ | slug = filename. |
| `name` | ✓ | 3–60 chars. |
| `tagline` | ✓ | ≤90 chars — what it gives the agent, one line. |
| `category` + `subcategory` | ✓ | a valid pair from the taxonomy (§6). |
| `install_steps` | ✓ | 1–12 short steps (10–300 chars each). |
| `prompt` | rec | **PL-1** ≥120 chars. The copy-paste prompt. It must tell the bot to read the docs (linked) and integrate via the API/MCP, and **never invent an endpoint/field**; gate anything that writes/sends/spends. |
| `works_with` | opt | integrations from the controlled vocab (§6) only. |
| `project_url` | ✓ | https. `repo_url`, `source_url`, `pricing_note`, `setup_minutes` optional. |
| `x_handle` | rec | **PL-2** The product's X handle, no leading `@`. Shown in the detail side card. |
| `founder` | rec | **PL-3** `{ name?, x_handle }` — the founder's X handle (no `@`). Advertised on the detail page; a real reason for founders to submit. Must be the actual founder/maker, verified from the product site or their own posts. |
| `author` | ✓ | `{ handle, url, platform }`. `scouted_by` if it's someone else's. |
| `added_at`, `updated_at`, `status` | ✓ | write `status: proposed`; a reviewer sets `verified_at` / `status: live` / `featured` / `sponsor`. |

Body: `## What it does` then `## Use it in Grok Bot` (≥400 chars total).

---

## 6. Controlled vocabularies

Use values from these lists only — it's what keeps the directory filterable.

- **Categories:** `work · sales · marketing · engineering · support · finance-ops · data ·
  personal · trading-crypto · fun` (with subcategories in `src/data/categories.json`).
- **Integrations:** the `canonical_name` values in `src/data/integrations.json`.

Adding a new category or integration is a maintainer change — open an issue with the case.

---

## 7. Reviewer rulebook (human or agent)

Review every submission against this checklist. Cite the rule number on any rejection.

1. **Integrity (G1–G8):** real source opened and read; not an ad; no secrets; prompt provenance
   honest (verbatim = byte-identical); attribution correct; Markdown-only body.
2. **Required fields present** per §3.1 (use case) or §5 (plugin), and each within its rule.
3. **Every URL** in the frontmatter resolves to real, relevant content.
4. **Prompt** is the real, complete prompt — not a summary; scanned for injection patterns.
5. **Score it** with the §4 rubric; record `awesome_score` + `score_breakdown`. Apply the gate
   (≥65 publish · 50–64 escalate · <50 decline).
6. **Normalize** the machine mirror (`name` ← headline, `tagline` ← summary, `category` ←
   categories[0], a valid `subcategory`) if the submitter omitted them.
7. **Only then** flip `status: proposed → live` and set `verified_at`. Consider `featured` if the score is ≥90.

The full model spec (for maintainers/agents) lives at
[`docs/awesome-use-case-model.md`](docs/awesome-use-case-model.md),
and the step-by-step **agent procedure** for sourcing and reviewing (which executes these rules)
is [`docs/agent-sourcing-and-review.md`](docs/agent-sourcing-and-review.md). All three files are
public and say the same thing — submitters, maintainers, and agents work from one source.

---

## 8. Licensing

Contributions are CC BY 4.0 (attribution: the entry's author + grokbot.dev). Opening a PR means
you agree to that.
