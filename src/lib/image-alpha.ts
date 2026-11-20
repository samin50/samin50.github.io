import type { ImageMetadata } from 'astro';

/**
 * Whether a picture has transparent pixels, worked out at build time, so the
 * gallery and lightbox can give it a deliberate background (style guide §11.19).
 *
 * - SVG and GIF: assumed transparent.
 * - PNG: transparent only if some pixel is not fully opaque. An alpha channel
 *   alone is not enough (screenshots are often saved as RGBA with every pixel
 *   opaque), so the image data is decompressed and the alpha values read. A
 *   palette or grey/RGB PNG is transparent if it has a `tRNS` chunk.
 * - WebP: transparent if its header says it has alpha.
 * - Anything else (JPEG, AVIF, …): opaque.
 *
 * The file is read through an `?inline` import (a data URL), which needs no
 * Node APIs. Results are cached per file.
 */
const FILES = import.meta.glob<string>('/src/assets/**/*.{png,PNG,webp,WEBP}', {
  query: '?inline',
  import: 'default',
});

const cache = new Map<string, Promise<boolean>>();

/** The picture's file, from the project root ('/src/assets/…'), if known. */
function sourceKey(image: ImageMetadata): string | undefined {
  // Astro keeps the source path on the metadata as a non-enumerable property.
  const fsPath: unknown = Reflect.get(image, 'fsPath');
  if (typeof fsPath !== 'string') return undefined;
  const path = fsPath.replaceAll('\\', '/');
  const at = path.indexOf('/src/assets/');
  return at === -1 ? undefined : path.slice(at);
}

export function hasTransparency(image: ImageMetadata): Promise<boolean> {
  const format = image.format.toLowerCase();
  if (format === 'svg' || format === 'gif') return Promise.resolve(true);
  if (format !== 'png' && format !== 'webp') return Promise.resolve(false);
  const key = sourceKey(image);
  const load = key ? FILES[key] : undefined;
  if (!key || !load) return Promise.resolve(false);
  let result = cache.get(key);
  if (!result) {
    result = load()
      .then((dataUrl) => decode(dataUrl.slice(dataUrl.indexOf(',') + 1)))
      .then((bytes) => (format === 'png' ? pngHasTransparency(bytes) : webpHasAlpha(bytes)))
      .catch(() => false);
    cache.set(key, result);
  }
  return result;
}

function decode(base64: string): Uint8Array<ArrayBuffer> {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

const u32 = (b: Uint8Array, at: number) =>
  ((b[at] ?? 0) << 24) | ((b[at + 1] ?? 0) << 16) | ((b[at + 2] ?? 0) << 8) | (b[at + 3] ?? 0);
const tag = (b: Uint8Array, at: number) =>
  String.fromCharCode(b[at] ?? 0, b[at + 1] ?? 0, b[at + 2] ?? 0, b[at + 3] ?? 0);

/** VP8X header with its alpha flag, or a lossless (VP8L) image with its alpha bit. */
function webpHasAlpha(b: Uint8Array): boolean {
  const chunk = tag(b, 12);
  if (chunk === 'VP8X') return ((b[20] ?? 0) & 0x10) !== 0;
  if (chunk === 'VP8L') return ((b[24] ?? 0) & 0x10) !== 0;
  return false;
}

async function pngHasTransparency(b: Uint8Array<ArrayBuffer>): Promise<boolean> {
  if (tag(b, 12) !== 'IHDR') return false;
  const width = u32(b, 16) >>> 0;
  const bitDepth = b[24] ?? 8;
  const colourType = b[25] ?? 0;
  const interlaced = (b[28] ?? 0) !== 0;
  const parts: Uint8Array<ArrayBuffer>[] = [];
  for (let at = 8; at + 8 <= b.length;) {
    const length = u32(b, at) >>> 0;
    const type = tag(b, at + 4);
    if (type === 'tRNS') return true;
    if (type === 'IDAT') parts.push(b.subarray(at + 8, at + 8 + length));
    if (type === 'IEND') break;
    at += 12 + length;
  }
  // Only grey + alpha (4) and RGBA (6) carry per-pixel alpha; 8-bit only, not
  // interlaced (anything else is treated as transparent, to be safe).
  if (colourType !== 4 && colourType !== 6) return false;
  if (bitDepth !== 8 || interlaced) return true;
  const channels = colourType === 6 ? 4 : 2;
  const pixels = await inflate(parts);
  return alphaBelowOpaque(pixels, width, channels);
}

async function inflate(parts: Uint8Array<ArrayBuffer>[]): Promise<Uint8Array> {
  const stream = new Blob(parts).stream().pipeThrough(new DecompressionStream('deflate'));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

/** Undoes each scanline's filter and looks for any alpha byte under 255. */
function alphaBelowOpaque(data: Uint8Array, width: number, channels: number): boolean {
  const stride = width * channels;
  let previous = new Uint8Array(stride);
  let row = new Uint8Array(stride);
  for (let at = 0; at + stride < data.length + 1; at += stride + 1) {
    const filter = data[at] ?? 0;
    for (let x = 0; x < stride; x++) {
      const raw = data[at + 1 + x] ?? 0;
      const left = x >= channels ? (row[x - channels] ?? 0) : 0;
      const up = previous[x] ?? 0;
      const upLeft = x >= channels ? (previous[x - channels] ?? 0) : 0;
      let value = raw;
      if (filter === 1) value = raw + left;
      else if (filter === 2) value = raw + up;
      else if (filter === 3) value = raw + ((left + up) >> 1);
      else if (filter === 4) {
        const p = left + up - upLeft;
        const pa = Math.abs(p - left);
        const pb = Math.abs(p - up);
        const pc = Math.abs(p - upLeft);
        value = raw + (pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft);
      }
      row[x] = value & 0xff;
    }
    for (let x = channels - 1; x < stride; x += channels) if ((row[x] ?? 255) < 255) return true;
    [previous, row] = [row, previous];
  }
  return false;
}
