> 📕 **Read [CONTRIBUTING.md](../blob/main/CONTRIBUTING.md) first** — it's the rulebook (every
> field, the quality bar, the Awesome Score). Reviewers cite it by rule number (G1–G8, UC-n, PL-n).

## What this adds
<!-- One line: entry name + type (plugin / use-case / collection). -->

## Checklist
- [ ] This PR adds exactly ONE new file under `content/` (plus assets for this entry, if any).
- [ ] It follows [CONTRIBUTING.md](../blob/main/CONTRIBUTING.md) — required fields + the golden rules (G1–G8).
- [ ] `npm run validate` passes locally (schema, slug, vocabularies).
- [ ] `slug` is kebab-case and exactly matches the filename.
- [ ] I ran / used this myself end to end — it works today.
- [ ] Every URL in the frontmatter resolves to real, relevant content.
- [ ] The prompt body is the real, complete prompt — not a summary or a teaser.
- [ ] The entry body is plain markdown — no raw HTML (`<script>`, `<iframe>`, `<style>`, `<form>`, inline event handlers). CI rejects it (§8.5).
- [ ] I did NOT set `verified_at` or `status: live` — a maintainer sets those during verification (§10.1).
- [ ] This is not an ad. A listing that exists to funnel traffic to your product gets closed. Sponsor slots will exist for that — this isn't one.
- [ ] If this is someone else's work: `author` is the original creator, the origin is linked (`source_url` for a plugin, `source_tweets[]` for a use case), and `scouted_by` is me.
- [ ] If the source is a YouTube video: `primary_source` is `kind: youtube-video` with a `youtube.com/watch`, `youtu.be/` or `youtube.com/shorts/` URL, plus the video's real `title` and `channel` — those two are required because they are what the page shows if the player never loads. `timestamp` is optional and is written `mm:ss`.
- [ ] I license this contribution under CC BY 4.0 (attribution: entry author + grokbot.dev).

## Where it came from
<!-- Link the source post / video / repo / your own writeup. -->
