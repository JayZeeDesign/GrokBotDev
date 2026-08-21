---
type: use-case
name: "Grok Ship · Software Factory"
slug: grok-ship
tagline: One Bot you talk to, a crew that ships — issues and PRs, done overnight.
category: engineering
subcategory: agents-ops
bot_name: Firstmate
what_it_does: >-
  A full software factory inside Grok Bot. You talk to one agent, Firstmate, which logs
  work in a local SQLite backlog, classifies it as investigation or implementation, and
  hands it to crewmates that run Cursor cloud agents and adversarial review before any PR.
integrations: [GitHub]
schedule: adhoc
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 30
source_tweets:
  - url: "https://x.com/kunchenguid/status/2090463366762676732"
    author_handle: kunchenguid
    excerpt: "ok i rabbit holed and ended up creating a full-on SOFTWARE FACTORY within Grok @Bot.. and it works — i call it Grok Ship - a ship you'll captain, and it ships! yesterday alone, hundreds of issues and PRs across my repos got done by it"
author:
  handle: kunchenguid
  url: "https://x.com/kunchenguid"
  platform: x
replicability: >-
  You need a Grok Bot with its shared computer, a Cursor account for cloud agents, and
  source control connected. No code to write — the install is one instruction — but you
  should be comfortable reviewing PRs, because you approve every merge.
prompt_provenance: author
featured: true
added_at: "2026-08-20T23:45:00Z"
updated_at: "2026-08-21T00:30:00Z"
verified_at: "2026-08-21T00:30:00Z"
status: live
---

## How it's set up

The install is one instruction, and everything else happens on the shared computer. Point any Grok Bot at the setup file in the public repo and it copies the pack across, checks the roster for an existing Firstmate rather than creating a duplicate, and creates the Firstmate agent from the published charter.

From there it registers four global skills — `lavish-session`, `adversarial-review`, `project-management` and `ahoy` — initialises a local SQLite database for projects and tasks, and drops in a crewmate template for per-project use. It then detects and authenticates source control (GitHub, GitLab, Bitbucket or Cursor Origin) on the shared computer, and confirms cloud agents have their own Cursor account connection.

The last step matters more than it looks: the installer messages Firstmate with a task ID, waits for a ready reply, and tells you to talk only to Firstmate from then on. The bot you started with can be deleted from the sidebar.

Everything the installer writes is published and readable before you run it: the installer itself (`GROK_SHIP.md`), the Firstmate and crewmate charters (`GROK_BOT_FIRSTMATE.md`, `GROK_BOT_CREWMATE.md`), and all four workflow skills — `lavish-session`, `adversarial-review`, `project-management` and `ahoy` — each ship as its own `SKILL.md` in the repo. If you want to know what a crewmate will be told to do before you create one, that file is right there.

## Prompt

```text
setup Grok Ship for me. follow GROK_SHIP.md in this github repo: kunchenguid/grok-ship

After the install completes: create the Firstmate agent from the charter in the pack, register the four global skills (lavish-session, adversarial-review, project-management, ahoy), initialise the SQLite backlog, and connect source control on the shared computer. Then message Firstmate with the install task ID and ask it to reply ready and greet me.

From that point on I talk only to Firstmate. Every request gets classified as a scout task (investigate and report, no code changes) or a ship task (implement it), logged against a project in the backlog, and handed to the crewmate whose charter fits. No solo merges — surface the PR to me and wait for my approval.
```

## Why it's cool

Most "AI team" setups are a roster with no spine. This one has the boring parts: a task ID for every handoff, a database that survives the end of a chat, a fresh-context adversarial review before anything becomes a pull request, and one rule that keeps a human in the loop — no solo merges. The captain approves.

It is also the clearest demonstration of what the Grok Bot primitives actually add up to. An always-on computer, an agent harness, agent-to-agent messaging, routines and Cursor cloud agents are individually unremarkable; composed like this, they are a software factory, and the author published the whole thing under an open repo rather than describing it.
