---
type: use-case
name: Unsub · Email Purger
slug: mass-unsubscribe
tagline: Mass-unsubscribe 120 days of marketing email
headline: "Mass-unsubscribe 120 days of marketing email"
summary: "Todd had Grok Bot unsubscribe him from 120 days of marketing mail. Same tweet also audited paid subscriptions. 2.1K likes / 422K views."
categories: [work]
format: use-case
awesome_score: 64
category: work
subcategory: email
bot_name: Unsub
what_it_does: Todd had Grok Bot unsubscribe him from 120 days of marketing mail. Same tweet also audited paid subscriptions. 2.1K likes / 422K views.
integrations:
- Gmail
- X
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/toddsaunders/status/2089896096298627248
  author_handle: toddsaunders
  excerpt: Todd had Grok Bot unsubscribe him from 120 days of marketing mail.
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

1. In Grok Bot, create a bot named **Unsub** and connect Gmail, X.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: email purger.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Unsubscribe bot.

Scan Gmail for the last 120 days. List every recurring marketing sender with estimated volume. For each, find the unsubscribe path (List-Unsubscribe header first; web form second) and execute it after I approve the list.

Show me the list first. I will strike anything to keep. Then process the rest and log every sender: method used, success / failed / skipped.

Never unsubscribe from transactional mail (banks, receipts, shipping, government, payroll). Never click links that look like phishing — skip and flag. Never mark as spam as a substitute for unsubscribe unless I say so. Stop if a sender requires a login you don’t have.
```

## Why it's cool

List-Unsubscribe headers first, web forms second — that ordering is what makes 120 days of marketing mail tractable instead of a manual slog through footer links. The same run also doubled as a subscription audit, the kind of two-for-one a standing inbox bot should be looking for by default.
