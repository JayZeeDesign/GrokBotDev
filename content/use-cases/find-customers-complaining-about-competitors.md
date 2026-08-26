---
type: use-case
name: "Scout · Buying-Signal Hunter"
slug: find-customers-complaining-about-competitors
headline: "Find customers on X who already said they want to switch"
summary: "Amplemarket founder Luis Batalha's playbook: have your Grok Bot search X for people complaining about your competitors or asking for alternatives, enrich the poster and company via the Amplemarket connector, reach out - then make it a weekly routine. You don't guess who has the problem; they publicly told you."
category: sales
subcategory: prospecting
categories: [sales]
format: use-case
bot_name: "Scout"
what_it_does: "A weekly buying-signal routine: the bot searches X for posts complaining about your competitors or asking for alternatives, enriches each poster and company via Amplemarket, and preps outreach to the poster and the people agreeing in the comments - leads who stated the problem in public."
integrations: [X]
schedule: weekly
autonomy: acts-with-approval
difficulty: beginner
setup_minutes: 15
source_tweets:
  - url: https://x.com/luismbat/status/2092250997221433848
    author_handle: luismbat
    excerpt: "Simple way to find customers using Grok Bot: search for people on X complaining about competitors or looking for alternatives, use the Amplemarket connector to learn more, then reach out. You don't need to guess whether someone has the problem - they publicly told you they do."
    posted_at: "2026-08-25T14:01:24.000Z"
primary_source:
  kind: x-post
  url: https://x.com/luismbat/status/2092250997221433848
author:
  handle: luismbat
  url: https://x.com/luismbat
  platform: x
replicability: "Luis's 3-step playbook, reconstructed as a paste-in routine. You need X access and the Amplemarket connector (see the plugin page) - swap in your competitors and product. Keep outreach drafts-only: the bot prepares, you approve and send."
prompt_provenance: curator
awesome_score: 82
score_breakdown:
  reproducibility: 20
  ambition: 16
  concreteness: 17
  novelty: 13
  evidence: 8
  craft: 8
featured: false
added_at: "2026-08-26T09:35:00Z"
updated_at: "2026-08-26T09:35:00Z"
verified_at: "2026-08-26T09:35:00Z"
status: live
---

## How it's set up

Most prospecting starts with a guess: build a list of people who *might* have the problem, then hope. Luis Batalha (who founded [Amplemarket](/plugins/amplemarket/)) flips it - start from people who **already said it in public**:

1. **Search the signal.** Have your Grok Bot search X for people complaining about your competitors or asking for alternatives - "looking for an alternative to [competitor]", "[competitor] is so frustrating", "anyone know something like [competitor] but...".
2. **Enrich before you reach out.** Use the [Amplemarket connector](/plugins/amplemarket/) to learn who the poster is and what company they're at - and don't stop at the poster: the people *agreeing in the comments* have the same problem.
3. **Make it a routine.** Schedule it weekly so the buying signals come to you on their own.

The interesting part, in his words: you don't need to guess whether someone has the problem you're solving. They just publicly told you they do.

## Prompt

```text
You are my buying-signal Scout. My product: [WHAT YOU SELL, one line]. My competitors: [COMPETITOR 1, COMPETITOR 2, ...].

Every week, run this loop:

1. Search X for fresh posts (last 7 days) where someone is complaining about one of my competitors or asking for an alternative - queries like "looking for an alternative to [competitor]", "[competitor] pricing", "[competitor] is frustrating", "anyone know something like [competitor]". Skip obvious spam, bots, and competitor employees.

2. For each real post, collect the poster AND the people in the comments who agree or say they have the same problem - they are all leads.

3. Enrich each lead with the Amplemarket connector: who they are, their role, their company, and whether the company fits my market. If Amplemarket has no data on someone, say so - never invent a name, title, or company.

4. Bring me a ranked shortlist: the post (with link), why it's a real buying signal, who the lead is, the enrichment summary, and a short draft reply or DM that speaks to the specific complaint they made - referencing their words, not a generic pitch.

Rules: outreach is drafts-only - never post, reply, or DM anyone until I approve each message. Track who we've already contacted so nobody gets touched twice. If a week turns up nothing real, tell me in one line - do not pad the list.
```

## Why it's cool

Every sales team says they want "intent data," then pays for a black box that scores strangers. This is intent data in its rawest form: a human, in public, telling the internet they're unhappy with the tool you compete against. The bot just industrializes the listening - searches the complaint patterns weekly, widens the net to the commenters agreeing underneath (the lurking majority of any complaint thread), and enriches everyone so you know which frustrated poster is actually a buyer at a company that fits. And because the outreach draft references the exact words of their complaint, it lands as a helpful reply instead of a cold pitch. For founders and small sales teams it's about the lowest-hanging fruit there is - the leads are lying on the timeline; someone just has to pick them up on schedule.
