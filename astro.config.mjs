import { defineConfig } from "astro/config";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import remarkToc from "remark-toc";
import mdx from "@astrojs/mdx";
import yaml from "@rollup/plugin-yaml"; //maybe needed, currently using .json
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
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
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
      // may be useful if your hosting provider allows caching between CI builds
      cacheDir: "./.cache/image",
      // supported levels: 'debug' | 'info' | 'warn' | 'error' | 'silent'
      // default: 'info'
      logLevel: "debug",
    }),
  ],
  vite: {
    //maybe needed, not yet used!
    plugins: [yaml()],
  },
  outDir: "./dist",
  site: "https://m.junglestar.org/",
  base: "/",
  //trailingSlash: 'always'
});
