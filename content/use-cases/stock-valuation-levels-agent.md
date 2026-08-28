---
type: use-case
name: "Levels · Stock Valuation Agent"
slug: stock-valuation-levels-agent
headline: "Teach a bot one analyst's valuation method, then just feed it tickers"
summary: "Money_or_Life_X had Grok Bot study a finance YouTuber's price-target method, pull free data, and learn to assign P/E multiples - a 'valuation levels' agent that outputs a chart for any ticker. Two other investing agents critique its method. Honest about its one human variable: the multiple is the agent's own judgment."
category: personal
subcategory: money
categories: [personal, work]
format: use-case
bot_name: "Levels"
what_it_does: "Learns an analyst's valuation pattern, gathers data from free sources, and produces valuation-level charts for any stock you name. It documents its rules in markdown, has two peer agents critique the method, and can run in background to alert you on a level cross - flagging missing data."
integrations: []
schedule: adhoc
autonomy: proposes
difficulty: advanced
setup_minutes: 45
source_tweets:
  - url: https://x.com/Money_or_Life_X/status/2092905577995526193
    author_handle: Money_or_Life_X
    excerpt: "🔥Grok Bot use case🔥 让 Grok Bot 学习一位财经博主的估值点位方法：看视频学 pattern、找 4-5 个免费数据源、学习给出市盈率倍数。搭好框架后让'估值点位'agent 用 markdown 总结规则，再和另外两个投资 agent 三方对话改良。以后只用告诉股票代码即可，甚至能后台运行、价格与关键点位交叉时提醒。"
    posted_at: "2026-08-27T09:22:28.000Z"
primary_source:
  kind: x-post
  url: https://x.com/Money_or_Life_X/status/2092905577995526193
author:
  handle: Money_or_Life_X
  url: https://x.com/Money_or_Life_X
  platform: x
replicability: "Point the bot at the videos or writeups of an analyst whose method you want to learn. It needs web access for free data; expect gaps (forward EPS growth wasn't free in his run). The multiple is the agent's judgment, not fact - treat outputs as a way to understand the logic, not a buy signal."
prompt_provenance: curator
awesome_score: 79
score_breakdown:
  reproducibility: 18
  ambition: 17
  concreteness: 18
  novelty: 15
  evidence: 5
  craft: 6
featured: false
added_at: "2026-08-28T10:05:00Z"
updated_at: "2026-08-28T10:05:00Z"
verified_at: "2026-08-28T10:05:00Z"
status: live
---

## How it's set up

Money_or_Life_X follows a finance channel where an analyst (犀牛哥, on 视野环球财经) shares stock price levels every episode. Instead of watching and re-deriving them by hand, he taught a Grok Bot the analyst's method once - and now just sends it a ticker.

1. **Learn the pattern.** Point the bot at the analyst's videos so it studies *how* they build a valuation - what inputs they use, how they reason to a price level.
2. **Find the data.** Have it locate 4-5 free data sources for the fundamentals it needs (earnings, growth, multiples). This is where reality bites: in his run, forward EPS growth wasn't available from one free source, so the agent said so rather than faking it.
3. **Learn the multiple.** The one genuinely subjective input is the P/E multiple. The agent forms its own judgment here - and he's explicit that this is the only human-style variable, and it drives the final number.
4. **Write down the rules.** The agent summarizes its whole method in markdown, then two other investing agents read it and critique it in a three-way conversation - a self-review pass that hardens the methodology before it's trusted.
5. **Then just feed it tickers.** Give it a symbol and it returns a valuation-levels chart (his examples: NVIDIA and McDonald's). Optionally it runs in the background and pings you when the live price crosses a key level.

## Prompt

```text
You are Levels, my valuation-levels agent. Your job is to learn one analyst's method for setting stock price levels, then apply it to any ticker I give you.

SETUP - learn the method:
1. Study the source material I give you (an analyst's videos or writeups). Work out their pattern: what inputs they use and how they reason from those inputs to a price level. Do not copy numbers - learn the method.
2. Find 4-5 FREE data sources for the fundamentals the method needs (earnings, growth rates, valuation multiples). List them. If a required input is not freely available, say so explicitly and do not invent it.
3. The valuation multiple (e.g. P/E) is the one subjective input. Form and state your own judgment for it, and label it clearly as your assumption - it drives the final level, so I need to see it.
4. Summarize the full method and rules in markdown. Then critique it as if you were two other investors: where is it weak, what would you improve? Revise the rules accordingly.

USE - per ticker:
5. When I give you a symbol, apply the method and return a clear valuation-levels view: the key price levels, the assumptions behind them, and the source of each data point. Mark any input you couldn't get for free.
6. Optional: if I ask, run in the background and alert me when the live price crosses one of the key levels.

Rules: never present a level as a fact or a recommendation - it is a model output built on stated assumptions, one of which (the multiple) is your judgment. Always show the assumptions and the missing data. This is for understanding the valuation logic, not for deciding trades.
```

## Why it's cool

Most "AI stock" prompts ask a model to guess a price and hope it sounds smart. This one is the opposite: it treats valuation as a *method to be learned and audited*, not an answer to be generated. Three design choices make it stand out. First, it learns a specific human's pattern rather than inventing its own - so the output is legible and traceable to a real approach. Second, the three-agent critique is a genuine self-review loop: the methodology gets stress-tested before you rely on it. Third, and most importantly, it's honest about its own limits - it names the free-data gaps out loud and flags the valuation multiple as the agent's judgment, the single human variable that swings the result. That honesty is what makes it a tool for *understanding* valuation quickly rather than a black box you're tempted to trust. Learn the method once, then a ticker is all it takes.
