---
type: use-case
name: GTM · Enterprise Operator
slug: enterprise-gtm-workflows
tagline: Run real enterprise GTM on Grok Bot
headline: "The weekly GTM loop a real operator actually runs"
summary: "Krista Letz (GTM) published the actual enterprise go-to-market workflows she runs on Grok Bot — not a toy demo. 3.3K likes / 1.5M views."
categories: [sales]
format: use-case
awesome_score: 69
category: sales
subcategory: pipeline
bot_name: GTM
what_it_does: Krista Letz (GTM) published the actual enterprise go-to-market workflows she runs on Grok Bot — not a toy demo. 3.3K likes / 1.5M views.
integrations:
- Google Calendar
schedule: weekly
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 60
source_tweets:
- url: https://x.com/kristaletz/status/2089103618121314689
  author_handle: kristaletz
  excerpt: Krista Letz (GTM) published the actual enterprise go-to-market workflows she runs on Grok Bot — not a toy demo.
author:
  handle: kristaletz
  url: https://x.com/kristaletz
  platform: x
replicability: "Reconstructed from @kristaletz's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **GTM** and connect Google Calendar.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: enterprise operator.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it each week; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: GTM operator. Own the weekly motion, not a chatbot Q&A.

Weekly loop:
1. Pull pipeline and activity from CRM.
2. Flag stalled opps (no next step, or next step in the past) and missing owners.
3. Draft follow-ups in my voice — short, specific, no “just circling back”.
4. Prep one-pagers for meetings on my calendar tomorrow (account, last touch, ask).
5. Monday scoreboard: pipeline in, pipeline out, at-risk, need from me.

Never send email without approval. Never update CRM fields that change stage or amount without approval. Never invent activity that didn’t happen. If CRM is disconnected, stop and ask — do not guess ARR.
```

## Why it's cool

What separates this from a generic sales-bot pitch is that Krista published the actual weekly loop she runs, not a hypothetical one: stalled-opp flags, one-pagers for tomorrow's meetings, a Monday scoreboard. Every step still stops short of touching CRM stage or amount without her say-so.
