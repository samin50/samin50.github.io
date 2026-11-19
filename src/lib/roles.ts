import type { ImageMetadata } from 'astro';
import type { Role } from './projects';

/**
 * Splits a role's rendered Markdown into the parts the Experience page lays
 * out separately (decisions AB-1 to AB-3), without changing the Markdown:
 *
 * - `detail`: everything before the first `###` heading (the bullets or the
 *   opening paragraph);
 * - `highlights`: one HTML string per `###` section (a tool or piece of work);
 * - `images`: the Markdown images, taken out of the text and shown in the
 *   card's gallery instead, in the order they appear.
 *
 * HTML comments (notes to the owner in the Markdown) are left out of the page.
 */
export interface RoleParts {
  detail: string;
  highlights: string[];
  images: { type: 'image'; src: ImageMetadata; alt: string }[];
}

/** Every picture under src/assets/experience/, by its path from the project root. */
const pictures = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/experience/**/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
);

/**
 * Astro leaves each Markdown image in the stored HTML as a placeholder,
 * `<img __ASTRO_IMAGE_="{json}">` (usually alone in its paragraph), and
 * resolves it only when the entry is rendered with `render()`. Here they are
 * taken out and resolved by hand.
 */
const IMAGE = /(?:<p>\s*)?<img __ASTRO_IMAGE_="([^"]*)"\s*\/?>(?:\s*<\/p>)?/g;

function decodeAttribute(value: string): string {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, decimal: string) => String.fromCodePoint(Number(decimal)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function isImageData(value: unknown): value is { src: string; alt: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'src' in value &&
    typeof value.src === 'string' &&
    'alt' in value &&
    typeof value.alt === 'string'
  );
}

export function splitRole(role: Role): RoleParts {
  const html = role.rendered?.html;
  if (html === undefined) throw new Error(`Experience entry ${role.id} has no rendered HTML`);
  // Image paths in the Markdown are relative to the entry's own file.
  const file = new URL(role.filePath ?? `src/content/experience/${role.id}.md`, 'file:///');

  const images: RoleParts['images'] = [];
  const text = html.replace(/<!--[\s\S]*?-->/g, '').replace(IMAGE, (_, attribute: string) => {
    const data: unknown = JSON.parse(decodeAttribute(attribute));
    if (!isImageData(data)) throw new Error(`Unreadable image in experience entry ${role.id}`);
    const path = new URL(data.src, file).pathname;
    const picture = pictures[path];
    if (!picture) throw new Error(`Experience entry ${role.id}: no image at ${path}`);
    images.push({ type: 'image', src: picture.default, alt: data.alt });
    return '';
  });
  if (text.includes('__ASTRO_IMAGE_')) {
    throw new Error(`Experience entry ${role.id}: an image could not be moved to the gallery`);
  }

  // A zero-width split never yields an empty first part, so when the text
  // opens with a highlight there is no detail.
  const parts = text
    .trim()
    .split(/(?=<h3[\s>])/)
    .map((part) => part.trim());
  const detail = parts[0]?.startsWith('<h3') ? '' : (parts.shift() ?? '');
  return { detail, highlights: parts.filter((part) => part !== ''), images };
}
