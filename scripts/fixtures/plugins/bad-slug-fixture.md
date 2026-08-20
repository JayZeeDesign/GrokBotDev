---
type: plugin
name: "Bad Slug Fixture"
slug: Bad_Slug_Fixture
tagline: Failure class — slug is not kebab-case and does not match the filename.
category: engineering
subcategory: code-review
install_steps:
  - "This fixture exists to make `npm run validate` fail. It never ships."
works_with: [GitHub]
project_url: "https://example.com/fixtures/bad-slug"
author:
  handle: "fixture"
  url: "https://example.com/fixture"
  platform: web
added_at: "2026-08-20T00:00:00Z"
updated_at: "2026-08-20T00:00:00Z"
verified_at: "2026-08-20T00:00:00Z"
status: live
---

Golden fixture for §11 M2.5, failure class **bad slug**. The frontmatter slug is
`Bad_Slug_Fixture`, which breaks two rules at once: it is not kebab-case (§5.2) and it does
not equal the filename (§5.6 rule 1). Validation must reject this file and name both rules.

This body is padded past the 400-character plugin-description floor on purpose, so the run
fails on the slug rules being tested rather than on an unrelated body-length rule — a
fixture that fails for the wrong reason is worse than no fixture at all.
