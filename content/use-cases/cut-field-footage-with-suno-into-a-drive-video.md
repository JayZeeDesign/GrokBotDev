---
type: use-case
name: "Beach Cutter · Field Editor"
slug: cut-field-footage-with-suno-into-a-drive-video
headline: "A Drive folder of beach footage in, a cut video out"
summary: "Brandon Starship handed Grok Bot a Google Drive folder of the day's Starlink-on-the-beach footage, his Suno login via agent secrets, and the Drive folder to write the finished edit back to. Grok Bot did the cut, the music and all the titles."
categories: [fun]
format: use-case
tagline: "Footage in from Drive, music from Suno, the finished cut back to Drive."
category: fun
subcategory: creative
bot_name: "Beach Cutter"
what_it_does: "The whole interface is two folders. You give Grok Bot a Google Drive folder of raw footage, your music-service login through agent secrets, and a second Drive folder as the destination. It edits the video, adds the music and writes the titles."
integrations:
  - Google Drive
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
  - url: https://x.com/BStarr119/status/2091365711750840583
    author_handle: BStarr119
    excerpt: "Formula was here's my footage from today via Google Drive folder, here's my Suno login creds via agent secrets, here's the Google Drive folder I want you to write the edited video to."
    posted_at: "2026-08-23T03:23:36Z"
author:
  handle: BStarr119
  url: https://x.com/BStarr119
  platform: x
prompt_provenance: curator
replicability: "Brandon stated the formula in his own words rather than posting the prompt, so the starter below is a curator distillation of it. To adapt: put every credential in agent secrets and never in the prompt, and expect to be on hand for the two-factor prompt when it signs into the music service."
awesome_score: 73
score_breakdown:
  reproducibility: 17
  ambition: 14
  concreteness: 16
  novelty: 12
  evidence: 7
  craft: 7
featured: true
added_at: "2026-08-23T07:30:00Z"
updated_at: "2026-08-23T07:30:00Z"
verified_at: "2026-08-23T07:30:00Z"
status: live
---

## How it's set up

1. **Dump the day's raw footage into a Google Drive folder.** Brandon's was a day of shooting Starlink on the beach, powered off Ryobi and DJI batteries.
2. **Give Grok Bot the folder, not the files.** Pointing at a folder is what makes this repeatable: tomorrow's shoot goes in the same place and the same instruction runs again.
3. **Put your music-service login in agent secrets.** Brandon's Suno credentials went in through the secrets store so the bot could reach his own tracks. The credentials never appear in the prompt.
4. **Be on hand for the two-factor prompt.** He calls this the most interesting part of the run: the Google login two-factor step needed him and Grok Bot in sync before it could get through to the music.
5. **Name the output folder up front.** A second Drive folder is where the finished edit gets written, so the deliverable has an address before the work starts.
6. **Let it own the edit.** Grok Bot used their Cursor cloud agent skill to make the cut, and Brandon is clear that the titles and the edits are all its work.
7. **Review before it goes anywhere.** The finished video is a file in a folder until you decide to publish it.

## Prompt

```text
Here is a video edit job. Everything you need is in two folders and my secrets store.

INPUT: <Google Drive folder URL> - all of today's raw footage.
MUSIC: my <music service> account. The login is in agent secrets under <secret name>. Use MY tracks from that account. Never write a credential into a message, a file or a log.
OUTPUT: <Google Drive folder URL> - write the finished video here.

Do this:
1. Watch everything in the input folder and give me a one-line log of each clip: what is in it, and whether it is usable.
2. Propose the story in 5 to 8 beats before you cut anything, and wait for me to say go.
3. Sign into the music service and pick a track from my library that fits the beats. If a two-factor prompt appears, tell me immediately and wait - I will approve it on my device.
4. Cut the video: the sequence, the pacing, and all the on-screen titles. Cut on action, not on dead frames, and keep the type readable on a phone.
5. Write the finished file to the output folder and tell me the filename.

Do not delete or overwrite anything in the input folder. Do not upload, post or publish the video anywhere - the output folder is the end of your job. Show me the cut and get my approval before anything else happens with it.
```

## Why it's cool

The whole interface is two folders and a secret. There is no app to open, no timeline to scrub, no assets to hand over one at a time: footage goes into one Drive folder, the finished cut appears in another, and the credential for the music lives in agent secrets where it belongs rather than pasted into a chat. That shape is what makes it a habit rather than a one-off, because tomorrow's shoot drops into the same folder and the same instruction runs again. The most human moment in the whole thing is the two-factor prompt - the point where the bot hits Google's second factor and needs Brandon on his phone to get through, and the two of them have to be in sync for a few seconds before it can carry on to the music. That is a fair picture of where this actually is right now: the agent does the edit, the titles and the music, and every so often it needs you for the six seconds only a human can do.
