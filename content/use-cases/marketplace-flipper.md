---
type: use-case
name: "Flipper · Marketplace Arbitrage"
slug: marketplace-flipper
headline: "A bot that flips marketplace deals while you sleep"
summary: "alucardiox ran a Grok Bot on its own cloud machine, logged into a second marketplace account, that flags listings priced 35% under the 30-day median, reads the photos not the title, checks the feed every four minutes, sends one all-cash line, and books the pickup. Nine days: $680 spent, $1,610 back."
categories: [personal]
format: use-case
tagline: "An always-on bot: flag underpriced listings, make one cash offer, book the pickup."
category: personal
subcategory: money
bot_name: "Flipper"
what_it_does: "A Grok Bot on its own cloud machine, logged into a second marketplace account, checks the feed every four minutes, flags items ~35% under their 30-day median sold price, verifies condition from photos, sends one all-cash one-line offer, and books the pickup — never touching money."
integrations: []
schedule: hourly
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 20
source_tweets:
  - url: https://x.com/alucardiox/status/2091114193470840969
    author_handle: alucardiox
    excerpt: "I stopped trying to be fast and gave the job to a worker that never sleeps ... Nine days later: 19 listings flagged, 6 bought, $680 spent, $1,610 back."
    posted_at: "2026-08-22T16:00:00Z"
author:
  handle: alucardiox
  url: https://x.com/alucardiox
  platform: x
prompt_provenance: curator
replicability: "A Curator reconstruction of alucardiox's 5-part setup. To adapt: run it on the bot's cloud machine with a second marketplace account, set your own discount threshold and category, keep the ~4-minute schedule, and keep the 'it books, you pay' boundary."
awesome_score: 87
score_breakdown:
  reproducibility: 22
  ambition: 16
  concreteness: 19
  novelty: 15
  evidence: 8
  craft: 7
featured: true
added_at: "2026-08-22T16:00:00Z"
updated_at: "2026-08-22T16:00:00Z"
verified_at: "2026-08-22T16:00:00Z"
status: live
---

## How it's set up

1. Run the bot on its own cloud machine with a **second marketplace account** logged in (keep it separate from your main one).
2. **One rule, not a wishlist:** buy only if the asking price is ~35% under the median of what that exact model actually sold for in the last 30 days — and it checks that median before every message.
3. **Read the photos, not the title:** serial plate, model number, corner wear. A title lies; a photo of the back panel doesn't.
4. **No inbox trigger exists, so run it on a schedule:** check the feed every ~4 minutes — that cadence is the only reason you get to a good listing first.
5. **One offer, one line, no second round:** "I can pick it up today at [price], cash." It never negotiates twice.
6. **It books the pickup into your calendar and stops.** You approve, you drive, you pay — it never touches money.

## Prompt

```text
You are a marketplace-flipping agent. You run on a schedule and hunt for underpriced local listings I can resell. You never touch money — you find, offer, and book; I approve and pay.

Every run (every few minutes):
1. Scan the marketplace feed for the categories I gave you.
2. For each candidate, look up the median of what that EXACT model actually sold for in the last 30 days. Only proceed if the asking price is at least 35% under that median.
3. Judge condition from the PHOTOS, not the title — serial/model plate, wear on corners and edges, back-panel shots. If the photos don't prove condition, skip it.
4. For a qualifying listing, send exactly one message, one line: "I can pick it up today at [price], cash." Never send a second offer or negotiate — the second message is where sellers start shopping you around.
5. When a seller agrees, book the pickup into my calendar with the address and price, and stop.

Rules: never spend money or send payment; never invent a sold-price median — if you can't find real comps, skip; give me a running ledger of flagged / offered / booked with the numbers.
```

## Why it's cool

It wins on structure, not speed. Instead of racing humans, it turns flipping into a rule: a hard 35%-under-median gate, condition judged from photos, a single take-it-or-leave-it cash line, and a firm boundary where the bot books but never pays. The nine-day receipt ($680 in, $1,610 out) is the proof, but the real lesson is the one-offer-no-negotiation discipline that most people can't hold and a bot can.
