/**
 * Project page: the scene behind the header, and the gallery lightbox.
 *
 * Both are enhancements. Without this script the header shows its scene as a
 * still image and every gallery picture is a plain link to the full image.
 */
import { initScenePlayback } from './scenes';

const host = document.querySelector<HTMLElement>('[data-scene-host]');
if (host) initScenePlayback(host);

/**
 * Lightbox. A native modal <dialog>, so the browser keeps focus inside it
 * while it is open, closes it on Escape and returns focus to the picture that
 * opened it. This script fills it in and adds the arrow keys.
 */
function initLightbox(dialog: HTMLDialogElement): void {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-lightbox]')];
  const stage = dialog.querySelector<HTMLElement>('[data-lightbox-stage]');
  const caption = dialog.querySelector<HTMLElement>('[data-lightbox-caption]');
  const count = dialog.querySelector<HTMLElement>('[data-lightbox-count]');
  const previous = dialog.querySelector<HTMLButtonElement>('[data-lightbox-prev]');
  const next = dialog.querySelector<HTMLButtonElement>('[data-lightbox-next]');
  const close = dialog.querySelector<HTMLButtonElement>('[data-lightbox-close]');
  if (links.length === 0 || !stage || !caption || !count || !('showModal' in dialog)) return;

  let current = 0;
  let opener: HTMLElement | null = null;

  function show(index: number): void {
    current = (index + links.length) % links.length;
    const link = links[current];
    if (!link) return;
    const thumbnail = link.querySelector('img');

    if (link.hasAttribute('data-placeholder') && link.firstElementChild) {
      // A photo that is still missing: show its placeholder panel, larger.
      stage?.replaceChildren(link.firstElementChild.cloneNode(true));
    } else {
      const image = document.createElement('img');
      image.src = link.href;
      image.alt = thumbnail?.alt ?? '';
      stage?.replaceChildren(image);
    }
    if (caption) {
      caption.textContent = link.dataset.caption ?? '';
      caption.hidden = caption.textContent === '';
    }
    if (count) count.textContent = `${current + 1} of ${links.length}`;
  }

  links.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      // Leave "open in new tab" and similar alone.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      show(index);
      dialog.showModal();
    });
  });

  const single = links.length === 1;
  if (previous) previous.hidden = single;
  if (next) next.hidden = single;
  previous?.addEventListener('click', () => show(current - 1));
  next?.addEventListener('click', () => show(current + 1));
  close?.addEventListener('click', () => dialog.close());

  dialog.addEventListener('keydown', (event) => {
    if (single) return;
    if (event.key === 'ArrowLeft') show(current - 1);
    else if (event.key === 'ArrowRight') show(current + 1);
    else return;
    event.preventDefault();
  });
  // A click outside the picture and the controls closes it.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target === stage) dialog.close();
  });
  dialog.addEventListener('close', () => {
    stage.replaceChildren();
    opener?.focus();
    opener = null;
  });
}

const lightbox = document.querySelector<HTMLDialogElement>('[data-lightbox-dialog]');
if (lightbox) initLightbox(lightbox);
