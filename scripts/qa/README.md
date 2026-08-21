# scripts/qa — the §11 M3.8 / M7.1 wireframe QA harness

Not a build gate. This is the harness that ran the M7.1 QA pass, kept in the repo because
**§11 M7.1 and M7.2 have to be re-run against production**, and re-deriving the probes by
hand would lose the checks that actually caught things.

Dependency note (§12.5): **no packages added.** `sweep.sh` drives the `agent-browser` CLI
that is already on the box; the probes are plain browser JS evaluated in the page.

## Running it

```bash
npm run build
npm run preview -- --host --port 4381     # or point BASE at the live host
bash scripts/qa/sweep.sh
```

Writes one JSON line per page/breakpoint to `scripts/qa/last-run.jsonl` (gitignored) and a
full-page screenshot per page/breakpoint to the `OUT` directory set at the top of the script.

## What each probe checks

**`page-probe.js`** — run on every page at 1440 / 768 / 390 (§4.5's lg / md / <sm bands):

- horizontal overflow, measured **per element** against the viewport, not just
  `document.scrollWidth` — an absolutely positioned panel can hang off the viewport without
  moving the document's scroll width until it is opened
- §4.6 landmarks: exactly one `<header>`, one `<main id="main">`, one `<footer>`, one `<h1>`,
  no unlabelled `<nav>`, skip link present
- computed grid column counts, to check against §4.5's responsive table
- region order inside `<main>`, for the §4.3 wireframe comparison
- the heading outline

**`hero-probe.js`** — A4's "nothing covers `#content`" rule. Compares every `#botlayer`
child's box against **tight text-line boxes** taken from `Range.getClientRects()`, not the
elements' border boxes: a block `h1` spans the whole column and starts above the ascender, so
a border-box test reports overlap for bots resting cleanly above the headline. Bot boxes stay
at full size, so the test is conservative — zero hits means zero visual coverage.

Load the home page several times to get fresh seeds (the seed is visible in the stage's
top-right and readable from `#seedLabel`), and check `?static=1` for the deterministic pile.

## Two things that are easy to get wrong

1. **axe ignores hidden headings.** A source-order outline check passes on entry pages while
   Lighthouse still reports `heading-order`, because the `InstallModal`'s `h2` does not count
   while the modal is closed. Strip the closed modal before checking the outline.
2. **Pagefind lowercases the filter values it indexes** from chip text, and its comma-delimited
   `data-pagefind-meta="k:v, k:v"` form does not survive a value containing `/` or `:`. Both
   were found by measurement here; see the M7-local BUILD-NOTES entry.
