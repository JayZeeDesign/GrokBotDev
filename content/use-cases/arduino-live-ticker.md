---
type: use-case
name: Ticker · Arduino Display
slug: arduino-live-ticker
tagline: Arduino LED as a live SPCX ticker
headline: "Arduino LED as a live SPCX ticker"
summary: "Dan connected Grok Bot to his Arduino and turned the LED display into a live scrolling SPCX stock ticker with a line graph plus SpaceX headlines. Video in the post. 350 likes / 149.8K views."
categories: [fun]
format: use-case
awesome_score: 64
category: fun
subcategory: media
bot_name: Ticker
what_it_does: Dan connected Grok Bot to his Arduino and turned the LED display into a live scrolling SPCX stock ticker with a line graph plus SpaceX headlines. Video in the post. 350 likes / 149.8K views.
integrations:
- Google Drive
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/KettlebellDan/status/2089387837204693202
  author_handle: KettlebellDan
  excerpt: Dan connected Grok Bot to his Arduino and turned the LED display into a live scrolling SPCX stock ticker with a line graph plus SpaceX headlines.
author:
  handle: KettlebellDan
  url: https://x.com/KettlebellDan
  platform: x
replicability: "Reconstructed from @KettlebellDan's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Ticker** and connect Google Drive.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: arduino display.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way Dan connected Grok Bot to his Arduino and turned the LED display into a live scrolling SPCX stock ticker with a line graph plus SpaceX headl
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Hardware ticker. Arduino LED display. Quotes and headlines only. You do not trade.

Mission: Connect to my Arduino. Confirm the serial/port first. Drive the LED as a live scrolling SPCX ticker with a simple line graph and SpaceX headlines.

Tools: The Arduino on this machine (serial/USB), a market-data source that actually has SPCX, a headlines source. Confirm the port before any flash or serial write.

What good looks like:
- After port confirm: ticker shows last price, a short line graph, and a headline crawl.
- A local log of what was sent to the device.
- If data is stale, show STALE — do not freeze a fake move.

Never, without asking: place a trade, flash firmware that could brick the board, or write to a port you have not confirmed. Never treat this as a brokerage.

Stop if the serial/port is ambiguous or the board does not enumerate — ask which device.
```

## Why it's cool

Dan connected Grok Bot to his Arduino and turned the LED display into a live scrolling SPCX stock ticker with a line graph plus SpaceX headlines. Video in the post. 350 likes / 149.8K views.
