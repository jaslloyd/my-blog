import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Each post is a folder holding index.md (or README.md) plus its images.
	// The id is the folder name, which keeps the Gatsby-era URLs (/<folder>/).
	loader: glob({
		pattern: '*/{index,README}.md',
		base: './src/content/blog',
		generateId: ({ entry }) => entry.split('/')[0],
	}),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		description: z.string().optional(),
		hidden: z.boolean().default(false),
		coverImage: z.string().optional(),
	}),
});

export const collections = { blog };
