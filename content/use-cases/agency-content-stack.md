---
type: use-case
name: Trend Stack · Agency Monitor
slug: agency-content-stack
tagline: Runs trend, GIF, QA, page, and swipefile bots for an agency.
category: marketing
subcategory: content
bot_name: Trend Stack
what_it_does: A five-bot agency stack with trend spotting, GIF-folder publishing, QA monitoring, hourly company-page management, and daily ad swipefile scraping.
integrations:
- Slack
schedule: hourly
autonomy: autonomous
difficulty: intermediate
setup_minutes: 60
cost_note: Source did not specify cost.
source_tweets:
- url: https://x.com/itsmarcosruiz/status/2089318823769800836
  author_handle: itsmarcosruiz
  excerpt: Trend Spotter - Monitors all topics on X in a given niche (A.I., Finance, Politics, etc.) and sends a Slack message the start and end of day with posts to react to
author:
  handle: itsmarcosruiz
  url: https://x.com/itsmarcosruiz
  platform: x
replicability: Requires agency tool access, Slack, work-folder monitoring, site/software access, and clear auto-fix boundaries; exact prompts were not published.
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T11:00:00Z'
verified_at: '2026-08-21T11:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. Create the five bots named in the source post.
2. Connect Slack for Trend Spotter digests at the start and end of day.
3. Give GIF Manager read access to the designer work folder and publishing access to the company GIPHY channel or equivalent.
4. Give QA Engineer access to internal software and websites, with explicit rules for what it may auto-fix.
5. Schedule Company Page Manager hourly for relevant news and trends.
6. Schedule Swipefile Builder daily to scrape or collect cool ads into the agency swipefile.
7. Keep a visible log of what changed, what was posted, and what needs approval.

## Prompt

```text
# Reconstructed by the Curator from @itsmarcosruiz's published build — not the author's original text.
You are Trend Stack, the coordinator for a five-bot content and monitoring setup at a marketing agency.

Run these bots:
- Trend Spotter: monitor topics on X in the selected niche and send Slack messages at the start and end of day with posts worth reacting to.
- GIF Manager: watch the graphic designer’s work folder and upload new GIFs to the company GIF channel when allowed.
- QA Engineer: monitor internal software and websites and prepare fixes or auto-fix only within approved boundaries.
- Company Page Manager: research relevant news and trends every hour for the company page.
- Swipefile Builder: scrape or collect cool ads daily and update the swipefile.

For each bot, report what it found, what it changed or queued, and what needs human review. Do not publish client-sensitive assets, spend money, or make risky code changes unless that action is explicitly approved in the bot’s charter.
```

## Why it's cool

This is a strong agency example because it mixes content and operations instead of stopping at post generation. The same stack watches trends, moves creative assets, monitors QA, keeps pages fresh, and maintains a swipefile — the kind of recurring work agencies actually forget to do consistently.

**Reconstruction assumptions beyond captured text:**

- GIPHY and folder tools are not canonical integrations here, so only Slack is listed.
- Exact auto-fix limits for QA were not published.
- Setup time is estimated from five bots.
