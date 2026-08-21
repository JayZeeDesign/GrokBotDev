---
type: use-case
name: Hermes · On-Chain Task Prepper
slug: hermes-agenc-plugin
tagline: Prepares on-chain task submissions while humans keep the keys.
category: engineering
subcategory: agents-ops
bot_name: Hermes
what_it_does: A prepare-only Hermes/AgenC plugin setup with eight named skills, onboarding, risk assessment, and wallet-readiness checks where the agent never signs or broadcasts transactions.
integrations: []
schedule: adhoc
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 120
cost_note: Source did not specify cost.
source_tweets:
- url: https://x.com/jarnagin_red/status/2088999377008463952
  author_handle: jarnagin_red
  excerpt: 'Here’s the accurate, verified state of what was completed and committed:'
author:
  handle: jarnagin_red
  url: https://x.com/jarnagin_red
  platform: x
replicability: Advanced users need a VPS, AgenC runtime, plugin source, and a human-held Ledger/Phantom/Solflare signing flow.
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T11:00:00Z'
verified_at: '2026-08-21T11:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. Provision a VPS with Ubuntu and install the Hermes Agent plus AgenC runtime.
2. Install the task-workflows plugin from the canonical source path described by the author and verify the v0.5.0 commit reference if available.
3. Add the eight named skills: marketplace-task-triage, task-executor, acceptance-verifier, risk-assessor, status-reporter, board-discovery, onboarding-hub, and claim-decision-matrix.
4. Build the onboarding hub with wallet-readiness, custody-first checks, payout address checks, dry-run gate, anti-phishing board URL, gas buffer, lost-device note, and first on-chain task example.
5. Enforce the prepare-only safety model: the agent prepares, the human signs, and the risk assessor owns irreversible checks.

## Prompt

```text
# Reconstructed by the Curator from @jarnagin_red's published build — not the author's original text.
You are Hermes, a prepare-only on-chain task workflow agent. You may triage, prepare, verify, and report. You never hold keys, never sign transactions, and never broadcast transactions.

Use the published skill model:
- marketplace-task-triage: find and classify candidate tasks.
- task-executor: prepare the work product or submission draft.
- acceptance-verifier: check whether the prepared output meets task requirements.
- risk-assessor: identify irreversible actions, custody risks, phishing risks, and signing risks.
- status-reporter: summarize state and blockers.
- board-discovery: inspect task boards only in prepare mode.
- onboarding-hub: guide wallet readiness and first-task setup.
- claim-decision-matrix: recommend whether a human should claim, skip, or ask a question.

Before any task, run wallet readiness: custody rule first, payout address check, dry-run gate, anti-phishing board URL, gas buffer, and lost-device note. Prepare claim/submission steps, then stop. Tell the human exactly what they must verify and sign on Ledger, Phantom, or Solflare.
```

## Why it's cool

This is cool because the safety model is the product. The author’s post is less about flashy autonomy and more about a rigorous boundary: agents can prepare and verify, but custody and irreversible actions stay with the human. That makes it a strong advanced example for plugin-era workflows.

**Reconstruction assumptions beyond captured text:**

- The two t.co supporting-tool links expanded to unresolvable domains in direct fetches.
- Exact skill contents were not published in capture, only skill names and hub components.
- Commit/source path is preserved as described, but no public repo was fetched.
