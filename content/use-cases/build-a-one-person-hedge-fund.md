---
type: use-case
name: "Fund Desk · One-Person Hedge Fund"
slug: build-a-one-person-hedge-fund
headline: "Eight named bots run the whole fund: research, trading, risk and back office"
summary: "RohOnChain's field-report paper argues a fund's headcount moat has collapsed: research desk, trading, and back office map onto eight named bots on one shared cloud computer. The twist is build order - business-operations layer first, research second, with maker-checker separation so no bot grades its own output."
category: engineering
subcategory: agents-ops
categories: [engineering, work]
format: guide
bot_name: "Fund Desk"
what_it_does: "Blueprints a solo fund as eight named bots across six layers - research, signals, execution, risk, business-ops, growth - on one shared Grok Bot computer. Business-ops is built first, research second. A maker-checker split stops any bot grading its own work; academic methods anchor the signals."
integrations: []
schedule: daily
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 90
source_tweets:
  - url: https://x.com/RohOnChain/status/2093019378698842564
    author_handle: RohOnChain
    excerpt: "i finally cracked how to master Grok Bot: build an 'AI Hedge Fund' that prints alpha 24/7. 1. give this paper to your grok bot 2. ask it to build the desk 3. you are done."
    posted_at: "2026-08-27T16:54:40.000Z"
primary_source:
  kind: x-post
  url: https://x.com/RohOnChain/status/2093019378698842564
author:
  handle: RohOnChain
  url: https://x.com/RohOnChain
  platform: x
prompt_provenance: curator
replicability: "The prompt is a curator reconstruction of the paper's architecture, not the paper itself. Treat it as a research/operations blueprint, not financial advice. Keep it in paper-trading mode - live execution and especially accepting outside capital are regulated activities to clear with counsel first."
awesome_score: 82
score_breakdown:
  reproducibility: 17
  ambition: 20
  concreteness: 18
  novelty: 17
  evidence: 4
  craft: 6
featured: false
added_at: "2026-08-28T11:00:00Z"
updated_at: "2026-08-28T11:00:00Z"
verified_at: "2026-08-28T11:00:00Z"
status: live
---

## How it's set up

RohOnChain posted a practitioner's paper - as an image - making one sharp claim: for thirty years the wall between a solo quant and an institutional fund was **headcount**, and that wall just fell. A real fund runs three teams (a research desk, a trading operation, a back office); the paper maps them onto **eight named bots on one shared cloud computer**, and reports a thirty-day run covering 100 stocks for roughly $3,000/year against an institutional stack it pegs near $3.8M.

The counterintuitive part is the **construction order**, and it's the whole lesson:

1. **Business operations first.** Every solo quant makes the same mistake - they build a beautiful research layer, hit a perfect backtest, then hit the wall that kills them: no entity, no way to accept capital, no billing, no compliance. So you build the boring layer first, using the [Whop plugin](/plugins/) for entity/billing/subscription plumbing through plain conversation.
2. **Research second.** Now the research desk has somewhere to plug in. Academic methods anchor it - insider-cluster signals, Loughran-McDonald sentiment on filings, Fama-French factor decomposition - so output is checkable, not confident hallucination.
3. **Six layers, eight bots:** research, signal generation, execution, risk, business operations, and growth - each a named bot with one job.
4. **Maker-checker separation.** No bot grades its own output. The bot that generates a signal is never the bot that approves it - the single rule that keeps the whole thing honest.
5. **Three primitives make it possible:** the shared cloud computer (bots share one filesystem, browser and terminal), the native plugin marketplace (Whop, Composio, Notion, etc. over MCP), and native X integration for real-time signal.

## Prompt

```text
Act as my fund architect. Using this Grok Bot account's shared computer, help me stand up a research-and-operations "fund desk" as eight named bots across six layers: Research, Signals, Execution, Risk, Business-Ops, Growth. Build in this order, and do not skip ahead:

1. BUSINESS-OPS FIRST. Before any research, map out the boring layer: what entity, billing, and compliance steps a real operation needs, and which the Whop plugin can handle by conversation. List what only a human/lawyer can do. Do not form entities or take payments yourself - produce the checklist and stop for my sign-off.
2. RESEARCH SECOND. Build the research desk on academic methods I can verify: insider-cluster signals, Loughran-McDonald sentiment on filings, Fama-French factor decomposition. Cite the method for every signal. If you cannot source real data, say so - never fabricate a number or a backtest.
3. SIGNALS + RISK with MAKER-CHECKER: the bot that generates a signal is never the bot that approves it. Every ranked idea passes to a separate checker bot with the evidence before it reaches me.
4. EXECUTION stays in PAPER-TRADING ONLY. Do not connect a live broker or place a real order unless I explicitly arm you in writing for a specific, bounded mandate.

Hard rules: this is not financial advice and you will label it so. You will NOT accept outside capital, solicit investors, or represent performance to anyone - those are regulated activities that require real legal counsel, and you will tell me that plainly whenever the topic comes up. Start by proposing the eight bots and their one-line roles, then build layer 1 and stop for my review.
```

## Why it's cool

Most "AI trading bot" posts are a single script chasing a signal. This reframes the whole thing as an *operations* problem, and the insight lands: the reason solo quants fail isn't bad research, it's that they build research first and starve on the business layer. Inverting the order - back office before alpha - is the kind of non-obvious call that only shows up after you've watched the failure a few times. The maker-checker rule is the other quiet piece of engineering: separating the bot that proposes from the bot that approves is exactly how real desks stop one analyst's confidence from becoming a position, and it maps perfectly onto a multi-bot account. Read it as a blueprint for **agentic operations**, not a licence to trade - the transferable idea (build the boring layer first, make bots check each other, anchor every claim in a real method) works for any serious multi-bot build. And keep the paper's own honesty in view: it's candid that live execution and outside capital sit behind a legal and compliance wall no prompt removes.
