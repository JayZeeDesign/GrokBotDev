---
type: use-case
name: "Archivist · Prompt Library"
slug: extract-art-prompts
headline: "13,425 art prompts, extracted and sorted"
summary: "Julie McCann had a Grok Bot go through 557 chats across all her projects, extract every art prompt, and sort them by subject into one searchable library — 13,425 in total. When it hit context limits it switched to smaller blocks on its own and finished the ~30-hour job."
categories: [data]
format: use-case
tagline: "Send a bot through every project to extract and sort your prompts into one library."
category: data
subcategory: enrichment
bot_name: "Archivist"
what_it_does: "A Grok Bot works through every chat and project in your account, extracts all the prompts (here, AI art prompts), and compiles them sorted by subject into one searchable library — chunking the work into smaller blocks when it hits context limits so a huge job finishes without falling over."
integrations: []
schedule: none
autonomy: readonly
difficulty: beginner
setup_minutes: 20
source_tweets:
  - url: https://x.com/JulieZMcCann/status/2091142158283632826
    author_handle: JulieZMcCann
    excerpt: "I just finished going through all of my projects ... to extract all my art prompts. End Result: 13,425 prompts sorted and searchable."
    posted_at: "2026-08-22T16:00:00Z"
author:
  handle: JulieZMcCann
  url: https://x.com/JulieZMcCann
  platform: x
prompt_provenance: curator
replicability: "A Curator reconstruction of Julie's task. To adapt: point the bot at your own projects, tell it what to extract, and — the key lesson — tell it to work in smaller blocks and checkpoint so timeouts don't lose progress on a long job."
awesome_score: 64
score_breakdown:
  reproducibility: 15
  ambition: 12
  concreteness: 14
  novelty: 11
  evidence: 6
  craft: 6
featured: false
added_at: "2026-08-22T16:00:00Z"
updated_at: "2026-08-22T16:00:00Z"
verified_at: "2026-08-22T16:00:00Z"
status: live
---

## How it's set up

1. Point the bot at all of your projects and chats — the places your prompts are buried.
2. Tell it exactly what to pull (here: every art prompt) and how to organize it — Julie had it sort by subject into one searchable file.
3. Tell it up front to work in **smaller blocks** and checkpoint as it goes. Julie's run timed out twice before the bot switched to smaller, more manageable chunks on its own; asking for that from the start avoids the false starts.
4. Let it run — a job this size took ~30 hours across 557 chats; check in and re-point it if its computer needs an update mid-run.
5. Get back one compiled, sorted, searchable library you can mine for future work.

## Prompt

```text
Go through all of my projects and chats and build me one searchable library of every prompt I've written.

1. Work project by project, chat by chat. Extract every prompt you find (for me: AI art prompts — the generation prompts, not the replies).
2. Work in SMALL blocks and checkpoint after each one. Do not try to hold everything at once — if a block is large, split it further. Save progress as you go so a timeout never loses work.
3. Normalize each entry: the prompt text, which project/chat it came from, and a subject tag.
4. Sort the whole set by subject and compile it into one searchable file (and tell me the total count).

Rules: extract only what's actually there — never invent or "improve" a prompt. If you hit a limit, shrink the block and continue rather than stopping. Give me a progress note after each project so I can see how far along you are.
```

## Why it's cool

It's the boring superpower: an agent with the patience to walk 557 chats and turn years of scattered work into one searchable asset. The clever part is the failure handling — after timing out it shrank the job into blocks and kept going, which is the difference between a big extraction that finishes and one that dies halfway. Anyone sitting on a pile of past prompts, snippets, or decisions can point this at their own history.
