/**
 * Scroll reveal and header state.
 *
 * Progressive enhancement, and fail-safe by construction: content is visible
 * by default. Only elements that are below the fold when this script runs are
 * "armed" (hidden), and each is revealed once as it scrolls into view. If the
 * script never runs, nothing is ever hidden. With reduced motion, nothing is
 * armed at all.
 *
 * Once an element's reveal has finished, its reveal classes are removed, so
 * its own styles apply again (a revealed card still lifts on hover).
 */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function reveal(element: Element): void {
  element.addEventListener('transitionend', function done(event) {
    if (!(event instanceof TransitionEvent)) return;
    if (event.target !== element || event.propertyName !== 'opacity') return;
    element.removeEventListener('transitionend', done);
    element.classList.remove('reveal-armed', 'is-visible');
  });
  element.classList.add('is-visible');
}

if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          reveal(entry.target);
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
