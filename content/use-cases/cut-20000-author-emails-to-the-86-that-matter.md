---
type: use-case
name: "Hatchet · Inbox Triage"
slug: cut-20000-author-emails-to-the-86-that-matter
headline: "20,000 author emails cut down to the 86 that mattered"
summary: "Izriel ran Grok Bot like a small publishing staff. Hatchet worked through 20,000 emails and cut them to the 86 that actually mattered, while a second bot, Spark, kept finding better ways to work and pushed Hatchet from dozens of emails a pass to thousands."
categories: [work, personal]
format: use-case
tagline: "One bot triages the inbox, a second bot teaches it to work in thousands."
category: work
subcategory: email
bot_name: "Hatchet"
what_it_does: "A triage bot reads a writer's whole email backlog and hands back only what matters - 86 out of 20,000 in Izriel's run - while a second bot studies how the first one works and raises its batch size from dozens of emails a pass to thousands."
integrations: []
schedule: adhoc
autonomy: proposes
difficulty: intermediate
setup_minutes: 45
source_tweets:
  - url: https://x.com/izriel100k/status/2091304500371800089
    author_handle: izriel100k
    excerpt: "Hatchet went through 20,000 emails and cut them down to 86 that actually mattered. ... Spark was the idea guy. He found better ways to work, got Hatchet from dozens of emails at a time to thousands."
    posted_at: "2026-08-22T23:20:22Z"
author:
  handle: izriel100k
  url: https://x.com/izriel100k
  platform: x
prompt_provenance: curator
replicability: "Izriel described the roster rather than posting a prompt, so the starter below is a curator distillation. To adapt: write your own test for what 'matters' first, make the bot show its first pass before it touches the rest, and keep the second bot whose only job is raising the batch size."
awesome_score: 69
score_breakdown:
  reproducibility: 15
  ambition: 16
  concreteness: 14
  novelty: 12
  evidence: 4
  craft: 8
featured: true
added_at: "2026-08-23T07:30:00Z"
updated_at: "2026-08-23T07:30:00Z"
verified_at: "2026-08-23T07:30:00Z"
status: live
---

## How it's set up

1. **Give the triage bot read access to the mailbox and a hard definition of "matters."** Izriel called his Hatchet. For a working author that definition is rights, contracts, editors and agents, readers waiting on a real answer, and anything with a date attached.
2. **Make it work in passes, not one sweep.** After the first batch it stops and shows you what it kept and a sample of what it dropped, so you correct the rule while it is still cheap to correct.
3. **Only then let it scale up.** This is where the second bot earns its place.
4. **Point a second bot at the first one.** Spark's job was finding better ways to work: it is the bot that took Hatchet from dozens of emails at a time to thousands, and it also pulled wiki-worthy material out of the books.
5. **Keep a boss bot above both.** Genghis had already read the manuscripts and the lore, so nobody had to re-explain the world every time, and everyone reported to him.
6. **Judge it on how small the output is.** 20,000 in, 86 out. Anything that survives should be something you would have opened anyway.
7. Izriel is blunt about the edges: cleanup, organisation and worldbuilding worked; getting a bot to run his website did not, and burned a lot of usage for almost no progress.

## Prompt

```text
You are my inbox triage bot. I am a working writer and my mailbox has years of backlog in it. Your job is to hand me back only the messages that actually matter.

"Matters" means exactly this, and nothing else:
- someone is genuinely waiting on a reply from me
- rights, contracts, royalties, payments, anything with money in it
- an editor, agent or publisher
- a reader or reviewer who asked a real question
- anything with a deadline or a date attached

Everything else is noise: newsletters, receipts, notifications, promos, automated mail, and threads that already resolved themselves.

Work in passes, not one sweep:
1. Do the first 200 messages, then STOP and show me what you kept plus a sample of what you dropped, so I can correct the rule before you go further.
2. Once I confirm the rule, raise the batch size as high as you can run reliably and keep going until the mailbox is done.
3. Report as you go: read, kept, dropped, and the running total.

Give me the survivors as one list: sender, a one-line reason it matters, what it needs from me, and the link.

Do NOT archive, delete, label, forward or reply to anything. Show me the list and get my approval before you touch a single message.
```

## Why it's cool

Two things lift this above an inbox cleaner. First, the ratio is brutal and honest: 20,000 in, 86 out, which is roughly what a real backlog is actually worth once you stop pretending. Second, and much rarer, is Spark - a bot whose entire job was to improve how the other bot worked, and which took Hatchet from dozens of emails a pass to thousands. That is a bot tuning a bot, and it is the layer most agent rosters never build. Izriel is also refreshingly clear about the limits: as he puts it, useful, not magic, but better than staring at your own draft for the fortieth time.
