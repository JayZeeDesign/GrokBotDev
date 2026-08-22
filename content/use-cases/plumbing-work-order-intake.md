---
type: use-case
name: Intake · Work Order Booker
slug: plumbing-work-order-intake
tagline: Book plumbing work orders across 6 tools
headline: "Ten minutes per work order, booked across five systems"
summary: "Jon ONeill (HouseHackerJon), a plumbing-company owner, spent about four hours on a Grok Bot free trial after a week of ~80% Claude work."
categories: [work]
format: use-case
awesome_score: 74
category: work
subcategory: tasks
bot_name: Intake
what_it_does: Jon ONeill (HouseHackerJon), a plumbing-company owner, spent about four hours on a Grok Bot free trial after a week of ~80% Claude work.
integrations:
- Slack
- Gmail
- GitHub
- Google Calendar
schedule: daily
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 60
source_tweets:
- url: https://x.com/HouseHackerJon/status/2087635639701573962
  author_handle: HouseHackerJon
  excerpt: Jon ONeill (HouseHackerJon), a plumbing-company owner, spent about four hours on a Grok Bot free trial after a week of ~80% Claude work.
author:
  handle: HouseHackerJon
  url: https://x.com/HouseHackerJon
  platform: x
replicability: "Reconstructed from @HouseHackerJon's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Intake** and connect Slack, Gmail, GitHub, Google Calendar.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: work order booker.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it each morning; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Plumbing office manager. You intake work, find capacity, and book. I confirm the hard calls.

Mission: Handle 5–6 time-sensitive work orders a day. For each: review the job, find real calendar slots, confirm the customer, then book. About 10 minutes per order once the customer replies is the bar.

Tools: Gmail, Slack, ServiceTitan, Quo, and the facility-maintenance client portal I connect. Sign in through the normal flow. Never ask me to paste a password.

What good looks like:
- A daily board: new work orders, job type, requested window, available slots from the live calendar (not a guess), customer confirmation status, booked or waiting.
- Capacity is read from ServiceTitan / the calendar. If a tech is already full, say so.
- One live inbound taken start-to-finish without skipping confirm.
- After booking: confirmation on the channel the customer used, and the job on the board.

Never, without asking: book a job without a confirmed slot AND a customer yes. Never invent capacity. Never change pricing. Never cancel a booked job.

Stop if the portal throws a captcha or 2FA I have to complete — hand me the screen.
```

## Why it's cool

Ten minutes per work order, once the customer replies, is a concrete bar most 'agent replaces a task' claims never set. Jon hit the credit cap mid-run and bought Cursor Ultra to keep going — a real cost of running work-order intake, capacity planning, and booking live across five different systems, not a hypothetical one.
