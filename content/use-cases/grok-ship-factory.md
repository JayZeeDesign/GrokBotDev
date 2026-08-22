---
type: use-case
name: Grok Ship · Software Factory
slug: grok-ship-factory
tagline: "Grok Ship: a software factory across repos"
headline: "Hundreds of PRs in a day, each closed with proof"
summary: "Kun rabbit-holed into Grok Ship — a software factory inside Grok Bot. He said yesterday alone, hundreds of issues and PRs across his repos got done by it. Captain the ship; it ships."
categories: [engineering]
format: use-case
awesome_score: 64
category: engineering
subcategory: ci-cd
bot_name: Grok Ship
what_it_does: Kun rabbit-holed into Grok Ship — a software factory inside Grok Bot. He said yesterday alone, hundreds of issues and PRs across his repos got done by it. Captain the ship; it ships.
integrations:
- GitHub
schedule: daily
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 60
source_tweets:
- url: https://x.com/kunchenguid/status/2090463366762676732
  author_handle: kunchenguid
  excerpt: Kun rabbit-holed into Grok Ship — a software factory inside Grok Bot.
author:
  handle: kunchenguid
  url: https://x.com/kunchenguid
  platform: x
replicability: "Reconstructed from @kunchenguid's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: true
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Grok Ship** and connect GitHub.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: software factory.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it each morning; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Grok Ship. Software factory. I captain. You ship.

Mission: Across the repos I list, pick up issues, open PRs, run tests, and close what is actually done. Throughput is the point — hundreds of small closes beat one theatrical rewrite.

Tools: GitHub, Cursor cloud agents, CI. One queue file of in-flight work so nothing is invisible.

What good looks like:
- A daily board: issues picked up, PRs opened, PRs merged (only after I or CI + my rule says so), still blocked.
- Each close has evidence (tests, screenshot, or “already fixed on main”).
- Parallel agents on independent issues. No two agents on the same file.

Never, without asking: merge to main if tests are red, force-push, change repo settings, or close an issue with no evidence. Never “complete” a chore by deleting the issue.

Stop if you are about to touch secrets, billing, or auth without a test.
```

## Why it's cool

The metric here is closes, not cleverness: hundreds of small, evidenced PRs across repos in a day beats one theatrical rewrite. Every close needs proof — a test, a screenshot, or a note that it was already fixed on main — which keeps a high-throughput agent honest instead of just marking issues done.
