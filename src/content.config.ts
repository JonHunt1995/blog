import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { site } from './data/site';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      description: z.string().optional(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      coverImage: image().or(z.string()).optional(),
      category: z.enum(['tech', 'life']).default('tech'),
      author: z.string().default(site.author.name),
      mathjax: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tagline: z.string().optional(),
      description: z.string(),
      date: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      heroImage: image().or(z.string()).optional(),
      demoUrl: z.string().optional(),
      githubUrl: z.string().optional(),
      highlights: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog, projects };
