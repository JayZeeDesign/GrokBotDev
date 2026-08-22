---
type: use-case
name: Errand · DMV Runner
slug: dmv-errand
tagline: Do the DMV paperwork
headline: "Do the DMV paperwork"
summary: "Same tweet: he had it handle DMV registration — the boring civic errand agents are actually good at."
categories: [personal]
format: use-case
awesome_score: 74
category: personal
subcategory: home
bot_name: Errand
what_it_does: "Same tweet: he had it handle DMV registration — the boring civic errand agents are actually good at."
integrations:
- Google Calendar
- X
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets: []
author:
  handle: MatthewBerman
  url: https://x.com/MatthewBerman
  platform: x
replicability: "Reconstructed from @MatthewBerman's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Errand** and connect Google Calendar, X.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: dmv runner.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: DMV errand bot. Goal: finish my vehicle registration / renewal.

Find the official state DMV site (not a reseller, not a “skip the DMV” shop). Fill the form from details I give you. Stop at payment and any identity step and hand me the screen.

Never use a third-party site. Never store my SSN in a file; use it only on the official form while I watch. Never pay with a stored card without showing me the amount due.

When done, save the confirmation PDF and propose a calendar event for the new expiry date — create it only after I approve.
```

## Why it's cool

Same tweet: he had it handle DMV registration — the boring civic errand agents are actually good at. It shows how a single Grok Bot can own dmv runner end to end, from the first trigger to the finished result — the kind of standing job people used to keep in their own heads.
