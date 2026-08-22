---
type: use-case
name: "Research Desk · AI Hedge Fund Analyst"
slug: ai-research-desk
tagline: "A self-improving research desk that studies the markets while you sleep."
headline: "A research desk that studies markets while you sleep"
summary: "Roan's article on turning Grok Bot into a self-improving AI hedge-fund research desk: an army of agents that study the markets around the clock, grade their own past calls to improve, and hand you a decision-ready brief — a desk that runs while you sleep. It researches and proposes, never trades."
categories: [trading-crypto, data]
format: use-case
awesome_score: 72
category: trading-crypto
subcategory: markets
bot_name: Research Desk
what_it_does: "Roan's article on turning Grok Bot into a self-improving AI hedge-fund research desk: an army of agents that study the markets around the clock, grade their own past calls to improve, and hand you a decision-ready brief — a desk that runs while you sleep. It researches and proposes, never trades."
integrations: []
schedule: daily
autonomy: proposes
difficulty: advanced
setup_minutes: 60
source_tweets:
- url: https://x.com/RohOnChain/status/2090443377556996209
  author_handle: RohOnChain
  excerpt: "In this article, I cover how to build a self improving AI research desk that runs while you sleep"
  posted_at: '2026-08-20T14:18:34Z'
author:
  handle: RohOnChain
  url: https://x.com/RohOnChain
  platform: x
replicability: "Reconstructed from Roan's article on building a self-improving Grok Bot research desk — the depth is in the linked article. The prompt is a Curator reconstruction of the research-desk pattern; adapt the markets, sources and cadence to your own desk. It researches and proposes, it does not trade."
featured: false
added_at: '2026-08-21T21:30:00Z'
updated_at: '2026-08-21T21:30:00Z'
verified_at: '2026-08-21T21:30:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. Open Grok Bot and read Roan's article (linked from the source post) — it is the full walkthrough of the research-desk build.
2. Create a lead **Research Desk** bot and paste the reconstructed prompt below as its charter.
3. Add the sub-desks it coordinates — a market scanner, a fundamentals/on-chain digger, a news reader, and a critic that grades the desk's own calls.
4. Connect the sources you actually use (market data, news, filings, on-chain feeds) and set the cadence — e.g. an overnight run while you sleep, a briefing when you wake.
5. Keep it read-and-propose only: it researches and writes you the analysis, it never places a trade. Let it log what it got right and wrong so it improves each cycle.

## Prompt

```text
Role: Research Desk — a self-improving markets research team. You research and brief; you never trade.

Mission: While I sleep, study the markets and instruments I care about and hand me a decision-ready brief in the morning — theses, evidence, risks, and what changed since yesterday.

The desk (edit to your own):
- Scanner: surface what moved and why, across the markets I follow.
- Digger: go deep on the few things that matter — fundamentals, on-chain data, filings, primary sources.
- News: read the day's news and separate signal from noise, with links.
- Critic: grade yesterday's brief against what actually happened, and write the lesson down.

Every cycle:
- Produce a brief: top ideas, the evidence behind each, the risk that would kill it, and your confidence.
- Cite a real source for every claim; if you could not verify something, say so.
- Update your own playbook from the Critic's lessons so the desk improves over time.

Rules: research and propose only — never place a trade, move funds, or connect a brokerage without me. Never invent a price, a filing, or a data point; if a source is unreachable, flag the gap instead of guessing. This is research, not financial advice.
```

## Why it's cool

Roan's pitch: Grok Bot gives you an army of agents 24/7, and set up right, a research desk that runs while you sleep. The twist is the self-improving loop — a critic grades yesterday's calls against what actually happened and rewrites the playbook, so the desk gets sharper every cycle. And it stays on the safe side of the line: it researches and briefs, it never trades.
