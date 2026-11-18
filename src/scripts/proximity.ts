/**
 * Proximity effect.
 *
 * Interactive elements start to respond as the cursor comes near, before it is
 * on them. This script only measures: it sets a `--prox` custom property on
 * each element, from 0 (cursor far away) to 1 (cursor on it), and the styles
 * in global.css turn that into a ring and a soft glow.
 *
 * - One `pointermove` listener for the whole page; work happens at most once
 *   per frame, in `requestAnimationFrame`.
 * - Element positions are cached. They are re-read (all together, before
 *   anything is written) only after a scroll, resize or click, or when the
 *   cache is more than half a second old.
 * - A property is written only when its value has changed.
 * - Mouse and pen only, on devices that can hover, and never under reduced
 *   motion. If this script does not run, nothing is lost.
 *
 * Dense groups: put `data-prox-group` on a container whose targets sit close
 * together. It is used for the showcase project list only. Inside a group the
 * reach is shorter, the falloff is much steeper, and only the target nearest
 * the cursor responds, so neighbours do not light up together.
 */
const TARGETS =
  '.btn, a.chip, .icon-button, .contact-link, .showcase-tab, .nav-link, .project-card, .pager-link, .gallery-link, .context-badge, .crumb-link, .contact-row';
/** Distance in pixels at which an element starts to respond. */
const REACH = 110;
/** The same, for targets inside a `data-prox-group`. */
const GROUP_REACH = 110;
/**
 * Steepness of the falloff inside a group, where the response is exponential
 * in distance: with 5, it is under 10% at half the reach and passes 50% only
 * in the last 15%.
 */
const STEEPNESS = 5;
const FLOOR = Math.exp(-STEEPNESS);
const CACHE_MS = 500;

interface Target {
  element: HTMLElement;
  /** Index of its dense group, or -1. */
  group: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
  visible: boolean;
  /** Distance from the cursor in this frame. */
  distance: number;
  value: number;
}

const capable = window.matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const groups: Element[] = [];
const targets: Target[] = [...document.querySelectorAll<HTMLElement>(TARGETS)].map((element) => {
  const container = element.closest('[data-prox-group]');
  let group = -1;
  if (container) {
    group = groups.indexOf(container);
    if (group === -1) group = groups.push(container) - 1;
  }
  return {
    element,
    group,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    visible: false,
    distance: Infinity,
    value: 0,
  };
});
/** Per group, the smallest distance found in this frame. */
const nearest = new Float64Array(groups.length);

let pointerX = 0;
let pointerY = 0;
let active = false;
let scheduled = false;
let measuredAt = -Infinity;

function measure(now: number): void {
  for (const target of targets) {
    const rect = target.element.getBoundingClientRect();
    target.left = rect.left;
    target.top = rect.top;
    target.right = rect.right;
    target.bottom = rect.bottom;
    // Skips controls that are not on show, such as those of unselected projects.
    target.visible =
      rect.width > 0 &&
      (!('checkVisibility' in target.element) ||
        target.element.checkVisibility({ visibilityProperty: true }));
  }
  measuredAt = now;
}

/** Default response: 1 at the element, easing to 0 at `REACH` (squared, so it starts gently). */
function falloff(distance: number): number {
  const near = Math.max(0, 1 - distance / REACH);
  return near * near;
}

/** Response inside a group: 1 at the element, falling away exponentially to 0 at `GROUP_REACH`. */
function steepFalloff(distance: number): number {
  if (distance >= GROUP_REACH) return 0;
  return (Math.exp((-STEEPNESS * distance) / GROUP_REACH) - FLOOR) / (1 - FLOOR);
}

function write(target: Target, value: number): void {
  if (Math.abs(value - target.value) < 0.01) return;
  target.value = value;
  if (value === 0) target.element.style.removeProperty('--prox');
  else target.element.style.setProperty('--prox', value.toFixed(2));
}

function update(now: number): void {
  scheduled = false;
  if (!active) {
    for (const target of targets) write(target, 0);
    return;
  }
  // All reads first (only when the cache is stale), then arithmetic, then writes.
  if (now - measuredAt > CACHE_MS) measure(now);

  nearest.fill(Infinity);
  for (const target of targets) {
    if (!target.visible) {
      target.distance = Infinity;
      continue;
    }
    const dx = Math.max(target.left - pointerX, 0, pointerX - target.right);
    const dy = Math.max(target.top - pointerY, 0, pointerY - target.bottom);
    target.distance = Math.hypot(dx, dy);
    if (target.group !== -1 && target.distance < (nearest[target.group] ?? Infinity)) {
      nearest[target.group] = target.distance;
    }
  }

  // In a group only the nearest target answers; the first one wins a tie.
  nearest.forEach((distance, group) => {
    if (distance >= GROUP_REACH) nearest[group] = -1;
  });
  for (const target of targets) {
    if (target.group === -1) {
      write(target, falloff(target.distance));
    } else if (target.distance === nearest[target.group]) {
      nearest[target.group] = -1;
      write(target, steepFalloff(target.distance));
    } else {
      write(target, 0);
    }
  }
}

function schedule(): void {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(update);
}

function invalidate(): void {
  measuredAt = -Infinity;
  if (active) schedule();
}

function leave(): void {
  if (!active) return;
  active = false;
  schedule();
}

if (targets.length > 0) {
  document.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType === 'touch' || !capable.matches || reducedMotion.matches) {
        leave();
        return;
      }
      pointerX = event.clientX;
      pointerY = event.clientY;
      active = true;
      schedule();
    },
    { passive: true },
  );
  document.documentElement.addEventListener('pointerleave', leave);
  window.addEventListener('blur', leave);
  window.addEventListener('scroll', invalidate, { passive: true });
  window.addEventListener('resize', invalidate, { passive: true });
  // A click can change what is on show (another project, the other theme).
  document.addEventListener('click', invalidate);
}
