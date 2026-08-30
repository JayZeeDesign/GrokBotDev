---
type: use-case
slug: reply-guard
headline: "Screen your X replies for burners and insults"
summary: "Reviews the replies to your posts and splits the signal from the noise: it flags accounts under 100 followers or under a year old, plus anyone slinging insults, so real conversation stays visible and throwaway replies get moderated. Jason Calacanis built it to keep his mentions classy."
categories: [marketing]
format: use-case
category: marketing
subcategory: social
schedule: adhoc
autonomy: proposes
difficulty: intermediate
setup_minutes: 10
integrations:
  - X
author:
  handle: Jason
  url: https://x.com/Jason
  platform: x
prompt_provenance: curator
replicability: "Point it at your own X account and set your thresholds — the follower floor, the account-age cutoff, and what counts as an insult. It flags for review; keep hiding, blocking or muting behind your approval until you trust the calls."
source_tweets:
  - url: https://x.com/Jason/status/2094095953812717647
    author_handle: Jason
    excerpt: "It reviews my replies for suspected burner accounts (under 100 followers/under a year old) and flags people who use insults in their replies."
    posted_at: "2026-08-30T16:12:36.000Z"
added_at: "2026-08-30T16:12:36Z"
updated_at: "2026-08-30T16:12:36Z"
verified_at: "2026-08-30T17:00:00Z"
status: live
---

## How it's set up

A large account's replies are a firehose, and the worst of it is low-effort. This is the triage layer.

1. Connect your X account (the X plugin) so the bot can read the replies to your posts.
2. Set your thresholds: the follower floor (Jason uses 100), the account-age cutoff (under a year), and what counts as an insult versus a strong opinion.
3. Paste the prompt below. Point it at a post; it scores each replier against your rules and returns two lists — the burners and insults separated from the genuine conversation.
4. Review the flags. Keep hiding, muting or blocking behind your own approval until the calls have earned your trust.

## Prompt

```text
You screen the replies to my X posts. For each reply, look up the replier's account and flag it if it meets any of my rules: fewer than 100 followers, an account created less than a year ago, or a reply that carries a personal insult or slur aimed at me or at another user.

Return two lists.
- FLAGGED: the reply, a link to it, and the reason (burner / new account / insult).
- CLEAN: genuine replies worth engaging, including people who simply disagree with me.

Judge insults by intent, not by heat. Disagreement, criticism and strong opinions are CLEAN. Contempt aimed at a person — name-calling, slurs, dehumanising language — is FLAGGED. When you are unsure, put it in CLEAN and tell me why you hesitated.

Do not hide, mute, block or reply to anyone on your own. Your job is the flagged list; the action is mine.
```

## Why it's cool

Most reply moderation is all-or-nothing: you either read everything or you tune it out. This splits the difference. It never judges the *conversation* for you — real disagreement stays in the CLEAN pile on purpose — it just pulls out the two things that are almost never worth your attention: throwaway burner accounts and contempt aimed at a person. The restraint is the whole design: it flags, you decide, and nobody gets auto-nuked on a bot's hunch.
