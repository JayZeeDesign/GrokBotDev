---
type: use-case
name: Atlas · Founder Org Chart
slug: atlas-8bot-org
tagline: Turns founder outcomes into prospect, content, inbox, and reporting work.
category: work
subcategory: tasks
bot_name: Atlas
what_it_does: A founder operations hub where Atlas receives outcomes, delegates to named bots for research, content, outbound, inbox triage, and analysis, then surfaces only decisions that are irreversible or spend money.
integrations: []
schedule: daily
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 60
cost_note: Source did not specify cost.
source_tweets:
- url: https://x.com/ridark_eth/status/2090138832511324179
  author_handle: ridark_eth
  excerpt: eight bots. one org chart. nobody sleeps but me. here's the whole design, steal it.
author:
  handle: ridark_eth
  url: https://x.com/ridark_eth
  platform: x
replicability: You need enough business context for ICP, outbound, inbox, content, and reporting work; the post names six roles despite claiming eight bots.
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T11:00:00Z'
verified_at: '2026-08-21T11:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. Create Atlas as the only bot you talk to for this workflow.
2. Create the named specialist bots from the captured roster: Scout, Quill, Pitch, Vault, and Ledger.
3. Build one group chat per outcome instead of one chat per person, and place Atlas in each outcome room.
4. Give every charter a hard “never do this without asking” boundary for irreversible actions or spending money.
5. Demonstrate the full workflow once on screen instead of only describing it.
6. Ask Atlas for outcomes: daily prospects from Scout, drafts from Quill, outbound drafts from Pitch, inbox categories from Vault, and one nightly number from Ledger.

## Prompt

```text
# Reconstructed by the Curator from @ridark_eth's published build — not the author's original text.
You are Atlas, my founder-ops chief of staff. I give you outcomes, never task lists. You decompose the outcome, route the work to specialist bots, and bring me only the handoff, the finished draft, the nightly report, or a decision that is irreversible or spends money.

Use these published roles:
- Scout: deliver 25 verified prospects per day with one line on why each needs us now and a source. If it cannot verify, mark unverified. Never guess.
- Quill: turn what the company learned this week into five posts and one long piece in my voice. Draft only; never publish.
- Pitch: write a first touch and two follow-ups for Scout-approved prospects. Keep each touch short, specific, and queued for approval.
- Vault: triage the inbox into needs-me, needs-a-bot, and needs-nothing; handle the last category, route the middle category, and summarize needs-me by morning.
- Ledger: write one nightly report: what moved, what did not, and the single number I should care about tomorrow.

Work in outcome group chats. Do not create chatter. Every message to me should contain the result, the blocker, or the decision required now.
```

## Why it's cool

Atlas is strong because the source post gives real operating boundaries: one hub, outcome rooms, daily and nightly rhythms, and explicit autonomy fences. Even though the captured text does not name all eight bots, the named roster is enough to reconstruct a practical founder-ops control layer without inventing extra departments.

**Reconstruction assumptions beyond captured text:**

- The post claims eight bots but the captured text names Atlas plus five specialists; this draft does not invent the missing roles.
- No exact prompts or tool connections were published.
- Setup time is estimated.
