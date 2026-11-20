/**
 * Fits the gallery in the project page's right column (from 64rem) to the
 * body text beside it, so the column never runs past the text.
 *
 * It shows as many rows of thumbnails as fit between the top of the grid and
 * the bottom of the text, and never fewer than two thumbnails before the
 * "+N more" tile (so a gallery of three always shows all three; with the
 * minimum the column may run a little past the text). When some are left over,
 * the last one shown becomes a "+N more" tile: its thumbnail dimmed, with the
 * count over it. It still opens the lightbox at its own item, and the
 * lightbox steps through every item, hidden ones included.
 *
 * Below 64rem, and without this script, every thumbnail is shown.
 *
 * Each pass reads every size first and then writes, at most once a frame.
 * Thumbnail rows are all the same height (fixed frames, two-line caption room),
 * so how many fit does not depend on how many are shown.
 */
const WIDE = '(min-width: 64rem)';
/** Two real thumbnails, then the "+N more" tile (decision AA-3). */
const MINIMUM = 3;

/**
 * Shows the first `shown` items of a gallery and hides the rest; when some are
 * hidden, the last one shown becomes the "+N more" tile. Writes only.
 */
export function showFirst(items: HTMLLIElement[], shown: number): void {
  items.forEach((item, index) => {
    item.hidden = index >= shown;
    const link = item.querySelector<HTMLAnchorElement>('[data-lightbox]');
    if (!link) return;
    const more = index === shown - 1 && shown < items.length ? items.length - index - 1 : 0;
    let badge = link.querySelector<HTMLElement>('.gallery-more');
    if (more > 0) {
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'gallery-more';
        badge.setAttribute('aria-hidden', 'true');
        badge.append(document.createElement('span'));
        link.append(badge);
      }
      const count = badge.firstElementChild;
      if (count) count.textContent = `+${more} more`;
      link.classList.add('is-more');
      link.setAttribute(
        'aria-label',
        `${link.dataset.label ?? ''}, and ${more} more ${more === 1 ? 'item' : 'items'} in the gallery`,
      );
    } else if (badge) {
      badge.remove();
      link.classList.remove('is-more');
      if (link.dataset.label) link.setAttribute('aria-label', link.dataset.label);
    }
  });
}

/** The thumbnails of a gallery, in order. */
export function galleryItems(gallery: HTMLElement): HTMLLIElement[] {
  const grid = gallery.querySelector<HTMLElement>('[data-gallery-grid]');
  return [...(grid?.children ?? [])].filter(
    (item): item is HTMLLIElement => item instanceof HTMLLIElement,
  );
}

export function initGalleryFit(gallery: HTMLElement): void {
  const grid = gallery.querySelector<HTMLElement>('[data-gallery-grid]');
  const prose = gallery.parentElement?.querySelector<HTMLElement>(':scope > .prose');
  const glance = gallery.parentElement?.querySelector<HTMLElement>(':scope > .glance');
  if (!grid || !prose) return;
  const gridElement: HTMLElement = grid;
  const proseElement: HTMLElement = prose;
  const items = galleryItems(gallery);
  // The column style (no captions) applies to every gallery; fitting is only
  // needed when there are more than the minimum.
  gallery.setAttribute('data-fit', '');
  if (items.length <= MINIMUM) return;

  const wide = window.matchMedia(WIDE);
  let pending = 0;

  /** Read: how many thumbnails to show, or every one. */
  function measure(): number {
    const first = items[0];
    if (!wide.matches || !first) return items.length;
    const style = getComputedStyle(gridElement);
    const columns = style.gridTemplateColumns.split(' ').length;
    const gap = parseFloat(style.rowGap) || 0;
    // offsetHeight, not the bounding box: a thumbnail still rising into view has a transform.
    const tile = first.offsetHeight;
    const space =
      proseElement.getBoundingClientRect().bottom - gridElement.getBoundingClientRect().top;
    if (tile === 0) return items.length;
    const rows = Math.max(0, Math.floor((space + gap) / (tile + gap)));
    return Math.min(items.length, Math.max(MINIMUM, rows * columns));
  }

  function schedule(): void {
    if (pending) return;
    pending = requestAnimationFrame(() => {
      pending = 0;
      showFirst(items, measure());
    });
  }

  // The text grows as its pictures load and as fonts arrive; the column
  // changes width with the window. Either way the text or At a glance resizes.
  const observer = new ResizeObserver(schedule);
  observer.observe(prose);
  if (glance) observer.observe(glance);
  wide.addEventListener('change', schedule);
  void document.fonts.ready.then(schedule);
  schedule();
}
