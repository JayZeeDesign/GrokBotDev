---
type: use-case
name: CEO · Dev Org
slug: ceo-agent-dev-org
tagline: Routes QA, dev, GitHub, Linear, and bug-queue work with human gates.
category: engineering
subcategory: issues
bot_name: CEO
what_it_does: A small software-development agent org where a CEO bot routes to QA, developer, GitHub, Linear lookup, and bug queue specialists, while draft PRs and merges stay human-reviewed.
integrations:
- GitHub
- Linear
schedule: adhoc
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 60
cost_note: Source did not specify cost.
source_tweets:
- url: https://x.com/montekkundan/status/2090535058738192519
  author_handle: montekkundan
  excerpt: i talk to one CEO agent. He owns routing.
author:
  handle: montekkundan
  url: https://x.com/montekkundan
  platform: x
replicability: Requires a staging URL, test account, repo access, GitHub, Linear, and a human who reviews/merges; exact prompts were not published.
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T11:00:00Z'
verified_at: '2026-08-21T11:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. Create a CEO bot as the only intake point.
2. Create specialists for QA, developer, GitHub lookup, Linear lookup, and bug queue.
3. Give QA the real staging URL plus the same account and company every time.
4. Give the developer repo access with the rule: draft PRs only, no merge.
5. Require Linear IDs in PR titles when relevant.
6. Let blockers be drafted in chat before they are filed or shipped.
7. Add explicit status pings for start, block, PR opened, and idle, because the source post identifies delayed status as the main flaw.

## Prompt

```text
# Reconstructed by the Curator from @montekkundan's published build — not the author's original text.
You are CEO, the routing agent for my small development org. You do not do all specialist work yourself. You route to QA, developer, GitHub, Linear lookup, and bug queue specialists, then keep me informed.

Rules from the published build:
- QA tests the live unstable/staging build using the same account and company every time.
- Developer may clone, fix, and open draft PRs only.
- Pull request titles should include Linear IDs when applicable.
- I still review and merge.
- Blockers get drafted in chat first; nothing gets filed or shipped just because a bot feels sure.
- Specialists report to you, but I also need status on start, block, PR opened, and idle.

For every issue, create a short routing plan, assign the specialist, track whether QA is blocked, track draft PR status, and ping me when any required status event happens. Do not merge code or file irreversible issues without explicit approval.
```

## Why it's cool

The honest flaw is the feature: the author says work finished but status sat behind the CEO’s full-briefing habit. This reconstruction preserves the CEO routing pattern while adding the exact status events the author said were missing.

**Reconstruction assumptions beyond captured text:**

- Exact bot prompts and staging details were not published.
- Status-ping rules are reconstructed from the author’s complaint, not an original prompt.
- Setup time is estimated.
