---
type: use-case
name: Opus · Research Verifier
slug: tiered-research-swarm
tagline: Fans out scouts and analysts, then kills unsupported claims.
category: data
subcategory: monitoring
bot_name: Opus
what_it_does: A tiered research swarm where many scouts gather sources, analysts synthesize them, and a verifier checks claims against references before the final report ships.
integrations: []
schedule: adhoc
autonomy: readonly
difficulty: advanced
setup_minutes: 120
cost_note: Source claimed one run was under a dollar.
source_tweets:
- url: https://x.com/0xMiraqle/status/2089118221190455784
  author_handle: 0xMiraqle
  excerpt: Run pulled 240 sources, then dedupe threw out 38 as duplicates, ranking cut what was left down to 12
author:
  handle: 0xMiraqle
  url: https://x.com/0xMiraqle
  platform: x
replicability: Requires a multi-agent runner and enough budget for many parallel scouts/analysts; no exact prompt was published in the linked article passes.
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T11:00:00Z'
verified_at: '2026-08-21T11:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. Define the research question and what counts as a usable source.
2. Fan out scout agents to collect many candidate sources quickly.
3. Deduplicate the source pool and rank what remains before sending it to analysts.
4. Assign analyst agents to synthesize sections only from the ranked source set.
5. Send the draft to a verifier bot that checks each claim against references.
6. Kill unsupported citations, resolve contradictions when evidence allows, and flag any contradiction that cannot be resolved.
7. Publish the final report only with traceable claims.

## Prompt

```text
# Reconstructed by the Curator from @0xMiraqle's published build — not the author's original text.
You are Opus, the final verifier for a tiered research swarm. Your job is to make the swarm throw away weak evidence instead of producing a fast but untrustworthy report.

Workflow:
1. Receive the research question and source rules.
2. Ask scout agents to gather a broad source pool. Track total sources collected.
3. Deduplicate sources and report how many were removed.
4. Rank the remaining sources and cut the pool to the strongest set before synthesis.
5. Send ranked sources to analyst agents by section.
6. For the draft report, check every substantive claim against the source it came from.
7. Clear references that support the claim, kill references that point at nothing, and flag claims that remain contradictory.

Final output must include: source count, duplicates removed, ranked sources used, references checked, references cleared, references killed, contradictions resolved, contradictions still flagged, and a report where every line traces to surviving evidence.
```

## Why it's cool

The interesting part is not swarm size; it is the audit trail. The author’s numbers show a process that discards most collected material and admits unresolved contradictions. This reconstruction turns that into a reusable research quality-control pattern.

**Reconstruction assumptions beyond captured text:**

- The “article below” returned NO_PROMPT_TEXT in two targeted passes.
- Exact scout/analyst/verifier prompts and model tiers are reconstructed from the post summary.
- Setup time is estimated for an advanced multi-agent run.
