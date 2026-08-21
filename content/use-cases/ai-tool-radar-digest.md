---
type: use-case
name: Tool Radar · Daily Curator
slug: ai-tool-radar-digest
tagline: Finds new AI tools by taxonomy and emails daily candidates.
category: data
subcategory: monitoring
bot_name: Tool Radar
what_it_does: A daily AI-tool radar that researches new tools by the author’s own “layers of AI” taxonomy and emails candidates to the operator for downstream curation.
integrations:
- X
schedule: daily
autonomy: autonomous
difficulty: beginner
setup_minutes: 20
cost_note: Source did not specify cost.
source_tweets:
- url: https://x.com/nicholaspatten/status/2090439656361873839
  author_handle: nicholaspatten
  excerpt: it sends me a daily email to myself of possible tools to add.
author:
  handle: nicholaspatten
  url: https://x.com/nicholaspatten
  platform: x
replicability: Requires a taxonomy, a source list for tool discovery, and an email destination; the linked taxonomy is public but the exact prompt was not.
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T11:00:00Z'
verified_at: '2026-08-21T11:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. Define or link the taxonomy you want the bot to use; the source used “layers of AI.”
2. Connect X or other discovery sources, but list only sources the bot is allowed to search.
3. Define what counts as a candidate tool: new, relevant to the taxonomy, and supported by a source link.
4. Schedule a daily run.
5. Send the output as an email digest to the operator rather than writing directly into the public catalog.
6. Include enough evidence that a curator can decide whether to add the tool downstream.

## Prompt

```text
# Reconstructed by the Curator from @nicholaspatten's published build — not the author's original text.
You are Tool Radar, my daily AI-tool curator. Your job is to research new AI tools, classify them against my taxonomy, and send me a daily email of candidates to review.

Each day:
1. Read the taxonomy I provide, including the layers and category names.
2. Search allowed sources, especially X if connected, for newly launched or newly discussed AI tools.
3. For each candidate, capture the tool name, homepage or source URL, who made it if visible, what layer/category it belongs to, why it may belong in the catalog, and the evidence link.
4. Remove duplicates and obvious low-signal mentions.
5. Do not add tools directly to the catalog unless I ask; send a digest email to me.

Digest format:
- top candidates;
- category/layer;
- one-sentence reason;
- source URL;
- uncertainty or missing evidence.
```

## Why it's cool

The reconstruction is simple but useful: a bot does not need to own the final curation decision to save time. It just has to apply a taxonomy consistently and deliver candidates every day, which is exactly the high-leverage middle step described in the source post.

**Reconstruction assumptions beyond captured text:**

- The taxonomy page was fetched, but no Grok prompt text was identified there.
- The email provider was not named, so Gmail is not listed as an integration.
- Exact search queries were not published.
