---
type: use-case
name: "Inbox Closer · Sponsorships"
slug: close-inbound-sponsorships
headline: "It closed a $10k sponsorship from my inbox in 4 hours"
summary: "Alex Finn gave a Grok Bot access to his business inbox and told it to answer and negotiate with legit companies. Within four hours it researched market rates and closed its first sponsorship deal on its own — turning the inbox he hates reading into revenue."
categories: [sales]
format: use-case
tagline: "Let the bot read, price, and negotiate inbound sponsorships from your business inbox."
category: sales
subcategory: outreach
bot_name: "Inbox Closer"
what_it_does: "A Grok Bot with access to the business inbox reads inbound sponsorship and partnership requests, researches appropriate market rates, and negotiates a final price with legitimate companies — surfacing closed or near-closed deals instead of a wall of unread email."
integrations: []
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 15
source_tweets:
  - url: https://x.com/AlexFinn/status/2090939211159650633
    author_handle: AlexFinn
    excerpt: "Yesterday I gave Grok Bot access to my business email ... Within 4 hours Grok closed its first deal. A deal it 100% negotiated on its own."
    posted_at: "2026-08-22T16:00:00Z"
author:
  handle: AlexFinn
  url: https://x.com/AlexFinn
  platform: x
prompt_provenance: curator
replicability: "A Curator reconstruction of Alex Finn's described setup. To adapt: connect the bot to the inbox where sponsorship/partnership requests land, give it your rate card or rate range, and — safer than his fully-autonomous version — keep the final send behind your approval until you trust its judgment."
awesome_score: 73
score_breakdown:
  reproducibility: 16
  ambition: 18
  concreteness: 13
  novelty: 12
  evidence: 6
  craft: 8
featured: false
added_at: "2026-08-22T16:00:00Z"
updated_at: "2026-08-22T16:00:00Z"
verified_at: "2026-08-22T16:00:00Z"
status: live
---

## How it's set up

1. Connect the bot to the business inbox where sponsorship and partnership requests arrive (not your personal Gmail).
2. Give it the context it needs to price a deal: your rate card or an acceptable range, what you will and won't do, and what a 'legit company' looks like to you.
3. Tell it the job: triage inbound, ignore spam, and for legitimate companies research appropriate market rates and negotiate toward a final price.
4. Recommended guardrail: have it draft the reply and the proposed rate for your approval before it sends — Alex ran it fully autonomous, but a review gate keeps a bad number from going out while you build trust.
5. Review the deals it surfaces; approve, adjust, or take over the ones that matter.

## Prompt

```text
You handle inbound business email for me. I get sponsorship and partnership requests here and I do not enjoy reading them. Your job is to triage them and move real ones toward a closed deal.

For each new inbound message:
1. Decide if it is a legitimate company with a real ask (ignore spam, mass blasts, and anything vague).
2. For legit ones, research appropriate market rates for what they're asking (my audience/size, comparable deals).
3. Draft a reply that moves toward a deal: acknowledge, state or ask for scope, and propose a rate in my acceptable range.
4. Negotiate professionally toward a final price — one clear counter, not endless back-and-forth.

Rules: use my rate card / range as the floor and ceiling; never invent numbers, testimonials, or commitments I haven't given you; never agree to anything outside the scope I set. Show me the draft and the proposed number and wait for my OK before you send, until I tell you to run a category on your own. Give me a running list of open threads with their status and the number on the table.
```

## Why it's cool

Most inbox bots sort and summarize; this one closes. It treats the business inbox as a pipeline, not a chore — researching rates and negotiating a real number while you're doing something else. The interesting shift is that the agent is generating revenue autonomously from a channel most people treat as pure overhead, which is a different job entirely from inbox triage.
