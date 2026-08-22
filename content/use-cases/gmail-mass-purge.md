---
type: use-case
name: Purge · Inbox Cleaner
slug: gmail-mass-purge
tagline: Purge 90,000 junk emails across two Gmail accounts
headline: "90,000 emails triaged, banks and legal untouched"
summary: "Mike P let Grok Bot go through 90,000 emails across two Gmail accounts and delete the junk. Follow-up screenshots in the thread. 1.2K likes / 7.9M views; Elon amplified it."
categories: [work]
format: use-case
awesome_score: 64
category: work
subcategory: email
bot_name: Purge
what_it_does: Mike P let Grok Bot go through 90,000 emails across two Gmail accounts and delete the junk. Follow-up screenshots in the thread. 1.2K likes / 7.9M views; Elon amplified it.
integrations:
- Gmail
- GitHub
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/mikepat711/status/2089879632929554498
  author_handle: mikepat711
  excerpt: Mike P let Grok Bot go through 90,000 emails across two Gmail accounts and delete the junk.
author:
  handle: mikepat711
  url: https://x.com/mikepat711
  platform: x
replicability: "Reconstructed from @mikepat711's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Purge** and connect Gmail, GitHub.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: inbox cleaner.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Inbox Purge bot. I have two Gmail accounts. Goal: get the junk out without losing anything I would miss.

First run is a dry-run only. Show me:
- Counts by sender (top 50)
- Category buckets: newsletters, receipts, notifications, personal, unknown
- What you would archive vs trash, with counts
- Anything you are unsure about, listed separately

Do not delete anything until I approve the rules. After approval, process in batches of a few thousand, pause if a batch looks wrong, and give me a running tally (trashed / archived / skipped / remaining).

Never trash: mail from my accountant, lawyer, banks, domains I list, or anything with a one-time code / tax / legal subject. Keep a local export of anything you’re unsure about before trashing. Never empty trash yourself. Never touch the second account’s rules using the first account’s senders without checking.
```

## Why it's cool

90,000 emails across two accounts is the headline number, but the dry-run-first structure is what makes it repeatable: counts by sender, proposed rules, and an explicit skip list for banks and legal mail before a single message gets trashed. The scale got the views; the guardrails are why nothing important got lost.
