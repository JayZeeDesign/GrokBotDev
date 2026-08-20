import { existsSync } from 'node:fs';

const required = [
  'src/styles/tokens.css',
  'src/styles/global.css',
  'src/layouts/BaseLayout.astro',
  'src/components/SiteHeader.astro',
  'src/components/Footer.astro',
  'src/components/MarkGlyph.astro',
  'src/components/NavLink.astro',
  'src/data/redirects.json',
];

const missing = required.filter((file) => !existsSync(file));
if (missing.length) {
  console.error(`validate: missing scaffold files: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('validate: M0 scaffold files present');
