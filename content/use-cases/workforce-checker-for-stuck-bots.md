---
type: use-case
name: "Foreman · Workforce Checker"
slug: workforce-checker-for-stuck-bots
headline: "A 'workforce checker' bot that catches agents that quietly quit"
summary: "eric zakariasson's fix for bots that quietly stall: a workforce-checker bot. Every 15 minutes it scans your other bots for stuck work, nags a stuck one once, stays silent when everyone's moving, and only pings you when a human is actually needed. One short prompt turns fleet-babysitting into a background routine."
category: engineering
subcategory: agents-ops
categories: [engineering, work]
format: use-case
bot_name: "Foreman"
what_it_does: "A supervisor bot that keeps your agent fleet alive. On a 15-minute routine it checks the other bots for stuck work, nags a stalled bot once, stays quiet when everything is progressing, and escalates to you only when a human is genuinely needed - so silent quitters get caught without you watching."
integrations: []
schedule: hourly
autonomy: autonomous
difficulty: beginner
setup_minutes: 5
source_tweets:
  - url: https://x.com/ericzakariasson/status/2092205948505059435
    author_handle: ericzakariasson
    excerpt: "if your bots quietly quit, try this: you are a workforce checker. every 15 minutes, look at the other bots for stuck work. nag a stuck bot once. stay silent when everyone is moving. only ping me if a human is needed."
    posted_at: "2026-08-25T11:02:24.000Z"
primary_source:
  kind: x-post
  url: https://x.com/ericzakariasson/status/2092205948505059435
author:
  handle: ericzakariasson
  url: https://x.com/ericzakariasson
  platform: x
replicability: "Built on eric's exact one-line prompt (quoted on the page); the block here expands it slightly for setup. Run it as one bot with a routine firing every ~15 minutes, give it visibility into your other bots' status, and tune the interval and 'nag once' threshold to your fleet."
prompt_provenance: curator
awesome_score: 83
score_breakdown:
  reproducibility: 23
  ambition: 15
  concreteness: 17
  novelty: 13
  evidence: 6
  craft: 9
featured: false
added_at: "2026-08-25T11:20:00Z"
updated_at: "2026-08-25T11:20:00Z"
verified_at: "2026-08-25T11:20:00Z"
status: live
---

## How it's set up

The quiet failure mode of an agent fleet isn't a crash - it's a bot that just stops. It hits something ambiguous, doesn't ask, and silently sits there while you assume it's working. eric zakariasson's fix is to add one more bot whose entire job is to watch the others.

Set up a single **workforce-checker** bot and give it a routine that runs every ~15 minutes with visibility into your other bots' status. eric's original brief is one line:

> you are a workforce checker. every 15 minutes, look at the other bots for stuck work. nag a stuck bot once. stay silent when everyone is moving. only ping me if a human is needed.

The prompt below is that same brief, lightly expanded for setup. The craft is in the restraint: it nags a stuck bot **once** (not on a loop), it **stays silent** when everything is moving, and it only interrupts **you** when a human is actually required.

## Prompt

```text
You are a workforce checker for my Grok Bot team. Every 15 minutes, look at the other bots for stuck work. Nag a stuck bot once - then leave it alone. Stay silent when everyone is moving. Only ping me if a human is actually needed to unblock something.
```

## Why it's cool

Most people try to keep a fleet healthy by checking on it themselves - which defeats the point of having a fleet. This flips it: reliability becomes another agent's job. What makes the prompt good isn't the monitoring, it's the discipline baked into it. A naive watchdog would spam every bot and every human constantly; this one nags a stalled bot a single time, shuts up when work is flowing, and saves your attention for the cases that genuinely need a person. It's the smallest possible version of an ops layer - a supervisor that turns "did my bots quietly quit again?" from something you have to remember to check into something that just gets caught.
