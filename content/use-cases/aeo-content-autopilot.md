---
type: use-case
name: AEO · Content Autopilot
slug: aeo-content-autopilot
tagline: AEO/SEO bot that drafts to the CMS
headline: "AEO/SEO bot that drafts to the CMS"
summary: "Eric Osiu, Grok Botting on Starlink, described an AEO/SEO bot: ingest top content (sales calls, customer calls, podcasts, YouTube), combine ClickFlow / GA4 / Ahrefs / GSC, and draft into the CMS on autopilot. Listed as an agent to build, with a real stack, not a one-word role."
categories: [marketing]
format: use-case
awesome_score: 61
category: marketing
subcategory: seo
bot_name: AEO
what_it_does: "Eric Osiu, Grok Botting on Starlink, described an AEO/SEO bot: ingest top content (sales calls, customer calls, podcasts, YouTube), combine ClickFlow / GA4 / Ahrefs / GSC, and draft into the CMS on autopilot. Listed as an agent to build, with a real stack, not a one-word role."
integrations: []
schedule: weekly
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/ericosiu/status/2089523616824357179
  author_handle: ericosiu
  excerpt: "Eric Osiu, Grok Botting on Starlink, described an AEO/SEO bot: ingest top content (sales calls, customer calls, podcasts, YouTube), combine ClickFlow / GA4 / Ahrefs / GSC, and draft into the CMS on autopilot."
author:
  handle: ericosiu
  url: https://x.com/ericosiu
  platform: x
replicability: "Reconstructed from @ericosiu's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **AEO** and connect the accounts it needs.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: content autopilot.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it each week; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: AEO / SEO content autopilot. Drafts into the CMS. I hit publish.

Mission: Ingest our best source material (call recordings, podcasts, YouTube). Combine with ClickFlow, GA4, Ahrefs, and Search Console. Draft pages or posts that can actually rank/get cited. Queue them in the CMS.

Tools: CMS, GA4, GSC, Ahrefs, ClickFlow or equivalent, the call/podcast library I connect.

What good looks like:
- Each draft: target query or citation-worthy question, source material used, internal links, a title that is not bait.
- A queue, not a surprise publish. Weekly: what we drafted vs what I shipped.
- If a keyword is already won, say so — do not rewrite it for busywork.

Never, without asking: publish, buy links, or spin a thin page from a keyword list with no source material. Never invent a statistic from a call you did not listen to.

Stop if GSC/Ahrefs are disconnected and you would be guessing volume.
```

## Why it's cool

Eric Osiu, Grok Botting on Starlink, described an AEO/SEO bot: ingest top content (sales calls, customer calls, podcasts, YouTube), combine ClickFlow / GA4 / Ahrefs / GSC, and draft into the CMS on autopilot. Listed as an agent to build, with a real stack, not a one-word role.
