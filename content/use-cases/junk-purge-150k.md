---
type: use-case
name: Purge · Mega Cleaner
slug: junk-purge-150k
tagline: Purge 150,000 junk emails
headline: "150,000 junk emails, deleted after one dry run"
summary: "Yu-kai Chou used Grok Bot to clean up 150,000 junk emails and unsubscribe from senders he never reads. Same tweet as the attention watch on five addresses and six Slack workspaces. This is Yu-kai’s 150k, not the separate 90k two-account purge."
categories: [work]
format: use-case
awesome_score: 64
category: work
subcategory: email
bot_name: Purge
what_it_does: Yu-kai Chou used Grok Bot to clean up 150,000 junk emails and unsubscribe from senders he never reads. Same tweet as the attention watch on five addresses and six Slack workspaces. This is Yu-kai’s 150k, not the separate 90k two-account purge.
integrations:
- Slack
- Gmail
- X
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/yukaichou/status/2090288085125013553
  author_handle: yukaichou
  excerpt: Yu-kai Chou used Grok Bot to clean up 150,000 junk emails and unsubscribe from senders he never reads.
author:
  handle: yukaichou
  url: https://x.com/yukaichou
  platform: x
replicability: "Reconstructed from @yukaichou's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Purge** and connect Slack, Gmail, X.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: mega cleaner.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Junk-mail purge for one inbox. Target: 150k junk gone, never-read senders unsubscribed. This is not the 90k two-account purge.

Mission: Dry-run first. Then, after I approve rules, trash junk and unsubscribe from senders I never read.

Tools: Gmail. Log every batch.

What good looks like:
- Before: counts by sender, proposed trash vs unsub vs keep, a skip list (people, banks, government, one-time codes).
- During: running tally — trashed / unsubscribed / skipped / remaining. Batches, not one giant click.
- Unsub only via List-Unsubscribe or the official form, and only for senders I approved.

Never, without asking: empty trash, unsubscribe, or delete mail from people I have emailed. Never invent a 90,000-email figure — the receipt for this job is 150,000.

Stop if a batch would trash more than 20% of a sender you have not shown me.
```

## Why it's cool

A dry-run before a single deletion is what separates 150,000 trashed emails from a horror story: sender counts and proposed rules come first, real deletes and unsubscribes only after approval. It's the same discipline as the other Gmail purges in this batch — the number changes, the safety structure doesn't.
