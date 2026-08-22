#!/usr/bin/env node
// One-time backfill: populate the FINAL Awesome Use Case fields (headline, summary,
// categories[], format, awesome_score) on every use-case entry. Idempotent — skips files that
// already have `headline:`. Inserts lines right after `tagline:` so nothing else is touched.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';

const DIR = 'content/use-cases';

// Hand-set for the visible / recent / featured set (real hooks + scores). Everything else
// gets a tagline-seeded headline + a rubric-heuristic score, to be polished over time.
const OVERRIDES = {
  'marketing-os':                 { headline: 'Your whole marketing team, open-sourced',            score: 93, categories: ['marketing'] },
  'mine-my-machine-into-a-team':  { headline: 'Turn your messy machine into a real agent team',     score: 91, categories: ['engineering'] },
  'solo-newsletter-business':     { headline: 'Run a whole newsletter business while you sleep',     score: 82, categories: ['marketing'] },
  'email-triage-partner':         { headline: 'An inbox that triages itself every morning',          score: 77, categories: ['work', 'support'] },
  'role-based-agent-team':        { headline: 'Run daily GTM and dev on collaborating agents',       score: 74, categories: ['sales', 'marketing', 'engineering'] },
  'ai-research-desk':             { headline: 'A research desk that studies markets while you sleep', score: 72, categories: ['trading-crypto', 'data'] },
  'team-in-10-minutes':           { headline: 'A company with no employees, in ten minutes',         score: 71, categories: ['engineering'] },
  'grok-bot-masterclass':         { headline: 'The masterclass that makes Grok Bot click',           format: 'guide', categories: ['personal'] },
};

const q = (s) => JSON.stringify(s);

function heuristicScore(d, fmText) {
  const prov = d.prompt_provenance || '';
  const wid = ((d.what_it_does || '') + ' ' + (d.tagline || '')).toLowerCase();
  const hasInteg = Array.isArray(d.integrations) && d.integrations.length > 0;
  const isYt = /youtube-video/.test(fmText);
  const repro = prov.includes('author') ? 22 : prov.includes('curator') ? 16 : 12;
  const ambition = /(business|department|team|company|desk|whole|entire|agents)/.test(wid) ? 18
    : /(workflow|pipeline|daily|hourly|every|24\/7|weekly)/.test(wid) ? 13 : 8;
  const concrete = 14 + (hasInteg ? 3 : 0) + (isYt ? 2 : 0);
  const novelty = 9;
  const evidence = isYt ? 10 : /source_tweets:/.test(fmText) ? 6 : 4;
  const craft = 8;
  return Math.max(0, Math.min(100, repro + ambition + concrete + novelty + evidence + craft));
}

let done = 0, skipped = 0;
for (const file of readdirSync(DIR).filter((f) => f.endsWith('.md'))) {
  const path = join(DIR, file);
  const raw = readFileSync(path, 'utf8');
  if (/^headline:/m.test(raw)) { skipped++; continue; }
  const slug = file.replace(/\.md$/, '');
  const end = raw.indexOf('\n---', 3);
  const fmText = raw.slice(3, end);
  const d = parseYaml(fmText) ?? {};

  const ov = OVERRIDES[slug] || {};
  const headline = ov.headline || d.tagline || '';
  const categories = ov.categories || [d.category];
  const format = ov.format || 'use-case';
  const score = format === 'guide' ? null : (ov.score ?? heuristicScore(d, fmText));

  const lines = [
    `headline: ${q(headline)}`,
    `summary: ${q(d.what_it_does)}`, // JSON-quoted → always valid YAML, regardless of source formatting
    `categories: [${categories.join(', ')}]`,
    `format: ${format}`,
    ...(score != null ? [`awesome_score: ${score}`] : []),
  ];

  // insert right after the tagline line. FUNCTION replacement (not a string) so any `$` in the
  // content — e.g. "$199" — is emitted literally instead of being read as a $1 backreference.
  const block = lines.join('\n');
  const out = raw.replace(/^(tagline:.*)$/m, (m) => `${m}\n${block}`);
  writeFileSync(path, out);
  done++;
}
console.log(`backfill: wrote ${done}, skipped ${skipped} (already had headline)`);
