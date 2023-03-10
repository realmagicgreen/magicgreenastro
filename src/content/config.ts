import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    category: z.enum(["about", "health", "know", "products", "services", "solutions", "techniques"]),
    // pubDate: z.date(),
    // publishDate: z.string().optional().transform((str) => new Date(str)),
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
    // coverImage: image().refine((img) => img.width >= 1080, { message: 'Cover image must be at least 1080 pixels wide!' }),
    description: z
      .string()
      .max(
        160,
        "BEST SEO MAX 160 CHARACTERS."
      ),
    ad: z.boolean().optional().default(false),
    featured: z.boolean().optional().default(false),
    draft: z.boolean().optional(),
    photography: z.string().optional(),
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