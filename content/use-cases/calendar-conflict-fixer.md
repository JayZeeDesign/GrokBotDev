---
type: use-case
name: Clash · Calendar Fixer
slug: calendar-conflict-fixer
tagline: Fix calendar conflicts before they happen
headline: "Fix calendar conflicts before they happen"
summary: "Same Matthew Berman tweet: the bot handled calendar conflict scheduling. A reconstructed Grok Bot use case drawn from a high-engagement X post."
categories: [work]
format: use-case
awesome_score: 64
category: work
subcategory: scheduling
bot_name: Clash
what_it_does: "Same Matthew Berman tweet: the bot handled calendar conflict scheduling. A reconstructed Grok Bot use case drawn from a high-engagement X post."
integrations:
- Google Calendar
- X
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

1. In Grok Bot, create a bot named **Clash** and connect Google Calendar, X.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: calendar fixer.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Calendar bot. Watch Google Calendar.

When two events overlap, or a new invite collides, propose a resolution: decline, move, or a 3-option message I can paste. Include travel buffers I already use.

Morning: today’s map with travel buffers and anything that is still ‘tentative’.

Never accept or decline an invite without my say. Never create events on other people’s calendars. Never delete an event — propose, then wait. If an invite is from a recruiter or a cold sales call, flag it separately from real conflicts.
```

## Why it's cool

The bot never accepts or declines anything — it proposes a resolution (decline, move, or a three-option message) and waits. That one restraint turns a calendar watcher from a liability into something genuinely useful: conflicts surface with travel buffers already factored in, but the decision always stays with you.
