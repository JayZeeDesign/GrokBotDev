---
type: use-case
name: "Hearth · House Memory"
slug: house-memory-bot
headline: "One bot's only job: be the long-term memory of your house"
summary: "Morgan Linton's idea for a bot no chatbot can be: photograph every appliance sticker, breaker panel, filter size and paint can once, and the bot files it all for years. A cheap monthly check flags expiring warranties and due filters - and when something breaks, one photo comes back as a one-page repair card."
category: personal
subcategory: home
categories: [personal]
format: use-case
bot_name: "Hearth"
what_it_does: "Builds a permanent inventory of your house from photos - serials, models, bulb types, last-replaced dates - and watches email for warranties, utility PDFs and HOA notices. A light monthly check flags what expires or is due; when something breaks, one photo becomes a one-page repair card."
integrations: [Gmail]
schedule: monthly
autonomy: proposes
difficulty: beginner
setup_minutes: 45
source_tweets:
  - url: https://x.com/morganlinton/status/2092714740095271058
    author_handle: morganlinton
    excerpt: "Give one bot a single job: be the long-term memory of my house. Photograph every appliance sticker, breaker panel, filter size, paint can, spare-key hiding spot. Then when something breaks, you send one photo. Chatbots don't have a memory system to keep track of stuff like this."
    posted_at: "2026-08-26T20:44:09.000Z"
primary_source:
  kind: x-post
  url: https://x.com/morganlinton/status/2092714740095271058
author:
  handle: morganlinton
  url: https://x.com/morganlinton
  platform: x
replicability: "Paste the prompt, then spend an afternoon photographing stickers, panels and the junk drawer - the bot files everything as you go. Email access unlocks the warranty/HOA watching; without it the inventory and repair cards still work. The monthly routine is deliberately cheap on tokens."
prompt_provenance: curator
awesome_score: 78
score_breakdown:
  reproducibility: 20
  ambition: 15
  concreteness: 18
  novelty: 14
  evidence: 4
  craft: 7
featured: false
added_at: "2026-08-27T06:10:00Z"
updated_at: "2026-08-27T06:10:00Z"
verified_at: "2026-08-27T06:10:00Z"
status: live
---

## How it's set up

Morgan Linton's second entry here (after his [subscription canceller](/use-cases/cancel-subscriptions-with-grok-bot/)) is an idea post - "just came up with", he says, and 550+ people immediately wanted it. The pitch: give one bot a single job, **be the long-term memory of my house** - the thing a regular chatbot structurally can't do, because it forgets and your Grok Bot doesn't.

1. **Paste the prompt** and do one photo sweep of the house: every appliance sticker, the breaker panel, filter sizes, paint cans, the spare-key hiding spot, and the junk drawer (we all have at least one). The bot files serial numbers, model numbers, bulb types and "last replaced on" dates as you go.
2. **Give it email access** (optional) and it watches for warranties, utility PDFs and HOA notices, attaching them to the right room or appliance.
3. **Once a month** it runs a deliberately cheap check: what expires in 60 days, which filters are due, which portal login looks different than last month, which city or HOA agenda item affects this address. One short report, that's it.
4. **When something breaks, send one photo.** The bot identifies the exact unit from its files, pulls the manufacturer PDF, finds the part, and writes a one-page card: the tools you already own, the YouTube video that matches your model, and whether this is a $12 gasket or a call-a-human job.
5. **When you sell the house**, it generates the handover doc every new owner wishes existed.

## Prompt

```text
You are Hearth, the long-term memory of my house. Your one job: know this house better than I do, for years. Keep everything in /workspace/house/ - one file per room plus appliances.md, warranties.md, and maintenance-log.md.

SETUP - the photo sweep:
1. I will send you photos: appliance stickers, the breaker panel, filter sizes, paint cans, bulb types, key spots, the junk drawer. For each, file what it shows - make, model, serial number, sizes, dates - under the right room or appliance. Ask me one short question only when a photo is ambiguous.
2. Record "last replaced on" dates whenever I mention them. If I don't know, note "unknown - ask on next replacement".

EMAIL (only if I have connected it): watch for warranties, utility PDFs, and HOA or city notices. File each against the right appliance or the house itself, and note expiry dates.

MONTHLY - keep this cheap, one short run:
3. Report in one message: what expires within 60 days, which filters or maintenance items are due (from the log), and any HOA/city notice that affects this address. If nothing needs me: one line saying so.

WHEN SOMETHING BREAKS: I send one photo. Identify the exact unit from your files, pull the manufacturer's manual, find the likely part, and write me a one-page repair card: the problem, the part and where to buy it, the tools I already own (check the inventory), a video that matches my exact model, and your honest verdict - cheap DIY fix or call a professional.

IF I EVER SELL: generate a handover document for the new owner - every appliance with model and serial, filter sizes, paint colors by room, service history, and where things are.

Rules: never log in to utility or HOA portals - flag changes, I handle logins. Never order parts, only link them. Keep files terse and factual - you are an archive, not an essayist.
```

## Why it's cool

Every home-maintenance app has tried to be this and died the same death: the human has to keep feeding it, and humans stop. This flips the labor - one photo sweep on day one, then the bot does the remembering, the email-watching, and the monthly nagging on its own. The reason it works as a Grok Bot and not a chatbot is structural, and Morgan names it precisely: a bot with its own persistent machine can hold files for years, so "what size filter does the furnace take" has an answer in seconds seven years after you photographed the sticker. The break-fix flow is the killer feature - one photo in, one page out, with the DIY-or-call-a-human verdict that saves you either $200 or a flooded kitchen. And the endgame is quietly brilliant: the handover doc turns years of passive filing into real value on the day you sell.
