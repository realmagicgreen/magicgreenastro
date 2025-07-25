import { z, defineCollection } from 'astro:content'
//import { blogSchema } from "./_schemas";

const articleCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      // coverImage: image().refine((img) => img.width >= 1920, {
      //   message: 'image too small, min width 1920px'
      // }),
      coverImage: image(),
      title: z.string(),
      subtitle: z.string(),
      //category: z.enum(["about", "health", "know", "products", "services", "solutions", "techniques"]),
      category: z.string(),
      pubDate: z.date().or(z.string()),
      updatedpubDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
      tags: z.array(z.string()),
      description: z.string().min(11).max(160, 'BEST SEO MAX 160 CHARACTERS.'),
      ad: z.boolean().optional().default(false),
      featured: z.boolean().optional().default(false),
      publish: z.boolean().optional().default(false),
      photography: z.string().optional().default('unknown'),
      // Advanced: Validate that the string is also a URL
      canonicalURL: z.string().url().optional()
    })
})
const aboutCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      coverImage: image(),
      title: z.string(),
      subtitle: z.string(),
      description: z.string().min(11).max(160, 'BEST SEO MAX 160 CHARACTERS.'),
      photography: z.string().optional().default('unknown'),
      canonicalURL: z.string().url().optional()
    })
})

//    Should match your collection directory name in "src/content"
export const collections = {
  about: aboutCollection,
  posts: articleCollection
}
