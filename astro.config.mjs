// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

/**
 * Deployment target. This is the ONE place that says where the site is served from.
 *
 *   User site or custom domain (served from the root):  BASE = '/'
 *   Project site (served from a subpath):                BASE = '/<repo>/'
 *
 * Every internal link and asset URL is derived from BASE (see src/lib/paths.ts),
 * so moving the site is a change to these two constants and nothing else.
 */
const SITE = 'https://example.github.io'; // [[TODO: deployed site origin, e.g. https://<user>.github.io]]
const BASE = '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  vite: {
    plugins: [tailwindcss()],
  },
});
