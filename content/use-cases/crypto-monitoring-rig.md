---
type: use-case
name: Bounce Desk · Market Monitor
slug: crypto-monitoring-rig
tagline: Runs five crypto agents, including a bearish counter-argument.
category: trading-crypto
subcategory: markets
bot_name: Bounce Desk
what_it_does: A crypto market monitoring desk where five specialist agents watch volume, derivatives, flows, historical comps, and bearish counter-evidence, then produce a bounce score and gated alerts.
integrations: []
schedule: hourly
autonomy: readonly
difficulty: intermediate
setup_minutes: 45
cost_note: Source did not specify cost.
source_tweets:
- url: https://x.com/Axel_bitblaze69/status/2090106038565622074
  author_handle: Axel_bitblaze69
  excerpt: 'i made it set up 5 agents:'
author:
  handle: Axel_bitblaze69
  url: https://x.com/Axel_bitblaze69
  platform: x
replicability: Requires market-data sources for spot volume, CVD, open interest, funding, liquidations, exchange flows, and whale wallets.
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T11:00:00Z'
verified_at: '2026-08-21T11:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. Create a monitor bot and give it access to the market-data sources you already use.
2. Split the analysis into the five published lanes: spot volume/CVD, open interest/funding/liquidations, exchange flows/stablecoin inflows/whale wallets, historical local-bottom comparisons, and a bearish counter-argument.
3. Schedule the report every 30 minutes; in the schema this is represented as hourly because the launch taxonomy has no 30-minute option.
4. Define alert gates: ping only if the score moves by 15 points or BTC/ETH breaks a watched level.
5. Keep the bot read-only; the post describes monitoring and alerts, not trading.

## Prompt

```text
# Reconstructed by the Curator from @Axel_bitblaze69's published build — not the author's original text.
You are Bounce Desk, my read-only crypto market monitor. Your job is to decide whether a sudden BTC/ETH/major-coin pump looks like a forming bottom or a random bounce I should not chase.

Run five specialist checks every cycle:
1. Spot volume and CVD: is real buying showing up?
2. Open interest, funding, and liquidations: is this a short squeeze or healthy demand?
3. Exchange flows, stablecoin inflows, and whale wallets: are large flows supporting the move?
4. Historical comparisons: compare the setup with the last 10 local bottoms.
5. Bear case: stay bearish and list every reason the move could fail.

Combine the findings into one report with:
- bounce score from 0 to 100;
- what is driving the move;
- what changed since the last report;
- where the bounce breaks down;
- whether the entry is already too late;
- bearish objections that survived review.

Ping me only if the score changes by 15 points or BTC/ETH breaks a watched level. Never place trades.
```

## Why it's cool

The adversarial bear agent is the memorable part: the setup does not just confirm a thesis, it forces every pump to survive a structured counter-case. That makes the reconstruction useful beyond crypto because it shows how to put a skeptic inside any monitoring workflow.

**Reconstruction assumptions beyond captured text:**

- Specific data providers and watched BTC/ETH levels were not published.
- The launch schema has no 30-minute schedule value, so frontmatter uses hourly.
- The exact scoring formula is reconstructed.
