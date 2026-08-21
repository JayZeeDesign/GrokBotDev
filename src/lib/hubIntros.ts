// §6.2 hub intros: hand-written, 80–120 words, one markdown file per hub, never templated.
//
// The files live in `src/data/hub-intros/` (§5.1) and are read at build with Vite's
// eager glob so a missing file is detectable rather than a runtime fetch.
//
// GATE STATUS — read this before launch: §6.2 says a hub whose intro is missing, <60 or
// >160 words FAILS the build, and that all 83 files must exist at launch. That gate lives
// in `scripts/check-hub-intros.mjs` and is currently REPORT-ONLY, because the intros are
// being written across M3 phases. `HUB_INTRO_GATE=1` makes it fail, and M7 must run with
// the gate on. See BUILD-NOTES.

const files = import.meta.glob<string>('../data/hub-intros/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const byKey = new Map<string, string>();
for (const [path, body] of Object.entries(files)) {
  const key = path.replace('../data/hub-intros/', '').replace(/\.md$/, '');
  byKey.set(key, body.trim());
}

/** `categories/work` · `categories/work--tasks` · `integrations/slack` */
export function hubIntro(key: string): string | null {
  const body = byKey.get(key);
  if (!body) return null;
  // Intros are plain paragraphs; keep it to <p> wrapping so no markdown pipeline is needed.
  return body
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, ' ').trim()}</p>`)
    .join('\n');
}

export function hubIntroKeys(): string[] {
  return [...byKey.keys()];
}
