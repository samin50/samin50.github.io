import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { PROJECT_ICONS, PROJECT_SCENES } from './lib/project-visuals';
import { CONTEXTS, TAGS } from './lib/tags';
import { withImageFolders } from './lib/image-check';
import { withSkillCheck } from './lib/skill-check';

/**
 * Projects collection. One Markdown file per project in src/content/projects/;
 * the filename is the slug. See docs/content-plan.md §3.
 *
 * Placeholders must never break the build, so date fields accept either a real
 * date ('YYYY' or 'YYYY-MM') or a `[[TODO: …]]` / `[[CHECK: …]]` string.
 */
const dateOrPlaceholder = z
  .string()
  .regex(
    /^(\d{4}(-\d{2})?|\[\[(TODO|CHECK): .+\]\])$/,
    "Use 'YYYY', 'YYYY-MM' or a [[TODO: …]] / [[CHECK: …]] placeholder",
  );

const placeholder = z
  .string()
  .regex(/^\[\[(TODO|CHECK): .+\]\]$/, 'Use a [[TODO: …]] / [[CHECK: …]] placeholder');

const projects = defineCollection({
  loader: withImageFolders(
    withSkillCheck(glob({ pattern: '**/*.md', base: './src/content/projects' })),
  ),
  schema: ({ image }) => {
    const media = z.discriminatedUnion('type', [
      z.object({
        type: z.literal('image'),
        /**
         * A bare filename for the project's image folder (`PCBKeyboard.png` →
         * src/assets/projects/<slug>/; lib/image-folders.ts), or a path
         * relative to this file. Use the shared placeholder.svg when the real
         * photo is missing.
         */
        src: image(),
        /** Alt text; `[[TODO: description of the photo needed]]` while it is a placeholder. */
        alt: z.string(),
        caption: z.string().optional(),
        /** What the owner should supply, when `src` is the placeholder. */
        todo: z.string().optional(),
      }),
      z.object({
        type: z.literal('video'),
        /** Base-relative path under public/, e.g. 'sampleVideo.mp4'. */
        src: z.string(),
        /** Still shown before it plays: a bare filename or a relative path, as for an image's `src`. */
        poster: image().optional(),
        /** Short description, used as the player's accessible name. */
        alt: z.string(),
        caption: z.string().optional(),
        todo: z.string().optional(),
      }),
    ]);

    return z
      .object({
        title: z.string(),
        /** One line for cards, the page header and the archive list. */
        summary: z.string().max(180),
        /** <meta name="description"> for the project's page. Omitted = the summary. */
        description: z.string().max(155).optional(),
        tier: z.enum(['featured', 'secondary', 'archive']),
        /** Sort order within the tier, ascending. */
        order: z.number().int(),
        tags: z.array(z.enum(TAGS)).min(1).max(4),
        /** Required for featured and secondary projects (validated below); archive cards don't show it. */
        dates: z
          .object({
            start: dateOrPlaceholder,
            /** Omitted = ongoing, or the same year as `start`. */
            end: dateOrPlaceholder.optional(),
          })
          .optional(),
        status: z.enum(['complete', 'in-progress', 'ongoing']).default('complete'),
        /** University or personal work. Shown as a badge, and a filter on the index. */
        context: z.enum(CONTEXTS),
        /** More about the context, where there is more to say: 'University group project'. */
        contextDetail: z.string().optional(),
        team: z
          .object({
            /** 1 = solo. A `[[CHECK: …]]` placeholder while the size of a team is unconfirmed. */
            size: z.union([z.number().int().min(1), placeholder]),
            /** Required for a team (validated below). */
            role: z.string().optional(),
            /** e.g. '[[CHECK: solo or pair?]]'. */
            note: z.string().optional(),
          })
          .default({ size: 1 }),
        /** Skills from src/data/skills.ts, shown as chips; an unknown one is a build warning (lib/skill-check.ts). */
        /** Required for featured and secondary projects (validated below); archive cards don't show it. */
        tech: z.array(z.string()).min(1).optional(),
        /** Optional stat row. */
        results: z
          .array(z.object({ value: z.string(), label: z.string() }))
          .max(4)
          .optional(),
        /** Optional. Repos are assumed private; with no links the links row is not rendered. */
        links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
        /** Required for featured and secondary projects (validated below). */
        cover: media.optional(),
        gallery: z.array(media).default([]),
        /**
         * The project's colour, as an OKLCH hue angle (0–360). It tints the
         * project's showcase scene, its placeholder panel and its controls.
         * Rough guide: 25 red, 50 orange, 80 amber, 150 green, 200 teal,
         * 255 blue, 295 violet, 340 pink. Archive entries, which have no
         * page or card, can leave it and `icon` out.
         */
        hue: z.number().min(0).max(360).default(12),
        /** Simple icon shown on the project's placeholder panel and showcase tab. */
        icon: z.enum(PROJECT_ICONS).default('box'),
        /**
         * Animated showcase background. Omitted = the project's entry in
         * DEFAULT_SCENES (lib/project-visuals.ts), otherwise the generic scene.
         */
        scene: z.enum(PROJECT_SCENES).optional(),
        /** Draft entries are excluded from every listing and get no page. */
        draft: z.boolean().default(false),
      })
      .superRefine((project, ctx) => {
        if (project.tier !== 'archive') {
          for (const field of ['cover', 'dates', 'tech'] as const) {
            if (project[field] !== undefined) continue;
            ctx.addIssue({
              code: 'custom',
              path: [field],
              message: `${field} is required for featured and secondary projects`,
            });
          }
        }
        if (project.team.size !== 1 && !project.team.role) {
          ctx.addIssue({
            code: 'custom',
            path: ['team', 'role'],
            message: 'team.role is required for a team project',
          });
        }
      });
  },
});

/**
 * Experience: one Markdown file per role in src/content/experience/. The
 * frontmatter is the role's heading and its summary (shown on the home page);
 * the body is the detail shown on the Experience page.
 */
const experience = defineCollection({
  loader: withImageFolders(
    withSkillCheck(glob({ pattern: '**/*.md', base: './src/content/experience' })),
  ),
  schema: z.object({
    title: z.string(),
    organisation: z.string(),
    /** Display string, as on the CV: 'Sep 2024 – present'. */
    dates: z.string(),
    /** 'YYYY-MM'; roles are listed newest first by this. */
    start: z.string().regex(/^\d{4}-\d{2}$/),
    /** Shown on the home page and at the top of the role. */
    summary: z.string(),
    /** Optional: the role's tech, shown as chips under the summary on the Experience page. */
    tech: z.array(z.string()).optional(),
  }),
});

export const collections = { projects, experience };
