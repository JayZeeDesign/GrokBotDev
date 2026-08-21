---
type: plugin
name: "Aaron Marketing Skills"
slug: aaron-marketing-skills
tagline: Installs eight named marketing teammates into Grok Bot, keyless.
category: marketing
subcategory: content
install_steps:
  - "Clone the repo on the machine where you manage your Bot roster."
  - "Run `python3 scripts/generate-bot-projections.py --output <your-path>` to build the bundles."
  - "Open the generated Grok Bot setup pack (`grok/bot-cards.md`) and follow its per-bot enable list."
  - "Start with one bot and one brief before enabling the rest of the roster."
works_with: []
project_url: "https://github.com/aaron-he-zhu/aaron-marketing-skills"
repo_url: "https://github.com/aaron-he-zhu/aaron-marketing-skills"
author:
  handle: "aaron-he-zhu"
  url: "https://github.com/aaron-he-zhu"
  platform: github
setup_minutes: 20
pricing_note: "Free, Apache-2.0. Keyless by default; paid tool connectors are opt-in."
featured: true
added_at: "2026-08-20T23:45:00Z"
updated_at: "2026-08-20T23:45:00Z"
verified_at: "2026-08-20T23:45:00Z"
status: live
---

## What it does

A marketing skills library — narrative, SEO, social, email, paid ads, influencer and launch work — that installs on a named-bot host as **eight named teammates** rather than 120 loose skills. The README calls out xAI's Grok Bot by name as one of those hosts and ships a dedicated Grok Bot setup pack for it.

The interesting design decision is the gates. Every discipline runs against shared quality frameworks with auditor-class checks, so output gets reviewed against a rubric before it reaches you. That is the difference between a prompt pack and something you can leave running: a bad draft gets caught by the auditor, not by you at publish time.

It is also **keyless by default** — the skills work on data you provide, and paid APIs are opt-in connectors rather than prerequisites. That makes it an unusually low-commitment way to find out whether a marketing bot roster is useful for your work.

## Install setup

Clone the repo, then run the projection script to generate the installable bundles: `python3 scripts/generate-bot-projections.py --output <your-path>`. That produces the Grok Bot setup pack — bot cards, per-bot enable lists and a setup checklist.

Do not enable all eight at once. Pick the one closest to work you have on your desk this week, give it a real brief, and read what the auditor gate sends back. Add the next teammate when the first one has earned it.
