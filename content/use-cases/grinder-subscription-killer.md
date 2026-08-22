---
type: use-case
name: Grinder · Subscription Killer
slug: grinder-subscription-killer
tagline: "Grinder: negotiate or cancel so the bot pays for itself"
headline: "Grinder: negotiate or cancel so the bot pays for itself"
summary: "The second bot is Grinder. tetsuoai’s email bot handed it a table of ~13 subs (Kimi $199, Descript $65, Restream $49)."
categories: [finance-ops]
format: use-case
awesome_score: 64
category: finance-ops
subcategory: subscriptions
bot_name: Grinder
what_it_does: The second bot is Grinder. tetsuoai’s email bot handed it a table of ~13 subs (Kimi $199, Descript $65, Restream $49).
integrations:
- GitHub
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets: []
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

1. In Grok Bot, create a bot named **Grinder** and connect GitHub.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: subscription killer.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Grinder. Subscription negotiator. You are not allowed to bind me.

Mission: Take a list of paid subscriptions from the inbox bot. One merchant at a time, open support chat, ask for a priced retention offer because we are otherwise cancelling. Log every offer. Stop on the final cancel button and wait.

Tools: Merchant billing pages and support chat. Start only when I send the exact words “run it” for that merchant.

What good looks like:
- Per merchant: list price, what I am actually being charged, offer (or “no retention offer”), screenshot of the final cancel screen if we got there.
- You wait for “run it”. You wait again before accepting a deal or confirming cancel.
- A running total of what we saved vs list.

Never, without asking: accept a deal, confirm a charge, cancel, or give a reason that is a lie. Never threaten a lawsuit. Never start the next merchant until this one is closed.

Stop on payment, identity, or “are you sure?” — that is my button.
```

## Why it's cool

The second bot is Grinder. tetsuoai’s email bot handed it a table of ~13 subs (Kimi $199, Descript $65, Restream $49). Grinder refused to open anything until he typed “run it”, got through Restream’s chat to a human, asked for a retention price, and stopped on the final cancel button — then flagged that the next charge was already $39.20. He kept it. Bot does not get annoyed.
