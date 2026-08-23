---
type: use-case
name: "Chief of Staff · One-Person Company"
slug: run-a-business-with-grok-bot-agent-teams
headline: "Run a one-person business on a Grok Bot agent team"
summary: "Billy Howell runs a 6,000-subscriber local newsletter on a Grok Bot agent team. His method: one project per account, a Chief of Staff that audits the business and proposes the first three revenue agents, perfect each task by hand before spinning off a dedicated bot, then automate the routine work."
category: work
subcategory: tasks
categories: [work, marketing, sales]
format: guide
bot_name: "Chief of Staff"
what_it_does: "A repeatable method for running a real one-person business on a Grok Bot agent team: pick one project per account, stand up a Chief of Staff to audit the business and propose the first three revenue agents, perfect each task before spinning off a dedicated bot, then automate the routine work."
integrations: [Notion, Gmail, Shopify]
schedule: daily
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets: []
primary_source:
  kind: youtube-video
  url: https://youtu.be/qQluNEfSVHk
  title: "Grok Bot: make a 1 person company with agents"
  channel: Greg Isenberg
  timestamp: "8:26"
replicability: "Reconstructed from Billy Howell's walkthrough with Greg Isenberg. The Day-One prompt below is a curator reconstruction of his method - adapt the business, tools and agents to your own, and keep the one-project-per-account rule and the build-execute-automate order."
prompt_provenance: curator
awesome_score: 85
score_breakdown:
  reproducibility: 20
  ambition: 18
  concreteness: 18
  novelty: 13
  evidence: 8
  craft: 8
featured: true
added_at: "2026-08-23T13:45:00Z"
updated_at: "2026-08-23T13:45:00Z"
verified_at: "2026-08-23T13:45:00Z"
status: live
---

## How it's set up

Billy Howell runs the Arlington Bagel - a local newsletter that goes to 6,000 people every week - almost entirely on a Grok Bot agent team. The whole method is built on treating the bots like a real company, and it comes down to a handful of rules:

1. **One project per account.** All your agents share one cloud computer, so running two businesses plus your personal email in the same account causes context bleed and burns your token budget. Constraints are the feature - pick the one thing this account works on.
2. **Start with a Chief of Staff (think COO), and audit before acting.** Connect your existing business docs (Notion, Gmail, Slack) and have it take stock of the business, then propose the **top three agents to create first to drive revenue** - roles, goals, and metrics. You approve; it doesn't build yet.
3. **You make the decisions, not the agent.** Don't let a bot shop for the "perfect" tool for three weeks. Pick (files live in Notion, done) and move on.
4. **Perfect a task by hand, then spin off an agent for it.** Have the Chief of Staff do the task once. Once you've reviewed it and it works, say "now create a bot that does exactly that." You earn the right to add an agent.
5. **Run the ball for a week, then expand.** Week one: build the team and learn to fly it. Week two: pure execution, no new agents. Week three: fill the gaps you found (an inbox agent, a Shopify agent), then automate.
6. **Automate with routines.** Ask the Chief of Staff: "based on how we ran this week, what routines could move the ball while I'm asleep?" Each agent files a 5-line end-of-day brief - what shipped, what's stuck, what needs you - so you interface through one bot.
7. **Build → execute → automate.** Once a workflow is proven, push the high-volume, low-value parts to a cheaper tool (a make.com/OpenAI step, or an SOP script the bot runs) so you don't burn premium tokens writing two-sentence blurbs.

The payoff is real: the sales agent that monitors his Gmail for inbound caught a local shop owner's message he'd missed, priced the ad slot, and drafted the pitch - a sponsor he'd otherwise have lost.

## Prompt

```text
You are my Chief of Staff for [BUSINESS] - think COO, not assistant. Our single mission is to drive revenue, and we run ONE business in this account (no side projects - they cause context bleed and burn tokens).

Day one, audit before you act:
1. Review everything I connect - [Notion / Google Drive / Gmail / Slack / current tools] - and take stock of the business: what it is, how it makes money, what is working, and what is stuck.
2. Then tell me the TOP 3 agents we should create first to drive revenue, and for each one its role, its goal, and the metric it is judged on. Do not create them yet - propose, and I will approve.

How we work from here:
- You are the hub. I mostly talk to you; you route work to the other agents and bring me "what shipped, what is stuck, and what needs me."
- Before we ever create a specialist agent, YOU do that task once yourself. Once I have reviewed it and it works, spin off a dedicated agent that does exactly that, with a clear goal.
- When a decision is ambiguous (which tool, where files live), ask me once and I will decide - do not shop for the perfect solution for days.
- When I give feedback on a piece of work, turn it into a reusable skill so the responsible agent produces and reviews it my way next time.
- For any important output, run an adversarial QA loop first: have a small panel of agents critique the draft over about 3 rounds, then give me the polished version.
- Build -> execute -> automate: once a workflow is proven, propose a routine (a scheduled job) so the team moves the ball while I am not working. Each agent sends you a 5-line end-of-day brief (what shipped, blockers, what needs me).

Start now with step 1: audit the business and come back with the top 3 revenue agents and their goals.
```

## Why it's cool

Most "AI runs my business" content is hype; this is an operator showing the actual org chart. The insight that makes it work is counter-intuitive: the constraint - one project, a fixed roster of agents, a human who makes the calls - is the feature, not the limitation. Instead of spawning a new bot for every stray idea (the ChatGPT-thread graveyard), you run a small mission-aligned team like a real company: the Chief of Staff routes work, you perfect a task before you delegate it, and only proven workflows get automated into routines. The "do it once yourself, then clone the agent" rule is the whole game - it means every agent you add already has a spec you've verified, so the team gets more capable without getting more chaotic. It's the clearest blueprint yet for turning $200-a-month of Grok Bot into a business that pays for itself.
