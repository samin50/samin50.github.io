// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';
import { imageFolders } from './src/lib/markdown-image-folders.ts';
import { externalLinks } from './src/lib/markdown-external-links.ts';

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
  // Code blocks in project pages are plain text styled by the site's own
  // tokens (src/styles/projects.css), so they follow the light and dark themes.
  // Images in a project's or role's Markdown body can be named by filename
  // alone, for the entry's own image folder (src/lib/image-folders.ts).
  markdown: {
    syntaxHighlight: false,
    // Links to other sites in those bodies open in a new tab (src/lib/links.ts).
    processor: satteri({ mdastPlugins: [imageFolders], hastPlugins: [externalLinks] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    dangerouslyProcessSVG: true, // Enable if you trust your SVG sources
  },
});
