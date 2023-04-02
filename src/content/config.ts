import { z, defineCollection, image } from 'astro:content';

const blogCollection = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    category: z.enum(["about", "health", "know", "products", "services", "solutions", "techniques"]),
    pubDate: z
      .date()
      .or(z.string()),
    updatedpubDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    tags: z.array(z.string()),
    coverImage: image(),
    // coverImage: image().refine((img) => img.width >= 1920, {
    //   message: "Cover image must be at least 1920 pixels wide!",
    // }),
    description: z
      .string()
      .max(
        160,
        "BEST SEO MAX 160 CHARACTERS."
      ),
    ad: z.boolean().optional().default(false),
    featured: z.boolean().optional().default(false),
    draft: z.boolean().optional(),
    photography: z.string(),
    // Advanced: Validate that the string is also a URL
    canonicalURL: z.string().url().optional(),
  }),
});

//    Should match your collection directory name in "src/content"
export const collections = {
  'about': blogCollection,
  'health': blogCollection,
  'know': blogCollection,
  'products': blogCollection,
  'services': blogCollection,
  'solutions': blogCollection,
  'techniques': blogCollection,
};