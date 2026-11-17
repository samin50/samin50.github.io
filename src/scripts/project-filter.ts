/**
 * Projects index: the context and tag filters.
 *
 * Without this script the filter chips are plain links to `?context=…` or
 * `?tag=…` and the page shows every project. With it, the two filters combine
 * (a project must match both) and work in place: cards and archive rows that
 * do not match are hidden, the address bar is updated so the view can be
 * shared, the counts on the chips follow the other filter, and the number
 * shown is announced. Tag chips and context badges on the cards do the same.
 */
type Key = 'context' | 'tag';
const KEYS: Key[] = ['context', 'tag'];

const bar = document.querySelector<HTMLElement>('[data-filter-bar]');
const chips = [...document.querySelectorAll<HTMLAnchorElement>('[data-filter]')];
const items = [...document.querySelectorAll<HTMLElement>('[data-project]')];
const groups = [...document.querySelectorAll<HTMLElement>('[data-filter-group]')];
const status = document.querySelector<HTMLElement>('[data-filter-status]');
const empty = document.querySelector<HTMLElement>('[data-filter-empty]');

const isKey = (value: string | undefined): value is Key => value === 'context' || value === 'tag';
const known: Record<Key, Set<string>> = { context: new Set(), tag: new Set() };
for (const chip of chips) {
  const key = chip.dataset.filter;
  if (isKey(key)) known[key].add(chip.dataset.value ?? '');
}

const state: Record<Key, string> = { context: '', tag: '' };

/** The filters in the address bar; a missing or unknown value means "all". */
function readUrl(): void {
  const params = new URLSearchParams(location.search);
  for (const key of KEYS) {
    const value = params.get(key) ?? '';
    state[key] = known[key].has(value) ? value : '';
  }
}

function matches(item: HTMLElement, context: string, tag: string): boolean {
  return (
    (context === '' || item.dataset.context === context) &&
    (tag === '' || (item.dataset.tags ?? '').split(' ').includes(tag))
  );
}

function apply(): void {
  let shown = 0;
  for (const item of items) {
    const match = matches(item, state.context, state.tag);
    item.hidden = !match;
    if (match) shown += 1;
  }
  // A section with nothing left in it goes too, heading and all.
  for (const group of groups) {
    group.hidden = group.querySelector('[data-project]:not([hidden])') === null;
  }
  if (empty) empty.hidden = shown > 0;

  for (const chip of chips) {
    const key = chip.dataset.filter;
    if (!isKey(key)) continue;
    const value = chip.dataset.value ?? '';
    const active = state[key] === value;
    chip.classList.toggle('is-active', active);
    chip.setAttribute('aria-pressed', String(active));
    // What choosing this chip would show, given the other filter as it stands.
    const count = items.filter((item) =>
      key === 'context' ? matches(item, value, state.tag) : matches(item, state.context, value),
    ).length;
    for (const slot of chip.querySelectorAll('[data-count]')) slot.textContent = String(count);
  }
  if (status) status.textContent = `${shown} ${shown === 1 ? 'project' : 'projects'} shown`;
}

function select(key: Key, value: string): void {
  state[key] = value;
  const params = new URLSearchParams();
  for (const k of KEYS) if (state[k] !== '') params.set(k, state[k]);
  const query = params.toString();
  history.replaceState(
    null,
    '',
    query === '' ? location.pathname : `${location.pathname}?${query}`,
  );
  apply();
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
    const link = event.target.closest<HTMLAnchorElement>(
      'a[data-filter], a[data-tag], a[data-context]',
    );
    if (!link) return;

    const chipKey = link.dataset.filter;
    const fromChip = isKey(chipKey);
    const key: Key = fromChip ? chipKey : link.dataset.tag !== undefined ? 'tag' : 'context';
    const value = fromChip
      ? (link.dataset.value ?? '')
      : (link.dataset.tag ?? link.dataset.context ?? '');
    if (!known[key].has(value)) return;

    event.preventDefault();
    // Pressing the chip that is already on turns that filter off again.
    select(key, fromChip && value === state[key] ? '' : value);
    // A tag or badge clicked on a card further down: bring the filters back into view.
    if (!fromChip && bar.getBoundingClientRect().top < 0) bar.scrollIntoView();
  });

  window.addEventListener('popstate', () => {
    readUrl();
    apply();
  });
  readUrl();
  apply();
}

// Makes this file a module, so its names stay its own.
export {};
