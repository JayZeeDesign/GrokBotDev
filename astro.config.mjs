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
      filter: () => true,
    }),
  ],
  server: { host: true, port: devPort },
  vite: {
    plugins: [tailwindcss()],
    server: process.env.ASTRO_DEV_HOST
      ? {
          allowedHosts: [process.env.ASTRO_DEV_HOST],
          hmr: { host: process.env.ASTRO_DEV_HOST, protocol: 'wss', clientPort: 443 },
        }
      : undefined,
  },
});
