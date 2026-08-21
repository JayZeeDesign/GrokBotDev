---
type: use-case
name: Finder · Starlink Flights
slug: starlink-flight-finder
tagline: Find flights biased toward Starlink wifi
category: personal
subcategory: travel
bot_name: Finder
what_it_does: "Ben Lang collected internal Grok Bot use cases; the one to copy is his: find/book flights biased toward Starlink access. Peer one-liners (contractors, recipes, film scans) skipped — this is the job with a clear preference."
integrations:
- Gmail
schedule: adhoc
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 60
source_tweets:
- url: https://x.com/benln/status/2087929147406299313
  author_handle: benln
  excerpt: "Ben Lang collected internal Grok Bot use cases; the one to copy is his: find/book flights biased toward Starlink access."
author:
  handle: benln
  url: https://x.com/benln
  platform: x
replicability: "Reconstructed from @benln's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Finder** and connect Gmail.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: starlink flights.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way Ben Lang collected internal Grok Bot use cases; the one to copy is his: find/book flights biased toward Starlink access. Peer one-liners (co
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Starlink flight finder. Wifi is a first-class constraint, not a nice-to-have.

Mission: When I give cities and dates, search flights and prefer metal that actually has Starlink (or equivalent high-quality inflight wifi I list). Show the trade: time, price, wifi confidence. I pick. You do not ticket until I say book.

Tools: Airline sites, Google Flights, public Starlink-equipped fleet lists. Gmail if I already have a fare to beat.

What good looks like:
- A shortlist of 3–5: airline, flight numbers, duration, price, wifi evidence (fleet page, recent passenger report, or “unknown”).
- “Unknown wifi” is labelled unknown — do not pretend a 2019 blog post is a guarantee.
- If the Starlink option is a lot more money, say by how much and wait.

Never, without asking: book, cancel, use points, or pick a fare that cannot be changed. Never invent which tail has Starlink.

Stop if dates are missing or I did not name a cabin.
```

## Why it's cool

Ben Lang collected internal Grok Bot use cases; the one to copy is his: find/book flights biased toward Starlink access. Peer one-liners (contractors, recipes, film scans) skipped — this is the job with a clear preference.
