import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { SlugRegistry } from './registry.js';

describe('SlugRegistry', () => {
  it('loads use-case slugs from markdown filenames', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'grokbot-slugs-'));
    try {
      await writeFile(join(dir, 'alpha-bot.md'), '---\nslug: alpha-bot\n---\n');
      await writeFile(join(dir, 'not-markdown.txt'), 'nope');
      const registry = new SlugRegistry({ contentDir: dir, refreshMs: 1 });
      expect(await registry.has('alpha-bot')).toBe(true);
      expect(await registry.has('not-markdown')).toBe(false);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
