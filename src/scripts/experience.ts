/**
 * Experience page: the gallery lightbox, "+N more" for long role galleries,
 * and the sticky left column of each role card (decisions AB-1 and AB-3).
 *
 * All are enhancements. Without this script every thumbnail is shown and is a
 * plain link to its picture, and the left column scrolls with the card.
 */
import './lightbox';
import { galleryItems, showFirst } from './gallery-fit';

/** A role gallery shows at most four tiles, the fourth a "+N more" tile. */
const MAX_TILES = 4;

for (const gallery of document.querySelectorAll<HTMLElement>('.role-gallery')) {
  const items = galleryItems(gallery);
  if (items.length > MAX_TILES) showFirst(items, MAX_TILES);
}

/**
 * The left column (dates, title, organisation, summary) stays in view while
 * the right column scrolls, only where that is safe: from 64rem, when the
 * column fits on screen below the site header, and when it is shorter than
 * the right column. Otherwise it scrolls with the card as normal.
 */
const WIDE = window.matchMedia('(min-width: 64rem)');
const cards = [...document.querySelectorAll<HTMLElement>('[data-role-card]')].flatMap((card) => {
  const identity = card.querySelector<HTMLElement>('.role-identity');
  const main = card.querySelector<HTMLElement>('.role-main');
  return identity && main ? [{ card, identity, main }] : [];
});

let pending = 0;
function update(): void {
  if (pending) return;
  pending = requestAnimationFrame(() => {
    pending = 0;
    // Read every size first, then write.
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const decisions = cards.map(({ card, identity, main }) => {
      const top = parseFloat(getComputedStyle(card).getPropertyValue('--role-sticky-top')) * rem;
      const height = identity.offsetHeight;
      return (
        WIDE.matches &&
        height + (top || 0) + rem <= window.innerHeight &&
        height < main.offsetHeight
      );
    });
    cards.forEach(({ card }, index) => card.toggleAttribute('data-sticky', decisions[index]));
  });
}

if (cards.length > 0) {
  const observer = new ResizeObserver(update);
  for (const { identity, main } of cards) {
    observer.observe(identity);
    observer.observe(main);
  }
  // The window's height decides whether the column fits; observers only see widths changing.
  window.addEventListener('resize', update);
  WIDE.addEventListener('change', update);
  update();
}
