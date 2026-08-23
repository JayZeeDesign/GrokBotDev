---
type: use-case
name: "Genghis · Canon Keeper"
slug: beta-read-an-early-novel-against-your-canon
headline: "A beta reader that has already read every book"
summary: "Same Izriel thread: he loaded his manuscripts and lore into a boss bot so he never had to re-explain his world, had a second bot pull wiki-worthy material into World Anvil, then asked for a beta-reader and editor report on one of his early novels."
categories: [fun, personal]
format: use-case
tagline: "Load the manuscripts and the lore once, then ask for the editor report."
category: fun
subcategory: creative
bot_name: "Genghis"
what_it_does: "A boss bot reads your manuscripts and your lore once and holds the canon, so every later request already knows the world. A second bot pulls wiki-worthy material into World Anvil, and the boss returns a beta-reader and editor report on an older book."
integrations: []
schedule: adhoc
autonomy: readonly
difficulty: intermediate
setup_minutes: 60
source_tweets: []
author:
  handle: izriel100k
  url: https://x.com/izriel100k
  platform: x
prompt_provenance: curator
replicability: "Reconstructed from @izriel100k's published Grok Bot build (the same thread as the 20,000-email triage), so the prompt below is a curator distillation, not his words. To adapt: load the whole series plus the lore first, and ask for the report in fixed sections so two books are comparable."
awesome_score: 68
score_breakdown:
  reproducibility: 18
  ambition: 13
  concreteness: 13
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

1. **Load the canon into one bot and leave it there.** Izriel's boss bot, Genghis, read the manuscripts and the lore so he did not have to re-explain the world every time he opened a new task.
2. **Make that bot the one everyone else reports to.** The rest of the roster inherits the world instead of each re-learning it, which is the whole reason the setup holds together.
3. **Have a second bot mine the books for wiki-worthy material** - the names, places, rules and history that a reader would look up.
4. **Send those notes to your wiki.** Izriel had a third bot, Anvil, take them and start updating his World Anvil, so the canon stays current as the drafts move.
5. **Now ask the canon-keeper for a beta-reader and editor report** on an older book. Because it holds the whole series, it reads that early novel in the context of where the world ended up, not in isolation.
6. **Ask for the report in fixed sections** so the next book you run through it is comparable to the last: what works, where a reader would stop, continuity against the established canon, voice drift, and the three changes with the best return.
7. **Keep it read-only.** Izriel's verdict on the whole experiment is that the wins were cleanup, organisation and worldbuilding support - not writing the book.

## Prompt

```text
You have read all of my manuscripts and my lore documents. You are the keeper of this canon: assume you know the world, the timeline, the characters and the rules already, and never ask me to re-explain them.

I am giving you one of my EARLY novels. Give me a beta-reader and editor report on it, read in the context of everything the series has become since. Use exactly these sections:

1. STRAIGHT VERDICT - what this book is doing well, in three sentences, no flattery.
2. WHERE A READER STOPS - the specific pages or beats where a real reader would put it down, and why.
3. CANON CHECK - every place this book contradicts the lore or the later books. Quote the line, name the rule it breaks, and say which side should win.
4. VOICE DRIFT - where the prose does not sound like the writer I have become. Quote before/after.
5. WORLD GAPS - things this book assumes that the lore never actually establishes.
6. THE THREE FIXES - the three changes with the best return on effort, ranked, each with the reason.

Rules: quote from the text whenever you make a claim, so I can check you. Flag anything you are unsure about instead of smoothing over it. Do NOT rewrite my prose, do not edit the manuscript file, and do not update the wiki off the back of this report - report only, and ask me before you change anything anywhere.
```

## Why it's cool

Most manuscript feedback starts cold: you paste a chapter and get notes from something that has never met your world. Izriel's setup inverts that. Because one bot has already read every manuscript and all the lore and everything else reports to it, the beta read arrives from inside the canon - it can tell you that chapter four contradicts a rule you only invented two books later, which is exactly the note a human beta reader cannot give you until they have read all of it. The World Anvil leg is what keeps it true over time: the wiki updates as the drafts move, so the reference the reader is checking against does not quietly go stale. It is worth repeating his own framing, though, because it is the honest one: the win is not that AI writes the book. The win is a team that reads the book and keeps the world organised while you keep writing.
