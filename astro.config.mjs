import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeSanitize from 'rehype-sanitize';
import tailwindcss from '@tailwindcss/vite';

const devPort = Number(process.env.PORT ?? 4380);

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
      serialize: (item) => item,
      // §6.5 owns the full exclusion rules (noindex + thin hubs, wired in M3).
      // §11 M1.2: /dev/components/ is never in the sitemap, even when it is built.
      filter: (page) => !page.includes('/dev/'),
    }),
  ],
  server: { host: true, port: devPort },
  vite: {
    plugins: [tailwindcss()],
    // §4.2 / §10.7: island scripts must ALWAYS ship as bundled /_astro/*.js files.
    // Astro inlines small hoisted script chunks by default, which the production CSP
    // (`script-src 'self'`, no 'unsafe-inline', no nonces) would block. 0 disables it.
    build: { assetsInlineLimit: 0 },
    server: process.env.ASTRO_DEV_HOST
      ? {
          allowedHosts: [process.env.ASTRO_DEV_HOST],
          hmr: { host: process.env.ASTRO_DEV_HOST, protocol: 'wss', clientPort: 443 },
        }
      : undefined,
  },
});
