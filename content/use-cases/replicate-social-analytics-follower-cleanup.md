---
type: use-case
name: "Pruner · Follower Cleanup"
slug: replicate-social-analytics-follower-cleanup
headline: "Replace a $50/mo follower analytics tool with your X data archive and a bot"
summary: "kloss_xyz didn't want to pay for social analytics, so he had Grok Bot replicate it from his X data archive. Hand the bot following.js and follower.js and it sorts everyone into mutuals, people you've talked to, inactives and spam - then tags who to cut. You approve every batch; it never unfollows more than 100 a day."
category: marketing
subcategory: social
categories: [marketing, personal]
format: use-case
bot_name: "Pruner"
what_it_does: "Reads following.js and follower.js from your X archive, categorizes every account (mutuals, people you've replied to or DM'd, inactive, spam, not-following-back), and tags cut/keep by confidence. You approve each batch; it unfollows 50-100/day max and backs up the originals first."
integrations: []
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 20
source_tweets:
  - url: https://x.com/kloss_xyz/status/2092999741982536085
    author_handle: kloss_xyz
    excerpt: "$600/yr is too pricey for social analytics. Circleboom costs $50/mo… so I asked Grok Bot how to replicate it. Download an archive from X, sort and categorize into mutuals, inactive, overactive/spam, not following back, smart follower. Only I approve the batches, 50 to 100 a day."
    posted_at: "2026-08-27T15:36:39.000Z"
primary_source:
  kind: x-post
  url: https://x.com/kloss_xyz/status/2092999741982536085
author:
  handle: kloss_xyz
  url: https://x.com/kloss_xyz
  platform: x
replicability: "Request your X data archive first (Settings → download an archive; it emails you a link), then hand the bot data/following.js and data/follower.js. The prompt is kloss's verbatim - its guardrails (approve every batch, ≤100/day, keep backups) are what make it safe on a real account."
prompt_provenance: author
awesome_score: 77
score_breakdown:
  reproducibility: 21
  ambition: 13
  concreteness: 18
  novelty: 13
  evidence: 5
  craft: 7
featured: false
added_at: "2026-08-28T10:00:00Z"
updated_at: "2026-08-28T10:00:00Z"
verified_at: "2026-08-28T10:00:00Z"
status: live
---

## How it's set up

Social-analytics tools charge a subscription to do something your own data already supports: tell you who's worth following back. kloss_xyz did the math - $600/yr for one, $50/mo for Circleboom - and had Grok Bot replicate the useful part from his X data archive instead.

1. **Request your X data archive** (Settings → Your account → Download an archive). It takes a while and arrives as an email link. Inside are `data/following.js` and `data/follower.js` - the two files the bot needs.
2. **Hand those files to the bot** and paste the prompt below. It sorts every account into mutuals, people you've ever replied to or DM'd, and buckets like inactive, overactive/spam, not-following-back, and smart follower.
3. **It tags the confident calls** - `cut now`, `cut probably`, `keep` - across both your following and follower lists, so you're triaging suggestions, not raw names.
4. **You approve every batch.** Nothing is unfollowed without your say-so, capped at 50-100 a day so you never trip X's limits or nuke your graph by accident.
5. **It keeps a backup** of the original files first, so a bad call is always reversible.

## Prompt

```text
download an archive of account data from X and wait for the email download. you'll need data/following.js and data/follower.js.

please sort and categorize all into mutuals, anyone I've ever replied or DM'd with, and use clear labels like inactive, overactive/spam, not following back, mutuals, smart follower, etc.

only I will approve the batches before any action, 50 to 100 unfollows a day. never would we go over 100 in a day.

please also help me with tagging the highest confidence suggestions with labels like cut now, cut probably, and keep for both lists.

keep a backup of all our original files too in case anything goes wrong.
```

## Why it's cool

The insight isn't "unfollow people" - it's that the data these paid tools sell back to you is data X already hands you for free, in the archive. The bot's real job is the tedious part: parsing two big JS files, cross-referencing who you actually interact with, and turning thousands of accounts into a ranked, labeled shortlist. What makes it safe rather than reckless is entirely in the guardrails kloss wrote himself - a hard daily cap, human approval on every batch, and a backup of the originals before anything moves. That's the difference between a bot that helps you prune and a bot that quietly detonates your following list overnight. Swap in your own labels (niche, language, "engages with my posts") and the same skeleton becomes whatever social-analytics view you were about to pay for.
