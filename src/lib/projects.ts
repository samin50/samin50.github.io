import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Tier = Project['data']['tier'];

/** All published (non-draft) projects, sorted by `order`. */
export async function getProjects(tier?: Tier): Promise<Project[]> {
  const entries = await getCollection(
    'projects',
    ({ data }) => !data.draft && (tier === undefined || data.tier === tier),
  );
  return entries.sort((a, b) => a.data.order - b.data.order);
}

const PLACEHOLDER = /^\[\[(TODO|CHECK): /;

/**
 * Short date label for cards: the year(s) of a project. Placeholder values
 * (`[[CHECK: …]]`) are passed through as visible text so they are easy to find.
 */
export function formatDates(dates: Project['data']['dates'], status: Project['data']['status']) {
  const year = (value: string) => (PLACEHOLDER.test(value) ? value : value.slice(0, 4));
  const start = year(dates.start);
  if (dates.end === undefined) {
    return status === 'complete' ? start : `${start} – present`;
  }
  const end = year(dates.end);
  if (PLACEHOLDER.test(dates.start)) return end;
  return start === end ? start : `${start} – ${end}`;
}
