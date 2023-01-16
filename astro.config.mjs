import { defineConfig } from "astro/config";
import yaml from "@rollup/plugin-yaml"; //maybe needed, currently using .json

// https://astro.build/config
export default defineConfig({
  vite: {
    //maybe needed, not yet used!
    plugins: [yaml()],
  },
  site: "https://magicgreen.junglestar.org",
  prova: "bomba",
  outDir: "./dist",
});
