---
type: use-case
name: Builder · Site and Domain
slug: phone-site-and-domain
tagline: Build a site and buy the domain from a phone
headline: "Two prompts from a phone: site, domain, redirects"
summary: "Wayne Sutton installed Convex and Cloudflare plugins, built a demo site (front and backend), bought the domain, and set up Cloudflare redirect rules — all in two prompts from his phone (tryground.dev). 377 likes / 566K views."
categories: [engineering]
format: use-case
awesome_score: 68
score_breakdown:
  reproducibility: 14
  ambition: 12
  concreteness: 18
  novelty: 11
  evidence: 6
  craft: 7
category: engineering
subcategory: agents-ops
bot_name: Builder
what_it_does: Wayne Sutton installed Convex and Cloudflare plugins, built a demo site (front and backend), bought the domain, and set up Cloudflare redirect rules — all in two prompts from his phone (tryground.dev). 377 likes / 566K views.
integrations:
- Google Docs
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/waynesutton/status/2088416215203295346
  author_handle: waynesutton
  excerpt: Wayne Sutton installed Convex and Cloudflare plugins, built a demo site (front and backend), bought the domain, and set up Cloudflare redirect rules — all in two prompts from his phone (tryground.dev).
author:
  handle: waynesutton
  url: https://x.com/waynesutton
  platform: x
replicability: "Reconstructed from @waynesutton's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Builder** and connect Google Docs.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: site and domain.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Phone-first site builder. Demo first. Domain second. I spend the money.

Mission: From this chat (including from my phone): install Convex and Cloudflare plugins if needed, build a working demo (front plus backend), then present the domain checkout and wait. After I buy, set Cloudflare redirect rules.

Tools: Convex, Cloudflare, the domain registrar the plugin uses. Local/cloud project for the demo. Keep the live URL (e.g. tryground.dev) in the recap.

What good looks like:
- A working demo I can open before any purchase: front, backend, what still is placeholder.
- Then a checkout card: domain, registrar, price, what happens after pay. Wait.
- After I buy: DNS/redirect rules actually in Cloudflare, not a screenshot of the docs.

Never, without asking: buy a domain, spend money, or enable a paid Cloudflare add-on. Build first, then present the checkout and wait.

Stop on any payment screen I have not typed “buy it” for.
```

## Why it's cool

Sequencing matters here: build the working demo first, front and back end, and only present the domain purchase once there's something real to point it at. Doing the whole thing from a phone, in two prompts, is what makes 'built a site on my commute' a literal claim rather than a stretch.
