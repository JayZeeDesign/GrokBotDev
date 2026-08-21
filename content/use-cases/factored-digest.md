---
type: use-case
name: "Factored Digest · News Analyst"
slug: factored-digest
tagline: A news digest that separates what sources said from what the Bot concluded.
category: work
subcategory: research
bot_name: Factored Digest
what_it_does: >-
  Runs a scheduled news sweep across a fixed set of genres and renders every item twice:
  a CRAWL pass of what the sources actually said, each claim carrying its source and a
  confidence tag, then a SYNTHESIS pass of the Bot's own read, trace-tagged back to it.
integrations: []
schedule: daily
autonomy: readonly
difficulty: beginner
setup_minutes: 10
source_tweets:
  - url: "https://x.com/PlanetaryS936/status/2088828842542596115"
    author_handle: PlanetaryS936
    excerpt: "Grok scheduled task (Factored Digest template): I'll run a live sweep across those genres now. Pulling fresh signals first."
  - url: "https://x.com/PlanetaryS936/status/2088830417516236927"
    author_handle: PlanetaryS936
    excerpt: "Factored digest schedule template: Run a news sweep across these genres physics/consciousness, philosophy/ethics, economy (including cost-of-living) geopolitics, science, health, culture creative."
author:
  handle: PlanetaryS936
  url: "https://x.com/PlanetaryS936"
  platform: x
replicability: >-
  Paste the template into a scheduled task and pick your genres. No tools to connect and
  nothing to install — the whole thing is one prompt, so the only real work is deciding
  what you want swept and how often.
prompt_provenance: author
featured: false
added_at: "2026-08-21T00:45:00Z"
updated_at: "2026-08-21T00:45:00Z"
verified_at: "2026-08-21T00:45:00Z"
status: live
---

## How it's set up

Create a scheduled task in Grok and give it the template below as its instructions. Set the genre list to whatever you actually want swept — the author's list runs physics and consciousness, philosophy and ethics, economy, geopolitics, science, health and culture — and the template does the rest.

The structure is the point. Every item gets rendered in two separate passes. **CRAWL** is what the sources said: one bullet per claim, each ending with its outlet or paper and a confidence tag — `[VERIFIED]` for multiple independent or primary sources, `[PLAUSIBLE]` for reputable but uncorroborated, `[SINGLE-SOURCE]` for one outlet or one X post, and `[X]` on anything sourced from X so it never sits unmarked next to wire-service reporting. Forecasts have to name who is projecting and give a competing estimate, so a lone number never passes as fact.

**SYNTHESIS** is the Bot's own read, and every substantive claim carries a trace tag: →S1 or →S2 when it rests on a specific crawl bullet, →INF when it is the Bot's inference beyond the sources, →PRIOR when it is background knowledge rather than this sweep. All three are legitimate; the tag just shows which is which. The template also tells the Bot not to narrate a multi-pass reasoning process it did not actually run.

The template is quoted below exactly as the author posted it, typos included — he wrote it by hand and says so in the thread.

## Prompt

```text
Factored digest schedule template: 
  
  Run a news sweep across these genres physics/consciousness, philosophy/ethics, economy (including cost-of-living) geopolitics, science, health, culture creative. Skip any genre with nothing rea rather than filling space
  Crawl live for each item. Then render every item in two separate passes:
  CRAWL - what the sources actuallv said One bullet per claim, each endina with its source (outlet/paper/link) and a confidence tag: [VERIFIED] for multiple
  independent or primary sources PLAUSIBLE] for reputable but
  uncorroborated, [SINGLE-SOURCE1 for one outlet or one X post. Tag X-sourcec claims with [X] so thev don't sit unmarked next to wire-service reporting. For any forecast or proiection, name who's projecting it and give one competing estimate or the scenario assumption - never a lone number.
  SYNTHESIS - vour read. This is vour pass: connect, take an angle, say the thina only you'd surface. End each substantive claim with a trace tag: ->$1, ->$2 if it rests on a specific crawl bullet; ->INF if it's your own inference bevond the sources; >PRIOR if it's backqround knowledqe rather than this crawl. All three are legitimate - the tac just shows which is which.
  Keep the crawl pass clean and the flair in the synthesis pass, so the seam between what was sourced and what you concluded stays visible
  If you run multiple reasoning passes, show them only if they actually ran separately - don't narrate a multi-agent process thar was really one pass.
  Close with up to three lines: the strongest item and why, trace-tagged like the rest. If it was a slow day, say so
```

## Why it's cool

Most digest prompts produce a confident wall of text where sourced fact and model inference are indistinguishable. This one makes the seam visible on purpose: the crawl pass stays clean, the flair lives in the synthesis pass, and a trace tag on every claim tells you which bucket it came from. You can disagree with the conclusion without having to re-derive where it came from.

The confidence tags do the same job one level down. `[SINGLE-SOURCE]` next to a claim is not a hedge, it is a fact about the evidence — and tagging X-sourced items separately is a small, honest touch that most people building news bots skip entirely.
