/**
 * Skills registry: the single source of truth for skills (decisions AC-1 to
 * AC-6, AD-1 to AD-3). It has two parts:
 *
 * - SKILLS: real skills, each in a category. The About page's skill groups are
 *   built from these, in category order; an uncategorised skill would go in a
 *   final "Other" group (there are none now).
 * - TECH_DETAILS: specific parts, boards, products, services and materials a
 *   project's `tech` list names (e.g. "ESP32-C6 (Seeed XIAO)"). They show as
 *   chips on the project, but are not skills and never appear on the About
 *   page. Each names the skill it rolls up under, or null.
 *
 * A project or experience `tech` value must be a label from one of the two
 * (checked by src/lib/skill-check.ts). An unknown label is a warning from
 * `astro check`, the build and dev, naming the label and the file; it does
 * not fail the build.
 *
 * Each key is the exact label, as written in frontmatter. Within a category,
 * skills are shown in the order they are listed here.
 *
 * To add a skill: `'Label': { category: 'Embedded' }` in SKILLS. To add a
 * part or product a project uses: `'Label': 'Skill it belongs to'` (or null)
 * in TECH_DETAILS. To add a category: add it to SKILL_CATEGORIES where it
 * should appear on the About page. See docs/style-guide.md §11.13.
 *
 * This is separate from the eight filter tags (src/lib/tags.ts).
 */

/** About page groups, in display order. */
export const SKILL_CATEGORIES = [
  'Languages',
  'Frameworks and libraries',
  'Computer vision',
  'AI and LLMs',
  'Electronics',
  'Embedded',
  'CAD and fabrication',
  'Cloud and tools',
  'Compliance',
] as const;

export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export interface SkillInfo {
  /**
   * The About page group. Omitted = "Other". A list where a skill belongs in
   * more than one group (C is under both Languages and Embedded).
   */
  category?: SkillCategory | readonly SkillCategory[];
}

export const SKILLS = {
  // Languages
  Python: { category: 'Languages' },
  'C++': { category: 'Languages' },
  C: { category: ['Languages', 'Embedded'] },
  Java: { category: 'Languages' },
  JavaScript: { category: 'Languages' },
  TypeScript: { category: 'Languages' },
  MIPS: { category: 'Languages' },
  // Frameworks and libraries
  FastAPI: { category: 'Frameworks and libraries' },
  'Vue.js': { category: 'Frameworks and libraries' },
  Astro: { category: 'Frameworks and libraries' },
  'Tailwind CSS': { category: 'Frameworks and libraries' },
  OpenGL: { category: 'Frameworks and libraries' },
  pygame: { category: 'Frameworks and libraries' },
  // Computer vision
  PyTorch: { category: 'Computer vision' },
  OpenCV: { category: 'Computer vision' },
  'ONNX Runtime': { category: 'Computer vision' },
  YOLOv8: { category: 'Computer vision' },
  'Classical vision': { category: 'Computer vision' },
  'Model training': { category: 'Computer vision' },
  'Edge deployment (Raspberry Pi)': { category: 'Computer vision' },
  // AI and LLMs
  'LLM agents': { category: 'AI and LLMs' },
  'Prompt engineering': { category: 'AI and LLMs' },
  'Local LLMs (Ollama)': { category: 'AI and LLMs' },
  ComfyUI: { category: 'AI and LLMs' },
  CNNs: { category: 'AI and LLMs' },
  GANs: { category: 'AI and LLMs' },
  VAEs: { category: 'AI and LLMs' },
  NLP: { category: 'AI and LLMs' },
  // Electronics
  'PCB design': { category: 'Electronics' },
  'Schematic capture': { category: 'Electronics' },
  'Component selection': { category: 'Electronics' },
  'Power design': { category: 'Electronics' },
  KiCad: { category: 'Electronics' },
  KiKit: { category: 'Electronics' },
  'Hand soldering': { category: 'Electronics' },
  'Board bring-up': { category: 'Electronics' },
  'Verilog/SystemVerilog': { category: 'Electronics' },
  FPGA: { category: 'Electronics' },
  Quartus: { category: 'Electronics' },
  'CPU design': { category: 'Electronics' },
  'RF Impedence Control': { category: 'Electronics' },
  // Embedded (C is above, under Languages and Embedded)
  'Zephyr RTOS': { category: 'Embedded' },
  FreeRTOS: { category: 'Embedded' },
  'Nordic nRF52': { category: 'Embedded' },
  ESP32: { category: 'Embedded' },
  STM32: { category: 'Embedded' },
  'Raspberry Pi': { category: 'Embedded' },
  Arduino: { category: 'Embedded' },
  PlatformIO: { category: 'Embedded' },
  MQTT: { category: 'Embedded' },
  I2C: { category: 'Embedded' },
  SPI: { category: 'Embedded' },
  'CAN bus': { category: 'Embedded' },
  MIDI: { category: 'Embedded' },
  // CAD and fabrication
  FreeCAD: { category: 'CAD and fabrication' },
  OpenSCAD: { category: 'CAD and fabrication' },
  SketchUp: { category: 'CAD and fabrication' },
  Blender: { category: 'CAD and fabrication' },
  'FDM and MSLA printing': { category: 'CAD and fabrication' },
  // Cloud and tools
  Docker: { category: 'Cloud and tools' },
  Git: { category: 'Cloud and tools' },
  SQL: { category: 'Cloud and tools' },
  Linux: { category: 'Cloud and tools' },
  'AI coding agents': { category: 'Cloud and tools' },
  AWS: { category: 'Cloud and tools' },
  'TCP sockets': { category: 'Cloud and tools' },
  Flex: { category: 'Cloud and tools' },
  Bison: { category: 'Cloud and tools' },
  // Compliance
  GDPR: { category: 'Compliance' },
  'PCI DSS': { category: 'Compliance' },
  'US accessibility requirements': { category: 'Compliance' },
} as const satisfies Record<string, SkillInfo>;

export type Skill = keyof typeof SKILLS;

/**
 * Not skills: parts, boards, products, services, materials and variant
 * spellings that project tech lists name. Accepted in `tech`, shown as chips
 * on the project, never on the About page. The value is the skill each one
 * belongs to, or null. A label cannot be both a skill and a detail (a type
 * error).
 */
export const TECH_DETAILS = {
  // Variants and specific versions of a skill
  '3D printing': 'FDM and MSLA printing',
  FDM: 'FDM and MSLA printing',
  MSLA: 'FDM and MSLA printing',
  Klipper: 'FDM and MSLA printing',
  'Arduino framework': 'Arduino',
  'STM32duino (Arduino)': 'Arduino',
  'HTML/JS': 'JavaScript',
  'MQTT (Mosquitto)': 'MQTT',
  'MQTT (PubSubClient)': 'MQTT',
  Ollama: 'Local LLMs (Ollama)',
  'Open WebUI': 'Local LLMs (Ollama)',
  'Pygame / pygame_gui': 'pygame',
  'Python multiprocessing': 'Python',
  Soldering: 'Hand soldering',
  Verilog: 'Verilog/SystemVerilog',
  'YOLOv8 (OBB)': 'YOLOv8',
  Ultralytics: 'YOLOv8',
  DeepSparse: 'Edge deployment (Raspberry Pi)',
  'cProfile / SnakeViz': 'Python',
  BLE: 'Nordic nRF52',
  'USB HID': 'Zephyr RTOS',
  MCUboot: 'Zephyr RTOS',
  // Boards and chips
  'ESP32-C6 (Seeed XIAO)': 'ESP32',
  nRF52833: 'Nordic nRF52',
  'Raspberry Pi 4B': 'Raspberry Pi',
  'Raspberry Pi Zero': 'Raspberry Pi',
  'STM32 (NUCLEO-L432KC)': 'STM32',
  'DE10-Lite (MAX 10)': 'FPGA',
  // FPGA toolchain and IP
  'NIOS II': 'FPGA',
  'Platform Designer (Qsys)': 'FPGA',
  'JTAG UART': 'FPGA',
  'FPGA accelerometer': 'FPGA',
  // AWS services
  Lambda: 'AWS',
  'ECS Fargate': 'AWS',
  EFS: 'AWS',
  'Route 53': 'AWS',
  CloudWatch: 'AWS',
  IAM: 'AWS',
  // Electronics tools and services
  'J-Link': 'Board bring-up',
  JLCPCB: 'PCB design',
  Fritzing: 'Schematic capture',
  // Components, products, hosting and materials (no skill of their own)
  'TMC2209 / NEMA17': null,
  'Servo motor': null,
  'Load cell': null,
  WS2812B: null,
  U8g2: null,
  'PWM fan control': null,
  Hyperion: null,
  'Crafty Controller': null,
  'GitHub Pages': null,
  MDF: null,
  Rebar: null,
} as const satisfies Record<string, Skill | null> & Partial<Record<Skill, never>>;

export type TechDetail = keyof typeof TECH_DETAILS;

const SKILL_LABELS: ReadonlySet<string> = new Set(Object.keys(SKILLS));
const ALL_LABELS: ReadonlySet<string> = new Set([
  ...Object.keys(SKILLS),
  ...Object.keys(TECH_DETAILS),
]);

export function isSkill(label: string): label is Skill {
  return SKILL_LABELS.has(label);
}

/** A label a `tech` list may use: a skill or a tech detail. */
export function isKnownTech(label: string): label is Skill | TechDetail {
  return ALL_LABELS.has(label);
}

/** A whole-value placeholder, e.g. `[[CHECK: particulate sensor model]]`. */
const PLACEHOLDER = /^\[\[(TODO|CHECK): .+\]\]$/;
/** A label followed by a placeholder, e.g. `Raspberry Pi Zero [[CHECK: …]]`. */
const TRAILING_PLACEHOLDER = /^(.+?) \[\[(TODO|CHECK): .+\]\]$/;

/**
 * Why a tech value is not allowed, or null when it is. Placeholders never
 * break the build: a `[[TODO/CHECK: …]]` on its own, or after a known label,
 * is accepted.
 */
export function skillProblem(value: string): string | null {
  if (isKnownTech(value) || PLACEHOLDER.test(value)) return null;
  const label = TRAILING_PLACEHOLDER.exec(value)?.[1];
  if (label !== undefined && isKnownTech(label)) return null;

  const key = (text: string) => text.toLowerCase().replace(/[^a-z0-9+#]/g, '');
  const close = [...ALL_LABELS].find((known) => key(known) === key(label ?? value));
  const hint = close ? ` Did you mean "${close}"?` : '';
  return `Unknown skill "${label ?? value}".${hint} Add it to src/data/skills.ts, as a skill (SKILLS) or a part or product (TECH_DETAILS).`;
}

export interface SkillGroup {
  name: string;
  items: Skill[];
}

/** The About page groups: every category in order, then "Other" if it has items. */
export function skillGroups(): SkillGroup[] {
  const entries = Object.entries(SKILLS) as [Skill, SkillInfo][];
  const categoriesOf = (info: SkillInfo): readonly SkillCategory[] =>
    info.category === undefined
      ? []
      : typeof info.category === 'string'
        ? [info.category]
        : info.category;
  const groups: SkillGroup[] = SKILL_CATEGORIES.map((name) => ({
    name,
    items: entries.filter(([, info]) => categoriesOf(info).includes(name)).map(([label]) => label),
  })).filter((group) => group.items.length > 0);
  const other = entries
    .filter(([, info]) => categoriesOf(info).length === 0)
    .map(([label]) => label);
  if (other.length > 0) groups.push({ name: 'Other', items: other });
  return groups;
}
