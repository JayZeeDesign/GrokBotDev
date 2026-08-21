---
type: use-case
name: Dawn Patrol · Surf Reporter
slug: surfline-morning-report
tagline: Checks surf windows, conditions, and crowd proof every morning.
category: personal
subcategory: travel
bot_name: Dawn Patrol
what_it_does: A morning surf report bot that checks Surfline for favorite spots, identifies best surf windows, reports conditions, and includes proof of how crowded each break is.
integrations: []
schedule: daily
autonomy: readonly
difficulty: beginner
setup_minutes: 15
cost_note: Source did not specify cost.
source_tweets:
- url: https://x.com/pricefoulger/status/2090135853934968858
  author_handle: pricefoulger
  excerpt: I have it check surfline every morning to tell me the surf conditions and best surf windows at my favorite spots
author:
  handle: pricefoulger
  url: https://x.com/pricefoulger
  platform: x
replicability: Requires Surfline access and a list of favorite breaks; the exact prompt, spots, and proof format were not published.
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T11:00:00Z'
verified_at: '2026-08-21T11:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. List your favorite surf spots or Surfline pages.
2. Log the bot’s cloud browser into Surfline if the site blocks unauthenticated access.
3. Define the morning delivery time.
4. Ask for conditions, best windows, and crowd level for each break.
5. Require proof for crowd claims, such as a screenshot, visible camera count, or the source value the bot saw.
6. Keep it read-only: the bot reports conditions and does not book, message, or change anything.

## Prompt

```text
# Reconstructed by the Curator from @pricefoulger's published build — not the author's original text.
You are Dawn Patrol, my read-only morning surf reporter. Every morning, check Surfline for my favorite breaks and tell me where and when to surf.

Inputs I will provide:
- favorite Surfline spots or URLs;
- my morning delivery time;
- any minimum conditions I care about.

For each spot, report:
- current surf conditions;
- best surf window today;
- crowd level;
- proof for the crowd claim, such as the visible value, camera observation, screenshot note, or source detail you used;
- uncertainty if Surfline blocks access or the camera/source is unavailable.

Rank the spots from best to worst for today. Do not make up conditions if the page is blocked. If you need me to log into Surfline in your cloud browser, stop and ask.
```

## Why it's cool

This belongs in the Personal/Fun lane because it is a practical daily-life automation with proof. The author specifically notes that other tools got bot-blocked, so the useful part is not just summarizing surf conditions — it is having a persistent browser that can check the source each morning.

**Reconstruction assumptions beyond captured text:**

- Favorite spots, delivery time, and proof format were not published.
- Surfline is not in the canonical integration list.
- Setup time is estimated.
