import type { Loader, LoaderContext, ParseDataOptions } from 'astro/loaders';
import { skillProblem } from '../data/skills';

/**
 * Wraps a content loader so every entry's `tech` list is checked against the
 * skills registry (src/data/skills.ts). An unknown skill is a warning, not an
 * error: `astro check`, `astro build` and `astro dev` print it, naming the
 * file and the skill, and carry on (decision AC-2, as amended by AC-6).
 *
 * Entries the loader parses (new or changed files, and in dev every edit) are
 * checked as they are parsed; entries it reuses unchanged from the cache are
 * checked once loading is done, so the warnings appear on every run.
 */
export function withSkillCheck(loader: Loader): Loader {
  return {
    ...loader,
    load: async (context) => {
      const checked = new Set<string>();
      await loader.load({
        ...context,
        parseData: async <TData extends Record<string, unknown>>(
          props: ParseDataOptions<TData>,
        ): Promise<TData> => {
          const data = await context.parseData(props);
          checked.add(props.id);
          warnUnknownSkills(data, props.filePath ?? `${context.collection}/${props.id}`, context);
          return data;
        },
      });
      for (const entry of context.store.values()) {
        if (checked.has(entry.id)) continue;
        warnUnknownSkills(
          entry.data,
          entry.filePath ?? `${context.collection}/${entry.id}`,
          context,
        );
      }
    },
  };
}

/** The file's path from the project root, for a readable message. */
function fromRoot(filePath: string, root: URL): string {
  const normalise = (path: string) => path.replaceAll('\\', '/').replace(/^\/(?=[A-Za-z]:)/, '');
  const base = normalise(decodeURIComponent(root.pathname));
  const file = normalise(filePath);
  return file.toLowerCase().startsWith(base.toLowerCase()) ? file.slice(base.length) : file;
}

function warnUnknownSkills(
  data: Record<string, unknown>,
  filePath: string,
  { logger, config }: LoaderContext,
): void {
  const tech: unknown = data.tech;
  if (!Array.isArray(tech)) return;
  const file = fromRoot(filePath, config.root);
  tech.forEach((value: unknown, index) => {
    if (typeof value !== 'string') return;
    const problem = skillProblem(value);
    if (problem) logger.warn(`${file} (tech.${index}): ${problem}`);
  });
}
