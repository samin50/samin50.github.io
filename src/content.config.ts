import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { PROJECT_ICONS } from './lib/project-visuals';
import { TAGS } from './lib/tags';

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

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => {
    const media = z.discriminatedUnion('type', [
      z.object({
        type: z.literal('image'),
        /** Local file under src/. Use the shared placeholder.svg when the real photo is missing. */
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
        /** One line for cards and meta descriptions. */
        summary: z.string().max(180),
        tier: z.enum(['featured', 'secondary', 'archive']),
        /** Sort order within the tier, ascending. */
        order: z.number().int(),
        tags: z.array(z.enum(TAGS)).min(1).max(4),
        dates: z.object({
          start: dateOrPlaceholder,
          /** Omitted = ongoing, or the same year as `start`. */
          end: dateOrPlaceholder.optional(),
        }),
        status: z.enum(['complete', 'in-progress', 'ongoing']).default('complete'),
        /** e.g. 'MEng final-year project', 'Personal project'. */
        context: z.string().optional(),
        team: z
          .object({
            /** 1 = solo. */
            size: z.number().int().min(1),
            /** Required when size > 1 (validated below). */
            role: z.string().optional(),
            /** e.g. '[[CHECK: solo or pair?]]'. */
            note: z.string().optional(),
          })
          .default({ size: 1 }),
        /** Free text, shown as chips. */
        tech: z.array(z.string()).min(1),
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
         * 255 blue, 295 violet, 340 pink.
         */
        hue: z.number().min(0).max(360),
        /** Simple icon shown on the project's placeholder panel and showcase tab. */
        icon: z.enum(PROJECT_ICONS),
        /** Animated showcase background. Omitted = the generic tinted scene. */
        scene: z.enum(['pcb', 'signal']).optional(),
        /** Draft entries are excluded from every listing and get no page. */
        draft: z.boolean().default(false),
      })
      .superRefine((project, ctx) => {
        if (project.tier !== 'archive' && project.cover === undefined) {
          ctx.addIssue({
            code: 'custom',
            path: ['cover'],
            message: 'cover is required for featured and secondary projects',
          });
        }
        if (project.team.size > 1 && !project.team.role) {
          ctx.addIssue({
            code: 'custom',
            path: ['team', 'role'],
            message: 'team.role is required when team.size > 1',
          });
        }
      });
  },
});

export const collections = { projects };
