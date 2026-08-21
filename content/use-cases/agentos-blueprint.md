---
type: use-case
name: "AgentOS · Blueprint Builder"
slug: agentos-blueprint
tagline: One prompt that has your Bot build you a whole agent operating system.
category: engineering
subcategory: agents-ops
bot_name: AgentOS
what_it_does: >-
  Hands your Bot a full product spec and implementation blueprint for an agent operating
  system — roles, contracts, storage, the lot — and has it build exactly that, without
  inventing features the spec does not name.
integrations: []
schedule: adhoc
autonomy: proposes
difficulty: advanced
setup_minutes: 45
source_tweets:
  - url: "https://x.com/iannuttall/status/2088240212799349206"
    author_handle: iannuttall
    excerpt: "I found this system fascinating so I gave Grok Bot the transcript and had it create a prompt you can give your agent to build our your own AgentOS"
author:
  handle: iannuttall
  url: "https://x.com/iannuttall"
  platform: x
replicability: >-
  You need a Bot that can write code and a repo to build into. Read the blueprint before
  you run it — it is long, it is opinionated, and the author flags which parts are his
  reconstruction rather than the original author's files.
prompt_provenance: author
featured: false
added_at: "2026-08-21T00:30:00Z"
updated_at: "2026-08-21T00:30:00Z"
verified_at: "2026-08-21T00:30:00Z"
status: live
---

## How it's set up

This one is a blueprint rather than a bot. Ian Nuttall fed Grok Bot the transcript of Danny Postma's talk on building an agent operating system, had it produce an implementation prompt, and published the result as a public gist — a single markdown file that is both a product spec a human can read and a build instruction an AI coding agent can execute.

**Read the provenance note before you use it, because the author put one there himself.** The blueprint opens by saying it is *reconstructed from the talk*, and that the role contracts and prompts inside it are not Danny Postma's verbatim files. It instructs whoever builds from it to mark every reconstructed prompt as reconstructed, in code comments and in docs. That honesty is the reason this entry is here: it is a real published artifact that tells you exactly what it is.

The setup is two moves. Point your Bot at the gist, then let it work through the spec section by section — it is roughly 50,000 characters, so expect it to build in stages rather than in one pass. Review what it produces the same way you would review any pull request.

## Prompt

```text
Fetch and read this blueprint in full, then build exactly what it specifies:

https://gist.githubusercontent.com/iannuttall/8152098b5ce8e6c1a7499ee561ed93f4/raw/agentos-blueprint.md

The file states its own terms, and they hold: "This document is both a product spec for a human and an implementation prompt for an AI coding agent. Build exactly this system. Do not invent features that are not specified here."

It also carries the author's provenance warning: "Role contracts and prompts in this file are reconstructed from the talk, not his verbatim files. Mark every reconstructed prompt in code comments and docs as such." Honour that — every prompt you write out of this blueprint gets labelled as reconstructed, in the code and in the docs.

Work through it in stages, not one pass. After each section, show me what you built and what the spec said, and wait for me before moving on. If the blueprint is ambiguous or contradicts itself, stop and ask me rather than choosing for me.
```

## Why it's cool

Most "build your own agent team" posts are a roster and a vibe. This is a specification long enough to argue with — and it is the rare published artifact that labels its own reconstructed parts instead of passing them off as primary source. If you have ever wondered what a genuinely complete agent-system prompt looks like, this is one you can read end to end.

It is also a good stress test for your Bot. A 50,000-character spec with explicit "do not invent features" instructions will show you very quickly whether your setup can follow a long document faithfully or whether it starts improvising around the third section.
