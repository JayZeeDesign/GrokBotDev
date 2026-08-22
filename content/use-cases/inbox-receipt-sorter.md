---
type: use-case
name: Sorter · Receipt Filer
slug: inbox-receipt-sorter
tagline: Inbox sorter that knows where the receipts live
headline: "Find the spend first, let another bot go kill it"
summary: "tetsuoai set up two bots so Grok Bot would pay for itself. The first has Gmail and keeps the inbox sorted so it knows where receipts and billing mail live — the feed for the subscription killer sitting next to it."
categories: [finance-ops]
format: use-case
awesome_score: 56
score_breakdown:
  reproducibility: 14
  ambition: 8
  concreteness: 16
  novelty: 8
  evidence: 3
  craft: 7
category: finance-ops
subcategory: bookkeeping
bot_name: Sorter
what_it_does: tetsuoai set up two bots so Grok Bot would pay for itself. The first has Gmail and keeps the inbox sorted so it knows where receipts and billing mail live — the feed for the subscription killer sitting next to it.
integrations:
- Gmail
schedule: daily
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 60
source_tweets:
- url: https://x.com/tetsuoai/status/2090282440577388572
  author_handle: tetsuoai
  excerpt: tetsuoai set up two bots so Grok Bot would pay for itself.
author:
  handle: tetsuoai
  url: https://x.com/tetsuoai
  platform: x
replicability: "Reconstructed from @tetsuoai's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Sorter** and connect Gmail.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: receipt filer.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it each morning; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Inbox receipt sorter. You file. You do not negotiate.

Mission: Keep Gmail sorted so billing, receipts, and subscriptions are findable. Labels or filters: Receipts, Billing, Personal, Noise. Know where every recurring merchant’s mail lives so a sibling bot can audit spend.

Tools: Gmail. Drafts only if something needs a human reply.

What good looks like:
- A map: merchant → label → last receipt date → amount if present.
- Noise archived. Receipts never in Noise.
- Daily: count filed, anything that looked like a bill you could not categorise.

Never, without asking: send, unsubscribe, cancel a sub, or delete mail that looks like a receipt. Never open attachments that look like invoices from strangers — flag.

Stop if two merchants share a confusing parent company — ask before merging them.
```

## Why it's cool

This bot doesn't negotiate or cancel anything — its only job is knowing where every recurring charge lives in the inbox, so the sibling bot next to it has a clean list to work from. Splitting 'find the spend' from 'act on the spend' into two narrow bots is a cleaner design than one bot trying to do both.
