/**
 * Central site config.
 *
 * Every personal detail lives here, so replacing the placeholders means
 * editing this one file. Search the repo for `\[\[(TODO|CHECK):` and `data-todo`
 * to find everything that still needs filling in.
 *
 * A link whose `href` is `null` renders as `href="#"` with a `data-todo`
 * attribute, so the page still works while the real URL is missing.
 */
import { newTabAttrs, type NewTabAttrs } from '../lib/links';

export interface SiteLink {
  /** Visible label, e.g. "Email". */
  label: string;
  /** Visible value shown next to the label, e.g. the address or handle. */
  text: string;
  /** Real URL (https://…, mailto:…) or `null` while it is still a placeholder. */
  href: string | null;
  /** What is missing; becomes the `data-todo` attribute while `href` is null. */
  todo: string;
  icon: 'mail' | 'linkedin' | 'github';
}

export const site = {
  name: '[WIP] Shaheen Amin',
  /** Used in the home page greeting ("Hi! I'm …!"), as on the old site. */
  firstName: 'Shaheen',
  /** The old site's strapline, kept verbatim (legacy/src/components/Navbar.tsx:36). */
  strapline: 'Engineer, Programmer and DIY Enthusiast',
  role: 'Software engineer',
  location: 'London, UK',

  /** Default <meta name="description"> and Open Graph description. */
  description:
    'Software engineer at Amadeus with a hardware portfolio: KiCad PCBs, Zephyr firmware, FPGA vision and YOLOv8 models deployed on edge devices.',

  /** Suffix for the home page <title>: "{name} - {tagline}". */
  tagline: 'Software, electronics and applied AI',

  /** A single general CV PDF (decision 11). Put the file in public/ and set e.g. 'cv.pdf'. */
  cv: {
    label: 'Download CV',
    href: 'Shaheen-Amin-CV.pdf',
    todo: 'CV PDF path',
  },

  contact: [
    {
      label: 'Email',
      text: 'shaheen.amin.uk@gmail.com',
      href: 'mailto:shaheen.amin.uk@gmail.com',
      todo: 'mailto link',
      icon: 'mail',
    },
    {
      label: 'LinkedIn',
      text: 'LinkedIn',
      href: 'https://linkedin.com/in/shaheen-amin',
      todo: 'LinkedIn URL',
      icon: 'linkedin',
    },
    {
      label: 'GitHub',
      text: 'GitHub',
      href: 'https://github.com/samin50',
      todo: 'GitHub URL',
      icon: 'github',
    },
  ] satisfies SiteLink[],

  /** Social preview image (1200×630 PNG/JPG in public/), or null until supplied. */
  ogImage: null as string | null, // [[TODO: 1200x630 social preview image]]

  /**
   * Archive ("More projects") cards on the projects index: show each card's
   * picture slot (its photo, or the project's colour tile when there is none).
   * Off: text-only cards with the project's icon beside the title. Off for now,
   * while most archive entries have no real photo; turn on once they do.
   */
  showArchiveMedia: false as boolean,
} as const;

/**
 * Attributes for an anchor whose target may still be a placeholder. A real
 * link to another site (or a PDF) opens in a new tab (src/lib/links.ts).
 */
export function linkAttrs(link: { href: string | null; todo: string }): NewTabAttrs & {
  href: string;
  'data-todo'?: string;
} {
  return link.href === null
    ? { href: '#', 'data-todo': link.todo }
    : { href: link.href, ...newTabAttrs(link.href) };
}
