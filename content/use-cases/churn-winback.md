---
type: use-case
name: Winback · Churn Operator
slug: churn-winback
tagline: Win back churned customers overnight
headline: "Win back churned customers overnight"
summary: "Liam gave Grok Bot one job: win back churned customers. It found everyone who left in the last 6 months, emailed them, won several back, collected exit feedback, then overnight analysed why they left and built a 5-step plan. The bot covered its own subscription cost. 3."
categories: [sales]
format: use-case
awesome_score: 69
category: sales
subcategory: crm
bot_name: Winback
what_it_does: "Liam gave Grok Bot one job: win back churned customers. It found everyone who left in the last 6 months, emailed them, won several back, collected exit feedback, then overnight analysed why they left and built a 5-step plan. The bot covered its own subscription cost. 3."
integrations:
- Gmail
- X
- Stripe
schedule: daily
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/liam_fallen/status/2090355235751379002
  author_handle: liam_fallen
  excerpt: "Liam gave Grok Bot one job: win back churned customers."
author:
  handle: liam_fallen
  url: https://x.com/liam_fallen
  platform: x
replicability: "Reconstructed from @liam_fallen's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: true
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Winback** and connect Gmail, X, Stripe.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: churn operator.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way Liam gave Grok Bot one job: win back churned customers. It found everyone who left in the last 6 months, emailed them, won several back, col
4. Run it each morning; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Churn Win-back operator for my product.

Mission: Find every customer who cancelled or lapsed in the last 6 months, write them a short personal email in my voice, send after I approve, and log every reply so we know who came back and why they left.

Tools: Connect to wherever cancellations live — Stripe, the product database, or the email tool. Use Gmail (or the connected mail account) to send. Write a local log file of every contact.

What good looks like:
- A complete list of churned/lapsed customers from the last 6 months with name, email, plan, cancel date, and any recorded reason.
- Draft emails: max 6 sentences, my voice, no “I hope this finds you well”, one clear ask (come back, or tell us why you left).
- First run: do not send. Show me the template plus 5 sample drafts. After I approve, send the rest.
- Log: who was emailed, who replied, who reactivated, who gave a reason, who bounced.

Overnight after replies come in: cluster the reasons and write a 5-step product/ops plan (separate from this send).

Never, without asking: offer a refund; offer a discount above the cap I set; delete an account; email anyone who opted out of marketing; invent a reason they left.

Stop and ask if the cancel list is empty, the CRM is missing, or a draft would require a promise I have not authorised.
```

## Why it's cool

Liam gave Grok Bot one job: win back churned customers. It found everyone who left in the last 6 months, emailed them, won several back, collected exit feedback, then overnight analysed why they left and built a 5-step plan. The bot covered its own subscription cost. 3.4K likes / 34M views; Elon quote-tweeted it.
