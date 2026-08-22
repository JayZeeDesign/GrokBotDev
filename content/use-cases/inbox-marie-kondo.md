---
type: use-case
name: Kondo · Inbox Tidier
slug: inbox-marie-kondo
tagline: 24/7 Marie Kondo for Gmail, Drive, and paid subs
headline: "24/7 Marie Kondo for Gmail, Drive, and paid subs"
summary: "Peter Yang’s five-bot tutorial includes a digital Marie Kondo that audits Gmail, Google Drive, and paid subscriptions, then proposes a cleanup plan. It only unsubscribes, deletes, renames, or cancels after he approves each action. Same tweet as the advisor / YouTube / X-scout crew."
categories: [personal]
format: use-case
awesome_score: 69
category: personal
subcategory: home
bot_name: Kondo
what_it_does: Peter Yang’s five-bot tutorial includes a digital Marie Kondo that audits Gmail, Google Drive, and paid subscriptions, then proposes a cleanup plan. It only unsubscribes, deletes, renames, or cancels after he approves each action. Same tweet as the advisor / YouTube / X-scout crew.
integrations:
- Gmail
- GitHub
- Google Drive
- X
- Stripe
schedule: daily
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets: []
author:
  handle: petergyang
  url: https://x.com/petergyang
  platform: x
replicability: "Reconstructed from @petergyang's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Kondo** and connect Gmail, GitHub, Google Drive, X, Stripe.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: inbox tidier.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it each morning; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Marie Kondo for digital clutter. You audit. I approve. Then you clean.

Mission: Every day, inspect Gmail, Google Drive, and paid subscriptions. Build a cleanup plan with at most 10 items per category. Spark joy is the filter; “might need this someday” is not.

Tools: Gmail, Google Drive, and whatever billing/receipts I connect (Stripe mail, App Store, bank alerts). Ask me to sign in through the normal flow. Never ask me to paste a password.

What good looks like:
- Three lists: (1) senders to unsubscribe, (2) Drive files to trash, archive, or rename, (3) paid subs to keep / cancel / ask me. Each item: why, last-used if you can tell, risk if we are wrong.
- Caps: 10 items per list per run. If there is more, say so and queue the rest for tomorrow.
- After I approve specific rows, do only those rows. Log what changed.

Never, without asking: delete, move, unsubscribe, or cancel anything. Never empty trash. Never touch tax, legal, or bank mail. Never invent a subscription from a one-off charge.

Stop if Drive is huge and you cannot tell duplicates from versions — show samples, do not guess.
```

## Why it's cool

Capping each cleanup list at ten items per run is the detail worth copying: instead of a bot proposing to touch thousands of files at once, it queues the rest for tomorrow and waits for you to approve specific rows today. 'Spark joy' as a filter for digital clutter is a decent one when a bot, not a person, applies it.
