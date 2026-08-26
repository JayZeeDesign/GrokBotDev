---
type: use-case
name: "Be Happier · Weekly Wellbeing Coach"
slug: be-happier-bot
headline: "Lenny's 'Be Happier' bot - 3 weekly suggestions from your real life"
summary: "Lenny Rachitsky's favorite new use case is one sentence: a 'Be Happier' bot that analyzes his emails, calendar and Slack and suggests three things per week to be happier. His screenshot shows why it works - it read his actual week and protected time with friends and family, not generic self-care."
category: personal
subcategory: health
categories: [personal]
format: use-case
bot_name: "Be Happier"
what_it_does: "A one-sentence bot that reads what your life actually looks like - email, calendar, Slack - and suggests three concrete things per week to be happier. Because it sees your real commitments, the suggestions are specific (protect this dinner, do that school pickup) instead of generic wellness advice."
integrations: [Gmail, Google Calendar, Slack]
schedule: weekly
autonomy: proposes
difficulty: beginner
setup_minutes: 5
source_tweets:
  - url: https://x.com/lennysan/status/2092283728877990128
    author_handle: lennysan
    excerpt: "Favorite new Grok Bot use case: analyze my emails, calendar, Slack and suggest things I can do to be happier. It suggested prioritizing time with friends and family."
    posted_at: "2026-08-25T16:11:28.000Z"
primary_source:
  kind: x-post
  url: https://x.com/lennysan/status/2092283728877990128
author:
  handle: lennysan
  url: https://x.com/lennysan
  platform: x
replicability: "Lenny's exact one-sentence prompt is quoted on this page; the prompt block expands it only enough to run as a weekly routine. Connect email, calendar and Slack, paste, done - the value comes entirely from the bot reading your real week, so connect the accounts you actually live in."
prompt_provenance: curator
awesome_score: 81
score_breakdown:
  reproducibility: 23
  ambition: 14
  concreteness: 14
  novelty: 14
  evidence: 9
  craft: 7
featured: false
added_at: "2026-08-26T11:40:00Z"
updated_at: "2026-08-26T11:40:00Z"
verified_at: "2026-08-26T11:40:00Z"
status: live
---

## How it's set up

Lenny Rachitsky (Lenny's Newsletter) built his favorite new bot with a single sentence:

> You're the Be Happier bot. Analyze my emails and everything you notice about me and my day, and what I work and and how I act, and suggest 3 things I can do to be happier weekly.

That's his verbatim prompt, typo and all. With email and calendar already connected, his screenshot shows what came back - and it's the opposite of generic wellness advice. The bot read his inbox ("personal mail is mostly noise; the real load is work pitches, a few open promises, and a stacked week"), checked the calendar "so the three things aren't just inbox advice," and then made a call: *"This week is already a pile-up... these three don't add a new practice. They protect things you already started."* Suggestion one: treat tomorrow's 4-9:30pm hang with a friend as closed - "it's the only unstructured friend hang on your calendar in weeks." Suggestion two: do the school pickup that won't come back, skip the class that will.

Setup is just: connect Gmail, Calendar and Slack, paste the prompt below (Lenny's sentence, expanded only enough to run on a weekly schedule), and let it run.

## Prompt

```text
You're the Be Happier bot. Analyze my emails and everything you notice about me and my day, and what I work on and how I act, and suggest 3 things I can do to be happier weekly.

Run this as a weekly routine. Each week: read my email, calendar, and Slack; notice what my week actually looks like - the load, the open promises, the people I keep missing; then suggest exactly 3 concrete things, tied to real events and real people on my calendar, not generic wellness advice. If the week is already full, protect things I've already started instead of adding new practices. Keep it short: three suggestions, one line of reasoning each. Suggest only - I decide.
```

## Why it's cool

Every wellness app gives you the same advice because it knows nothing about you. This bot gives different advice because it knows everything - it can see that the Thursday dinner is the only unstructured friend time in weeks, that the school pickup window closes forever, that the week is already a pile-up so the kind thing is to *protect* commitments, not add habits. That's the quiet insight in Lenny's one-liner: happiness advice is a data problem, and your bot is the only advisor that has the data. It suggested prioritizing time with friends and family - not because that's what wellbeing content says, but because it read his actual calendar and saw exactly which hours that meant.
