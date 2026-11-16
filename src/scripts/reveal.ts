/**
 * Scroll reveal and header state.
 *
 * Progressive enhancement, and fail-safe by construction: content is visible
 * by default. Only elements that are below the fold when this script runs are
 * "armed" (hidden), and each is revealed once as it scrolls into view. If the
 * script never runs, nothing is ever hidden. With reduced motion, nothing is
 * armed at all.
 */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );

  for (const element of document.querySelectorAll<HTMLElement>('[data-reveal]')) {
    if (element.getBoundingClientRect().top > window.innerHeight) {
      element.classList.add('reveal-armed');
      observer.observe(element);
    }
  }
}

// Header gains a hairline once the page has scrolled away from the top.
const header = document.querySelector<HTMLElement>('[data-header]');
const sentinel = document.querySelector<HTMLElement>('[data-scroll-sentinel]');

if (header && sentinel && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    header.toggleAttribute('data-scrolled', entry !== undefined && !entry.isIntersecting);
  }).observe(sentinel);
}
