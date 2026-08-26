---
type: use-case
name: "Recap · Daily YouTube Summary"
slug: daily-youtube-summary
headline: "A 7am daily recap of the YouTube channels you actually follow"
summary: "One bot, one routine: it interviews you about your interests, locks in 7-10 favorite channels, then checks them every morning through the TranscriptAPI plugin. New videos in the last 24 hours get summarized from their transcripts into one chat message at 7am - and a seen-log guarantees it never repeats itself."
category: personal
subcategory: learning
categories: [personal, work]
format: use-case
bot_name: "Recap"
what_it_does: "The bot interviews you to build a list of 7-10 channels, then runs a 7am routine: check each channel via TranscriptAPI for videos from the last 24 hours, skip anything in its seen-log, and summarize the rest from transcripts - channel, title, 3 bullets, why you care, link. Optional email."
integrations: []
schedule: daily
autonomy: proposes
difficulty: beginner
setup_minutes: 10
author:
  handle: scheemunai
  url: https://x.com/scheemunai
  platform: x
replicability: "Paste the prompt and answer the interview - the bot builds the channel list with you. It needs the TranscriptAPI plugin for YouTube access (transcripts, uploads, metadata); connect that first. Email delivery is optional and only if you grant email access - chat-only works fine."
prompt_provenance: author
awesome_score: 81
score_breakdown:
  reproducibility: 23
  ambition: 15
  concreteness: 18
  novelty: 12
  evidence: 4
  craft: 9
featured: false
added_at: "2026-08-26T16:30:00Z"
updated_at: "2026-08-26T16:30:00Z"
verified_at: "2026-08-26T16:30:00Z"
status: live
---

## How it's set up

The full version of this idea is a beast - curated recap pages with timelines, clusters and a synthesis layer. This is the version you set up in ten minutes and enjoy every morning: a bot that watches your channels so you don't have to keep checking.

1. **Connect the [TranscriptAPI plugin](/plugins/transcriptapi/)** - it's how the bot reaches YouTube reliably (channel uploads, metadata, and full transcripts in one request; here's [why browser-scraping YouTube fails](/use-cases/give-grok-bot-reliable-youtube-access/)).
2. **Paste the prompt.** The bot interviews you: what topics do you care about, which channels do you already watch? Together you land on **7-10 channels**, saved to a list it keeps.
3. **Every morning at 7am** it checks those channels for anything posted in the last 24 hours, skips what it already showed you (it keeps a seen-log), and drops **one chat message**: channel, title, three bullets of what the video actually says - pulled from the transcript, not the thumbnail - why you'd care, and the link.
4. **Quiet days stay quiet:** no new videos means one line, not filler.
5. **Optional:** if you've given the bot email access, it can send the same recap as a morning email. Chat-only works perfectly without it.

## Prompt

```text
You are Recap, my daily YouTube summary bot. You connect to YouTube through the TranscriptAPI plugin - set that up first if it isn't connected yet, and use it for everything: channel uploads, video metadata, and transcripts. Do not browser-scrape YouTube for this job.

SETUP - interview me first:
1. Ask me about my interests (the topics I actually want to follow) and which channels I already watch. Help me land on 7-10 channels - suggest 2-3 extra based on my interests and let me approve or reject them.
2. Save the final list to /workspace/youtube-recap/channels.md: channel name, URL, and one line on why I follow it.
3. Create /workspace/youtube-recap/seen.md - your log of every video you have already summarized for me (video id, title, date). Never summarize the same video twice.

DAILY ROUTINE - every day at 7am my time:
4. Check each channel on my list through TranscriptAPI for videos posted in the last 24 hours.
5. Compare against seen.md - only new videos count.
6. If there are new videos, send me ONE chat message - my Daily YouTube Recap. For each video: the channel, the title, 3 short bullets on what it actually says (from the transcript, not the title), one line on why I would care, and the link. Order them by how well they match my interests. Then add them to seen.md.
7. If nothing new: one line only - "no new videos from your channels today" - and nothing else. No filler.
8. Optional: if I have granted you email access and asked for it, send the same recap by email as well. Otherwise chat only.

Rules: summaries come from transcripts - never invent what a video says. If a transcript is not available, say so and summarize from the description, clearly labeled. Keep the whole recap under one screen unless it was genuinely a big day.
```

## Why it's cool

Subscriptions were supposed to solve this, but YouTube's feed shows you what it wants you to watch, not what your channels posted. This flips the power back: your list, your schedule, and summaries built from what was actually said - the transcript - instead of a clickbait title and a thumbnail. The two small design choices do the heavy lifting: the seen-log means the bot never wastes your attention twice, and the quiet-day rule means a message from Recap always means there's something real. It's also the gentlest possible introduction to routines: one scheduled job, one file of channels, one file of memory - and once it clicks, you'll want a bot like this watching everything you care about.
