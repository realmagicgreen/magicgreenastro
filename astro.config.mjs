import { defineConfig, sharpImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import remarkToc from "remark-toc";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  image: {
    service: sharpImageService(),
  },
  output: "static",
  build: {
    inlineStylesheets: "always",
  },
  markdown: {
    drafts: true,
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
  },
  integrations: [sitemap(), mdx(), partytown()],
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
