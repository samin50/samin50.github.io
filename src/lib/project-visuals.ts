/**
 * Icons a project can use on its placeholder panel and showcase tab.
 * Kept free of imports so the content schema can use it. The drawings are in
 * src/components/Icon.astro.
 */
export const PROJECT_ICONS = [
  'keyboard',
  'scan',
  'cpu',
  'cloud',
  'code',
  'sparkles',
  'lamp',
  'music',
  'printer',
  'box',
  'pencil',
  'piano',
] as const;

export type ProjectIcon = (typeof PROJECT_ICONS)[number];

/**
 * Animated scenes behind a project, on the home page showcase and its page
 * header. Each is a component in src/components/scenes/, chosen in
 * Scene.astro; styles are in home.css (pcb, signal, generic) and scenes.css
 * (the rest).
 */
export const PROJECT_SCENES = [
  'pcb',
  'signal',
  'vision',
  'rover',
  'sketch',
  'diffuse',
  'rack',
  'compile',
] as const;

export type ProjectScene = (typeof PROJECT_SCENES)[number];

/**
 * Each project's scene, by slug, for projects that don't name one in their
 * frontmatter (`scene:`), which takes precedence. A project in neither gets
 * the generic scene.
 */
export const DEFAULT_SCENES: Readonly<Record<string, ProjectScene>> = {
  'machine-vision-component-sorter': 'vision',
  'autonomous-mars-rover': 'rover',
  skribblnios: 'sketch',
  'local-ai-inference': 'diffuse',
  'on-demand-cloud-game-server': 'rack',
  'c-compiler': 'compile',
};
