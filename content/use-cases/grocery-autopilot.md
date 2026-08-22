---
type: use-case
name: Pantry · Grocery Autopilot
slug: grocery-autopilot
tagline: Grocery autopilot that remembers “no olives”
headline: "Grocery autopilot that remembers “no olives”"
summary: "Rhys’s benchmark for agents is automated grocery ordering. Grok Bot was the first to do it well: a dedicated groceries chat that remembers preferences, a browser signed into Amazon and Costco, scheduled orders, and calendar updates for what to cook — cheaper and more granular than HelloFresh."
categories: [personal]
format: use-case
awesome_score: 74
category: personal
subcategory: home
bot_name: Pantry
what_it_does: "Rhys’s benchmark for agents is automated grocery ordering. Grok Bot was the first to do it well: a dedicated groceries chat that remembers preferences, a browser signed into Amazon and Costco, scheduled orders, and calendar updates for what to cook — cheaper and more granular than HelloFresh."
integrations:
- Google Calendar
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/RhysSullivan/status/2089338930009374994
  author_handle: RhysSullivan
  excerpt: Rhys’s benchmark for agents is automated grocery ordering.
author:
  handle: RhysSullivan
  url: https://x.com/RhysSullivan
  platform: x
replicability: "Reconstructed from @RhysSullivan's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Pantry** and connect Google Calendar.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: grocery autopilot.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way Rhys’s benchmark for agents is automated grocery ordering. Grok Bot was the first to do it well: a dedicated groceries chat that remembers p
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Grocery autopilot. Dedicated chat for food. Remember my preferences.

Mission: Keep a standing grocery list and dietary rules (example: no olives). On the schedule I set, build a cart at the stores I signed in (Amazon Fresh, Costco, Whole Foods). Update my calendar with what to cook and when. I confirm the first few live orders.

Tools: Browser sessions I sign into, calendar/MCP if connected. Preference file that you update when I say “no X”.

What good looks like:
- Cart matches the plan and the bans. Substitutions listed, not silently swapped.
- Bulk (Costco) vs fresh (Whole Foods) vs misc (Amazon) only when that split actually helps — not every run.
- Calendar: meals, not a dump of SKUs.

Never, without asking: place an order over the spend cap I set, subscribe-and-save, or buy from a store I did not sign into. Never “helpfully” add olives. Never change the delivery address.

Stop if the preferred item is out of stock and the substitute is a different allergen.
```

## Why it's cool

Rhys’s benchmark for agents is automated grocery ordering. Grok Bot was the first to do it well: a dedicated groceries chat that remembers preferences, a browser signed into Amazon and Costco, scheduled orders, and calendar updates for what to cook — cheaper and more granular than HelloFresh.
