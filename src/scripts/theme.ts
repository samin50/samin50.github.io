/**
 * Theme switching.
 *
 * The initial theme is applied by a tiny inline script in <head> (see
 * BaseLayout.astro) before first paint, so there is no flash. This module only
 * wires up the toggle button(s): dark is the default, the choice is remembered
 * in localStorage, and the swap cross-fades where View Transitions are
 * available and the visitor has not asked for reduced motion.
 */
type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';
const root = document.documentElement;
const buttons = document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');
const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

function currentTheme(): Theme {
  return root.dataset['theme'] === 'light' ? 'light' : 'dark';
}

function syncControls(): void {
  const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
  for (const button of buttons) {
    button.setAttribute('aria-label', `Switch to ${next} theme`);
  }
  // Keep the browser chrome in step with the page background.
  // (`--chrome` is a plain hex copy of the background for directions whose
  // `--bg` is written in OKLCH, which not every browser accepts here.)
  const styles = getComputedStyle(root);
  const colour =
    styles.getPropertyValue('--chrome').trim() || styles.getPropertyValue('--bg').trim();
  themeColor?.setAttribute('content', colour);
}

function setTheme(theme: Theme): void {
  root.dataset['theme'] = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies); the theme
    // still changes for this page view.
  }
  syncControls();
}

function toggleTheme(): void {
  const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceMotion && 'startViewTransition' in document) {
    document.startViewTransition(() => {
      setTheme(next);
    });
  } else {
    setTheme(next);
  }
}

for (const button of buttons) {
  button.hidden = false;
  button.addEventListener('click', toggleTheme);
}
syncControls();
