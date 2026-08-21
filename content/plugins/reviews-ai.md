---
type: plugin
name: "Reviews.ai"
slug: reviews-ai
tagline: "Let your agent pull and analyze reviews from 100+ platforms."
category: marketing
subcategory: analytics
install_steps:
  - "Create a Reviews.ai account at reviews.ai and connect the accounts or data you want it to reach."
  - "Get your API key or MCP connection from your Reviews.ai dashboard (see the linked docs for the exact place)."
  - "Paste the prompt below into your Grok Bot and give it your Reviews.ai key so this becomes a standing capability."
prompt: "You are setting up a Reviews.ai integration for me inside Grok Bot. First, read Reviews.ai's API documentation at https://help.reviews.ai/en/articles/5448444-api so you understand its authentication, how it pulls reviews from 100+ platforms, and how to fetch products and filter reviews by brand, category, time period and rating (with pagination up to 100 per page and a 300-requests-per-minute limit). Then use my Reviews.ai API key so that when I ask how a product or brand is being reviewed, you pull the real reviews and summarize the sentiment, recurring themes and standout quotes from exactly what the API returned. Rules: follow the docs exactly, respect the rate limits, never invent a review, rating, or trend, and always tell me the sample size behind any summary. Confirm the connection first with a small read-only request."
works_with: []
project_url: "https://reviews.ai"
author:
  handle: "reviews-ai"
  url: "https://reviews.ai"
  platform: web
setup_minutes: 10
featured: true
sponsor: false
added_at: "2026-08-21T00:00:00Z"
updated_at: "2026-08-21T12:00:00Z"
verified_at: "2026-08-21T12:00:00Z"
status: live
---

## What it does

Reviews.ai scrapes and analyzes reviews from 100+ platforms and exposes them through a clean REST API. A Grok Bot can pull the real reviews for a product or brand and summarize sentiment, themes and standout quotes — grounded in actual data, not guesses.

## Use it in Grok Bot

Paste the prompt on this page into a Grok Bot and give it a Reviews.ai API key or MCP connection. The bot reads Reviews.ai's own documentation first, wires up the integration, and from then on you drive Reviews.ai in plain language — it follows the docs and checks with you before anything that writes or spends.
