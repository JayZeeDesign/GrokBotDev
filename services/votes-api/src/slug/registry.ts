import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join } from 'node:path';

export class SlugRegistry {
  private slugs = new Set<string>();
  private lastLoad = 0;
  private readonly refreshMs: number;
  private readonly contentDir: string;
  private readonly slugsFile?: string;
  private readonly slugsUrl?: string;

  constructor(opts: { contentDir: string; slugsFile?: string; slugsUrl?: string; refreshMs?: number }) {
    this.contentDir = opts.contentDir;
    this.slugsFile = opts.slugsFile;
    this.slugsUrl = opts.slugsUrl;
    this.refreshMs = opts.refreshMs ?? 10 * 60_000;
  }

  async load(force = false): Promise<Set<string>> {
    if (!force && this.slugs.size > 0 && Date.now() - this.lastLoad < this.refreshMs) return this.slugs;
    const fromContent = await this.loadFromContentDir().catch(() => new Set<string>());
    const next = fromContent.size ? fromContent : await this.loadFallbacks();
    if (!next.size) throw new Error('no use-case slugs loaded');
    this.slugs = next;
    this.lastLoad = Date.now();
    return this.slugs;
  }

  async has(slug: string): Promise<boolean> {
    const slugs = await this.load();
    return slugs.has(slug);
  }

  async all(): Promise<string[]> {
    return [...(await this.load())].sort();
  }

  private async loadFromContentDir(): Promise<Set<string>> {
    const entries = await readdir(this.contentDir, { withFileTypes: true });
    return new Set(
      entries
        .filter((entry) => entry.isFile() && extname(entry.name) === '.md' && !entry.name.startsWith('.'))
        .map((entry) => entry.name.replace(/\.md$/, ''))
    );
  }

  private async loadFallbacks(): Promise<Set<string>> {
    if (this.slugsFile && existsSync(this.slugsFile)) {
      const parsed = JSON.parse(await readFile(this.slugsFile, 'utf8')) as { slugs?: string[] } | string[];
      const slugs = Array.isArray(parsed) ? parsed : parsed.slugs ?? [];
      return new Set(slugs);
    }
    if (this.slugsUrl) {
      const res = await fetch(this.slugsUrl, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) throw new Error(`slug fetch failed: ${res.status}`);
      const parsed = (await res.json()) as { slugs?: string[] } | { items?: Array<{ slug: string }> };
      if ('slugs' in parsed && parsed.slugs) return new Set(parsed.slugs);
      if ('items' in parsed && parsed.items) return new Set(parsed.items.map((item) => item.slug));
    }
    // Absolute last fallback for unusual working dirs: the repo root two levels above service.
    const repoContentDir = join(process.cwd(), 'content', 'use-cases');
    const entries = await readdir(repoContentDir, { withFileTypes: true });
    return new Set(entries.filter((entry) => entry.isFile() && entry.name.endsWith('.md')).map((entry) => entry.name.replace(/\.md$/, '')));
  }
}
