---
type: plugin
name: "Duplicate Project URL B"
slug: duplicate-project-url-b
tagline: Failure class — the same target written with slash, query and fragment.
category: engineering
subcategory: code-review
install_steps:
  - "This fixture exists to make `npm run validate` fail. It never ships."
works_with: [GitHub]
project_url: "https://EXAMPLE.com/fixtures/same-target/?utm_source=x#readme"
author:
  handle: "fixture"
  url: "https://example.com/fixture"
  platform: web
added_at: "2026-08-20T00:00:00Z"
updated_at: "2026-08-20T00:00:00Z"
verified_at: "2026-08-20T00:00:00Z"
status: live
---

Golden fixture for §11 M2.5, failure class **duplicate project_url** — the B half. The URL
here is deliberately dressed up: uppercase host, trailing slash, a `utm_source` query and a
`#readme` fragment. Under §5.6 rule 3's normalization all of that is stripped, so it
collides with `duplicate-project-url-a.md` and validation must say so by name.

This is the fixture that catches a lazy dedupe implementation — a plain string comparison
passes this pair, and then two entries quietly claim the same project.
