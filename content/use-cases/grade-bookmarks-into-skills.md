---
type: use-case
name: "Bookmark Grader · Skill Library"
slug: grade-bookmarks-into-skills
headline: "Grade a month of bookmarks into spoken skills"
summary: "Ryan Staley pasted one prompt to make a Grok Bot grade 140 bookmarks from the last 30 days — a one-line thesis, the link, a high/medium/noise grade, and the mechanism to steal — discarding anything he couldn't name in a sentence. He kept a third and turned the keepers into 10 skills with a spoken trigger."
categories: [personal]
format: use-case
tagline: "Turn a pile of bookmarks into graded, stealable mechanisms — then into spoken skills."
category: personal
subcategory: learning
bot_name: "Bookmark Grader"
what_it_does: "A Grok Bot grades your recent bookmarks with one prompt: for each, a one-line thesis, the link, a high/medium/noise grade, and the mechanism you can steal — discarding anything you can't name in a sentence. Ryan graded 140, kept a third, made 10 spoken skills."
integrations: []
schedule: none
autonomy: readonly
difficulty: beginner
setup_minutes: 10
source_tweets:
  - url: https://x.com/Ryan_Staley1/status/2091135093112774904
    author_handle: Ryan_Staley1
    excerpt: "Pull my last 30 days of bookmarks. For each one: one-line thesis, link, grade (high / medium / noise), and the mechanism I can steal ... If I cannot name the mechanism in one sentence, it is noise."
    posted_at: "2026-08-22T18:00:00Z"
author:
  handle: Ryan_Staley1
  url: https://x.com/Ryan_Staley1
  platform: x
prompt_provenance: author
replicability: "Ryan shared his exact prompt (below). To adapt: point it at your own bookmarks or a saved-links export, keep the 'name the mechanism in one sentence or it's noise' filter, and — his move — turn the keepers into named skills you can trigger by voice."
awesome_score: 76
score_breakdown:
  reproducibility: 20
  ambition: 13
  concreteness: 17
  novelty: 13
  evidence: 5
  craft: 8
featured: true
added_at: "2026-08-22T18:00:00Z"
updated_at: "2026-08-22T18:00:00Z"
verified_at: "2026-08-22T18:00:00Z"
status: live
---

## How it's set up

1. Give the bot access to your bookmarks (or paste/export your last 30 days of saved links).
2. Run Ryan's prompt below: for each bookmark it returns a one-line thesis, the link, a grade (high / medium / noise), and the **mechanism you can steal** — explicitly no tool lists.
3. The filter is the point: **if you can't name the mechanism in one sentence, it's noise** — so most of the pile gets graded out. Ryan kept about a third of 140.
4. Take the keepers and turn each into a named **skill with a trigger you can say out loud**, so the useful mechanism is one voice command away. Ryan ended with 10.
5. Re-run it monthly so your library stays a library, not a pile.

## Prompt

```text
Pull my last 30 days of bookmarks. For each one: one-line thesis, link, grade (high / medium / noise), and the mechanism I can steal. Do not list tools. If I cannot name the mechanism in one sentence, it is noise.
```

## Why it's cool

It turns doom-saving into a system. The clever constraint is 'name the mechanism in one sentence or it's noise' — it forces every keeper to be an actionable move, not a vibe, and grades out the two-thirds you were never going to use. Converting the survivors into spoken-trigger skills is what makes the knowledge actually reachable later instead of re-buried in a bookmark folder.
