import type { SatteriProcessorOptions } from '@astrojs/markdown-satteri';
import { imageFolderFor, resolveImageSrc } from './image-folders';

type MdastPlugin = NonNullable<SatteriProcessorOptions['mdastPlugins']>[number];

/**
 * Markdown (Sätteri mdast) plugin: a bare filename in a body image, such as
 * `![A keyboard](PCBKeyboard.png)`, is rewritten to the entry's image folder
 * (src/lib/image-folders.ts). It runs before Astro collects the body's images,
 * so they are still optimised by astro:assets (responsive sizes, modern
 * formats, width and height). Files outside the content collections, and any
 * path that is not a bare filename, are left as written.
 *
 * Whether the file exists is checked by the content loader
 * (src/lib/image-check.ts), which names the entry and the folder.
 */
export const imageFolders: MdastPlugin = {
  name: 'image-folders',
  image(node, ctx) {
    if (!ctx.fileURL || !node.url) return;
    const entry = imageFolderFor(decodeURIComponent(ctx.fileURL.pathname));
    if (!entry) return;
    const url = resolveImageSrc(node.url, entry);
    if (url !== node.url) ctx.setField(node, 'url', url);
  },
};
