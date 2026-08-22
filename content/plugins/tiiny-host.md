---
type: plugin
name: "Tiiny Host"
slug: tiiny-host
tagline: "Let your agent deploy a static site or file to a live URL in seconds."
category: engineering
subcategory: ci-cd
install_steps:
  - "Create a Tiiny Host account at tiiny.host and, for programmatic deploys, upgrade to a Solo plan or higher to get API access."
  - "Grab your API key from the dashboard (see api-docs.tiiny.host for the exact place)."
  - "Paste the prompt below into your Grok Bot and give it your Tiiny Host key so 'ship this to a live URL' becomes one step."
prompt: "You are setting up a Tiiny Host integration for me inside Grok Bot. First read Tiiny Host's API documentation at https://api-docs.tiiny.host so you understand its upload/deploy API (available on the Solo plan and up): you zip a static site or a file and POST it, and Tiiny Host returns a live, shareable URL. Then, when I hand you a built static site, a PDF, or any supported file and ask you to publish it, deploy it through the API and give me back the live link. Rules: follow the documentation exactly and NEVER invent an endpoint, field, or subdomain the docs don't define. Deploying publishes to the public internet and can use up my plan's sites/bandwidth — so always show me the file and the intended URL/subdomain and get my explicit go-ahead before you publish or overwrite anything. Confirm the connection by listing my existing sites."
works_with: []
project_url: "https://tiiny.host"
x_handle: "tiinyhost"
founder:
  name: "Baretto"
  x_handle: "_baretto"
author:
  handle: "tiiny-host"
  url: "https://tiiny.host"
  platform: web
pricing_note: "Free tier; API on Solo plan and up."
setup_minutes: 10
featured: true
sponsor: false
added_at: "2026-08-22T00:00:00Z"
updated_at: "2026-08-22T13:00:00Z"
verified_at: "2026-08-22T13:00:00Z"
status: live
---

## What it does

Tiiny Host is the fastest way to put a static site or a file online: zip it, upload, and you get a live shareable URL — no server, no config. Its upload/deploy API (Solo plan and up) lets a Grok Bot do that step for you, so anything your agent builds can go from a folder to a public link in one move.

## Use it in Grok Bot

Paste the prompt on this page into a Grok Bot and give it a Tiiny Host API key. The bot reads Tiiny Host's own API docs first, then when you say 'publish this' it zips and deploys the site or file and hands back the live URL — showing you the file and target subdomain for approval before anything goes public.
