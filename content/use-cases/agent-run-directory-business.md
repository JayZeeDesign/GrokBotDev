---
type: use-case
name: "Directory Business · Agent-Run"
slug: agent-run-directory-business
headline: "Run a directory business with a team of Grok Bots"
summary: "The Startup Ideas Podcast's playbook for a directory business run by Grok Bots: pick a niche you have taste in, build the site on Astro, set a research agent to write a brand page a day in Markdown, a publisher agent to post it, and once traffic is real, a third agent to gather referral links and chase deals."
categories: [marketing, sales]
format: use-case
tagline: "A Grok Bot team builds and runs a curated directory, one brand page a day."
category: marketing
subcategory: content
bot_name: "Directory Builder"
what_it_does: "A small team of Grok Bots runs a directory business: a research agent writes one new brand page a day as Markdown, a publisher agent posts it to an Astro site, and once traffic is real, a third agent collects referral links and chases paid deals. You pick the niche and approve the work."
integrations: []
schedule: daily
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 120
source_tweets:
  - url: https://x.com/startupideaspod/status/2091238981337858473
    author_handle: startupideaspod
    excerpt: "One of the best businesses to run with GrokBot is a directory ... Set up a research agent. Every day it investigates a new brand and writes a great page on that brand as Markdown. It hands the page to the engineer, who posts it."
    posted_at: "2026-08-22T12:00:00Z"
author:
  handle: startupideaspod
  url: https://x.com/startupideaspod
  platform: x
prompt_provenance: curator
replicability: "The podcast gave a six-step playbook, not one prompt, so the starter below is a curator distillation of it. To adapt: pick a niche you genuinely have taste in, keep the hard rule that outreach starts only after real traffic, and keep the roster tiny with five-line daily reports."
awesome_score: 76
score_breakdown:
  reproducibility: 17
  ambition: 18
  concreteness: 16
  novelty: 12
  evidence: 5
  craft: 8
featured: true
added_at: "2026-08-22T19:40:00Z"
updated_at: "2026-08-22T19:40:00Z"
verified_at: "2026-08-22T19:40:00Z"
status: live
---

## How it's set up

1. **Pick a niche you already have taste in** — pickleball gear, board games that are good for parties, something where you can tell good from bad. The narrower, the better.
2. **Build the site on Astro** (it's genuinely good at directories) and wire it to GitHub so agents can publish to it.
3. **Set up a research agent.** Every day it investigates one new brand or product in the niche and writes an excellent, factual page for it as Markdown — what it is, who it's for, the standout details, and an honest verdict.
4. **A publisher agent** takes each finished page and posts it to the site.
5. **Rinse and repeat until you're getting thousands of visits a month.** Don't skip ahead: step 6 only works once traffic is real. Nobody gives you a deal on a site with no traffic.
6. **Add a deals agent.** Once traffic is real, it collects referral/affiliate links for the listed brands and runs small, personalized outbound to turn listings into paid placements and sponsors.

Then stack a niche newsletter on a subdomain that links back to the directory with your referral link — those warm readers become the sponsors you pitch. One human sets the direction and approves the work; the agents run the ball.

## Prompt

```text
You're going to help me run a directory business — a curated website of the best {X} in a niche. Work in stages and check with me at each gate:

1. NICHE: propose 5 niches I'd have real taste in, where a "best {X}" directory could earn affiliate/referral and sponsor money. I'll pick one.
2. SITE: scaffold a fast static directory on Astro (it's great at directories), wired to GitHub, and hand me the repo.
3. RESEARCH AGENT: every day, investigate one new brand/product in the niche and write an excellent, factual directory page for it as Markdown — what it is, who it's for, standout details, and an honest verdict. Hand each finished page to the publisher.
4. PUBLISHER AGENT: take each Markdown page, add it to the site, and deploy it.
5. Repeat daily until we're getting real traffic (thousands of visits/month). Do NOT start outreach before this.
6. DEALS AGENT: once traffic is real, collect referral/affiliate links for listed brands and run small, personalized outbound to turn listings into paid placements and sponsors.

Keep the roster tiny, give each agent one job, and have each file a five-line end-of-day report: what you shipped, what's new, what's blocked.
```

## Why it's cool

Curated data is exactly what the AI answer engines now want. As people move to ChatGPT and Google's AI overviews, "here are the best {X}, honestly graded" is the shape of content those systems reach for — so a directory compounds instead of decaying. The playbook's honest move is the ordering: **step 6 only after step 5.** Most "start a business with agents" advice skips the unglamorous middle where a research agent quietly ships one good page a day until the traffic is real; the deals only exist because that foundation does. And a small roster with five-line daily reports is what keeps it a business you manage, not a pile of abandoned chat threads. (Fittingly, grokbot.dev is itself a directory — this is the same playbook, one level up.)
