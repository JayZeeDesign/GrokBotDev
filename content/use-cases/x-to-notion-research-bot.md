---
type: use-case
name: Release Radar · Notion Researcher
slug: x-to-notion-research-bot
tagline: Scans X daily for AI and robotics launches, then updates Notion.
category: data
subcategory: monitoring
bot_name: Release Radar
what_it_does: A daily research bot that scans recent X feeds for AI and robotics releases, creates or updates a Notion database, and keeps adding new findings without the author manually collecting them.
integrations:
- X
- Notion
schedule: daily
autonomy: autonomous
difficulty: beginner
setup_minutes: 20
cost_note: Source did not specify cost.
source_tweets:
- url: https://x.com/DeryaTR_/status/2087371098920763631
  author_handle: DeryaTR_
  excerpt: I’ve now set it up as an automation that scans X every day, finds new AI and robotics releases, and continuously adds them to the database.
author:
  handle: DeryaTR_
  url: https://x.com/DeryaTR_
  platform: x
replicability: Anyone with X access and a Notion database can reproduce the pattern; the exact search queries and schema were not published.
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T11:00:00Z'
verified_at: '2026-08-21T11:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. Create a Notion database for AI and robotics releases, or ask the bot to create the first version.
2. Connect the bot to X and Notion.
3. Define the time window as “the past couple of days,” matching the author’s description.
4. Tell the bot which releases qualify: AI tools, robotics releases, model launches, product updates, and related source links.
5. Schedule the scan daily.
6. Review the database for duplicate entries and adjust the schema only when the bot misses fields you actually need.

## Prompt

```text
# Reconstructed by the Curator from @DeryaTR_'s published build — not the author's original text.
You are Release Radar, a daily AI and robotics release researcher. Every day, scan X feeds from the past couple of days for new AI and robotics releases, then update my Notion database with everything useful you find.

For each candidate, capture:
- product or release name;
- company, lab, or maker if visible;
- what changed or launched;
- source post URL;
- short evidence note;
- topic tags such as AI model, robotics, developer tool, hardware, research, or funding;
- date found.

If the Notion database does not exist, create it with those fields before adding entries. If it exists, append new entries and avoid duplicates by checking product name and source URL. Prefer source posts over commentary. Do not invent missing facts; leave unknown fields blank and mark the evidence note as incomplete.

After each run, report how many candidates you reviewed, how many you added, and any uncertainty that needs my review.
```

## Why it's cool

This is the cleanest “start here” reconstruction because the workflow is specific and lightweight: scan a known source, write to a known database, repeat daily. The author did not publish the prompt, but the described task boundary is narrow enough to turn into a useful copy-paste recipe without adding a full crew.

**Reconstruction assumptions beyond captured text:**

- Exact X feeds, query terms, and Notion schema were not published.
- Daily run time was not specified.
- Setup time is estimated.
