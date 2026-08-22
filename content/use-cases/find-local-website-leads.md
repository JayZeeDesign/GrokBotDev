---
type: use-case
name: "Lead Finder · Web Design"
slug: find-local-website-leads
headline: "Fifty local businesses that need a new website"
summary: "Ben Nash had spent months getting small, mediocre results asking ChatGPT and Gemini to find local businesses that could use a new website. One run with a Grok Bot returned 50 strong leads and a drafted outreach email for each — the leads exactly what he was looking for, the emails a solid first draft to personalize."
categories: [sales]
format: use-case
tagline: "Point a bot at your area for local businesses with weak sites, plus a drafted email each."
category: sales
subcategory: prospecting
bot_name: "Lead Finder"
what_it_does: "A Grok Bot searches for local businesses whose current website is weak or missing, qualifies them against what you offer, and returns a batch of strong leads (Ben got 50) each with a drafted outreach email — the leads ready to work and the emails ready for your personal touch."
integrations: []
schedule: none
autonomy: readonly
difficulty: beginner
setup_minutes: 15
source_tweets:
  - url: https://x.com/bennash/status/2091136666542997852
    author_handle: bennash
    excerpt: "Last night I did the same with Grok ... it found 50 very strong leads and drafted emails to each. Those emails need my touch in rewriting but the leads are exactly what I'm looking for."
    posted_at: "2026-08-22T16:00:00Z"
author:
  handle: bennash
  url: https://x.com/bennash
  platform: x
prompt_provenance: curator
replicability: "A Curator reconstruction of Ben's run. To adapt: tell the bot your service, target area, and what 'needs a new website' means (none, outdated, not mobile-friendly). Treat the drafted emails as first drafts — his leads were strong but the copy needed his rewrite."
awesome_score: 58
score_breakdown:
  reproducibility: 14
  ambition: 10
  concreteness: 12
  novelty: 11
  evidence: 4
  craft: 7
featured: false
added_at: "2026-08-22T16:00:00Z"
updated_at: "2026-08-22T16:00:00Z"
verified_at: "2026-08-22T16:00:00Z"
status: live
---

## How it's set up

1. Tell the bot what you sell (web design/redevelopment) and your target: area, business types, and what 'needs a new website' means — no site, an outdated one, not mobile-friendly, slow, broken.
2. Have it search for local businesses matching that and qualify each against your criteria — Ben's run returned 50 strong leads.
3. For each lead, have it capture the useful details (name, what's wrong with the current site, contact) and draft a short outreach email.
4. Treat the emails as first drafts — Ben's point is the leads were exactly right but the copy needed his personal rewrite before sending.
5. Review, personalize, and send the ones worth pursuing yourself.

## Prompt

```text
Find me local businesses that need a new or better website, and draft outreach for each. I offer web design.

1. Search my target area and business types (I'll give them to you) for businesses whose web presence is weak: no website, an outdated or not-mobile-friendly one, slow, or broken.
2. Qualify each against that — only include real, checkable cases, and note specifically what's wrong with their current site (with the URL you looked at).
3. For each qualified lead, capture: business name, the problem with their current site, and a contact path.
4. Draft a short, specific outreach email for each — reference the actual problem you found, not a generic pitch.

Rules: never invent a business, a URL, or a problem you didn't verify — a lead I can't check is worse than no lead. Give me the leads as a list I can scan, with the drafted email under each. I'll personalize and send them myself.
```

## Why it's cool

It's the prospecting task every freelancer and agency does by hand, done in one pass — and the honest tell is that it beat months of tuned ChatGPT and Gemini prompts on the same job. The value isn't auto-sending; it's that the qualification (which local sites are actually weak) plus a specific first-draft email per lead collapses the slowest part of new-business work into a review-and-send.
