---
type: use-case
name: "Caller · Bot With a Phone"
slug: give-your-grok-bot-a-phone-number
headline: "Give your Grok Bot a phone number - it makes the calls and reports back"
summary: "Peter bought a $15 phone number on Bland, gave his Grok Bot the API key, and the bot worked out the rest. Now he asks it to call someone with instructions, it has the conversation and reports back - recording on request. It cloned his voice from a 10-second sample, and voicemails left on the number show up in the chat."
category: personal
subcategory: home
categories: [personal, work]
format: use-case
bot_name: "Caller"
what_it_does: "Gives your bot a working phone line via Bland: buy a number (~$15), hand over the API key, and the bot wires itself up. Ask it to call someone with instructions - it holds the conversation, reports back, keeps the recording, hears voicemails in chat, and can build a voice from a sample of yours."
integrations: []
schedule: adhoc
autonomy: acts-with-approval
difficulty: beginner
setup_minutes: 10
source_tweets:
  - url: https://x.com/SPCXTSLA/status/2092356603349815435
    author_handle: SPCXTSLA
    excerpt: "It was really easy to give my Grok Bot a phone number using the bland service. I purchased a phone number for $15, gave my bot the API key and it works out the rest. Now I can just ask it to call someone with some instructions and it does it."
    posted_at: "2026-08-25T21:01:03.000Z"
primary_source:
  kind: x-post
  url: https://x.com/SPCXTSLA/status/2092356603349815435
author:
  handle: SPCXTSLA
  url: https://x.com/SPCXTSLA
  platform: x
replicability: "Peter describes the setup; the prompt below is a curator reconstruction with call-safety rails added. You need a Bland account, a purchased number (~$15), and your API key - the bot reads the docs and wires itself up. Cross-linked: see the Bland plugin page."
prompt_provenance: curator
awesome_score: 85
score_breakdown:
  reproducibility: 21
  ambition: 17
  concreteness: 17
  novelty: 14
  evidence: 8
  craft: 8
featured: false
added_at: "2026-08-26T11:35:00Z"
updated_at: "2026-08-26T11:35:00Z"
verified_at: "2026-08-26T11:35:00Z"
status: live
---

## How it's set up

The whole setup, in Peter's words, was: buy a phone number on [Bland](/plugins/bland/) for $15, give the bot the API key, and "it works out the rest." No connector, no configuration - the bot reads the API docs and wires itself up.

What he got for it:

- **Outbound calls on instruction.** "Call someone with these instructions" - the bot places the call, has the conversation, and reports back how it went. The recording is there if he asks for it.
- **A voice of his own.** From a 10-second recording of his voice, it created a new voice that sounded like him.
- **Inbound voicemail.** He can call the Bland number and leave a voicemail - the bot hears it and adds it to the chat, which turns the number into a way to hand your bot tasks by phone.

All of it driven from chat. The prompt below reproduces the setup and adds the safety rails a phone-capable bot should have from day one.

## Prompt

```text
You now have a phone line. Here is my Bland API key: [API KEY]. My Bland number: [NUMBER, or "look it up"]. Read Bland's docs and wire yourself up to place and receive calls - then confirm what you can do.

How we work from here:
1. When I ask you to call someone with instructions, first show me: who you are calling, the number, and the goal of the call in one line. When I say go, place the call, have the conversation, and report back with how it went. Keep the recording and share it when I ask.
2. Check the number for inbound voicemails. When someone leaves one, transcribe it into our chat - if it is me leaving you a task, treat it like a message from me and confirm what you will do.
3. If I give you a short recording of my voice and explicitly ask, create a voice from it for calls where I want the bot to sound like me. Never clone anyone else's voice, and never use my voice to deceive someone about who is on the line.

Rules that never change: a call reaches a real person - no dialing without my go-ahead on the who and why; be honest that you are an AI assistant calling on my behalf if asked; no calls to emergency services; respect "take me off your list" immediately; and keep calls as short as the job allows - I pay by the minute.
```

## Why it's cool

A bot with a browser can do a lot, but a huge slice of the real world still runs on phone calls - restaurants, clinics, contractors, the DMV. This closes that gap for $15 and an API key, and the striking part is how little glue it took: no integration to configure, the bot just read the docs and built its own phone capability. The voicemail loop is the sleeper feature - the number works in both directions, so you can call your own bot from anywhere and leave it a task like a voicemail to an assistant. Add the voice sample and the picture is complete: an agent that doesn't just write and browse for you, but speaks - with rails, because anything that dials real humans should ask before it does.
