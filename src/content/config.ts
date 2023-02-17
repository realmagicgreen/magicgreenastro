import { z, defineCollection } from 'astro:content';
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    category: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    coverImage: z.string().optional(),
    description: z.string(),
    ad: z.boolean(),
    featured: z.boolean(),
    draft: z.boolean().optional(),
  }),
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'health': blogCollection,
  'know': blogCollection,
  'products': blogCollection,
  'services': blogCollection,
  'solutions': blogCollection,
  'techniques': blogCollection,
};