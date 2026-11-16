/**
 * Project showcase (src/components/Showcase.astro).
 *
 * Turns the list of projects into tabs and swaps the scene behind them. The
 * scenes are CSS animations; this script only decides whether they may run:
 * they play while the section is on screen, the visitor has not paused them
 * and reduced motion is not requested. Otherwise they hold still.
 */
const SCENE_MOTION_KEY = 'scene-motion';

function readPaused(): boolean {
  try {
    return localStorage.getItem(SCENE_MOTION_KEY) === 'paused';
  } catch {
    return false;
  }
}

function writePaused(paused: boolean): void {
  try {
    if (paused) localStorage.setItem(SCENE_MOTION_KEY, 'paused');
    else localStorage.removeItem(SCENE_MOTION_KEY);
  } catch {
    // Storage unavailable: the choice lasts for this page view.
  }
}

function initShowcase(root: HTMLElement): void {
  const list = root.querySelector<HTMLElement>('[data-showcase-tabs]');
  const tabs = [...root.querySelectorAll<HTMLAnchorElement>('[data-showcase-tab]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[data-showcase-panel]')];
  const scenes = [...root.querySelectorAll<HTMLElement>('[data-scene]')];
  if (!list || tabs.length === 0 || tabs.length !== panels.length) return;

  // --- Tabs ---
  list.setAttribute('role', 'tablist');
  list.setAttribute('aria-labelledby', 'showcase-heading');
  for (const item of list.children) item.setAttribute('role', 'presentation');

  tabs.forEach((tab, index) => {
    const panel = panels[index];
    if (!panel) return;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
  });

  function select(index: number, focus = false): void {
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[i]?.classList.toggle('is-active', selected);
      scenes[i]?.classList.toggle('is-active', selected);
      if (selected && focus) tab.focus();
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();
      select(index);
    });
    tab.addEventListener('keydown', (event) => {
      const last = tabs.length - 1;
      let target: number | undefined;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        target = index === last ? 0 : index + 1;
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        target = index === 0 ? last : index - 1;
      } else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = last;
      else if (event.key === ' ') target = index;
      if (target === undefined) return;
      event.preventDefault();
      select(target, true);
    });
  });

  // A link such as /#c-compiler opens on that project.
  const fromHash = () => panels.findIndex((panel) => `#${panel.id}` === location.hash);
  select(Math.max(fromHash(), 0));
  window.addEventListener('hashchange', () => {
    const index = fromHash();
    if (index !== -1) select(index);
  });

  // --- Scene playback ---
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = root.querySelector<HTMLButtonElement>('[data-scene-toggle]');
  let paused = readPaused();
  let inView = false;

  function sync(): void {
    const allowed = !reduceMotion.matches;
    const playing = allowed && !paused && inView;
    // `data-live` switches the animations on; without `data-playing` they are
    // held where they are. A scene that has never played shows its still.
    if (playing) root.setAttribute('data-live', '');
    root.toggleAttribute('data-playing', playing);
    // Pausing also stops the scroll parallax (see home.css).
    root.toggleAttribute('data-paused', paused);
    if (toggle) {
      toggle.hidden = !allowed;
      toggle.setAttribute('aria-pressed', String(paused));
      toggle.setAttribute(
        'aria-label',
        paused ? 'Play background animation' : 'Pause background animation',
      );
    }
  }

  toggle?.addEventListener('click', () => {
    paused = !paused;
    writePaused(paused);
    sync();
  });
  reduceMotion.addEventListener('change', sync);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? false;
      sync();
    }).observe(root);
  } else {
    inView = true;
  }
  sync();
}

const showcase = document.querySelector<HTMLElement>('[data-showcase]');
if (showcase) initShowcase(showcase);
