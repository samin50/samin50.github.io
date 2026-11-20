/**
 * Links that leave the site open in a new tab (decision AJ-1): any http(s)
 * URL, and PDFs such as the CV. Pages of this site and `mailto:` links open
 * as normal.
 *
 * A new-tab link gets `rel="noopener noreferrer"` (the new page cannot reach
 * back into this one) and `aria-describedby` pointing at one hidden note in
 * BaseLayout, so screen readers announce "opens in a new tab".
 *
 * Used by `linkAttrs` (src/config/site.ts), the project link components, and
 * the Markdown plugin for links in project and role bodies
 * (src/lib/markdown-external-links.ts).
 */

/** Id of the hidden "opens in a new tab" note in BaseLayout. */
export const NEW_TAB_NOTE_ID = 'new-tab-note';

export interface NewTabAttrs {
  target?: '_blank';
  rel?: string;
  'aria-describedby'?: string;
}

/** Whether a link opens in a new tab: an http(s) URL or a PDF. */
export function opensInNewTab(href: string): boolean {
  return /^https?:\/\//i.test(href) || /\.pdf(?:[?#]|$)/i.test(href);
}

/** The attributes to spread onto an anchor for `href` (none for a same-tab link). */
export function newTabAttrs(href: string): NewTabAttrs {
  return opensInNewTab(href)
    ? { target: '_blank', rel: 'noopener noreferrer', 'aria-describedby': NEW_TAB_NOTE_ID }
    : {};
}
