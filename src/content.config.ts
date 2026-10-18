import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One file per app in src/content/apps/. The file name is the URL: clock.mdx -> /clock/.
// Planned apps only need the fields for the home page list. Apps with a release
// also get a detail page, built from the rest of the fields and the file body.
const apps = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/apps' }),
  schema: z
    .object({
      name: z.string(),
      // Position in the home page list, lowest first.
      order: z.number(),
      status: z.enum(['planned', 'test', 'released']),
      // File name in public/assets/icons/ without .svg.
      icon: z.string(),
      // One or two sentences for the home page list.
      summary: z.string(),

      // Detail page fields, required once the app is released.
      tagline: z.string().optional(),
      intro: z.string().optional(),
      description: z.string().optional(),
      ogDescription: z.string().optional(),
      version: z.string().optional(),
      minAndroid: z.string().optional(),
      download: z.url().optional(),
      source: z.url().optional(),
      // Release date of this version, and what changed in it for people using
      // the app. Shown on the detail page and in the RSS feed.
      released: z.coerce.date().optional(),
      changes: z.array(z.string()).optional(),
      // Set to true only if the app has the internet permission. Shown in the
      // quick facts on the detail page.
      internet: z.boolean().default(false),
    })
    .refine(
      (app) =>
        app.status === 'planned' ||
        (app.tagline && app.intro && app.description && app.version && app.minAndroid && app.download && app.source && app.released),
      { message: 'Released and test apps need tagline, intro, description, version, minAndroid, download, source and released.' },
    ),
});

export const collections = { apps };
