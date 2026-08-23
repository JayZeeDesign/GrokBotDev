---
type: use-case
name: "Maintainer · Vision-Aligned Triage"
slug: vision-md-so-agents-self-triage
headline: "Give every repo a VISION.md so your bot triages issues for you"
summary: "Kun Chen owns 24k+-star open-source repos and was drowning in issues and PRs. His fix wasn't more review - it was moving his influence up a level: an explicit VISION.md per repo saying where the project is going, so his Grok Bot triages every incoming issue as vision-aligned or not, and only the aligned ones get built."
category: engineering
subcategory: issues
categories: [engineering, work]
format: guide
bot_name: "Maintainer"
what_it_does: "A way to steer an agent fleet by direction instead of reviewing every plan: write an explicit VISION.md for a repo, then have your Grok Bot judge every incoming issue and PR against it - shipping the vision-aligned ones and setting the rest aside - so you stop being the triage bottleneck."
integrations: [GitHub]
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 20
source_tweets:
  - url: https://x.com/kunchenguid/status/2091638832307536357
    author_handle: kunchenguid
    excerpt: "real story of how Grok Bot saved the day... 1. defining a VISION.md for every repo i own (renaming to STRATEGY.md soon)."
    posted_at: "2026-08-23T21:28:53.000Z"
  - url: https://x.com/kunchenguid/status/2089189790881382676
    author_handle: kunchenguid
    excerpt: "introducing /vision - a simple skill to write an explicit VISION.md for your project. our influence has to go one level up: we need to define the vision."
    posted_at: "2026-08-21T00:00:00.000Z"
primary_source:
  kind: x-post
  url: https://x.com/kunchenguid/status/2091638832307536357
author:
  handle: kunchenguid
  url: https://x.com/kunchenguid
  platform: x
replicability: "Reconstructed from @kunchenguid's posts on VISION.md and his /vision skill. Write the repo's VISION.md first (where the project should go, not what it is), then point your bot at it as the triage rubric. Pairs with his Grok Ship factory for actually shipping the aligned work."
prompt_provenance: curator
awesome_score: 77
score_breakdown:
  reproducibility: 18
  ambition: 16
  concreteness: 15
  novelty: 14
  evidence: 6
  craft: 8
featured: false
added_at: "2026-08-23T22:00:00Z"
updated_at: "2026-08-23T22:00:00Z"
verified_at: "2026-08-23T22:00:00Z"
status: live
---

## How it's set up

Kun Chen maintains open-source projects that total 24k+ GitHub stars, and the incoming issues and PRs had buried him. What finally moved the queue wasn't reviewing faster - it was changing the layer he operates at:

1. **Write an explicit VISION.md for each repo** (he's renaming it STRATEGY.md). It states where the project should *go* - not what it currently is. His `/vision` skill drafts one by reading what the project already does; you then edit it until it's right.
2. **Make VISION.md the triage rubric.** Point your Grok Bot at it and every incoming issue, PR and feature request gets judged against it: vision-aligned or not. The aligned ones get built; the rest are declined or set aside - without you reading each one.
3. **Let the factory ship the aligned work.** This is the steering layer that sits on top of a build system like his [Grok Ship software factory](/use-cases/grok-ship-factory/); he also invites maintainers to help specifically on issues triaged as vision-aligned.

The point, in his words: as agents do more, you can't review all the code, then you can't review all the plans, and eventually you can't even review 1,000 feature requests a day. So your influence has to move up a level - you define the vision, and it becomes the judgment call that decides what belongs.

## Prompt

```text
I want you to help me steer [REPO] by its vision instead of me reviewing every issue.

Step 1 - Draft a VISION.md. Look at what the project already is (README, recent PRs, the issues people file) and write an explicit VISION.md that states where this project should GO - its purpose, who it is for, the kind of changes that belong, and the kind that do not. This is about direction, not a feature list. Show it to me and refine it with my edits until it is right, then save it as VISION.md in the repo.

Step 2 - Use it as the triage rubric. From now on, for every open issue and PR, judge it against VISION.md and label it: vision-aligned, off-vision, or needs-my-call. For vision-aligned items, propose a short plan and - once I approve the batch - start shipping them. For off-vision items, draft a kind closing comment explaining it does not fit the direction. Bring the "needs-my-call" ones to me as a short list.

Rule: VISION.md is the source of truth for what belongs. When you are unsure whether something is aligned, ask me - and if it is a real gap, propose an edit to VISION.md rather than guessing. Never close or merge anything without my go-ahead.
```

## Why it's cool

Most "AI maintains my repo" setups are about throughput - how many PRs an agent can close. This one is about *judgment*, which is the part that actually doesn't scale. The insight is that the human bottleneck keeps moving up: first we reviewed code, then plans, and soon we can't even review the requests. VISION.md is where you plant your intent once so the agents can make the "does this belong?" call thousands of times without you. It's a small file with an outsized effect: it turns a bot from an eager contributor that needs constant steering into a maintainer that already knows what the project is for - and it's the missing top layer for anyone running a software factory across more repos than one person could ever read.
