---
type: use-case
name: "Food Team · Plan, Cart, Cook"
slug: food-shopping-agent-team
headline: "Build a 3-agent team that plans, carts, and cooks your meals"
summary: "Michael Fenech's exact prompt designs a three-agent team on your Chief of Staff bot: a Meal Organiser plans easy meals for your diet, a Shopper fills your online grocery cart (you do the final payment), and a Cooking agent gives step-by-step instructions. It maps the pipeline for your review first."
categories: [personal]
format: use-case
tagline: "Three agents that plan your meals, fill your grocery cart, and coach you through cooking."
category: personal
subcategory: home
bot_name: "Food Team"
what_it_does: "A prompt for your Chief of Staff bot that designs three agents: a Meal Organiser (easy meals for your diet), a Shopper (fills your online grocery cart, you pay), and a Cooking agent (step-by-step guides on demand). It maps the pipeline for your review before building."
integrations: []
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 15
source_tweets:
  - url: https://x.com/Michael_Fenech_/status/2091452896738935246
    author_handle: Michael_Fenech_
    excerpt: "GROK BOT TIP TO SAVE TIME: Here is the exact prompt I used to create a team of agents who do MY FOOD SHOPPING for me."
    posted_at: "2026-08-23T09:10:02.000Z"
author:
  handle: Michael_Fenech_
  url: https://x.com/Michael_Fenech_
  platform: x
prompt_provenance: author
replicability: "Michael Fenech's exact prompt (below), verbatim, with placeholders. To adapt: fill in [YOUR CONTEXT], [GROCERY SITE], [DIET TYPE], [COMPLEXITY STANDARD] and [MEAL TYPES], and keep the two safe defaults - payment stays your manual step, and it designs the team for your review before building."
awesome_score: 78
score_breakdown:
  reproducibility: 20
  ambition: 15
  concreteness: 17
  novelty: 12
  evidence: 5
  craft: 9
featured: false
added_at: "2026-08-23T09:15:00Z"
updated_at: "2026-08-23T09:15:00Z"
verified_at: "2026-08-23T09:15:00Z"
status: live
---

## How it's set up

1. Open your **Chief of Staff (or CEO) bot** - the one that spins up and coordinates other agents.
2. Paste the prompt below and fill in the placeholders: your context and time constraint, your grocery site, your diet type, how easy the meals must be, and which meal types you want.
3. The bot **maps the three-agent design first** (roles, inputs, outputs, handoffs) and waits for your OK before building - review it, then say go.
4. From then on: ask the Meal Organiser for N days of meals, let the Shopper fill your cart (you place the order), and ask the Cooking agent for a step-by-step guide when it's time to cook.

## Prompt

```text
You are a systems architect specializing in multi-agent AI workflows, tasked with designing a team of three specialized agents that together eliminate the time I spend planning, ordering, and cooking food.

My situation: I'm [YOUR CONTEXT / TIME CONSTRAINT]. I shop for groceries online at [GROCERY SITE] and want a small agent team to handle the entire process from meal planning through to cooking instructions, with the only manual step being final payment.

Design the following three agents, each with a clear role definition, scope, and handoff logic:

1. Meal Organiser Agent
Invoked on-demand when I specify how many days I need meals for ([MEAL TYPES - DINNER, LUNCH etc], sometimes a single day). Generates meals strictly following a [DIET TYPE] diet. Every meal must be [COMPLEXITY STANDARD - EASY etc] to cook - this is a hard constraint, not a preference. Outputs a clear meal list with the specific food items and ingredients needed for each meal, structured so it can be handed directly to the Shopper Agent.

2. Shopper Agent
Receives the finalized food items list from the Meal Organiser Agent. Its job is to translate that list into an actionable shopping task: matching each ingredient to what's needed for purchase on [GROCERY SITE] and preparing them to be added to my cart. Does not complete payment - that remains my manual final step. Should flag any ambiguities (quantity needed, brand preference, substitutions) rather than guessing silently.

3. Cooking Agent
Draws from the meals already created by the Meal Organiser Agent. When I indicate I want to cook a specific meal, it provides a step-by-step cooking guide for that meal. Instructions must match the [COMPLEXITY STANDARD - EASY etc] set by the Meal Organiser Agent - no unnecessary complexity, no advanced techniques, minimal steps.

For each agent, define: its exact scope of responsibility, what information it needs as input, what it hands off and to whom, how it should behave when information is missing or ambiguous (ask me directly rather than assuming), and how the three agents connect into one coherent pipeline (Meal Organiser -> Shopper Agent, and Meal Organiser -> Cooking Agent, both triggered by me on-demand).

Do not build or execute anything yet. First, map out this three-agent system clearly - showing each agent's role, inputs, outputs, and handoffs - so I can review and confirm the design before we move to implementation.
```

## Why it's cool

Most "AI meal planner" prompts stop at a list of recipes. This one is designed as a real pipeline: the Meal Organiser's output is structured specifically so the Shopper can act on it, and the Cooking agent draws from the same plan so the difficulty never drifts above what you asked for. Two choices make it safe rather than reckless: the Shopper fills the cart but never pays (final payment stays a human step), and every agent is told to ask you when something is ambiguous instead of guessing a brand or a quantity. And it refuses to build until it has shown you the design - the same review-first discipline that keeps a multi-agent setup from running off on its own.
