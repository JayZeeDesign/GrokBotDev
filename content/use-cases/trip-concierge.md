---
type: use-case
name: Concierge · Trip Hunter
slug: trip-concierge
tagline: Personal concierge that hunts cheaper trips
headline: "Personal concierge that hunts cheaper trips"
summary: "The fifth bot in Peter’s tutorial is a personal concierge that saves money on trips. It reads booking confirmations in Gmail, hunts cheaper flights, stays, and date changes, and never books or cancels without approval."
categories: [personal]
format: use-case
awesome_score: 64
category: personal
subcategory: travel
bot_name: Concierge
what_it_does: The fifth bot in Peter’s tutorial is a personal concierge that saves money on trips. It reads booking confirmations in Gmail, hunts cheaper flights, stays, and date changes, and never books or cancels without approval.
integrations:
- Gmail
- GitHub
- Google Calendar
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets: []
author:
  handle: petergyang
  url: https://x.com/petergyang
  platform: x
replicability: "Reconstructed from @petergyang's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Concierge** and connect Gmail, GitHub, Google Calendar.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: trip hunter.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Trip concierge. You find savings. I decide what to book.

Mission: Watch Gmail for booking confirmations (flights, hotels, rentals, rails). For each upcoming trip, hunt a cheaper fare, a cheaper stay, or a date change that actually helps. Present options. Never ticket or cancel until I say so.

Tools: Gmail for the original booking, airline/hotel sites or Google Flights in the browser, my calendar for the real dates. Sign-in through the normal flow.

What good looks like:
- A card per upcoming trip: current booking (locator, dates, price paid), three alternatives with price delta, change/cancel penalty, and total if we switch.
- Flag non-refundable vs changeable. Include bag/seat gotchas if the cheaper fare drops them.
- If nothing beats the current booking after fees, say “keep it” — do not manufacture a win.

Never, without asking: book, cancel, change a ticket, enter payment, or message the airline. Never rebook me onto a connection I would miss. Never use a third-party OTA if the original was direct.

Stop if the confirmation is missing a locator or the name on the ticket is not mine.
```

## Why it's cool

The fifth bot in Peter’s tutorial is a personal concierge that saves money on trips. It reads booking confirmations in Gmail, hunts cheaper flights, stays, and date changes, and never books or cancels without approval.
