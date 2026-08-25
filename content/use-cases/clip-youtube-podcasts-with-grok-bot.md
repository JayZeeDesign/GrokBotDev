---
type: use-case
name: "Clipper · Podcast Clip Team"
slug: clip-youtube-podcasts-with-grok-bot
headline: "Clip a YouTube podcast by timestamp, then let a bot team write the post"
summary: "KanekoaTheGreat sends his Grok Bot a YouTube link and says 'cut from 16:43 to 18:17' - a few minutes later the exact HD clip is in the chat. His Clipper bot hands it to a Researcher and a Writer bot that pull quotes and draft the caption. No code - he just connected his Google account and asked Grok Bot to clip it."
category: marketing
subcategory: content
categories: [marketing]
format: use-case
bot_name: "Clipper"
what_it_does: "A no-code, three-bot content pipeline: a Clipper bot cuts an HD clip from any YouTube video by timestamp, then hands it to a Researcher and a Writer bot that pull the best quotes and draft the caption - so a single 'cut from X to Y' turns a podcast moment into a ready-to-post clip."
integrations: []
schedule: adhoc
autonomy: acts-with-approval
difficulty: beginner
setup_minutes: 15
source_tweets:
  - url: https://x.com/KanekoaTheGreat/status/2091968024370897102
    author_handle: KanekoaTheGreat
    excerpt: "Grok Bot makes clipping YouTube podcasts ridiculously easy. I just send it a link and say: 'Cut from 16:43 to 18:17.' A few minutes later, the exact HD clip is ready in the chat."
    posted_at: "2026-08-24T19:16:58.000Z"
primary_source:
  kind: x-post
  url: https://x.com/KanekoaTheGreat/status/2091968024370897102
author:
  handle: KanekoaTheGreat
  url: https://x.com/KanekoaTheGreat
  platform: x
replicability: "You need a Grok Bot with your Google/YouTube account connected. The clip instruction ('cut from mm:ss to mm:ss' on a YouTube link) is verbatim; the Clipper -> Researcher -> Writer handoff is a curator reconstruction - build the three bots and wire the handoffs to your posting workflow."
prompt_provenance: curator
awesome_score: 84
score_breakdown:
  reproducibility: 21
  ambition: 16
  concreteness: 17
  novelty: 13
  evidence: 9
  craft: 8
featured: true
added_at: "2026-08-24T19:30:00Z"
updated_at: "2026-08-24T19:30:00Z"
verified_at: "2026-08-24T19:30:00Z"
status: live
---

## How it's set up

The thing Kanekoa points out is how little you have to do: he logged into his Google account on Grok Bot, sent a YouTube link, and said *"cut from 16:43 to 18:17."* A few minutes later the exact HD clip was in the chat - no code, no editing software. The reason it feels like magic is that it isn't one bot doing one thing; it's a small team with a handoff:

1. **Clipper bot** - takes a YouTube link and a time range, produces the exact HD clip, and transcribes it.
2. **Researcher bot** - receives the clip and transcript and pulls the best quotes and moments.
3. **Writer bot** - turns those into a caption/post draft, ready for you to review.

You connect your Google/YouTube account once, build the three bots, and wire the handoff (Clipper -> Researcher -> Writer). After that, a single "cut from X to Y" turns a podcast moment into a finished clip with a drafted post attached.

## Prompt

```text
You are my Clipper bot. Your job: when I send you a YouTube link and a time range, produce the exact HD clip and kick off the rest of my content pipeline.

Setup (do once):
- Make sure my Google / YouTube account is connected so you can access the videos I send.
- Know your two teammates: a Researcher bot and a Writer bot. After you produce a clip, you hand off to them.

Every time I give you a link and a range like "cut from 16:43 to 18:17":
1. Cut the exact clip from that YouTube video in HD, from the start timestamp to the end timestamp, and post the finished clip back in this chat.
2. Transcribe the clip.
3. Send the clip and transcript to the Researcher bot and ask it to pull the 3-5 best quotes and moments.
4. Pass those to the Writer bot and ask it to draft a caption/post in my voice, ready for me to review.

Rules: cut exactly the range I give - do not round or guess the timestamps. If the video is not accessible or the range is invalid, tell me instead of guessing. Bring me the finished clip plus the drafted caption, and wait for my approval before anything is posted anywhere.
```

## Why it's cool

This is the workflow a lot of creators have wanted for years - "tell an AI which part of a podcast you want and it just cuts the HD clip" - except the interesting part isn't the cut, it's the assembly line behind it. One instruction fans out into three specialists: the Clipper produces and transcribes, the Researcher mines the transcript for the moments worth posting, and the Writer turns those into a caption. Each bot does one job well and passes the baton, so you go from a raw two-hour video to a finished clip with a ready draft attached - without touching an editor or writing a line of code. It's a clean template for any "find the good part, package it, write the post" pipeline, not just podcasts.
