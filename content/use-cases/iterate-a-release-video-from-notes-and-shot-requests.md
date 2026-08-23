---
type: use-case
name: "Release Cutter · Video Editor"
slug: iterate-a-release-video-from-notes-and-shot-requests
headline: "The bot sent the shot list, I shot it, it cut v3"
summary: "Cortney Harrington let Grok Bot make the release video for Craft Rabbit v1.4.1. It asked for specific shots, she screen-recorded them, and it cut the video. The version she posted is the third, and it had correctly applied her notes from the first two."
categories: [marketing, fun]
format: use-case
tagline: "It writes the shot list, you shoot it, it cuts and takes your notes."
category: marketing
subcategory: content
bot_name: "Release Cutter"
what_it_does: "Grok Bot produces an app release video by first telling you which shots it needs, then cutting the footage you record, then revising against your notes. Cortney shipped the third pass for Craft Rabbit v1.4.1 with the first two rounds of feedback applied."
integrations: []
schedule: adhoc
autonomy: proposes
difficulty: intermediate
setup_minutes: 60
source_tweets:
  - url: https://x.com/CortneyReindeer/status/2091299863896195246
    author_handle: CortneyReindeer
    excerpt: "This is the third version. It applied my notes from the first two versions correctly. I made the screen recordings based on its shot requests and thus made those aesthetic decisions."
    posted_at: "2026-08-22T23:01:56Z"
author:
  handle: CortneyReindeer
  url: https://x.com/CortneyReindeer
  platform: x
prompt_provenance: curator
replicability: "Cortney described the loop rather than posting a prompt, so the starter below is a curator distillation. To adapt: make it ask for the shot list before anything gets recorded, and give notes as a numbered list so you can check the next cut against them one by one."
awesome_score: 74
score_breakdown:
  reproducibility: 18
  ambition: 13
  concreteness: 15
  novelty: 12
  evidence: 7
  craft: 9
featured: true
added_at: "2026-08-23T07:30:00Z"
updated_at: "2026-08-23T07:30:00Z"
verified_at: "2026-08-23T07:30:00Z"
status: live
---

## How it's set up

1. **Give Grok Bot the release itself** - the version number and what actually shipped. Cortney's was Craft Rabbit v1.4.1, whose headline items were a new default image model and several new models in the trial and subscriber tiers.
2. **Make it ask for the footage before anything is recorded.** It returns a shot list: which screens, in which order, doing what. This is the inversion that makes the loop work.
3. **Record its requested shots yourself.** Cortney made the screen recordings against those requests, and in doing so made the aesthetic calls - which crafts and baked goods to prompt for in each shot.
4. **Hand the raw recordings back and let it cut** the sequence, the pacing and the on-screen titles.
5. **Give notes as a numbered list,** not a vibe. Then check the next cut against them one by one.
6. **Run it again.** The version Cortney posted was the third, and she confirms it had applied her notes from the first two correctly - which is the part that is genuinely hard.
7. **Keep your own eye on it.** Her honest verdict on v3: it did okay, but she would have made the type larger on the overlays and cut with more action.

## Prompt

```text
You are making the release video for <app> <version>. Here is what shipped: <changelog>. The audience is <who>, the video is <length>, and it needs to end on <call to action>.

Work in this order and do not skip ahead:

1. SHOT LIST FIRST. Before I record anything, give me a numbered list of the shots you need: which screen, what happens in it, roughly how long, and what it has to demonstrate. I will do the screen recordings myself and make the aesthetic choices inside each shot.
2. Wait for my footage. Do not generate substitutes for shots I have not sent you.
3. CUT IT. Assemble the sequence, set the pacing, and write the on-screen titles. Tell me which take you used for each shot and why.
4. TAKE NOTES LITERALLY. I will give you feedback as a numbered list. In the next version, respond to every numbered note explicitly: what you changed and where. If you disagree with a note, say so and do it anyway.
5. Repeat from step 3 until I say it is done.

Keep the type large enough to read on a phone, and keep the cuts on action rather than on dead frames.

Show me each version and get my approval before you publish, upload or post it anywhere.
```

## Why it's cool

Almost every AI video workflow runs one direction: you hand over assets and it hands back a cut. Cortney's runs the other way first - the bot tells her what to film, and she goes and films it. That single flip turns the model from an asset generator into a director working with a human camera operator, and it means the footage exists because the edit needed it rather than the edit being assembled from whatever happened to be lying around. The other thing worth noting is that this is a third version. Applying a round of notes and then a second round without silently undoing the first is where most iterative generation quietly falls apart, and she confirms it held. She is also honest about the ceiling: bigger type on the overlays, more action in the cuts. A use case that names what it still gets wrong is worth more than one that claims it nailed it.
