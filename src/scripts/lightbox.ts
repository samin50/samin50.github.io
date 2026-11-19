/**
 * Lightbox for the gallery thumbnails (src/components/Gallery.astro).
 *
 * A native modal <dialog>, so the browser keeps focus inside it while it is
 * open, closes it on Escape and returns focus to the picture that opened it.
 * This script fills it in and adds the arrow keys. One dialog serves every
 * gallery on the page; it steps through the items of the gallery that opened
 * it, and the counter reads "N of M" within that gallery.
 *
 * Without this script every thumbnail is a plain link to its full picture or
 * video file.
 */
export function initLightbox(dialog: HTMLDialogElement): void {
  const all = [...document.querySelectorAll<HTMLAnchorElement>('[data-lightbox]')];
  const stage = dialog.querySelector<HTMLElement>('[data-lightbox-stage]');
  const caption = dialog.querySelector<HTMLElement>('[data-lightbox-caption]');
  const count = dialog.querySelector<HTMLElement>('[data-lightbox-count]');
  const previous = dialog.querySelector<HTMLButtonElement>('[data-lightbox-prev]');
  const next = dialog.querySelector<HTMLButtonElement>('[data-lightbox-next]');
  const close = dialog.querySelector<HTMLButtonElement>('[data-lightbox-close]');
  if (all.length === 0 || !stage || !caption || !count || !('showModal' in dialog)) return;

  /** The items of the gallery that is open. */
  let links: HTMLAnchorElement[] = [];
  let current = 0;
  let opener: HTMLElement | null = null;

  function show(index: number): void {
    current = (index + links.length) % links.length;
    const link = links[current];
    if (!link) return;
    const thumbnail = link.querySelector('img');

    const player = link.parentElement?.querySelector<HTMLTemplateElement>(
      'template[data-lightbox-player]',
    );
    if (link.hasAttribute('data-video') && player) {
      // A video: its player, from the template beside the thumbnail.
      stage?.replaceChildren(player.content.cloneNode(true));
    } else if (link.hasAttribute('data-placeholder') && link.firstElementChild) {
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

  for (const link of all) {
    const gallery = link.closest('[data-gallery]') ?? document;
    const group = [...gallery.querySelectorAll<HTMLAnchorElement>('[data-lightbox]')];
    link.addEventListener('click', (event) => {
      // Leave "open in new tab" and similar alone.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      links = group;
      opener = link;
      const single = links.length === 1;
      if (previous) previous.hidden = single;
      if (next) next.hidden = single;
      show(group.indexOf(link));
      dialog.showModal();
    });
  }

  previous?.addEventListener('click', () => show(current - 1));
  next?.addEventListener('click', () => show(current + 1));
  close?.addEventListener('click', () => dialog.close());

  dialog.addEventListener('keydown', (event) => {
    if (links.length < 2) return;
    if (event.key === 'ArrowLeft') show(current - 1);
    else if (event.key === 'ArrowRight') show(current + 1);
    else return;
    event.preventDefault();
  });
  // A click outside the picture and the controls closes it.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target === stage) dialog.close();
  });
  // Removing the stage's contents also stops a video that is playing.
  dialog.addEventListener('close', () => {
    stage.replaceChildren();
    opener?.focus();
    opener = null;
  });
}

const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox-dialog]');
if (dialog) initLightbox(dialog);
