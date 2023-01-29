import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function get(context) {
  return rss({
    items: await pagesGlobToRssItems(import.meta.glob("./blog/*.{md,mdx}")),
  });
}
