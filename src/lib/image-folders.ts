/**
 * Image folders by convention (decision AF-1, style guide §12).
 *
 * Each entry has its own image folder, named after the entry's file:
 *
 *   src/content/projects/wireless-split-keyboard.md
 *   → src/assets/projects/wireless-split-keyboard/
 *
 * A bare filename (no folder) in the entry's cover, gallery or Markdown body,
 * such as `PCBKeyboard.png`, means a file in that folder. Anything else (a
 * relative path such as `../../assets/placeholders/placeholder.svg`, a URL) is
 * left exactly as written.
 *
 * Pure string handling, shared by the content loader (src/lib/image-check.ts)
 * and the Markdown plugin (src/lib/markdown-image-folders.ts).
 */

/** Collection → its image folder, from the project root. */
export const IMAGE_FOLDERS = {
  projects: 'src/assets/projects',
  experience: 'src/assets/experience',
} as const;

export type ImageCollection = keyof typeof IMAGE_FOLDERS;

function isImageCollection(name: string): name is ImageCollection {
  return Object.hasOwn(IMAGE_FOLDERS, name);
}

/** A filename with no folder and no scheme: `PCBKeyboard.png`, not `./x.png` or `https://…`. */
export function isBareFilename(src: string): boolean {
  return src !== '' && src !== '.' && src !== '..' && !/[/\\:]/.test(src);
}

export interface EntryImageFolder {
  collection: ImageCollection;
  /** The entry's file name without its extension. */
  slug: string;
  /** The entry's file, from the project root: 'src/content/projects/x.md'. */
  file: string;
  /** The folder, from the project root: 'src/assets/projects/x'. */
  folder: string;
  /** The folder, relative to the entry's file (how Astro resolves image paths), with a trailing slash. */
  fromEntry: string;
}

/**
 * The image folder for a content file, given its path in any form (absolute,
 * from the project root, Windows or POSIX separators). Undefined for files
 * outside the collections above.
 */
export function imageFolderFor(filePath: string): EntryImageFolder | undefined {
  const path = filePath.replaceAll('\\', '/');
  const match = /(?:^|\/)(src\/content\/([^/]+)\/((?:[^/]+\/)*)([^/]+)\.mdx?)$/.exec(path);
  const [, file, collection, dirs, slug] = match ?? [];
  if (!file || !collection || dirs === undefined || !slug || !isImageCollection(collection)) {
    return undefined;
  }
  const folder = `${IMAGE_FOLDERS[collection]}/${slug}`;
  // Up from src/content/<collection>/<dirs…>/ to the project root.
  const depth = 3 + dirs.split('/').length - 1;
  return { collection, slug, file, folder, fromEntry: `${'../'.repeat(depth)}${folder}/` };
}

/** A bare filename's path relative to the entry's file; anything else unchanged. */
export function resolveImageSrc(src: string, entry: EntryImageFolder): string {
  return isBareFilename(src) ? `${entry.fromEntry}${src}` : src;
}
