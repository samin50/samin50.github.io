/**
 * Projects index: tag filter.
 *
 * Without this script the filter chips are plain links to `?tag=…` and the
 * page shows every project. With it, a chip filters the page in place: cards
 * and archive rows that do not carry the tag are hidden, the address bar is
 * updated so the view can be shared, and the number shown is announced.
 * Tag chips on the cards do the same.
 */
const bar = document.querySelector<HTMLElement>('[data-filter-bar]');
const chips = [...document.querySelectorAll<HTMLAnchorElement>('[data-filter]')];
const items = [...document.querySelectorAll<HTMLElement>('[data-project]')];
const groups = [...document.querySelectorAll<HTMLElement>('[data-filter-group]')];
const status = document.querySelector<HTMLElement>('[data-filter-status]');

const known = new Set(chips.map((chip) => chip.dataset.filter ?? ''));

/** The tag in the address bar, or '' (everything) if it is missing or unknown. */
function tagFromUrl(): string {
  const tag = new URLSearchParams(location.search).get('tag') ?? '';
  return known.has(tag) ? tag : '';
}

let current = '';

function apply(tag: string): void {
  current = tag;
  let shown = 0;
  for (const item of items) {
    const match = tag === '' || (item.dataset.tags ?? '').split(' ').includes(tag);
    item.hidden = !match;
    if (match) shown += 1;
  }
  // A section with nothing left in it goes too, heading and all.
  for (const group of groups) {
    group.hidden = group.querySelector('[data-project]:not([hidden])') === null;
  }
  for (const chip of chips) {
    const active = (chip.dataset.filter ?? '') === tag;
    chip.classList.toggle('is-active', active);
    chip.setAttribute('aria-pressed', String(active));
  }
  if (status) status.textContent = `${shown} ${shown === 1 ? 'project' : 'projects'} shown`;
}

function select(tag: string): void {
  const target = tag === '' ? location.pathname : `${location.pathname}?tag=${tag}`;
  history.replaceState(null, '', target);
  apply(tag);
}

if (bar && chips.length > 0) {
  // With the script the chips behave as toggle buttons, so they are announced
  // as buttons with a pressed state.
  for (const chip of chips) {
    chip.setAttribute('role', 'button');
    chip.addEventListener('keydown', (event) => {
      if (event.key !== ' ') return;
      event.preventDefault();
      chip.click();
    });
  }

  document.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[data-filter], a[data-tag]');
    if (!link) return;
    const tag = link.dataset.filter ?? link.dataset.tag ?? '';
    if (!known.has(tag)) return;
    event.preventDefault();
    // Pressing the chip that is already on turns the filter off again.
    select(link.dataset.filter !== undefined && tag === current ? '' : tag);
    // A tag clicked on a card further down: bring the filter back into view.
    if (link.dataset.tag !== undefined && bar.getBoundingClientRect().top < 0) {
      bar.scrollIntoView();
    }
  });

  window.addEventListener('popstate', () => apply(tagFromUrl()));
  apply(tagFromUrl());
}

// Makes this file a module, so its names stay its own.
export {};
