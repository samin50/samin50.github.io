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
