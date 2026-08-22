---
type: use-case
name: "Marketing OS · Full Marketing Department"
slug: marketing-os
tagline: "An open-source marketing department you hand to Grok Bot as one link."
headline: "Your whole marketing team, open-sourced"
summary: "Vlad Dubchak's team (Maxfusion) open-sourced their marketing department as one skill — Marketing OS. Fourteen modules cover audits scored 0-100, an 18-tactic hook engine, graded copy, ad diagnosis, GEO, email, social, launches and positioning. Hand Grok Bot the repo link and it's ready in minutes."
categories: [marketing]
format: use-case
awesome_score: 93
score_breakdown:
  reproducibility: 21
  ambition: 20
  concreteness: 20
  novelty: 13
  evidence: 10
  craft: 9
category: marketing
subcategory: content
bot_name: Marketing OS
what_it_does: "Vlad Dubchak's team (Maxfusion) open-sourced their marketing department as one skill — Marketing OS. Fourteen modules cover audits scored 0-100, an 18-tactic hook engine, graded copy, ad diagnosis, GEO, email, social, launches and positioning. Hand Grok Bot the repo link and it's ready in minutes."
integrations: []
schedule: adhoc
autonomy: proposes
difficulty: intermediate
setup_minutes: 10
source_tweets:
- url: https://x.com/vladdubchak_x/status/2090770900241297844
  author_handle: vladdubchak_x
  excerpt: "We open-sourced our entire marketing team. Introducing Marketing OS for Grok Bot by Maxfusion."
  posted_at: '2026-08-21T12:00:01Z'
author:
  handle: vladdubchak_x
  url: https://x.com/vladdubchak_x
  platform: x
replicability: "Maxfusion open-sourced this as a real skill — github.com/holy-templar/marketing-agi. Give Grok Bot the repo link to install it, then fill in brand-context so every module writes for your brand. Adapt the modules you actually use to your own marketing."
featured: true
added_at: '2026-08-21T12:00:00Z'
updated_at: '2026-08-21T12:00:01Z'
verified_at: '2026-08-21T12:00:01Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. Open Grok Bot and give it this link — **github.com/holy-templar/marketing-agi**, the open-source Marketing OS by Maxfusion — and ask it to read the repo and set the skill up.
2. It installs fourteen modules: audit, GEO, copy, hooks, paid-ads, email, social, launch, positioning, competitive, app-store and analytics, plus a slop-pattern catalogue and scoring rubrics.
3. Copy `brand-context.template.md` to `brand-context.md`, fill in your brand, and give it to the bot — every module reads it, so the output is written for you and not for everyone.
4. If you want it to produce ad assets, connect an ad-generation MCP (for example MaxFusion AI); otherwise it stops at the brief.
5. From then on, ask for the marketing job you need — an audit, a hook matrix, an email sequence, a launch plan — and the right module runs it, scored, with an honest note on what it could not determine.

## Prompt

```text
Set yourself up as my marketing team using the open-source Marketing OS by Maxfusion.

1. Read this repository and install it as a skill: https://github.com/holy-templar/marketing-agi
2. It is fourteen modules — audit, GEO, copy, hooks, paid-ads, email, social, launch, positioning, competitive, app-store, analytics, plus a slop-pattern catalogue and scoring rubrics. Load the router first; load each module only when its task comes up.
3. Ask me to fill in brand-context (copy brand-context.template.md to brand-context.md). Read it before writing anything, so everything is in my brand's voice, not generic.
4. When I give you a marketing job, run the matching module, score the output 0-100 against its rubric, run the slop-pattern check on all prose, and tell me plainly what you could not determine.

Rules: use the repo's real modules and rubrics — never invent a module, a score, or a metric. Do not publish, send, or spend without showing me first. If an ad-generation MCP is connected you may produce the briefed assets; otherwise stop at the brief.
```

## Why it's cool

Vlad Dubchak's team open-sourced their entire marketing department — Marketing OS by Maxfusion — as one skill you hand to Grok Bot as a link. Fourteen modules cover the whole surface a marketer touches, and what makes it different is the discipline: everything is scored 0-100, you get artifacts instead of advice, and every report says what it could not determine. Give Grok Bot the link and you have a marketing team in minutes.
