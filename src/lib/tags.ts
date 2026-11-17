/** The tag taxonomy (docs/content-plan.md §4). Order here is the chip order on the index. */
export const TAGS = [
  'software',
  'embedded',
  'pcb',
  'fpga',
  'computer-vision',
  'ai',
  'cloud',
  'fabrication',
] as const;

export type Tag = (typeof TAGS)[number];

/** Where a project comes from. Professional work is on the Experience page, not in projects. */
export const CONTEXTS = ['university', 'personal'] as const;

export type Context = (typeof CONTEXTS)[number];

export const CONTEXT_LABELS: Record<Context, string> = {
  university: 'University',
  personal: 'Personal',
};

export const TAG_LABELS: Record<Tag, string> = {
  software: 'Software',
  embedded: 'Embedded',
  pcb: 'PCB design',
  fpga: 'FPGA',
  'computer-vision': 'Computer vision',
  ai: 'AI & LLMs',
  cloud: 'Cloud',
  fabrication: 'CAD & fabrication',
};
