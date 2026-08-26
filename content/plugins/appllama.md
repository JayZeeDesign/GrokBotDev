---
type: plugin
name: "Appllama"
slug: appllama
tagline: "Let your Grok Bot study 39,000+ screens from the App Store's top-earning apps."
category: marketing
subcategory: competitive-intel
install_steps:
  - "Get an Appllama Pro account at appllama.io - the MCP is part of Pro and comes with 1,500 credits a month (reset on the 1st)."
  - "In your Grok Bot's connector / MCP settings, add a custom connector pointing at https://mcp.appllama.io/mcp and connect it to your Appllama account."
  - "Paste the prompt below so design research - screens, flows, paywalls, onboarding from top-earning iOS apps - becomes a standing capability."
prompt: "You are setting up an Appllama integration inside Grok Bot. Connect to Appllama's MCP server at https://mcp.appllama.io/mcp using my Appllama Pro account. Read what it exposes so you understand it: a design-research library of 39,000+ real screens from 920+ top-earning iOS apps, with revenue, download and rating data - searchable by app, category, flow (onboarding through checkout), paywall, and UI element family (tabs, sheets, progress indicators, empty states). Then let me drive it in plain language: 'show me how the top fitness apps do onboarding', 'pull 5 paywalls from apps making over $1M a month and compare their pricing layouts', 'how do the best apps handle empty states', 'map Duolingo's flow from install to first lesson'. When I'm designing something, research the pattern first and ground your recommendations in what the top-earning apps actually ship - cite the app and screen you drew each conclusion from, and never invent a screen, metric, or app that Appllama didn't return. Mind my monthly credit budget: pull what the question needs, not everything. Confirm the connection by searching one app I name and describing its onboarding flow."
works_with: []
project_url: https://appllama.io
x_handle: "appllamaio"
founder:
  name: "Jaimin"
  x_handle: "jaimintf"
author:
  handle: jaimintf
  url: https://x.com/jaimintf
  platform: x
source_url: https://appllama.io/mcp
pricing_note: "MCP requires Appllama Pro - 1,500 credits/month; free tier for browsing."
setup_minutes: 5
featured: false
sponsor: false
added_at: "2026-08-26T09:00:00Z"
updated_at: "2026-08-26T09:00:00Z"
verified_at: "2026-08-26T09:00:00Z"
status: live
---

## What it does

Appllama is "Discover the designs that win" - a design-research library of **39,000+ screens from 920+ of the App Store's top-earning iOS apps** (ChatGPT, Duolingo, Strava, Perplexity and the rest), each tied to revenue, download and rating data, updated weekly. Its MCP server hands that library to your agent: search apps, pull specific screens, compare paywalls and pricing layouts, study onboarding step counts and where the paywall lands, browse UI element families (tabs, sheets, progress indicators, empty states), and map complete flows from onboarding through checkout.

## Use it in Grok Bot

Add a custom MCP connector pointing at `https://mcp.appllama.io/mcp` (requires Appllama Pro; 1,500 credits a month), then paste the prompt on this page. From then on your Bot does design research on demand - "show me how top fitness apps do onboarding", "compare 5 paywalls from $1M+/month apps" - and when it's helping you design or build, it grounds its recommendations in what the winners actually ship, citing the app and screen behind each conclusion instead of guessing from taste.
