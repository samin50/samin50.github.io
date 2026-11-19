/**
 * Project page: the scene behind the header, the gallery lightbox, and the
 * gallery's fit to the right column.
 *
 * All are enhancements. Without this script the header shows its scene as a
 * still image and every gallery item is a plain link to its full picture or
 * video file.
 */
import './lightbox';
import { initGalleryFit } from './gallery-fit';
import { initScenePlayback } from './scenes';

const host = document.querySelector<HTMLElement>('[data-scene-host]');
if (host) initScenePlayback(host);

const gallery = document.querySelector<HTMLElement>('.project-main > [data-gallery]');
if (gallery) initGalleryFit(gallery);
