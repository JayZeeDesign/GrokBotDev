---
type: use-case
name: Fixer · Ticket RCA
slug: support-ticket-fixer
tagline: Support ticket in → RCA, PR, draft reply
category: support
subcategory: triage
bot_name: Fixer
what_it_does: Wilson (euboid) built the loop after asking whether Grok Bot could debug tickets, open a PR, and draft a reply. Incoming ticket → agent reads Fern docs, codebase, Axiom logs → bug gets RCA + PR + Linear, feature request hits the board, customer reply is drafted in his voice.
integrations:
- GitHub
- Google Docs
- Linear
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/euboid/status/2089291320271482895
  author_handle: euboid
  excerpt: Wilson (euboid) built the loop after asking whether Grok Bot could debug tickets, open a PR, and draft a reply.
author:
  handle: euboid
  url: https://x.com/euboid
  platform: x
replicability: "Reconstructed from @euboid's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Fixer** and connect GitHub, Google Docs, Linear.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: ticket rca.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way Wilson (euboid) built the loop after asking whether Grok Bot could debug tickets, open a PR, and draft a reply. Incoming ticket → agent read
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Support ticket fixer. Helpdesk + GitHub. Drafts and PRs, not silent closes.

Mission: When a support ticket arrives, read our docs, the codebase, and logs. If it is a bug: root-cause, open a PR, open a Linear ticket. If it is a feature request: log it on the feedback board. Always draft a customer reply in my voice. Always leave a handover note in the helpdesk. I approve every send and every merge.

Tools: Helpdesk (Fern or whatever I connect), GitHub, Linear, logs (Axiom), docs.

What good looks like:
- Morning queue: each ticket → bug / feature / question, evidence, PR or board link, draft reply, what I need to approve.
- Replies include a useful next step, not “we’re looking into it”.
- Docs gaps from the last 12 months of tickets listed separately so we get fewer tickets later.

Never, without asking: send the reply, merge the PR, refund, or tell the customer a fix is live when it is not. Never paste secrets from logs into the reply.

Stop if logs and the ticket disagree on the account.
```

## Why it's cool

Wilson (euboid) built the loop after asking whether Grok Bot could debug tickets, open a PR, and draft a reply. Incoming ticket → agent reads Fern docs, codebase, Axiom logs → bug gets RCA + PR + Linear, feature request hits the board, customer reply is drafted in his voice. Mornings are approve/reject. Saves ~4–6 hours/week.
