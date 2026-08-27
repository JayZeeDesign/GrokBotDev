---
type: plugin
name: "PDF.ai"
slug: pdf-ai
tagline: "Turn any PDF into structured data your bot can use - parse, extract, split, one API key."
category: data
subcategory: enrichment
install_steps:
  - "Create a free account at pdf.ai and grab an API key from the developer dashboard (pdf.ai/developer) - the free plan includes 200 credits/month with access to all APIs, no card required."
  - "Skim the docs at api.pdf.ai so your bot knows the surface: POST pdf.ai/api/v2/parse with an X-API-Key header turns a PDF URL into structured markdown/JSON; extract pulls custom fields; split cuts documents into sections; /api/v2/ask answers questions against parsed docs."
  - "Paste the prompt below into your Grok Bot with your API key, and every PDF that crosses your bot's path becomes data it can actually work with."
prompt: "You are setting up a PDF.ai integration inside Grok Bot. PDF.ai is our document-processing layer: one REST API that turns any PDF into structured data. Read the documentation at https://api.pdf.ai first so you use only what is documented. The core calls: POST https://pdf.ai/api/v2/parse with my API key in the X-API-Key header and a form body (url of the PDF, quality, lang_list) returns markdown, structured contents, and pageCount - use it whenever we need the actual text and layout of a document instead of guessing. Use the extract endpoints with custom prompts when I need specific fields (names, dates, amounts, line items) pulled from invoices, contracts, or reports. Use split when a long document needs to become sections. Use POST https://pdf.ai/api/v2/ask with docIds and a prompt to answer questions against documents we already parsed. Rules: never invent an endpoint, parameter, or response field the docs don't describe; the API is credit-metered, so parse a document once and reuse the result instead of re-parsing; my API key stays in your configuration and is never pasted into chat or files; and for documents that look sensitive (contracts, financials, medical), tell me what you're about to send to PDF.ai and wait for my OK first. Confirm the setup by parsing one test PDF I give you and showing me its structure."
works_with: [Gmail]
project_url: https://pdf.ai
source_url: https://x.com/damonchen/status/2092801500573798713
founder:
  name: "Damon Chen"
  x_handle: damonchen
author:
  handle: damonchen
  url: https://x.com/damonchen
  platform: x
pricing_note: "Free 200 credits/month, no card required; usage-based paid API plans from $49/month."
setup_minutes: 5
featured: false
sponsor: false
added_at: "2026-08-27T09:00:00Z"
updated_at: "2026-08-27T09:00:00Z"
verified_at: "2026-08-27T09:00:00Z"
status: live
---

## What it does

PDF.ai is Damon Chen's document-processing platform - "turn PDFs into structured data" - serving millions of users on the chat side and exposing the same engine to developers as a clean REST API. Three capabilities matter for a Grok Bot: **parse** (advanced OCR and layout detection that turns any PDF into structured JSON and markdown - headings, paragraphs, tables, figures), **extract** (AI field extraction with custom prompts - pull names, dates, amounts, line items out of invoices and contracts), and **split** (AI-identified sections out of long documents). One endpoint, an API key, responses in under five seconds for most documents, and files are deleted after processing.

## Use it in Grok Bot

PDFs are where bot workflows usually die - the attachment arrives, and the bot can't reliably read it. This plugin fixes that layer: grab a free API key (200 credits/month, no card), paste the prompt on this page, and your bot gains a documented, repeatable way to turn any PDF it encounters - email attachments, invoices, contracts, reports, scanned documents - into data it can reason over. The prompt bakes in the discipline that matters: documented endpoints only, parse once and reuse (credits are metered), the key never appears in chat, and sensitive documents get your sign-off before anything is sent.
