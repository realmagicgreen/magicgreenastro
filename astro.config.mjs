import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import yaml from "@rollup/plugin-yaml"; //maybe needed, currently using .json
import image from "@astrojs/image";

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  markdown: {
    drafts: true,
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
  site: "https://magicgreen.junglestar.org/",
});
