import { defineConfig, sharpImageService } from 'astro/config'
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import remarkToc from 'remark-toc'
import mdx from '@astrojs/mdx'
import yaml from '@rollup/plugin-yaml' //maybe needed, currently using .json

import partytown from '@astrojs/partytown'
import prefetch from '@astrojs/prefetch'

// https://astro.build/config
export default defineConfig({
  image: {
    service: sharpImageService()
  },
  output: 'static',
  build: {
    // The 'auto' option will inline only the stylesheets that are below the vite.build.assetsInlineLimit threshold,
    // reducing the number of requests for smaller sheets.
    // Larger stylesheets, such as global ones used by all pages,
    // will still be fetched externally and cached:
    // inlineStylesheets: 'auto'

    // inline all stylesheets:
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
