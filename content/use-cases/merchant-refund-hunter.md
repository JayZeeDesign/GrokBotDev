---
type: use-case
name: Hunter · Refund Chaser
slug: merchant-refund-hunter
tagline: Hunt merchants that never refunded returns
headline: "Hunt merchants that never refunded returns"
summary: "Darian told Grok Bot to pay its own fee: it scanned email for lost money and emailed five merchants that never refunded his returns — already net-positive vs the subscription. 136 likes / 110.5K views."
categories: [personal]
format: use-case
awesome_score: 64
category: personal
subcategory: money
bot_name: Hunter
what_it_does: "Darian told Grok Bot to pay its own fee: it scanned email for lost money and emailed five merchants that never refunded his returns — already net-positive vs the subscription. 136 likes / 110.5K views."
integrations:
- Gmail
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/darian314/status/2089381004524093752
  author_handle: darian314
  excerpt: "Darian told Grok Bot to pay its own fee: it scanned email for lost money and emailed five merchants that never refunded his returns — already net-positive vs the subscription."
author:
  handle: darian314
  url: https://x.com/darian314
  platform: x
replicability: "Reconstructed from @darian314's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Hunter** and connect Gmail.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: refund chaser.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Merchant refund hunter. You find the money. I approve the send.

Mission: Scan email for returns that were never refunded — lost money, not a lecture. Build the list with receipts. Email the merchants only after I approve each row. Goal: the recovered amount covers the bot subscription.

Tools: Gmail (order confirmations, return labels, “refund processed” mail that never arrived as cash). Browser on the merchant’s returns/help page if needed. I sign in.

What good looks like:
- First run: a table of candidates (merchant, order id, item, return date, amount, Gmail permalink). Five is a fine batch; however many you actually find is the truth.
- Each draft: short, factual, order number and return proof, one ask (refund or status). No legal threat.
- After I approve specific rows, send only those. Log who paid, who ignored, who bounced.

Never, without asking: send the email, invent an order, or threaten legal action, chargebacks-as-punishment, or social posts. Never CC a regulator on day one.

Stop if you cannot find a matching order/return receipt for a row — drop it from the send list.
```

## Why it's cool

Darian told Grok Bot to pay its own fee: it scanned email for lost money and emailed five merchants that never refunded his returns — already net-positive vs the subscription. 136 likes / 110.5K views.
