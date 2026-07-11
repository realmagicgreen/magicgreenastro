import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function get() {
  return rss({
    title: "Magic Green | Astro",
    description: "Magic Green on Astro",
    site: "https://m.junglo.dev",
    items: await pagesGlobToRssItems(import.meta.glob("./**/*.md")),
    customData: `<language>en-us</language>`,
  });
}
