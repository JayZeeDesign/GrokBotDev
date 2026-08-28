---
type: use-case
name: "Screener · Pitch Deck Analyzer"
slug: pitch-deck-analyzer-bot
headline: "A shareable bot that screens every pitch deck against your own criteria"
summary: "Brian Evans gets pitched 5-10 times a week, so he built a Grok Bot that learns exactly what he looks for and scores each deck against it - filtering the misfits before he spends a minute. He built it on Grok Bot's new shareable-templates feature, which strips your data so the workflow can be handed to someone else."
category: work
subcategory: research
categories: [work]
format: use-case
bot_name: "Screener"
what_it_does: "Interviews you once to learn your investment criteria, then reads each pitch deck and scores it against your thesis - flagging fit, gaps, and dealbreakers so you skip the misfits. Built as a shareable template (personal data removed), so the same screening workflow can be handed to a partner."
integrations: []
schedule: adhoc
autonomy: proposes
difficulty: beginner
setup_minutes: 15
source_tweets:
  - url: https://x.com/BrianDEvans/status/2093386515972030780
    author_handle: BrianDEvans
    excerpt: "Now the agents are shareable with your personal data removed. I built a Pitch Deck Analyzer - I get pitched 5-10 times a week; this bot learns exactly what I look for, analyzes each deck against my preferences, and helps me filter out opportunities that don't fit."
    posted_at: "2026-08-28T17:13:33.000Z"
primary_source:
  kind: x-post
  url: https://x.com/BrianDEvans/status/2093386515972030780
author:
  handle: BrianDEvans
  url: https://x.com/BrianDEvans
  platform: x
prompt_provenance: curator
replicability: "Paste the prompt and answer its interview about what you screen for - stage, sector, traction bar, dealbreakers. Then feed it decks (PDF or link). It scores against your criteria, it doesn't decide for you. To share it, save it as a template so Grok Bot strips your preferences first."
awesome_score: 78
score_breakdown:
  reproducibility: 21
  ambition: 14
  concreteness: 18
  novelty: 15
  evidence: 4
  craft: 6
featured: false
added_at: "2026-08-28T18:05:00Z"
updated_at: "2026-08-28T18:05:00Z"
verified_at: "2026-08-28T18:05:00Z"
status: live
---

## How it's set up

Brian Evans gets pitched 5-10 times a week, and the first pass on a deck is the same tedious filter every time: does this even fit what I invest in? He built a Grok Bot to do that pass - and built it on Grok Bot's new **shareable-templates** feature, which strips your personal data out so the whole workflow becomes something you can hand to a partner and they can reuse instantly.

1. **The interview.** The bot asks what you actually screen for - stage, sector, check size, the traction bar, and the dealbreakers that kill a deck instantly. This is the part that makes the screen *yours* rather than generic.
2. **Feed it decks.** Send a PDF or a link. It reads the whole thing against your criteria.
3. **It scores, you decide.** For each deck it returns a fit verdict, the strengths, the gaps, and any dealbreakers it hit - so a clear "no" takes ten seconds and a "maybe" arrives pre-summarized.
4. **Share it as a template.** Save the bot as a template and Grok Bot removes your private preferences, so a colleague can install the same screening workflow and fill in their own criteria.

Brian's second template - an **AI Usage Meter** that tracks how much you have left across all your AI subscriptions in one place - is the same idea pointed at a different chore: build the workflow once, share it stripped of your data.

## Prompt

```text
You are Screener, my pitch-deck analyst. Before you review anything, interview me so you screen the way I actually screen.

SETUP - ask me, one at a time:
1. What stage and check size do I invest in? What sectors am I in and out on?
2. What do I most want to see in a deck (team, traction, market, moat, etc.), roughly in priority order?
3. What are my instant dealbreakers - the things that make it a no regardless of everything else?
Save my answers as my screening criteria and confirm them back to me before we start.

PER DECK (I'll send a PDF or link):
4. Read the whole deck. Score it against MY criteria, not generic VC wisdom.
5. Return: a one-line fit verdict (strong fit / worth a look / not a fit), the strengths against what I care about, the gaps or missing slides, and any dealbreakers you hit. Quote the deck for each point so I can trust it.
6. Never invent numbers the deck doesn't contain, and never make the investment decision - you triage, I decide.

Keep each review to one screen. If a deck is unreadable or missing, say so instead of guessing.
```

## Why it's cool

The interesting shift here isn't the pitch-deck bot itself - it's that a *workflow* is now a shareable object. Until now, everyone rebuilding "analyze X against my preferences" started from a blank prompt; templates turn one person's tuned setup into something a whole team or audience can install and adapt, with the personal data automatically scrubbed. The pitch-deck screener is a clean example of what makes that valuable: the work isn't the analysis, it's the *criteria* - the accumulated taste of someone who's seen a thousand decks - and a template lets that taste travel. It's also honest about its lane: it scores decks against a thesis, it doesn't make the investment call. Build the screen once, let it triage the firehose, and hand the reusable version to anyone who screens the same kind of thing.
