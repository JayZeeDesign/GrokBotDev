# Security Policy

grokbot.dev is a **static site** built from Markdown in this repo. There is no server-side
application, no database, and no user accounts. The runtime attack surface is minimal.

## Reporting a vulnerability
Please **do not** open a public issue for security problems. Email **hello@grokbot.dev** with
details and steps to reproduce. We'll acknowledge within a few days.

## What we consider in scope
- The website (grokbot.dev), the JSON API under `/api/v1/`, and the build/CI pipeline.
- Content-integrity issues (e.g. a way to bypass the validator and publish fabricated or unsafe
  content) — those matter to us as much as classic vulns.

## Known, accepted build-time advisories
`npm audit` reports advisories in **build-only** dev dependencies (e.g. `esbuild`, `sharp`/libvips)
that are pulled in by Astro 5, which this project pins per its PRD. These run only at build time
on our own machines and are **not exposed at runtime** (the output is static files). We track
Astro's upgrade path and will move when a non-breaking fix is available. If you believe one is
actually runtime-exploitable here, please report it.
