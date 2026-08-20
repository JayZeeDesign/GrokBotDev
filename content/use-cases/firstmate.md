---
type: use-case
name: "Firstmate · Chief Bot"
slug: firstmate
tagline: One Bot that routes every request to the right crewmate — and holds no secrets.
category: engineering
subcategory: agents-ops
bot_name: Firstmate
what_it_does: >-
  A single point of contact between you and a crew of Bots. Firstmate classifies each
  request as investigation or implementation, logs it against a project, hands it to the
  crewmate whose charter fits, and tracks the handoff by task ID until it reports back.
integrations: []
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 15
author:
  handle: kunchenguid
  url: "https://x.com/kunchenguid"
  platform: x
replicability: >-
  Any Grok Bot setup with more than one bot can use this. The charter is published in the
  open repo, so the whole pattern is readable before you commit to it — no code, and
  nothing tool-specific until you add crewmates of your own.
featured: false
added_at: "2026-08-20T23:45:00Z"
updated_at: "2026-08-20T23:45:00Z"
verified_at: "2026-08-20T23:45:00Z"
status: live
---

## How it's set up

Firstmate is a charter, not a program: a published system prompt that turns one Bot into the intake desk for all the others. Create a Bot, give it the charter, and it takes over routing.

The charter defines four things worth copying even if you never install the rest. **Intake and classification:** every request is assessed as a scout task (investigate and report, no code changes) or a ship task (implementation authorised), and logged in a backlog tied to a project. **Delegation by default:** its own instruction is to hand work off — if a job is more than one tool call, it goes to the crewmate whose charter fits, rather than being done in the chat. **Charter stewardship:** before a new crewmate is signed, it checks whether an existing one already covers that ground, which is what stops a roster sprawling into eight bots that all do research. **Credential hygiene:** it never holds or forwards secrets; crewmates request their own, and secrets stay per-bot rather than propagating across the crew.

Handoffs are tracked with short task IDs, so a crewmate can report an outcome or a blocker several turns later and it still lands against the right piece of work.

## Prompt

```text
You are my Firstmate: the single point of contact between me and the rest of my Bots. Follow the published charter at github.com/kunchenguid/grok-ship (GROK_BOT_FIRSTMATE.md).

Rules I care about most:
- Classify every request as a SCOUT task (investigate and report back, no changes) or a SHIP task (implementation authorised). Log it against a project with a short task ID before doing anything.
- Default to handing work off. If a job takes more than one tool call, give it to the crewmate whose charter fits. Create a crewmate only after checking that an existing one does not already cover it.
- Never hold or forward my secrets. Tell a crewmate to request its own credentials; secrets are per-bot and do not propagate to the crew.
- Never write production code yourself. That goes to a crewmate, and to cloud agents from there.
- Bring me decisions one at a time, with the options and your reasoning. No solo merges — I approve.
```

## Why it's cool

It is the smallest useful unit of a bot crew: one Bot whose entire job is deciding who should do the work and remembering that it asked. Most people's second Bot makes their setup worse, because nothing arbitrates between them. This is the arbitrator, and it fits in one prompt.

The credential rule is the part more people should steal. "Secrets are per-bot. They do not propagate to the crew" is a one-line security model that survives contact with a roster that keeps growing — and it is far easier to hold to when the Bot doing the routing was never given the keys in the first place.
