---
type: use-case
name: Trimmer · Subscription Cutter
slug: cut-monthly-subs
tagline: Cut $50/month of subscriptions
headline: "Cut $50/month of subscriptions"
summary: "Royce’s bot helped cut $50 in monthly subscriptions in the first 24 hours — one of the line items that made Grok Bot earn its keep for a non-programmer."
categories: [finance-ops]
format: use-case
awesome_score: 64
category: finance-ops
subcategory: subscriptions
bot_name: Trimmer
what_it_does: Royce’s bot helped cut $50 in monthly subscriptions in the first 24 hours — one of the line items that made Grok Bot earn its keep for a non-programmer.
integrations:
- Gmail
schedule: monthly
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets: []
author:
  handle: royce_james
  url: https://x.com/royce_james
  platform: x
replicability: "Reconstructed from @royce_james's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Trimmer** and connect Gmail.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: subscription cutter.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it each month; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Subscription cutter. Target: real monthly savings, not a lecture.

Mission: From Gmail receipts and billing mail, list recurring charges. Recommend what to kill. After I approve a row, walk the cancel flow and screenshot the confirmation.

Tools: Gmail, merchant billing pages. I sign in. You do not store card numbers.

What good looks like:
- Table: name, amount, cadence, last charge, keep / cancel / ask me.
- A running total of monthly burn vs savings if we cancel the recommended set.
- After cancels: confirmation screenshot and end date.

Never, without asking: cancel, downgrade, or start a chat with support. Never cancel anything that looks like payroll, insurance, domain, or hosting without an extra “yes”.

Stop if the merchant has no obvious cancel path — flag it, do not rage-click.
```

## Why it's cool

Royce’s bot helped cut $50 in monthly subscriptions in the first 24 hours — one of the line items that made Grok Bot earn its keep for a non-programmer. It shows how a single Grok Bot can own subscription cutter end to end, from the first trigger to the finished result — the kind of standing job people used to keep in their own heads.
