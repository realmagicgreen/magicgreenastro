import { defineConfig } from 'astro/config'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import remarkToc from 'remark-toc'
import mdx from '@astrojs/mdx'
import yaml from '@rollup/plugin-yaml' //maybe needed, currently using .json

import partytown from '@astrojs/partytown'
import prefetch from '@astrojs/prefetch'

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true,
    inlineStylesheets: `always`
  },
  output: 'static',
  markdown: {
    drafts: true,
    rehypePlugins: [rehypeHeadingIds],
    remarkPlugins: [
      [
        remarkToc,
        {
          heading: 'contents'
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
    partytown(),
    prefetch({
      // Allow up to three links to be prefetched concurrently
      throttle: 5
    })
  ],
  vite: {
    //maybe needed, not yet used!
    plugins: [yaml()]
  },
  outDir: './dist',
  site: 'https://magicgreen.junglestar.org/',
  base: '/'
})
