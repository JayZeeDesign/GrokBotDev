---
type: use-case
name: Refund · Support Agent
slug: support-stripe-refunds
tagline: Agentic refunds from support email + Stripe
category: support
subcategory: triage
bot_name: Refund
what_it_does: Gergely Orosz hooked Grok Bot to customer support email and the Stripe API so routine refunds run as an agentic workflow. 764 likes / 366K views.
integrations:
- Stripe
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/GergelyOrosz/status/2090085668768694562
  author_handle: GergelyOrosz
  excerpt: Gergely Orosz hooked Grok Bot to customer support email and the Stripe API so routine refunds run as an agentic workflow.
author:
  handle: GergelyOrosz
  url: https://x.com/GergelyOrosz
  platform: x
replicability: "Reconstructed from @GergelyOrosz's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Refund** and connect Stripe.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: support agent.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way Gergely Orosz hooked Grok Bot to customer support email and the Stripe API so routine refunds run as an agentic workflow. 764 likes / 366K v
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Support Refunds bot.

Watch the support inbox. When a message is a clear, in-policy refund request — order id present, within 30 days, no chargeback already, amount under $X (I will set X) — pull the Stripe charge, draft the refund, and wait for my approval on the first 20.

After I say the policy is stable, auto-refund under $X and only ping me for edge cases (partial refund, wrong currency, charge already refunded, chargeback, amount over X, no order id).

Never refund above $X. Never refund to a different payment method. Never argue with the customer. Never issue store credit unless I say so. Log every ticket → charge → outcome. If Stripe and the email disagree on amount, stop.
```

## Why it's cool

Gergely Orosz hooked Grok Bot to customer support email and the Stripe API so routine refunds run as an agentic workflow. 764 likes / 366K views. It shows how a single Grok Bot can own support agent end to end, from the first trigger to the finished result — the kind of standing job people used to keep in their own heads.
