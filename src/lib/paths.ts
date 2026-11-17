/**
 * Base-aware URL helpers. The site may be served from the domain root or from
 * a subpath (see astro.config.mjs), so internal links and public assets must
 * always go through `url()` rather than being written as `/something`.
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** `url('projects/')` → `/projects/` at the root, `/repo/projects/` under a subpath. */
export function url(path = ''): string {
  return `${base}/${path.replace(/^\//, '')}`;
}

export function projectUrl(slug: string): string {
  return url(`projects/${slug}/`);
}

export function contextUrl(context: string): string {
  return url(`projects/?context=${encodeURIComponent(context)}`);
}

export function tagUrl(tag: string): string {
  return url(`projects/?tag=${encodeURIComponent(tag)}`);
}
