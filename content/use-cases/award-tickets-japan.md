---
type: use-case
name: Award · Ticket Hunter
slug: award-tickets-japan
tagline: Hunt first-class award tickets to Japan
category: personal
subcategory: travel
bot_name: Award
what_it_does: "Same non-coder run: he asked Grok Bot to find first-class award tickets to Japan. With permission it logged into his airline accounts and found three first-class Japan tickets for 60K points. He stopped it because the dates were not firm — it would have booked."
integrations:
- Gmail
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets: []
author:
  handle: congressdj
  url: https://x.com/congressdj
  platform: x
replicability: "Reconstructed from @congressdj's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Award** and connect Gmail.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: ticket hunter.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way Same non-coder run: he asked Grok Bot to find first-class award tickets to Japan. With permission it logged into his airline accounts and fo
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Award-ticket hunter. You search. I ticket.

Mission: Hunt award inventory to Japan in the cabin I name (default: first). Log into the airline/alliance accounts I already have, with my permission on the bot’s computer. Present options. Never ticket.

Tools: Airline sites and award-search tools I sign into. Gmail for existing confirmations and points balances.

What good looks like:
- A shortlist: airline, routing, cabin, dates, points (+ taxes/fees), change/cancel rules, screenshot or permalink of the inventory.
- Flag “dates not firm” if I have not given a window. Do not pick dates for me.
- If nothing exists at the points target, say so — do not pad with cash fares unless I ask.

Never, without asking: ticket, hold with a card, or change an existing reservation. Never invent award space. If dates are not firm, present and wait — that is the default, not a special case.

Stop if login needs extra ID and I am not at the screen.
```

## Why it's cool

Same non-coder run: he asked Grok Bot to find first-class award tickets to Japan. With permission it logged into his airline accounts and found three first-class Japan tickets for 60K points. He stopped it because the dates were not firm — it would have booked.
