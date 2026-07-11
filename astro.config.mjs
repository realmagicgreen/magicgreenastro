import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { rehypeHeadingIds, unified } from "@astrojs/markdown-remark";
import remarkToc from "remark-toc";
import partytown from "@astrojs/partytown";
import icon from "astro-icon";

import mcp from "astro-mcp";

// https://astro.build/config
export default defineConfig({
  output: "static",
  build: {
    inlineStylesheets: "always",
  },
  markdown: {
    // Astro 7 expects a full `unified()` processor here; the flat
    // `remarkPlugins`/`rehypePlugins` keys are deprecated.
    processor: unified({
      rehypePlugins: [rehypeHeadingIds],
      remarkPlugins: [
        [
          remarkToc,
          {
            heading: "contents",
            maxDepth: 2,
          },
        ],
      ],
    }),
  },
  integrations: [sitemap(), partytown(), icon(), mcp()],
  outDir: "./dist",
  site: "https://magicgreen.junglestar.org/",
  base: "/",
  prefetch: true,
  vite: {
    // plugins: [rawFonts([".ttf", ".woff"])],
    // optimizeDeps: {
    // 	exclude: ["@resvg/resvg-js"],
    // },
    css: {
      //it works, but cant save, so kinda useless
      devSourcemap: true,
    },
  },
});