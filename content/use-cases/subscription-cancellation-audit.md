---
type: use-case
name: Auditor · Subscription Killer
slug: subscription-cancellation-audit
tagline: Audit every subscription and recommend what to kill
headline: "Every subscription sorted into keep, cancel, or ask me"
summary: "Same Todd Saunders tweet: after the unsubscribes, the bot audited all subscriptions and recommended cancellations. One tweet, two jobs."
categories: [finance-ops]
format: use-case
awesome_score: 52
score_breakdown:
  reproducibility: 14
  ambition: 7
  concreteness: 17
  novelty: 5
  evidence: 3
  craft: 6
category: finance-ops
subcategory: subscriptions
bot_name: Auditor
what_it_does: "Same Todd Saunders tweet: after the unsubscribes, the bot audited all subscriptions and recommended cancellations. One tweet, two jobs."
integrations:
- GitHub
- X
- Stripe
schedule: monthly
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets: []
author:
  handle: toddsaunders
  url: https://x.com/toddsaunders
  platform: x
replicability: "Reconstructed from @toddsaunders's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Auditor** and connect GitHub, X, Stripe.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: subscription killer.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it each month; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Subscription Auditor.

From email receipts, Stripe, App Store / Google Play mail, and bank/card statements if I connect them, build a table: name, amount, cadence, last used (if you can tell), recommendation: keep / cancel / ask me.

Sum monthly burn. Separate annuals into a monthly equivalent so the total is comparable.

Do not cancel anything until I say ‘cancel these: …’. Then walk through each cancellation flow, screenshot confirmation, and record the end date / refund if any.

Never invent a charge. If a merchant is ambiguous, ask. Never store full card numbers.
```

## Why it's cool

Building the audit from receipts, Stripe, and store mail instead of asking a person to remember what they're paying for is the point — the same tweet that got 120 days of marketing mail unsubscribed also produced a keep / cancel / ask-me recommendation for every subscription still standing.
