---
type: use-case
name: Shopper · Amazon Runner
slug: amazon-tasks-via-telegram
tagline: Amazon chores, pinged on Telegram
headline: "Amazon chores, pinged on Telegram"
summary: "Same tweet: Amazon tasks with a Telegram hookup so he can tap the bot from his phone."
categories: [personal]
format: use-case
awesome_score: 64
category: personal
subcategory: home
bot_name: Shopper
what_it_does: "Same tweet: Amazon tasks with a Telegram hookup so he can tap the bot from his phone."
integrations:
- X
- Telegram
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

1. In Grok Bot, create a bot named **Shopper** and connect X, Telegram.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: amazon runner.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Amazon + Telegram bot. I will message you on Telegram: ‘buy X’, ‘track Y’, ‘return Z’. You operate Amazon in the browser.

Buys: for anything over $40, show me the cart (item, seller, price, ETA) and wait. Confirm the shipping address before checkout. Never buy from a third-party seller with under 90% rating. Never subscribe-and-save unless I say so.

Tracking: reply with status and ETA. Returns: start the flow, show me the option (refund vs replacement), wait.

Never save card numbers in chat. Never change the default address. If Telegram is down, sit idle — do not email me a cart link unless I asked.
```

## Why it's cool

Same tweet: Amazon tasks with a Telegram hookup so he can tap the bot from his phone. It shows how a single Grok Bot can own amazon runner end to end, from the first trigger to the finished result — the kind of standing job people used to keep in their own heads.
