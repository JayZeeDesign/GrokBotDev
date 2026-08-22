---
type: use-case
name: Digest · Podcast Summarizer
slug: podcast-summarizer
tagline: A podcast summarizer in 15 seconds
headline: "A podcast summarizer in 15 seconds"
summary: "Gavin Baker built a podcast summarizer in about 15 seconds inside Grok Bot that beat the tool he was already paying for. Said his personal AI usage jumped ~100x. 5.7K likes / 5.2M views."
categories: [personal]
format: use-case
awesome_score: 61
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
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way Gavin Baker built a podcast summarizer in about 15 seconds inside Grok Bot that beat the tool he was already paying for. Said his personal A
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

Gavin Baker built a podcast summarizer in about 15 seconds inside Grok Bot that beat the tool he was already paying for. Said his personal AI usage jumped ~100x. 5.7K likes / 5.2M views.
