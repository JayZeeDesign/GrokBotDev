import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeSanitize from 'rehype-sanitize';
import tailwindcss from '@tailwindcss/vite';
import { sitemapData } from './scripts/sitemap-data.mjs';

const devPort = Number(process.env.PORT ?? 4380);
const devHost = process.env.ASTRO_DEV_HOST;

// §6.5 — real lastmod per URL + the exclusion set, computed from content/ at config load.
const { lastmod: SITEMAP_LASTMOD, noindex: SITEMAP_NOINDEX, hubUrls: SITEMAP_HUBS } = sitemapData();
const BUILD_STAMP = new Date().toISOString();
const pathOf = (url) => new URL(url).pathname;

export default defineConfig({
  site: 'https://grokbot.dev',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  markdown: {
    rehypePlugins: [rehypeSanitize],
  },
  integrations: [
    sitemap({
      // §6.5: entry pages carry their `updated_at`; hubs carry max(updated_at) of their
      // entries; static, editorial and paginated pages carry the build timestamp.
      // priority/changefreq stay unset deliberately — Google ignores them.
      serialize: (item) => ({ ...item, lastmod: SITEMAP_LASTMOD.get(pathOf(item.url)) ?? BUILD_STAMP }),
      // §6.5 drops every URL that must not be indexed: thin hubs, /search/, deprecated and
      // demo entries, /subscribed/, /dev/*, plus the machine surfaces and OG images (which
      // the integration never discovers anyway).
      filter: (page) => {
        const path = pathOf(page);
        if (path.includes('/dev/')) return false;
        if (path.startsWith('/api/') || path.startsWith('/og/')) return false;
        return !SITEMAP_NOINDEX.has(path);
      },
    }),
  ],
  server: {
    host: true,
    port: devPort,
    ...(devHost ? { allowedHosts: [devHost] } : {}),
  },
  vite: {
    plugins: [tailwindcss()],
    // §4.2 / §10.7: island scripts must ALWAYS ship as bundled /_astro/*.js files.
    // Astro inlines small hoisted script chunks by default, which the production CSP
    // (`script-src 'self'`, no 'unsafe-inline', no nonces) would block. 0 disables it.
    build: { assetsInlineLimit: 0 },
    server: devHost
      ? {
          allowedHosts: [devHost],
          hmr: { host: devHost, protocol: 'wss', clientPort: 443 },
        }
      : undefined,
  },
});
