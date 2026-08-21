---
type: plugin
name: "ScreenshotOne"
slug: screenshotone
tagline: "Give your agent a screenshot API for any URL or HTML."
category: data
subcategory: scraping
install_steps:
  - "Create a ScreenshotOne account at screenshotone.com and grab your access key."
  - "Skim the linked docs to pick the options you need — format, full-page, block ads/cookie banners, viewport, caching."
  - "Paste the prompt below into your Grok Bot and give it your ScreenshotOne access key so screenshots become a standing capability."
prompt: "You are setting up a ScreenshotOne integration for me inside Grok Bot. First, read ScreenshotOne's documentation — the getting-started guide at https://screenshotone.com/docs/getting-started/ and the full options at https://screenshotone.com/docs/options/ — so you understand its authentication (an access key, with signed links for secure requests), that it takes GET or POST requests over HTTPS, and the options for turning a URL, HTML or Markdown into a PNG, JPEG, WebP or PDF, including full-page and scrolling captures, blocking ads and cookie banners, viewport size, and caching. Then use my ScreenshotOne access key so that whenever I ask you to capture a page — screenshot this URL, grab a full-page PNG, render this HTML — you build the correct ScreenshotOne request and return the image or file. Rules: follow the documentation exactly, never invent an option or parameter ScreenshotOne does not list, and if I ask for a capture it cannot do, tell me. Confirm the connection first with a small test screenshot of a simple public page."
works_with: []
project_url: "https://screenshotone.com"
author:
  handle: "screenshotone"
  url: "https://screenshotone.com"
  platform: web
pricing_note: "Usage-based API; free tier to start."
setup_minutes: 10
featured: true
sponsor: false
added_at: "2026-08-21T00:00:00Z"
updated_at: "2026-08-21T12:00:00Z"
verified_at: "2026-08-21T12:00:00Z"
status: live
---

## What it does

ScreenshotOne is a fast, reliable screenshot API for developers — turn any URL, HTML or Markdown into a PNG, JPEG, WebP or PDF over a simple HTTPS request. It handles full-page and scrolling captures, blocks ads and cookie banners, and caches results, so a Grok Bot can grab a clean screenshot of any page on demand.

## Use it in Grok Bot

Paste the prompt on this page into a Grok Bot and give it a ScreenshotOne access key. The bot reads ScreenshotOne's own documentation first, wires up the integration, then you just ask it to screenshot a URL or render HTML and it returns the image — following the docs for every option.
