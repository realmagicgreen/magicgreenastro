import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    category: z.enum(["health", "know", "products", "services", "solutions", "techniques"]),
    // pubDate: z.date(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedpubDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    tags: z.array(z.string()),
    coverImage: z.string().optional(),
    description: z
      .string()
      .max(
        160,
        "For best SEO results, please keep the description under 160 characters."
      ),
    ad: z.boolean().optional().default(false),
    featured: z.boolean().default(false),
    draft: z.boolean().optional(),
  }),
});

//    Should match your collection directory name in "src/content"
export const collections = {
  'health': blogCollection,
  'know': blogCollection,
  'products': blogCollection,
  'services': blogCollection,
  'solutions': blogCollection,
  'techniques': blogCollection,
};