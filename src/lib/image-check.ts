import type { Loader } from 'astro/loaders';
import {
  imageFolderFor,
  resolveImageSrc,
  type EntryImageFolder,
  type ImageCollection,
} from './image-folders';

/**
 * Wraps a content loader so entries can name their images by filename alone
 * (decision AF-1; the convention is in src/lib/image-folders.ts).
 *
 * - Frontmatter: a bare filename in an image's `src` or a video's `poster`
 *   (in `cover` or `gallery[]`) is rewritten to the entry's image folder
 *   before the schema's `image()` sees it, so it is optimised by astro:assets
 *   exactly like a relative path. A video's `src` is left as it is: it is a
 *   path under public/.
 * - Body: bare filenames in Markdown images are rewritten by the Markdown
 *   plugin (src/lib/markdown-image-folders.ts), registered in astro.config.mjs.
 * - Once loading is done, every image an entry takes from its folder, in the
 *   frontmatter or the body, must exist (with the same case, as on GitHub
 *   Pages). A missing one fails `astro check` and `astro build` with an error
 *   naming the file, the entry and the folder; `astro dev` logs the same
 *   message when it starts and keeps running.
 */
export function withImageFolders(loader: Loader): Loader {
  return {
    ...loader,
    load: async (context) => {
      await loader.load({
        ...context,
        parseData: async (props) => {
          const entry = props.filePath ? imageFolderFor(props.filePath) : undefined;
          if (entry) resolveFrontmatter(props.data, entry);
          return context.parseData(props);
        },
      });

      const problems: string[] = [];
      for (const stored of context.store.values()) {
        const entry = stored.filePath ? imageFolderFor(stored.filePath) : undefined;
        if (!entry) continue;
        const references = [
          ...frontmatterImages(stored.data),
          ...(stored.rendered?.metadata?.imagePaths ?? []).map((path) => ({ field: 'body', path })),
        ];
        for (const { field, path } of references) {
          if (!path.startsWith(entry.fromEntry)) continue;
          const name = path.slice(entry.fromEntry.length);
          if (!ASSET_FILES.has(`${entry.folder}/${name}`)) {
            problems.push(missingMessage(name, field, entry));
          }
        }
      }
      if (problems.length === 0) return;
      // In `astro dev` (the only time there is a watcher) an error thrown here
      // would abort the sync and leave the dev server's content half-loaded,
      // so it is logged instead; the page using the image then shows Astro's
      // own image error. `astro check` and `astro build` fail.
      if (context.watcher) {
        for (const problem of problems) context.logger.error(problem);
      } else {
        throw new Error(problems.join('\n'));
      }
    },
  };
}

/**
 * Every file in the image folders, from the project root. Only the names are
 * used: nothing is imported. Keep the pattern in step with IMAGE_FOLDERS.
 */
const ASSET_FILES = new Set(
  Object.keys(import.meta.glob('../assets/{projects,experience}/**/*')).map((key) =>
    key.replace(/^\.\.\//, 'src/'),
  ),
);

const ENTRY_NOUN: Record<ImageCollection, string> = {
  projects: 'project',
  experience: 'experience entry',
};

function missingMessage(name: string, field: string, entry: EntryImageFolder): string {
  return (
    `Image "${name}" not found for ${ENTRY_NOUN[entry.collection]} "${entry.slug}" ` +
    `(${entry.file}, ${field}). Looked in ${entry.folder}/. ` +
    `Add the file there, or check the spelling and case of the name.`
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** The frontmatter's image media, with the field each one is in. */
function* mediaFields(data: Record<string, unknown>): Generator<[string, Record<string, unknown>]> {
  if (isRecord(data.cover)) yield ['cover', data.cover];
  if (Array.isArray(data.gallery)) {
    for (const [index, item] of data.gallery.entries()) {
      if (isRecord(item)) yield [`gallery.${index}`, item];
    }
  }
}

/**
 * The key holding a media item's optimised image: `src` for an image,
 * `poster` for a video (whose `src` is a file under public/).
 */
function imageKey(media: Record<string, unknown>): 'src' | 'poster' | undefined {
  if (media.type === 'image') return 'src';
  if (media.type === 'video') return 'poster';
  return undefined;
}

/** Rewrites bare image filenames in the raw frontmatter, in place. */
function resolveFrontmatter(data: Record<string, unknown>, entry: EntryImageFolder): void {
  for (const [, media] of mediaFields(data)) {
    const key = imageKey(media);
    const value = key ? media[key] : undefined;
    if (key && typeof value === 'string') media[key] = resolveImageSrc(value, entry);
  }
}

/** Image paths in the parsed frontmatter (which `image()` stores with a marker prefix). */
function frontmatterImages(data: Record<string, unknown>): { field: string; path: string }[] {
  const images: { field: string; path: string }[] = [];
  for (const [field, media] of mediaFields(data)) {
    const key = imageKey(media);
    const value = key ? media[key] : undefined;
    if (key && typeof value === 'string') {
      images.push({ field: `${field}.${key}`, path: value.replace(/^__ASTRO_IMAGE_/, '') });
    }
  }
  return images;
}
