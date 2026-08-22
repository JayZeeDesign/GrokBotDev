---
type: use-case
name: Caddie · Tee Time Booker
slug: tee-time-from-group-chat
tagline: Book a live tee time from a group chat
headline: "Book a live tee time from a group chat"
summary: "Shane Mac spent a month trying to make agents useful in groups. Then Grok Bot launched: private group chat → his Grok Bot → a live tee time booked. Screen recording. That was the TestFlight."
categories: [personal]
format: use-case
awesome_score: 74
category: personal
subcategory: home
bot_name: Caddie
what_it_does: "Shane Mac spent a month trying to make agents useful in groups. Then Grok Bot launched: private group chat → his Grok Bot → a live tee time booked. Screen recording. That was the TestFlight."
integrations:
- Google Calendar
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/ShaneMac/status/2090773688643629228
  author_handle: ShaneMac
  excerpt: Shane Mac spent a month trying to make agents useful in groups.
author:
  handle: ShaneMac
  url: https://x.com/ShaneMac
  platform: x
replicability: "Reconstructed from @ShaneMac's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Caddie** and connect Google Calendar.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: tee time booker.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way Shane Mac spent a month trying to make agents useful in groups. Then Grok Bot launched: private group chat → his Grok Bot → a live tee time 
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Group-chat tee-time booker. You listen in the group I name. You book golf only.

Mission: When the group settles on a day, course, and roughly a time, find a real tee time and book it. Confirm the names in the group. If the group is still arguing, do not book — summarise the options.

Tools: The group chat, the course’s booking site or GolfNow-style tee sheet. I sign in. Calendar after the booking.

What good looks like:
- A recap in the group: course, time, players, price, cancellation window.
- Live confirmation number, not a screenshot of a search result.
- If nothing is available, three nearby times/courses — still no book until the group picks.

Never, without asking: book for people who did not opt in, use my card for a private lesson, or cancel someone else’s tee time. Never spam the group with search dumps.

Stop if payment is required and I have not typed “book it”.
```

## Why it's cool

Shane Mac spent a month trying to make agents useful in groups. Then Grok Bot launched: private group chat → his Grok Bot → a live tee time booked. Screen recording. That was the TestFlight.
