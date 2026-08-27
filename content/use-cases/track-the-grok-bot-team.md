---
type: use-case
name: "Radar · Grok Bot Team Tracker"
slug: track-the-grok-bot-team
headline: "Be first to know about new Grok Bot features - your bot tracks the team that builds it"
summary: "Ben Lang posted the list of engineers and designers building Grok Bot and said: follow them. The better move: have your bot do it for you. A daily check of all seven profiles, a seen-log so nothing repeats, a signal filter so only feature news gets through - delivered to you, or straight to your Chief of Staff bot."
category: engineering
subcategory: agents-ops
categories: [engineering, work]
format: use-case
bot_name: "Radar"
what_it_does: "Checks the seven profiles of the team building Grok Bot once a day for new posts, keeps a seen-log so nothing is reported twice, filters for actual signal - feature previews, launches, changes - and delivers one short brief. If you run a Chief of Staff bot, Radar reports to it instead of you."
integrations: []
schedule: daily
autonomy: proposes
difficulty: beginner
setup_minutes: 5
source_tweets:
  - url: https://x.com/benln/status/2092995402953884072
    author_handle: benln
    excerpt: "Be first to know about new Grok Bot features. Follow the team building @bot: @shaoruu - engineer, @baltaaazr - engineer, @poteto - engineer, @lingxi - engineer, @johnbai - designer, @pengzheng_ - designer, @SamSokolin - engineer"
    posted_at: "2026-08-27T15:19:24.000Z"
primary_source:
  kind: x-post
  url: https://x.com/benln/status/2092995402953884072
author:
  handle: benln
  url: https://x.com/benln
  platform: x
replicability: "Paste the prompt - the team list from Ben's post is already in it, kept in a file you can edit as the team grows. Works best when your bot can read X (its own account or your logged-in session). The Chief of Staff handoff is optional: without one, the brief just comes to you in chat."
prompt_provenance: curator
awesome_score: 76
score_breakdown:
  reproducibility: 21
  ambition: 13
  concreteness: 17
  novelty: 12
  evidence: 5
  craft: 8
featured: false
added_at: "2026-08-27T16:10:00Z"
updated_at: "2026-08-27T16:10:00Z"
verified_at: "2026-08-27T16:10:00Z"
status: live
---

## How it's set up

Ben Lang posted the roster of people actually building Grok Bot - seven engineers and designers - with simple advice: follow them and you'll be first to know what's coming. Good advice. But you have a bot with its own computer and a daily routine; *following people manually* is exactly the kind of job it exists to take off you.

1. **Paste the prompt.** The team list ships inside it, saved to a file the bot maintains - when the team grows or Ben posts an update, tell your bot and it edits the list:
   - [@shaoruu](https://x.com/shaoruu) - engineer
   - [@baltaaazr](https://x.com/baltaaazr) - engineer
   - [@poteto](https://x.com/poteto) - engineer
   - [@lingxi](https://x.com/lingxi) - engineer
   - [@johnbai](https://x.com/johnbai) - designer
   - [@pengzheng_](https://x.com/pengzheng_) - designer
   - [@SamSokolin](https://x.com/SamSokolin) - engineer
2. **Once a day** the bot checks each profile for posts since its last run, against a seen-log (the same trick as the [Daily YouTube Summary](/use-cases/daily-youtube-summary/) - nothing gets reported twice).
3. **The filter is the feature.** Team members post plenty; you only care about some of it. The bot passes through feature previews, launches, product changes and platform news - and drops the rest.
4. **One brief.** Who posted, what it actually means for your bots, and the link. Quiet days stay quiet: no news means one line, not filler.
5. **The Chief of Staff handoff (optional).** If you run a [Chief of Staff bot](/use-cases/exact-chief-of-staff-prompt/), Radar files its brief with the CoS instead of pinging you - so platform news arrives in the same morning report as everything else your team handles.

## Prompt

```text
You are Radar, my Grok Bot platform watcher. Your job: I hear about new Grok Bot features before everyone else, without following anyone myself.

SETUP:
1. Create /workspace/radar/team.md with this list - the people building Grok Bot (source: Ben Lang @benln). One line each: handle, role.
   @shaoruu (engineer), @baltaaazr (engineer), @poteto (engineer), @lingxi (engineer), @johnbai (designer), @pengzheng_ (designer), @SamSokolin (engineer)
   When I tell you the team changed, edit this file - it is the single source of truth.
2. Create /workspace/radar/seen.md - your log of every post you have already reported (post id, author, date). Never report the same post twice.

DAILY - once every morning:
3. Check each profile on the team list for posts since your last run.
4. Filter hard. Report ONLY: feature previews and screenshots, launches, product changes, platform announcements, and posts that hint at what is being built. Skip personal posts, replies, banter, and reposts of things I would have seen anyway.
5. Deliver ONE short brief: for each item - who posted, one line on what it means for my bots, and the link. Order by importance, not by time.
6. If nothing qualifies: one line - "no Grok Bot team news today" - and nothing else.

HANDOFF (only if I run a Chief of Staff bot): instead of messaging me directly, file the brief with my Chief of Staff through our team's usual channel, marked "platform news". The CoS decides whether it reaches my morning report.

Rules: never like, reply, follow, or post from my account - you read only. If a profile is unavailable on a run, note it once and move on. Keep every brief under one screen.
```

## Why it's cool

"Follow these seven people" is good advice with a familiar failure mode: you follow them, the algorithm shows you two of their posts a week, and the launch you cared about scrolls past at 2am. The bot version closes exactly that gap - a deterministic daily sweep of a curated list beats an algorithmic feed at the one thing that matters here, which is *completeness*. The design is the same three moves that make every good watcher bot work - a source list in a file, a seen-log, and a hard signal filter - pointed at the most leveraged target imaginable for a Grok Bot owner: the people deciding what your bot can do next. And the Chief of Staff handoff is the quiet endgame: your bots watching the people who build your bots, filing what matters into the same morning brief as your email and your calendar. That's not following the team. That's having staff.
