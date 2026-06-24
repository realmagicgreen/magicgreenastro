import { parseFrontmatter } from '@astrojs/markdown-remark'

export type Draft = {
  body: string
  href: string
  path: string
  slug: string
  title: string
}

const draftFiles = import.meta.glob('../content/posts/**/_*.md', {
  eager: true,
  import: 'default',
  query: '?raw'
}) as Record<string, string>

const toTitle = (slug: string) =>
  decodeURIComponent(slug)
    .split('/')
    .at(-1)
    ?.replace(/^_/, '')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() ?? 'Untitled draft'

const encodeSlug = (slug: string) => slug.split('/').map(encodeURIComponent).join('/')

export const getDrafts = () =>
  Object.entries(draftFiles)
    .map(([path, raw]) => {
      const { content, frontmatter } = parseFrontmatter(raw)
      const slug = path.replace('../content/posts/', '').replace(/\.md$/, '')

      return {
        body: content.trim(),
        href: `/drafts/${encodeSlug(slug)}`,
        path: path.replace('../content/posts/', 'src/content/posts/'),
        slug,
        title: typeof frontmatter.title === 'string' ? frontmatter.title : toTitle(slug)
      }
    })
    .sort((a, b) => a.title.localeCompare(b.title))
