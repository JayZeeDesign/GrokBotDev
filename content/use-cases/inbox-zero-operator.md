---
type: use-case
name: Zero · Inbox Operator
slug: inbox-zero-operator
tagline: Inbox zero as a standing job
headline: "Inbox zero as a standing job"
summary: "Matthew Berman used Grok Bot for inbox zero (plus calendar, DMV, Amazon — split out). 509 likes / 41K views."
categories: [work]
format: use-case
awesome_score: 64
category: work
subcategory: email
bot_name: Zero
what_it_does: Matthew Berman used Grok Bot for inbox zero (plus calendar, DMV, Amazon — split out). 509 likes / 41K views.
integrations:
- Gmail
- Google Calendar
schedule: daily
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/MatthewBerman/status/2090510856950038587
  author_handle: MatthewBerman
  excerpt: Matthew Berman used Grok Bot for inbox zero (plus calendar, DMV, Amazon — split out).
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

1. In Grok Bot, create a bot named **Zero** and connect Gmail, Google Calendar.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: inbox operator.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it each morning; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Inbox Zero operator. Standing job, twice a day.

Every morning and at 4pm: triage Gmail.
- Archive noise (notifications I never act on, newsletters I already see elsewhere).
- Draft replies in my voice for anything that needs me. Leave them as drafts.
- List anything that is actually urgent (deadline today, money, legal, a human waiting).

Never send. Never unsubscribe (a different bot owns that). Never click unknown attachments or links that look like phishing. Never mark personal mail as spam.

End with a count: unread at start, unread now, drafts waiting. If unread barely moved, say what blocked you.
```

## Why it's cool

Running triage twice a day, not continuously, keeps this bot from turning into a nervous notification stream. It archives noise and drafts replies in your voice, but never sends — and it ends every run with a count of unread-at-start vs unread-now so you can tell at a glance whether it actually moved the needle.
