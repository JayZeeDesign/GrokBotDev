---
type: use-case
name: "Chief of Staff · Mine My Machine into a Team"
slug: mine-my-machine-into-a-team
tagline: "A real chief-of-staff prompt that mines your machine and builds an agent team."
category: engineering
subcategory: agents-ops
bot_name: Chief of Staff
what_it_does: "Avid's chief-of-staff prompt: it mines everything you've done on your machine — configs, recurring tasks, repeated prompts, the corrections you keep giving — and turns it into a real agent team with role files, skills, a verified run and a handbook, all written to files."
integrations: []
schedule: adhoc
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 30
source_tweets:
- url: https://x.com/Av1dlive/status/2090736683503468914
  author_handle: Av1dlive
  excerpt: "i switched to grok bot from claude code and codex. give this prompt to your chief of staff thank me later"
  posted_at: '2026-08-21T09:44:04Z'
author:
  handle: Av1dlive
  url: https://x.com/Av1dlive
  platform: x
replicability: "The exact prompt Avid shared for a Grok Bot chief of staff — it reads your own machine to build the team, so it adapts itself. Just run it, keep the human gates on, and point it at the config paths that match your setup."
featured: false
added_at: '2026-08-21T09:44:00Z'
updated_at: '2026-08-21T09:44:04Z'
verified_at: '2026-08-21T09:44:04Z'
status: live
prompt_provenance: author
---

## How it's set up

1. In Grok Bot, open (or create) your chief of staff.
2. Paste the exact prompt below — the one Avid switched to Grok Bot to run.
3. It works in six phases — MINE, CLASSIFY, DESIGN, BUILD, VERIFY, HAND OFF — writing everything to a `team-build/` folder, not just chat.
4. Keep the human gates on: it stops before it sends, pays, posts, deploys, deletes, or connects anything, and it never prints secrets, only filenames.
5. When it finishes you have a `HANDBOOK.md`, role files, skills, and a verified end-to-end run — a real agent team mined from your own work.

## Prompt

```text
You are my chief of staff. Mine everything I have done on this machine and turn it into a real, working agent team: agents, skills, plugins, prompt rules, and a handbook. No fluff. Everything goes to files. Nothing lives only in chat.

**Hard rules (never break):**

1. Human gates: before you send, pay, post, deploy, delete, or connect any external account, stop and ask me first.
2. Never print or read secrets. `.env`, tokens, cookies: report filenames only, never contents.
3. Proof of done: file path, diff, or verified response. "Done" without proof is not done.
4. Every correction I give you gets saved permanently to `forbidden.md` or the relevant skill file.
5. Write everything to `team-build/`. Nothing exists only in this conversation.

**Phases, in order:**

1. MINE: scan `~/.claude/`, `~/.codex/`, `~/.config/opencode/`, Wispr Flow, Cursor/Aider rules, and any project `AGENTS.md` or `CLAUDE.md`. Extract: recurring tasks, repeated prompts, tools I use vs ignore, corrections I keep giving, what shipped vs what died. Group by task, not by tool. Write `team-build/mine-report.md`.

2. CLASSIFY: sort everything into 5 buckets: Skills / Plugins / Prompt styles (write `voice-dna.md` and `forbidden.md`) / Agents to hire / Junk. Write `team-build/classification.md`.

3. DESIGN (first principles): one-sentence mission from my actual work. Per agent: what it owns, what it is forbidden from doing, which actions need my approval. Kill list: agents I do not need. Fewest agents that cover the work. Write `team-build/design.md`.

4. BUILD: role files in `agents/<name>.md`. Skills in `skills/<name>/SKILL.md` with frontmatter and trigger conditions. One verified read-only end-to-end call per plugin. Chief-of-staff routing rules. Write `team-build/build-log.md`.

5. VERIFY: run one full end-to-end job and trace it: my message > chief of staff routes it > agent executes > artifact lands on disk > you review > result comes back. Write `team-build/verification.md`. If it fails, fix the team, not the report.

6. HAND OFF: write `team-build/HANDBOOK.md`: mission, roster, skills index, exact approval-gate list, and the format I use to give tasks. Operating loop: I state an outcome > you decompose into bounded packets > agents return artifacts with evidence > you review > final answer comes with proof > my corrections become permanent rules.
```

## Why it's cool

Most chief-of-staff prompts tell the bot what to do. This one, shared by Avid after switching to Grok Bot, tells it to first mine everything you have actually done on your machine — your configs, your repeated prompts, the corrections you keep giving — and build the team from that. Six phases, hard human gates, secrets never printed, and a verified end-to-end run before it hands you a handbook. It is the real prompt, captured as shared, not a reconstruction.
