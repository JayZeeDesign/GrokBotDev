---
type: use-case
name: "Chief of Staff · Taught by Demo"
slug: teach-a-chore-by-recording
headline: "Teach your bot a chore from a screen recording"
summary: "Dillon Loomis recorded his screen with narration while sorting a week of desktop files, and his Chief of Staff learned not just what he did but how and why — it compressed the oversized video itself to watch it, answered a question he'd planted mid-recording, and coached him on part two."
categories: [work]
format: use-case
tagline: "Narrate a screen recording once; the bot learns the chore, how you do it, and why."
category: work
subcategory: tasks
bot_name: "Chief of Staff"
what_it_does: "Instead of writing a procedure, you record your screen with voice narration doing a task once; the Chief of Staff watches it (compressing the file itself if needed), learns the steps and the reasoning, and coaches you on how to record the next pass."
integrations: []
schedule: none
autonomy: acts-with-approval
difficulty: beginner
setup_minutes: 15
source_tweets:
  - url: https://x.com/DillonLoomis/status/2091133785106686153
    author_handle: DillonLoomis
    excerpt: "I did a screen recording with audio of me cleaning up my desktop ... my Chief of Staff LEARNED not just what I do but HOW and WHY I do things"
    posted_at: "2026-08-22T16:00:00Z"
author:
  handle: DillonLoomis
  url: https://x.com/DillonLoomis
  platform: x
prompt_provenance: curator
replicability: "A Curator reconstruction of Dillon's teach-by-demonstration flow. To adapt: pick a monotonous, well-defined chore, record yourself doing it once while narrating the why, hand the bot the video, and test the learned skill on a safe example before it runs unattended."
awesome_score: 67
score_breakdown:
  reproducibility: 14
  ambition: 13
  concreteness: 13
  novelty: 14
  evidence: 6
  craft: 7
featured: false
added_at: "2026-08-22T16:00:00Z"
updated_at: "2026-08-22T16:00:00Z"
verified_at: "2026-08-22T16:00:00Z"
status: live
---

## How it's set up

1. Pick a monotonous but well-defined chore you'd never write a procedure for — Dillon's was sorting hundreds of random desktop files after a busy week.
2. Record your screen **with voice narration**, doing the task once and saying not just what you're doing but *why* (the rules and exceptions live in the narration).
3. Hand the recording to your Chief of Staff. If the file is too large, it can compress it under the limit itself so it can watch it.
4. Let it play the task back to you as a drafted skill, and take its feedback on how to record the next pass so it learns better (Dillon even planted a question mid-video to check it was really watching — it asked him back).
5. Test the learned skill on a safe example, then let it run the chore for you. Keep anything destructive (deleting files) behind your approval.

## Prompt

```text
I'm going to teach you a recurring chore by showing you, not by writing it out. I'll give you a screen recording with my voice narrating as I do the task once.

1. Watch the whole recording. If the file is too large to open, compress it under the limit first, then watch it.
2. Learn not just the steps but the WHY — my narration explains the rules, the exceptions, and what I care about. Capture those, not just the clicks.
3. Play it back to me as a drafted skill: the steps, the decision rules, what the output should look like, and where you would stop for my approval.
4. Tell me what would help you learn better next time — what to show or say in a follow-up recording.
5. Once I approve the skill, run the chore on a small safe example first, show me the result, and only then do the full job.

Rules: never delete or move anything irreversibly without my OK; if the recording is ambiguous, ask rather than guess; treat the demonstration as a first draft and confirm the edge cases with me.
```

## Why it's cool

It flips how you hand work to an agent: you demonstrate instead of specify. The standout isn't the file-sorting — it's that the Chief of Staff learned the how and why from narration, solved its own blocker by compressing an oversized video to watch it, caught a question planted mid-recording, and coached the human on how to teach it better. That's the lowest-friction on-ramp there is for anyone who'd never write a procedure by hand.
