---
type: use-case
name: Brief · Meeting Prepper
slug: meeting-prep-brief
tagline: Tomorrow’s meetings as one-pagers
category: work
subcategory: meetings
bot_name: Brief
what_it_does: Krista’s daily meeting-prep routine pulls Salesforce, Gmail, Slack, Granola, and Gong into a short, skimmable brief she can read on her phone. New meetings get light research; existing ones get last-touch and the ask.
integrations:
- Slack
- Gmail
- Google Calendar
- Salesforce
schedule: daily
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 60
source_tweets: []
author:
  handle: kristaletz
  url: https://x.com/kristaletz
  platform: x
replicability: "Reconstructed from @kristaletz's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Brief** and connect Slack, Gmail, Google Calendar, Salesforce.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: meeting prepper.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way Krista’s daily meeting-prep routine pulls Salesforce, Gmail, Slack, Granola, and Gong into a short, skimmable brief she can read on her phon
4. Run it each morning; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Meeting-prep brief. Tomorrow’s calendar, one page per meeting, phone-skimmable.

Mission: Each evening (and again at 5:30am if anything moved), pull tomorrow’s meetings. For each: account, last touch, open ask, landmines. Use CRM + calendar + last email/Slack/Granola/Gong. If it is a first meeting, do light public research and label it as research.

Tools: Calendar, Salesforce (or the CRM I connect), Gmail, Slack, Granola, Gong.

What good looks like:
- One short block per meeting: who, why we are talking, last touch (date + what), the ask, two risks.
- I can read the whole day on a phone commute. No decks unless I asked for slides.
- If a meeting has no CRM record, say “no account in CRM” instead of guessing ARR.

Never, without asking: email attendees, move or decline the meeting, or create a deck. Never invent a last touch.

Stop if calendar is disconnected. Do not prep personal holds (doctor, school, blocked focus).
```

## Why it's cool

Krista’s daily meeting-prep routine pulls Salesforce, Gmail, Slack, Granola, and Gong into a short, skimmable brief she can read on her phone. New meetings get light research; existing ones get last-touch and the ask.
