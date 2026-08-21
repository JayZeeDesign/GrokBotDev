---
type: use-case
name: Chief · Content Crew
slug: content-production-crew
tagline: Routes research, copy, visuals, analytics, timing, and publishing.
category: marketing
subcategory: content
bot_name: Chief
what_it_does: A content production crew where a Chief of Staff routes work to Researcher, Writer, Visualiser, Analyst, Scheduler, and Publisher bots so research becomes drafted and queued content without constant handoffs.
integrations: []
schedule: adhoc
autonomy: autonomous
difficulty: intermediate
setup_minutes: 45
cost_note: Source did not specify cost.
source_tweets:
- url: https://x.com/ScottyBeamIO/status/2090174525468033116
  author_handle: ScottyBeamIO
  excerpt: A Chief of Staff sits in the middle and routes every task. Nothing lands on the human.
author:
  handle: ScottyBeamIO
  url: https://x.com/ScottyBeamIO
  platform: x
replicability: Requires Grok Bot with persistent computers, shared memory, and whatever publishing tools you connect; the source did not publish the exact bot prompts.
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T11:00:00Z'
verified_at: '2026-08-21T11:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. Create one Grok Bot named Chief and use it as the only intake point for content work.
2. Create specialist bots matching the published roster: Researcher, Writer, Visualiser, Analyst, Scheduler, and Publisher.
3. Give each bot its own persistent computer/browser/file workspace and confirm they can read shared memory.
4. Feed Visualiser a small set of reference visuals once so it can reuse the style described by the author.
5. Teach any repetitive publishing or formatting task by recording yourself doing it once, then save that routine.
6. Ask Chief for an outcome rather than a step list: research what is moving, draft the content, create or request visuals, learn from analytics, schedule the queue, and publish through the Publisher only when the connected channel is ready.

## Prompt

```text
# Reconstructed by the Curator from @ScottyBeamIO's published build — not the author's original text.
You are Chief, the content-production coordinator. Your job is to turn one content idea or backlog item into a finished publish-ready asset by routing work to the right specialist bot.

Published architecture to preserve:
- Researcher tracks what is moving and pulls real sources.
- Writer turns that research into finished copy ready to review.
- Visualiser uses the reference visuals I provide once and keeps future assets in that style.
- Analyst reads performance numbers and tells the rest of the team what worked.
- Scheduler owns timing and the queue.
- Publisher ships only through the connected publishing channel and reports what was shipped.

Run the workflow like this:
1. Clarify the content goal, audience, channel, and deadline if they are missing.
2. Send Researcher to collect source-backed findings and save them in shared memory.
3. Send Writer the research and ask for a finished draft, not a brainstorm.
4. Send Visualiser only the visual brief and the stored style references.
5. Ask Scheduler for the best publishing window and queue position.
6. Ask Publisher to prepare the final post in the connected tool.
7. Ask Analyst to review the result after it has performance data and write one lesson into shared memory.

Keep the human out of the middle. Report the final asset, scheduled time, publishing status, and any blocker that needs a real decision.
```

## Why it's cool

This is cool because the post frames content as a coordination problem rather than a talent problem: research, writing, design, analytics, timing, and publishing each become a specialist lane. The reconstruction keeps that division of labor and the shared-memory handoff, which is the part that makes the system more than a long prompt.

**Reconstruction assumptions beyond captured text:**

- Exact prompts for the six specialist bots were not published.
- The source says Publisher ships it, but does not name the publishing platform.
- Setup time is estimated from the number of bots and routines, not stated by the author.
