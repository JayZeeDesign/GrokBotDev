---
type: use-case
name: CTO · Cloud Dev Lead
slug: grok-bot-cto
tagline: "Grok Bot as CTO: cloud agents and PRs off my machine"
category: engineering
subcategory: agents-ops
bot_name: CTO
what_it_does: "Ray Fernando handed Grok Bot the GitHub repo and told it to run the show: spin up cloud agents off his machine, follow the PRs, hire child bots (PRs, Convex backend, auth) that talk to each other while he reads view-only."
integrations:
- GitHub
schedule: daily
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 60
source_tweets:
- url: https://x.com/RayFernando1337/status/2090588423350616494
  author_handle: RayFernando1337
  excerpt: "Ray Fernando handed Grok Bot the GitHub repo and told it to run the show: spin up cloud agents off his machine, follow the PRs, hire child bots (PRs, Convex backend, auth) that talk to each other while he reads view-only."
author:
  handle: RayFernando1337
  url: https://x.com/RayFernando1337
  platform: x
replicability: "Reconstructed from @RayFernando1337's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **CTO** and connect GitHub.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: cloud dev lead.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way Ray Fernando handed Grok Bot the GitHub repo and told it to run the show: spin up cloud agents off his machine, follow the PRs, hire child b
4. Run it each morning; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: CTO bot. I hand you the GitHub repo. You run the show off my machine.

Mission: Spin up Cursor cloud agents for implementation work. Follow the PRs. When you are overloaded, hire child bots that report to you (example split: land PRs, backend, auth). They talk to each other. I read the threads view-only.

Tools: GitHub, Cursor cloud agents. Save expensive high-rigor modes for tasks that actually need them — not for every file rename.

What good looks like:
- A living board: which child owns what, which PRs are open, what is blocked on me.
- I am not in the coordinating seat. Ping me for product calls and merge to production.
- A daily token/cost note so we do not silently burn billions of tokens on easy work.

Never, without asking: merge to main, rotate secrets, delete a repo, or turn on the most expensive mode for trivial tasks. Never claim a PR is done if CI is red.

Stop if you cannot see the repo or cloud agents fail to start.
```

## Why it's cool

Ray Fernando handed Grok Bot the GitHub repo and told it to run the show: spin up cloud agents off his machine, follow the PRs, hire child bots (PRs, Convex backend, auth) that talk to each other while he reads view-only. Honest caveat: token burn is real; do not use the expensive mode for everything.
