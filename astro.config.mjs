import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import yaml from "@rollup/plugin-yaml"; //maybe needed, currently using .json

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  markdown: {
    drafts: true,
  },
  integrations: [
    mdx({
      extendMarkdownConfig: false,
      smartypants: true,
      gfm: true,
      drafts: true,
    }),
  ],
  vite: {
    //maybe needed, not yet used!
    plugins: [yaml()],
  },
  outDir: "./dist",
  site: "https://magicgreen.junglestar.org/",
});
