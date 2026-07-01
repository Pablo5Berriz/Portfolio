import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const badge = z.enum(['web', 'mobile', 'saas', 'backend', 'uiux', 'business']);
const status = z.enum(['completed', 'production', 'progress']);
const lang = z.enum(['fr', 'en']);

// Content files live under fr/ and en/ subfolders sharing the same filename
// (e.g. caseStudies/fr/logigest.md and caseStudies/en/logigest.md). The default
// id generation can collide across locales, so ids are derived explicitly.
function generateId({ entry, data }: { entry: string; data: Record<string, unknown> }) {
  return `${data.lang}-${data.slug ?? entry}`;
}

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/caseStudies', generateId }),
  schema: z.object({
    slug: z.string(),
    lang,
    title: z.string(),
    badges: z.array(badge),
    problem: z.string(),
    features: z.array(z.string()),
    stack: z.array(z.string()),
    status,
    githubUrl: z.string().url().nullable().default(null),
    demoUrl: z.string().url().nullable().default(null),
    image: z.string().nullable().default(null),
    imagePlaceholder: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const legacyProjects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legacyProjects', generateId }),
  schema: z.object({
    slug: z.string(),
    lang,
    title: z.string(),
    badges: z.array(badge),
    summary: z.string(),
    stack: z.array(z.string()),
    githubUrl: z.string().url().nullable().default(null),
    image: z.string().nullable().default(null),
    order: z.number().default(0),
  }),
});

const experiences = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experiences', generateId }),
  schema: z.object({
    slug: z.string(),
    lang,
    role: z.string(),
    organization: z.string(),
    period: z.string(),
    logo: z.string().nullable().default(null),
    summary: z.string(),
    highlights: z.array(z.string()),
    order: z.number().default(0),
  }),
});

export const collections = { caseStudies, legacyProjects, experiences };
