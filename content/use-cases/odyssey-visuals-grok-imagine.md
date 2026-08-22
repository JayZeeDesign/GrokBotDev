---
type: use-case
name: "Scene Director · Grok Imagine"
slug: odyssey-visuals-grok-imagine
headline: "The Odyssey, storyboarded and shot by one bot"
summary: "X Freeze asked a Grok Bot for Odyssey movie visuals and it ran the whole creative pipeline: it researched the story, planned the scenes, characters, costumes, locations and camera angles, wrote every prompt, generated the shots with Grok Imagine, and organized them into a folder."
categories: [fun]
format: use-case
tagline: "One command turns a story into a researched shot list, generated visuals, and a folder."
category: fun
subcategory: media
bot_name: "Scene Director"
what_it_does: "Instead of prompting an image model shot by shot, a Grok Bot runs the whole creative workflow: it researches the subject (X Freeze used The Odyssey), plans scenes and camera angles, writes each generation prompt, produces the shots with Grok Imagine, and files them in a folder."
integrations: []
schedule: none
autonomy: acts-with-approval
difficulty: beginner
setup_minutes: 15
source_tweets:
  - url: https://x.com/XFreeze/status/2091193462133498299
    author_handle: XFreeze
    excerpt: "It researched The Odyssey, planned the scenes, wrote the prompts, generated the shots with Grok Imagine, organized everything and saved it to my folder."
    posted_at: "2026-08-22T18:00:00Z"
author:
  handle: XFreeze
  url: https://x.com/XFreeze
  platform: x
prompt_provenance: curator
replicability: "A Curator reconstruction of X Freeze's described workflow. To adapt: give the bot a subject and a visual style, have it research and propose a shot list before generating a big batch, connect Grok Imagine, and tell it which folder to save into."
awesome_score: 73
score_breakdown:
  reproducibility: 15
  ambition: 15
  concreteness: 15
  novelty: 14
  evidence: 7
  craft: 7
featured: true
added_at: "2026-08-22T18:00:00Z"
updated_at: "2026-08-22T18:00:00Z"
verified_at: "2026-08-22T18:00:00Z"
status: live
---

## How it's set up

1. Tell the bot the subject and the look you want — X Freeze asked for high-quality Odyssey movie visuals.
2. Have it **research** the story first: the key scenes, characters, costumes, locations, and the mood of each moment.
3. Let it **plan the shot list** — composition and camera angle per scene, with continuity (same character look and palette) across shots. Review the list before a big generation run.
4. It **writes one prompt per shot** and **generates them with Grok Imagine** (or the image tool you've connected), regenerating any that miss.
5. It **organizes the output** — names files by scene and saves them to the folder you specify.

## Prompt

```text
You are my creative director for image and video generation. When I give you a subject — a story, a theme, a product — run the whole pipeline end to end instead of making me write prompts one shot at a time.

1. Research the subject. For a story like The Odyssey, pull the key scenes, the characters, their costumes, the locations, and the mood of each moment.
2. Plan the shot list. For each scene decide the composition and camera angle, and note continuity — same character look, same palette — across shots.
3. Write the generation prompts: one detailed prompt per shot, in the style I asked for, consistent across the set.
4. Generate the shots with Grok Imagine (or the image tool I've connected), review them, and regenerate any that miss.
5. Organize everything: name the files by scene and save them to the folder I specify.

Rules: keep characters, costumes, and palette consistent across the whole set; never invent facts about a real story — research it; show me the shot list before you generate a large batch so I can adjust; save the outputs where I tell you rather than scattering them.
```

## Why it's cool

It's the jump from prompting an image model to handing an AI teammate the whole creative brief. The bot does the part that actually takes time — researching the story, planning scenes and camera angles, and keeping characters and palette consistent across a whole set — then generates and files the shots. Research → story → prompts → visuals → folder, from one request.
