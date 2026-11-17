/**
 * Scene playback, shared by the home page showcase and project page headers.
 *
 * The scenes are CSS animations (src/styles/home.css); this script only
 * decides whether they may run. A scene host (an element with `data-scenes`)
 * plays while it is on screen, the visitor has not paused the animations and
 * reduced motion is not requested. Otherwise its scene holds still. The pause
 * choice is remembered, and is the same choice on every page.
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

export function initScenePlayback(root: HTMLElement): void {
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
