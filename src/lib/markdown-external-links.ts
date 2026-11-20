import type { SatteriProcessorOptions } from '@astrojs/markdown-satteri';
import { newTabAttrs } from './links';

type HastPlugin = NonNullable<SatteriProcessorOptions['hastPlugins']>[number];

/**
 * Markdown (Sätteri hast) plugin: a link in a project's or role's body that
 * leaves the site (or points at a PDF) opens in a new tab, like every other
 * such link on the site (src/lib/links.ts). Registered in astro.config.mjs.
 */
export const externalLinks: HastPlugin = {
  name: 'external-links',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      const href = node.properties?.href;
      if (typeof href !== 'string') return;
      const attrs = newTabAttrs(href);
      if (!attrs.target) return;
      ctx.setProperty(node, 'target', attrs.target);
      ctx.setProperty(node, 'rel', attrs.rel?.split(' '));
      ctx.setProperty(node, 'ariaDescribedBy', attrs['aria-describedby']);
    },
  },
};
