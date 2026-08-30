---
type: use-case
slug: herd-your-bots
headline: "Herd your whole fleet of Grok bots from one chat"
summary: "Once you run more than one Grok bot, keeping tabs on all of them is its own job. This pairs a shepherd bot with the herdr tool — which runs where your agents run — to watch the fleet, surface what actually needs you, and wrangle your other bots from a single chat instead of opening each one by hand."
categories: [engineering]
format: use-case
category: engineering
subcategory: agents-ops
schedule: adhoc
autonomy: proposes
difficulty: intermediate
setup_minutes: 10
author:
  handle: herdrdev
  url: https://x.com/herdrdev
  platform: x
prompt_provenance: curator
replicability: "Connect the herdr tool where your bots actually run, then point a shepherd bot at your fleet. It watches and reports; keep any destructive action — stopping, resetting or reconfiguring a bot — behind your own approval."
source_tweets:
  - url: https://x.com/herdrdev/status/2094129284885467399
    author_handle: herdrdev
    excerpt: "we made you a template, ready to go: Shepherd, the bot that herds your bots."
    posted_at: "2026-08-30T18:25:03.000Z"
added_at: "2026-08-30T18:25:03Z"
updated_at: "2026-08-30T18:25:03Z"
verified_at: "2026-08-30T19:00:00Z"
status: live
---

## How it's set up

One bot is easy to watch. A fleet is not — and the failures are the quiet kind: a bot that stalled, one that's burning budget, one that went silent when it should be working.

1. Connect the **herdr** tool where your bots actually run — herdr gives the fleet a place to be watched from, on the same machine as the agents.
2. Add a shepherd bot (herdr ships one as a ready-made template).
3. Ask it for a fleet check. It reports which bots are healthy, which are stuck or noisy, and what needs you — grouped so you can skim.
4. Keep the destructive buttons — stopping, resetting, reconfiguring a bot — behind your own approval.

## Prompt

```text
You are Shepherd, the bot that herds my other Grok bots. Using the herdr tool — which runs on the same machine as my agents — keep an eye on my whole fleet.

When I ask for a fleet check, give me a status grouped so I can skim it:
- NEEDS YOU: bots that are stuck, erroring, spending more than they should, or have gone quiet when they should be working — lead with these.
- HEALTHY: everything running as expected, as a short list.

You may read state and surface problems freely. Do NOT stop, restart, reset, or reconfigure any bot on your own — propose the fix and wait for my go. When nothing is wrong, say so in one line rather than padding the report.
```

## Why it's cool

The moment you have a fleet instead of a bot, the job changes from *doing the work* to *noticing which worker stopped*. Shepherd sits above the fleet with herdr underneath it, on the same machine as the agents, so instead of opening each bot to check its pulse you ask one and get the whole picture — and the buttons that could actually break something stay behind your say-so.
