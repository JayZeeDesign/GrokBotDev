---
type: use-case
name: "Rolodex · Calendar to CRM"
slug: build-a-crm-from-your-calendar
headline: "Turn ten years of calendar meetings into a Notion CRM, automatically"
summary: "Gaurav Munjal pointed Grok Bot at ten years of his calendar and told it to build a Notion database of every person he ever met - each with their LinkedIn, what they're doing now, and tags. It ran 2.5 hours straight and logged ~1,000 people from the first three years alone. A back-office job no human ever gets to."
category: work
subcategory: meetings
categories: [work, personal]
format: use-case
bot_name: "Rolodex"
what_it_does: "Reads years of calendar history, extracts every person from every meeting, and builds a Notion database: name, how you met, their LinkedIn, current status, and tags. It works the backlog on its own - the author's run logged ~1,000 people from three years in 2.5 hours - and you review the enrichment."
integrations: [Notion]
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 20
source_tweets:
  - url: https://x.com/gauravmunjal/status/2093366092920144201
    author_handle: gauravmunjal
    excerpt: "Told Grok Bot to go through my Calendar for the last ten years, each meeting, and add each person I met to a database in Notion with their LinkedIn Profiles and what they are up to currently, with proper tags. 2.5 hours in, it's done three years and added about 1,000 entries."
    posted_at: "2026-08-28T15:52:24.000Z"
primary_source:
  kind: x-post
  url: https://x.com/gauravmunjal/status/2093366092920144201
author:
  handle: gauravmunjal
  url: https://x.com/gauravmunjal
  platform: x
prompt_provenance: curator
replicability: "Connect your calendar and Notion, then paste the prompt. It works chronologically through your history, so a decade takes hours - let it run. LinkedIn enrichment is best-effort: it flags matches it isn't sure about rather than guessing, and you review before trusting any 'current status' field."
awesome_score: 80
score_breakdown:
  reproducibility: 20
  ambition: 16
  concreteness: 18
  novelty: 15
  evidence: 5
  craft: 6
featured: false
added_at: "2026-08-28T18:00:00Z"
updated_at: "2026-08-28T18:00:00Z"
verified_at: "2026-08-28T18:00:00Z"
status: live
---

## How it's set up

Gaurav Munjal's post is the kind that makes the "AI agent" idea click: he told Grok Bot to read *ten years* of his calendar and turn it into a real contact database - and then walked away while it did the part no human ever gets around to. Two and a half hours later it had worked through three years and logged roughly a thousand people.

1. **Connect your calendar and Notion.** The bot needs read access to your calendar history and write access to a Notion database (it can create the schema for you).
2. **Paste the prompt.** It works backwards through your meetings, pulling out every real person (skipping blocks, holds, and yourself).
3. **For each person it builds a row:** name, how you met (which meeting, when), their LinkedIn, a short line on what they're doing now, and tags you define - industry, relationship, warmth, wherever you last left off.
4. **It runs on its own.** A decade of calendar is a long backlog; the bot chews through it in the background and checkpoints its progress so a pause doesn't lose work.
5. **You review the enrichment.** LinkedIn matching and "current status" are the parts most likely to be wrong, so the bot flags low-confidence matches instead of guessing, and you approve before it's trusted.

## Prompt

```text
You are Rolodex, my relationship archivist. Build me a CRM in Notion from my calendar history.

SETUP:
1. Create (or use) a Notion database called "People" with columns: Name, How we met, First met (date), Last met (date), LinkedIn, Current role / what they're up to, Tags, Confidence.
2. Read my calendar starting from the most recent and working backwards. For each event, extract the real people who attended - skip focus blocks, holds, reminders, and me.

FOR EACH PERSON:
3. Add or update their row. "How we met" = the earliest meeting I have with them and its title. Update first/last met dates as you find more events.
4. Find their LinkedIn and a one-line summary of what they're doing now. If you are not confident it's the right person, put your best guess in the field, set Confidence to "low", and flag it for me - never present a guess as fact.
5. Tag them: industry, how I know them (colleague / investor / customer / friend / etc.), and anything else useful.

RULES: work in batches and checkpoint your progress so nothing is lost if you stop. Never invent a person, a company, or a LinkedIn. This is my private network data - do not share, post, or send it anywhere. When you finish a batch, tell me how many people you added and how many need my review.
```

## Why it's cool

The value here isn't the database - it's that the database was never going to get built by a human. Everyone has a decade of relationships buried in their calendar and nobody has the afternoon to reconstruct it row by row. Handing that to an agent that works patiently in the background is exactly the shape of task these tools are best at: high-volume, low-judgment, tedious, and valuable only once it's complete. The design details are what keep it honest - working chronologically so "how we met" is accurate, checkpointing so a long run survives interruption, and treating LinkedIn enrichment as a flagged best-effort rather than confident truth. It's the back-office job of a chief of staff you never hired, and it doubles as a template: swap Notion for your CRM and "people I met" for "companies I researched" and the same skeleton rebuilds any relationship graph you've been meaning to.
