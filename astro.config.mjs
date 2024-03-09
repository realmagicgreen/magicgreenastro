import { defineConfig, sharpImageService } from 'astro/config'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import remarkToc from 'remark-toc'
import mdx from '@astrojs/mdx'
import partytown from '@astrojs/partytown'

// https://astro.build/config
export default defineConfig({
  image: {
    service: sharpImageService()
  },
  output: 'static',
  build: {
    inlineStylesheets: 'always'
  },
  markdown: {
    drafts: true,
    rehypePlugins: [rehypeHeadingIds],
    remarkPlugins: [
      [
        remarkToc,
        {
          heading: 'contents',
          maxDepth: 2
        }
      ]
    ]
  },
  integrations: [
    mdx({
      extendMarkdownConfig: false,
      gfm: true,
      drafts: true
    }),
    partytown()
  ],
  experimental: {
    contentCollectionCache: true
  },
  outDir: './dist',
  site: 'https://magicgreen.junglestar.org/',
  base: '/'
})
