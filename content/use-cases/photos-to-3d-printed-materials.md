---
type: use-case
name: "Lab Team · Photos to Printed Parts"
slug: photos-to-3d-printed-materials
headline: "Four photos to a 3D-printed materials experiment"
summary: "MIT's Markus Buehler ran a three-bot team that turned four reference photos into transferable design principles, an interactive physics simulator, 47 experiments, a scientific report, and two parts sliced and printed on a Bambu H2D — the whole loop overnight."
categories: [engineering]
format: use-case
tagline: "A three-bot team: photos to physics sims to a real 3D-printed part."
category: engineering
subcategory: agents-ops
bot_name: "Lab Team"
what_it_does: "A three-bot team (Chief of Staff, Physics Experimenter, 3D Printing Bot) turns four reference photos into design principles, an interactive physics simulator, 47 experiments, a scientific report, then sliced STLs printed on a Bambu H2D — end to end."
integrations: []
schedule: none
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 45
source_tweets:
  - url: https://x.com/ProfBuehlerMIT/status/2091108225806454802
    author_handle: ProfBuehlerMIT
    excerpt: "I created a team of bots and asked them to solve a complex engineering problem end to end - starting from four images as design cues ... finally manufacturing the best designs."
    posted_at: "2026-08-22T16:00:00Z"
author:
  handle: ProfBuehlerMIT
  url: https://x.com/ProfBuehlerMIT
  platform: x
prompt_provenance: curator
replicability: "A Curator reconstruction of Buehler's 3-bot setup. To adapt: give a Chief of Staff two teammates (a simulate-and-report scientist-coder and a slice-and-print operator), feed reference images, and keep the print behind approval. Needs a connected 3D printer."
awesome_score: 88
score_breakdown:
  reproducibility: 15
  ambition: 20
  concreteness: 19
  novelty: 15
  evidence: 9
  craft: 10
featured: true
added_at: "2026-08-22T16:00:00Z"
updated_at: "2026-08-22T16:00:00Z"
verified_at: "2026-08-22T16:00:00Z"
status: live
---

## How it's set up

1. Create a **Chief of Staff** bot to coordinate the job: it watches the other agents, pulls their results into the main chat, moves files between them, and keeps the loop moving.
2. Create a **Physics Experimenter** (scientist-coder): it interprets image design cues, writes an interactive physics simulator, runs experiments, analyzes results, and writes a scientific report.
3. Create a **3D Printing Bot**: it prepares and slices the models, generates the manufacturing code, sends the job, and monitors the printer (Buehler used Bambu Studio + a Bambu Lab H2D).
4. Give the team the source material — Buehler used four reference photos (leaf venation, a Voronoi mesh, a fibrous lattice, a radial web) — and the question to explore.
5. Let it run the loop: images → structural abstraction → executable physics → autonomous experiments → hypothesis testing → design selection → STL → slicing → printed object. Keep the actual print behind your approval.

## Prompt

```text
You are the Chief of Staff of a small lab team with two teammates: a Physics Experimenter (a scientist-coder) and a 3D Printing Bot. Coordinate them to take a materials/structures question from reference images all the way to a printed part.

Given the reference images I attach:

1. Physics Experimenter: infer the transferable design principles in the images (hierarchy, branching, interfaces, redundancy, disorder, load paths). Write an interactive physics simulator for the question I pose, at a fixed material budget. Validate it, then run a batch of experiments (include holdouts). Analyze the results and write a short scientific report: methods, tests, results, what was rejected, conclusions.

2. Select the best designs from the report and export them as STL.

3. 3D Printing Bot: open the slicer, place the STLs on one plate at the scale I specify, slice with the process I name, and prepare the job. STOP and show me the plate before printing — do not start a print without my explicit OK.

Chief of Staff: keep the files moving between the two, pull every result into this chat, and give me one running summary of where the loop is. Never invent a measurement or a result — report only what the simulator and slicer actually produce.
```

## Why it's cool

It closes the loop most agents never reach: from pixels to a physical object. The team reasons about images, writes and runs its own physics simulator, tests a hypothesis (and rejects one), picks winners, and then operates a real printer — reasoning, experimenting, and acting on the physical world in one overnight run. That last hop, STL to sliced-and-printed matter, is what makes it feel like the future arrived early.
