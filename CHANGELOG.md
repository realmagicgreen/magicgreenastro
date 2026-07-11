# Changelog

## 8.1.0 — 2026-07-11

Maintenance release: build/dependency cleanup and a full Dart Sass module migration. No changes to site content or rendered output (compiled CSS is byte-identical).

### Developer experience

- `dev` script now clears the Astro cache (`node_modules/.astro`) on start and auto-opens the site in Google Chrome.

### Build & dependencies

- Removed unused dependencies: `astro-robots-txt`, `reading-time`, `mdast-util-to-string`, `prettier-config-standard`.
- Deleted the orphaned `src/scripts/remark-reading-time.mjs` plugin (imported nowhere).
- Wired `prettier-plugin-astro` via a `prettier` config block in `package.json` so `.astro` files format correctly.
- `astro.config.mjs`: dropped the redundant explicit `sharpImageService()` (sharp is the default image service) and the dead `markdown.drafts` flag.
- Dependency bumps: `astro` 7.0.2 → 7.0.7, `@astrojs/markdown-remark` 7.2.0 → 7.2.1, `@astrojs/rss` 4.0.18 → 4.0.19, `packageManager` pnpm 10.13.1 → 11.11.0.
- Added pnpm `allowBuilds` for `@parcel/watcher`, `esbuild`, `sharp`.

### Styles (SCSS)

- Migrated the live `pico.slim` stylesheet tree from `@import` / global built-ins to Dart Sass modules (`@use` / `@forward`, `color.*`, `map.*`, `string.*`). Zero deprecation warnings; compiled CSS verified byte-identical.
- Removed the three unused Pico entry variants (`pico.scss`, `pico.classless.scss`, `pico.fluid.classless.scss`) and their orphaned partials (`_form`, `_form-checkbox-radio`, `_form-alt-input-types`, `_table`, `_code`, `_miscs`, `_modal`, `_tooltip`, `_sectioning`).
