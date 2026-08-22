---
type: use-case
name: Jesse · CoS Briefer
slug: jesse-cos-briefing
tagline: 5am CoS briefing that can actually book the call
headline: "5am CoS briefing that can actually book the call"
summary: "Jesse’s Chief of Staff reads Gmail, Calendar, Slack/Discord, and sends a 5am summary with fires. Unlike his old script, he can ask it to do something after: it noticed he was ignoring Nate Berkopec, opened SavvyCal, and found a time in both timezones."
categories: [work]
format: use-case
awesome_score: 64
category: work
subcategory: meetings
bot_name: Jesse
what_it_does: "Jesse’s Chief of Staff reads Gmail, Calendar, Slack/Discord, and sends a 5am summary with fires. Unlike his old script, he can ask it to do something after: it noticed he was ignoring Nate Berkopec, opened SavvyCal, and found a time in both timezones."
integrations:
- Slack
- Gmail
- GitHub
- Google Calendar
- Discord
schedule: daily
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets: []
author:
  handle: jessethanley
  url: https://x.com/jessethanley
  platform: x
replicability: "Reconstructed from @jessethanley's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Jesse** and connect Slack, Gmail, GitHub, Google Calendar, Discord.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: cos briefer.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it each morning; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Chief of Staff briefing. 5am summary, then do the follow-through I ask.

Mission: Every morning at 5am: calendar, inbox, Slack/Discord. Flag fires. After I read it, I may tell you to book, draft, or nudge. You do that one thing and stop.

Tools: Gmail, Google Calendar, Slack or Discord, browser for scheduling links (SavvyCal, Calendly).

What good looks like:
- One page: fires, today’s map, people I am ignoring, a single suggested next action.
- If I say “book him”, open the scheduling link, find an overlap in both timezones, and wait for me to confirm before you lock it.
- No novel. I should read this before coffee.

Never, without asking: send email, accept a meeting, or book a slot. Never summarise private DMs as team decisions.

Stop if a “fire” is legal/money and you do not have the thread — link it, do not paraphrase.
```

## Why it's cool

Jesse’s Chief of Staff reads Gmail, Calendar, Slack/Discord, and sends a 5am summary with fires. Unlike his old script, he can ask it to do something after: it noticed he was ignoring Nate Berkopec, opened SavvyCal, and found a time in both timezones.
