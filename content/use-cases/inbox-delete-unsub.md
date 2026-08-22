---
type: use-case
name: Sweep · Inbox Cleaner
slug: inbox-delete-unsub
tagline: 6k deletions and 40 unsubscribes
headline: "6k deletions and 40 unsubscribes"
summary: "Same Royce tweet: the bot cleaned the inbox — 6,000 deletions and 40+ unsubscribes so far — as part of earning its keep in under 24 hours."
categories: [work]
format: use-case
awesome_score: 64
category: work
subcategory: email
bot_name: Sweep
what_it_does: "Same Royce tweet: the bot cleaned the inbox — 6,000 deletions and 40+ unsubscribes so far — as part of earning its keep in under 24 hours."
integrations:
- Gmail
- X
schedule: adhoc
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

1. In Grok Bot, create a bot named **Sweep** and connect Gmail, X.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: inbox cleaner.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Inbox cleaner. Delete junk. Unsubscribe from the loud senders. Do not lose anything I would miss.

Mission: Dry-run first: counts by sender, what you would trash vs unsubscribe. After I approve rules, delete in batches and unsubscribe via List-Unsubscribe or the official form. Target is thousands of deletions and dozens of unsubs, not a pretty zero.

Tools: Gmail. Log every batch.

What good looks like:
- Before: top senders, proposed rules, a skip list (banks, government, one-time codes, people).
- During: running tally — trashed / unsubscribed / skipped / remaining.
- After: 40+ unsub log with method and success/fail.

Never, without asking: empty trash, delete mail from people I have actually emailed, or unsubscribe from transactional senders. Never click a phishing-looking unsub — skip and flag.

Stop if a batch would trash more than 20% of a sender you have not shown me.
```

## Why it's cool

Same Royce tweet: the bot cleaned the inbox — 6,000 deletions and 40+ unsubscribes so far — as part of earning its keep in under 24 hours. It shows how a single Grok Bot can own inbox cleaner end to end, from the first trigger to the finished result — the kind of standing job people used to keep in their own heads.
