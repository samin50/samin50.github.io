import { getCollection, type CollectionEntry } from 'astro:content';
import { CONTEXT_LABELS } from './tags';

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

const TIER_ORDER: Record<Tier, number> = { featured: 0, secondary: 1, archive: 2 };

/**
 * The projects that have a page (featured, then secondary), in showcase
 * order. This is the order of the cards on the index and of the
 * previous/next links.
 */
export async function getPageProjects(): Promise<Project[]> {
  const entries = await getCollection(
    'projects',
    ({ data }) => !data.draft && data.tier !== 'archive',
  );
  return entries.sort(
    (a, b) => TIER_ORDER[a.data.tier] - TIER_ORDER[b.data.tier] || a.data.order - b.data.order,
  );
}

/** Up to `limit` other projects that share a tag, the most shared tags first. */
export function relatedProjects(project: Project, all: Project[], limit = 3): Project[] {
  const shared = (other: Project) =>
    other.data.tags.filter((tag) => project.data.tags.includes(tag)).length;
  return all
    .filter((other) => other.id !== project.id && shared(other) > 0)
    .sort((a, b) => shared(b) - shared(a))
    .slice(0, limit);
}

/** "University group project" where the entry says more, otherwise "Personal project". */
export function contextLine(data: Project['data']): string {
  return data.contextDetail ?? `${CONTEXT_LABELS[data.context]} project`;
}

export type Role = CollectionEntry<'experience'>;

/** Roles, newest first. */
export async function getRoles(): Promise<Role[]> {
  const roles = await getCollection('experience');
  return roles.sort((a, b) => b.data.start.localeCompare(a.data.start));
}

const STATUS_LABELS: Record<Project['data']['status'], string> = {
  complete: 'Complete',
  'in-progress': 'In progress',
  ongoing: 'Ongoing',
};

export function statusLabel(status: Project['data']['status']): string {
  return STATUS_LABELS[status];
}

/** "Solo", or "Team of 6 · my role: FPGA and vision pipeline". */
export function teamLabel(team: Project['data']['team']): string {
  const size = team.size === 1 ? 'Solo' : `Team of ${team.size}`;
  const role = team.role ? ` · my role: ${team.role}` : '';
  const note = team.note ? ` ${team.note}` : '';
  return `${size}${role}${note}`;
}

const PLACEHOLDER = /^\[\[(TODO|CHECK): /;

/**
 * Short date label for cards: the year(s) of a project. Placeholder values
 * (`[[CHECK: …]]`) are passed through as visible text so they are easy to find.
 */
export function formatDates(dates: Project['data']['dates'], status: Project['data']['status']) {
  // Only archive entries may leave dates out, and they never show them; this
  // keeps a missing value visible rather than blank if that ever changes.
  if (dates === undefined) return '[[TODO: dates]]';
  const year = (value: string) => (PLACEHOLDER.test(value) ? value : value.slice(0, 4));
  const start = year(dates.start);
  if (dates.end === undefined) {
    return status === 'complete' ? start : `${start} - present`;
  }
  const end = year(dates.end);
  if (PLACEHOLDER.test(dates.start)) return end;
  return start === end ? start : `${start} - ${end}`;
}
