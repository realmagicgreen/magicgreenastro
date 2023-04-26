import { defineConfig } from "astro/config";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import remarkToc from "remark-toc";
import mdx from "@astrojs/mdx";
import yaml from "@rollup/plugin-yaml"; //maybe needed, currently using .json

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true
  },
  output: "static",
  markdown: {
    drafts: true,
    rehypePlugins: [rehypeHeadingIds],
    remarkPlugins: [
      [
        remarkToc,
        {
          heading: "contents",
        },
      ],
    ],
  },
  integrations: [
    mdx({
      extendMarkdownConfig: false,
      // smartypants: true,
      gfm: true,
      drafts: true,
    }),
  ],
  vite: {
    //maybe needed, not yet used!
    plugins: [yaml()],
  },
  outDir: "./dist",
  site: "https://m.junglo.dev/",
  base: "/",
  //trailingSlash: 'always'
});
