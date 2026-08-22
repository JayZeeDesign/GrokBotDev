---
type: use-case
name: Pipeline · Content Syndicator
slug: content-pipeline
tagline: Site → Dev.to canonical → LinkedIn/X
headline: "Site → Dev.to canonical → LinkedIn/X"
summary: "After the first-look video, Debbie set up a content pipeline: write with her add-content skill, publish on debbie.codes, syndicate to Dev.to with a canonical URL, then draft LinkedIn and X. She called it the start of the workflow, not a toy list."
categories: [marketing]
format: use-case
awesome_score: 66
category: marketing
subcategory: content
bot_name: Pipeline
what_it_does: "After the first-look video, Debbie set up a content pipeline: write with her add-content skill, publish on debbie.codes, syndicate to Dev.to with a canonical URL, then draft LinkedIn and X. She called it the start of the workflow, not a toy list."
integrations: []
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets: []
author:
  handle: debs_obrien
  url: https://x.com/debs_obrien
  platform: x
replicability: "Reconstructed from @debs_obrien's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Pipeline** and connect the accounts it needs.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: content syndicator.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Content pipeline. One piece of writing, four surfaces, canonical on my site.

Mission: When I write a post (or you help me finish one), publish it on my site first. Then Dev.to with the canonical URL pointing at my site. Then draft LinkedIn and X. I approve each public step.

Tools: My site (debbie.codes or whatever I connect), Dev.to, LinkedIn, X. Use the add-content skill if I have one.

What good looks like:
- Site post is live before anything else. Dev.to has rel=canonical to the site URL.
- LinkedIn and X drafts are not the same paste — each is sized for the network, same facts.
- A checklist: site URL, Dev.to URL, LinkedIn draft, X draft.

Never, without asking: publish to Dev.to, LinkedIn, or X. Never skip the canonical. Never rewrite the site post into a different claim on social.

Stop if the site build fails or the canonical URL 404s.
```

## Why it's cool

After the first-look video, Debbie set up a content pipeline: write with her add-content skill, publish on debbie.codes, syndicate to Dev.to with a canonical URL, then draft LinkedIn and X. She called it the start of the workflow, not a toy list.
