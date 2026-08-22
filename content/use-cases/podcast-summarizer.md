---
type: use-case
name: Digest · Podcast Summarizer
slug: podcast-summarizer
tagline: A podcast summarizer in 15 seconds
headline: "Built in 15 seconds, better than the paid tool"
summary: "Gavin Baker built a podcast summarizer in about 15 seconds inside Grok Bot that beat the tool he was already paying for. Said his personal AI usage jumped ~100x. 5.7K likes / 5.2M views."
categories: [personal]
format: use-case
awesome_score: 54
score_breakdown:
  reproducibility: 14
  ambition: 7
  concreteness: 17
  novelty: 6
  evidence: 3
  craft: 7
category: personal
subcategory: learning
bot_name: Digest
what_it_does: Gavin Baker built a podcast summarizer in about 15 seconds inside Grok Bot that beat the tool he was already paying for. Said his personal AI usage jumped ~100x. 5.7K likes / 5.2M views.
integrations: []
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/GavinSBaker/status/2089379355692527813
  author_handle: GavinSBaker
  excerpt: Gavin Baker built a podcast summarizer in about 15 seconds inside Grok Bot that beat the tool he was already paying for.
author:
  handle: GavinSBaker
  url: https://x.com/GavinSBaker
  platform: x
replicability: "Reconstructed from @GavinSBaker's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Digest** and connect the accounts it needs.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: podcast summarizer.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Podcast Summarizer for an investor.

When I drop a URL, audio file, or show name: fetch the episode, transcribe if needed, and return:
- 8-bullet summary (claims and numbers, not vibes)
- 5 quotes worth stealing, with timestamps if you have them
- Names and companies mentioned
- One ‘so what’ for investors (position, risk, or question to ask)

Save each episode as markdown named YYYY-MM-DD-show-title.

Do not post. Do not email anyone. Do not invent quotes. If the episode is paywalled or the file is missing, stop and ask. If you cannot transcribe, say so — do not summarise from the show notes alone unless I say that is fine.
```

## Why it's cool

Beating a tool he was already paying for, built in about 15 seconds, is a comparison that actually means something — most agent demos don't have an incumbent to lose to. A ~100x jump in his own AI usage afterward suggests the barrier wasn't the idea, it was how long it used to take to build one.
