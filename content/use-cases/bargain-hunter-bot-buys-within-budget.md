---
type: use-case
name: "Bargain Hunter · Bounded Buyer"
slug: bargain-hunter-bot-buys-within-budget
headline: "Give your bot specs and a max price - it bids when the bargain appears"
summary: "Vox runs two real-money errands on one rule. A bargain tracker: exact specs, acceptable condition, max price - when a listing checks every box the bot buys or bids; over budget comes back as a link. And a haircut booked end to end, paid via Stripe Link. The rule: within range, go ahead; outside it, ask first."
category: personal
subcategory: money
categories: [personal]
format: use-case
bot_name: "Bargain Hunter"
what_it_does: "Bounded autonomy for errands that cost money: set exact specs, acceptable condition, and a max price (or a time window and price range), and the bot acts on its own inside those bounds - bidding, buying, or booking and paying - while anything outside the range comes back as a link to approve."
integrations: [Stripe]
schedule: daily
autonomy: autonomous
difficulty: intermediate
setup_minutes: 15
source_tweets:
  - url: https://x.com/Voxyz_ai/status/2092376252120535477
    author_handle: Voxyz_ai
    excerpt: "Track anything you want to buy. Bid when a bargain shows up. When a listing checks every box, it buys or bids. If it's over budget or key details are missing, it sends you the link for approval."
    posted_at: "2026-08-25T22:19:07.000Z"
primary_source:
  kind: x-post
  url: https://x.com/Voxyz_ai/status/2092376252120535477
author:
  handle: Voxyz_ai
  url: https://x.com/Voxyz_ai
  platform: x
replicability: "Vox describes the setup and the rule; the prompt below is a curator reconstruction. You supply marketplace access, the exact specs/condition/max price, and payment (Stripe Link for bookings). The delegation rule is his, near-verbatim: within range, go ahead; outside it, ask first."
prompt_provenance: curator
awesome_score: 78
score_breakdown:
  reproducibility: 18
  ambition: 17
  concreteness: 16
  novelty: 14
  evidence: 5
  craft: 8
featured: false
added_at: "2026-08-26T08:15:00Z"
updated_at: "2026-08-26T08:15:00Z"
verified_at: "2026-08-26T08:15:00Z"
status: live
---

## How it's set up

Both of Vox's errands run on the same delegation rule, and the rule is the whole trick:

> If the time and price are within range, go ahead. If either falls outside the range, ask me first.

**Errand 1 - track anything you want to buy.** A used MacBook, a camera lens, something that's always sold out. Give the bot the exact specs, the condition you'll accept, and your max price. It watches listings, and when one checks every box it buys or bids on its own. Over budget, or key details missing from the listing? It sends you the link for approval instead.

**Errand 2 - book a haircut start to finish.** Tell it where you want to go and when you're free. It finds an opening, books it, pays via Stripe Link, and sends you the confirmation.

Neither looks impressive on paper - that's the point. They're the low-stakes, high-frequency chores that eat mental bandwidth after work, and the bounded rule is what makes handing them to a bot feel safe instead of reckless.

## Prompt

```text
You are my Bargain Hunter. I delegate purchases and bookings to you with hard bounds, and the standing rule is: if the time and price are within the range I set, go ahead without asking. If either falls outside the range - or a key detail is missing - ask me first with a link.

For something I want to buy, I will give you:
- The exact item and specs (model, size, storage, year - whatever pins it down)
- The condition I will accept
- My maximum price, all-in

Watch the marketplaces where it appears and check on a regular schedule. When a listing checks EVERY box, buy it or place the bid immediately - good listings do not wait for my approval, that is why you have a max price. If it is over budget, the condition is unclear, photos or key specs are missing, or the seller looks off, do NOT buy: send me the link with a one-line summary and wait.

For a booking (a haircut, a table, an appointment), I will give you the place or area, my free time windows, and the price range. Find an opening inside those bounds, book it, pay via my Stripe Link if payment is needed, and send me the confirmation. Outside the windows or the price range: ask first.

Always report back with what you did - the bid or purchase confirmation, or the booking details - and keep a running note of what you are still watching. Never exceed a max price for any reason, never buy a duplicate of something you already bought, and if a site asks for credentials or payment details you do not have, stop and hand it to me.
```

## Why it's cool

The interesting thing here isn't the shopping - it's the shape of the delegation. Most people either babysit their agent (approve everything, save nothing) or hand it a credit card and hope. Vox's rule threads the needle: the bot has real authority inside explicit bounds - it can spend actual money the moment a bargain appears, because bargains don't wait for approval - and zero authority outside them, where everything degrades gracefully into a link and a question. Max price, acceptable condition, free time windows: three numbers turn a scary "my bot buys things" into a safe standing order. It's the same pattern that makes a good human assistant trustworthy, and it transfers to almost any errand with a budget and a deadline.
