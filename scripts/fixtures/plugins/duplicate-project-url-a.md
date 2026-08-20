---
type: plugin
name: "Duplicate Project URL A"
slug: duplicate-project-url-a
tagline: Failure class — two plugins pointing at one normalized project_url.
category: engineering
subcategory: code-review
install_steps:
  - "This fixture exists to make `npm run validate` fail. It never ships."
works_with: [GitHub]
project_url: "https://example.com/fixtures/same-target"
author:
  handle: "fixture"
  url: "https://example.com/fixture"
  platform: web
added_at: "2026-08-20T00:00:00Z"
updated_at: "2026-08-20T00:00:00Z"
verified_at: "2026-08-20T00:00:00Z"
status: live
---

Golden fixture for §11 M2.5, failure class **duplicate project_url** — the A half of the
pair. On its own this file is valid; paired with `duplicate-project-url-b.md` it must trip
§5.6 rule 3, which forbids two plugins sharing a normalized `project_url`.

The B half writes the same target with a trailing slash, a query string and a fragment, so
this pair also proves the normalization is the documented one: lowercase scheme and host,
strip the trailing slash, strip the entire query string and fragment.
