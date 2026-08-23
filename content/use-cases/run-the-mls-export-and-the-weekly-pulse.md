---
type: use-case
name: "MLS Runner · Weekly Pulse"
slug: run-the-mls-export-and-the-weekly-pulse
headline: "Six hours a week back from the MLS export and the Pulse"
summary: "Ryan Loechner is a Realtor in CT who runs ctreal.estate. He logged Grok Bot into the backend once and it signed into SmartMLS, ran the eight-county export, combined and uploaded the files, drafted the Weekly Pulse, cleared rejects and published the stories."
categories: [work, data]
format: use-case
tagline: "One backend login, and the weekly real-estate pipeline runs itself."
category: work
subcategory: tasks
bot_name: "MLS Runner"
what_it_does: "Grok Bot runs a working Realtor's weekly publishing pipeline: sign into SmartMLS, run the eight-county export, combine the files, upload them, draft the Weekly Pulse, clear the rejects and publish the new stories. Ryan got about six hours a week back."
integrations: []
schedule: weekly
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 90
source_tweets:
  - url: https://x.com/RyanLoechner/status/2091351401922175085
    author_handle: RyanLoechner
    excerpt: "I logged it into the backend once and it handled the work: signed into SmartMLS, ran the eight-county export, combined the files, uploaded everything, drafted the Weekly Pulse for the week ending Aug 21, cleared rejects, and published new stories."
    posted_at: "2026-08-23T02:26:44Z"
author:
  handle: RyanLoechner
  url: https://x.com/RyanLoechner
  platform: x
prompt_provenance: curator
replicability: "Ryan described the run rather than posting a prompt, so the starter below is a curator distillation. To adapt: swap SmartMLS for your own data source, keep the per-county row counts so a short export cannot pass silently, and keep publishing behind your approval."
awesome_score: 81
score_breakdown:
  reproducibility: 17
  ambition: 17
  concreteness: 18
  novelty: 12
  evidence: 8
  craft: 9
featured: true
added_at: "2026-08-23T07:30:00Z"
updated_at: "2026-08-23T07:30:00Z"
verified_at: "2026-08-23T07:30:00Z"
status: live
---

## How it's set up

1. **Log Grok Bot into the backend once.** Ryan did the sign-in a single time and the bot handled the work from there - that is the whole setup cost.
2. **Have it sign into the MLS.** In Ryan's case SmartMLS, the Connecticut multiple listing service that his site pulls from.
3. **Run the export county by county.** Eight counties, one export run, so the week's listing data comes out complete rather than in whatever slice someone remembered to pull.
4. **Combine the files into one dataset.** This is the tedious middle step that eats an afternoon and that nobody wants to own.
5. **Upload everything to the site backend** so the data behind the listings pages is current.
6. **Draft the Weekly Pulse** off the fresh numbers. Ryan's run produced the edition for the week ending Aug 21.
7. **Clear the rejects.** The rows that failed on the way in get worked rather than quietly dropped, which is what keeps the published numbers honest.
8. **Publish the new stories,** with Ryan reviewing before anything goes live on a site that carries his name and his licence.

## Prompt

```text
You run the weekly data and content pipeline for my real-estate site. I have logged you into the MLS and into the site backend already. Run this every <day>, in this order, and do not skip a step.

1. EXPORT. Sign into <MLS> and run the standard export for each of these counties: <list>. Do them one at a time. Report the row count for every county.
2. SANITY CHECK. Compare each county's row count to last week's. If any county is more than <X>% off, STOP and show me before continuing - a short export is a broken export, not a quiet week.
3. COMBINE. Merge the county files into one dataset. De-duplicate on <listing id>. Report rows in, duplicates removed, rows out.
4. UPLOAD to the site backend. Report accepted and rejected counts.
5. REJECTS. Work the rejected rows: say why each one failed, fix what is fixable, and list what is not. Never drop a reject silently.
6. DRAFT the Weekly Pulse for the week ending <date>: what moved, what did not, and the numbers behind each claim. Every figure must trace back to a row in this week's export - no estimates, no rounding that flatters.
7. DRAFT the new local stories for the week.

Show me the Pulse and the stories, with the underlying numbers, and get my approval before you publish anything. My licence is on this site.
```

## Why it's cool

This is not a demo, it is a week of somebody's actual job. Ryan is a working Realtor with a live site, and the thing he handed over is the least glamorous and most reliably time-consuming part of it: sign in, export eight counties, merge the files, push them up, chase the rows that bounced, then write the weekly piece on top of the result. The setup cost was one backend login. What he gets back is about six hours a week, which he is clear about spending on real-estate work rather than data admin. Two details make it credible rather than aspirational. The rejects get cleared rather than dropped, which is the difference between a pipeline and a pile. And the numbers in the Pulse come out of the export that just ran, so the article and the data cannot drift apart. His own summary is the one worth quoting: first time an AI agent has actually done the work for me.
