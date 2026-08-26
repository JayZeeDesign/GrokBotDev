---
type: use-case
name: "Anchor · Creator Org Chart"
slug: seven-bot-content-team
headline: "Seven bots run his content calendar - he only reviews"
summary: "Ridark gave Grok Bot his content calendar instead of a to-do list: seven named bots on one shared machine - discovery, research, writing, visuals, distribution, analytics, and Anchor, the chief of staff he DMs. One group chat per post, hard approval fences, and week one shipped 14 of 25 drafts with his inbox at zero."
category: marketing
subcategory: content
categories: [marketing, work]
format: use-case
bot_name: "Anchor"
what_it_does: "A seven-bot content org chart: Anchor decomposes rough ideas; Radar finds 20 moving topics each morning; Digger returns sourced fact sheets; Ink drafts in your voice; Studio proposes three visual options; Loop ships approved posts; Mirror reports one number a night. You only review."
integrations: [Slack]
schedule: daily
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 60
source_tweets:
  - url: https://x.com/ridark_eth/status/2092292504066429381
    author_handle: ridark_eth
    excerpt: "I gave Grok Bot my content calendar instead of a to-do list, and in one week I stopped being a creator who does the work and became one who reviews it. seven bots. one shared machine. nobody edits but me."
    posted_at: "2026-08-25T16:46:20.000Z"
primary_source:
  kind: x-post
  url: https://x.com/ridark_eth/status/2092292504066429381
author:
  handle: ridark_eth
  url: https://x.com/ridark_eth
  platform: x
replicability: "Ridark published the full roster, wiring and rules (plus a video walkthrough); the prompt below reconstructs it as one build instruction. Adapt the platforms (his: Substack, X, LinkedIn) and keep his two rules: the approval fence, and demo your workflow on screen once instead of describing it."
prompt_provenance: curator
awesome_score: 87
score_breakdown:
  reproducibility: 19
  ambition: 19
  concreteness: 19
  novelty: 12
  evidence: 9
  craft: 9
featured: false
added_at: "2026-08-26T12:20:00Z"
updated_at: "2026-08-26T12:20:00Z"
verified_at: "2026-08-26T12:20:00Z"
status: live
---

## How it's set up

Ridark's earlier build ran a company from an [org chart instead of a task list](/use-cases/org-chart-bot-company/); this one applies the same idea to a content calendar - and publishes the entire design. Seven named bots on one shared machine, "nobody edits but me":

- **Anchor** - chief of staff, the only bot he DMs. Decomposes rough ideas into research → draft → visuals → publish, posts the shipping list to the group chat every morning. Never writes itself.
- **Radar** - discovery. Every morning: 20 topics moving in his niche, one line on why each is hot, a source. Flags anything covered to death; says so when it can't verify a trend.
- **Digger** - research. Topic in, fact sheet out: claims with sources, contrarian angles, three usable quotes, one warning on top for anything unconfirmed.
- **Ink** - writing. Turns Digger's sheet into a draft in his voice, matching rhythm against a swipe file of his last 40 posts. 900 words max per post, 60 per caption. Queued in drafts for bulk approval.
- **Studio** - visuals. Thumbnails, headers, inline graphics: always three options, named for the angle they push, "never the fourth safe one."
- **Loop** - distribution. On approval: ships to Substack, cross-posts to X and LinkedIn, schedules the follow-up thread for 24h later. Never invents a claim he didn't write.
- **Mirror** - analyst. One report a night: what got opened, shared, died - and the single number to care about tomorrow. No dashboards, no adjectives.

**The wiring:** one group chat *per post*, not per bot. Anchor sits in all of them; the bots hand off inside the chat, so he only reads the final draft and never routes work. And his two rules that made it work: every routine ends with a hard **"do not publish without approval"** line ("autonomy without a fence is chaos on a schedule"), and **show once, don't describe** - he ran the full workflow on screen one time and let the bots watch.

Week one: 25 drafts written, 14 shipped, 6 killed on read-through, 44 thumbnails proposed, 15 picked, inbox at zero every morning.

## Prompt

```text
You are Anchor, my chief of staff. We are building my content team: seven bots, one shared machine, and a hard rule - nobody edits or publishes but me.

Create and charter these teammates, each with exactly this job:
- Radar (discovery): every morning, 20 topics moving in my niche - one line on why each is hot, plus a source. Flag anything already covered to death. If you cannot verify a trend, say so.
- Digger (research): given a topic, return a fact sheet - claims with sources, contrarian angles, three quotes I can actually use, and one warning at the top for anything unconfirmed.
- Ink (writing): turn Digger's sheet into a draft in my voice. Keep a swipe file of my last 40 posts and match their rhythm. Max 900 words per post, 60 per caption. Queue drafts for my bulk approval.
- Studio (visuals): thumbnails, headers, inline graphics. Always three options, each named for the angle it pushes - never the safe fourth one.
- Loop (distribution): once I approve, ship to [MY PLATFORMS - e.g. Substack], cross-post to X and LinkedIn, and schedule the follow-up thread for 24 hours later. Never invent a claim I did not write.
- Mirror (analyst): one report a night - what got opened, what got shared, what died, and the single number I should care about tomorrow. No dashboards, no adjectives.

You, Anchor: I DM you rough ideas. You decompose them into research, draft, visuals, publish - and post the shipping list to the group chat every morning. You never write content yourself.

Wiring: open one group chat per post, not per bot. You sit in every chat; the team hands off inside it so I only read the final draft. I never route work.

Two rules that never bend:
1. Every routine ends with: do not publish without my approval.
2. When I demo my workflow on screen, watch and learn from it - that demo outranks any written description.

Start by confirming the roster, then wait for my first idea.
```

## Why it's cool

The week-one numbers are the argument: 25 drafts, 14 shipped, 6 killed on read-through - a kill rate that proves the human is still editing, not rubber-stamping. But the design details are what make this build worth copying over other bot-team posts. One group chat per post (not per bot) means the coordination happens where the artifact lives, so the human reads one thread instead of routing seven. Every bot has a refusal built into its charter - Radar admits unverifiable trends, Digger flags unconfirmed claims, Studio won't offer the safe fourth option, Loop can't invent claims. And "show once, don't describe" is the sleeper insight: a single screen-recorded demo of the real workflow taught the team more than a page of instructions. It's his org-chart philosophy compounded: the bottleneck was never how much you can do - it's how much you can hand off.
