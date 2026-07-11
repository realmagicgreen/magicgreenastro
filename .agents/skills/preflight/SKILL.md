---
name: preflight
description: Run Magic Green Astro project checks before shipping, with local rules for drafts, versioning, dirty worktrees, UI spacing, and selective staging.
---

# Magic Green Astro Preflight

Use this skill when the user asks for `/preflight`, "preflight", "ship", "safe to ship", or asks to verify a Magic Green Astro change before committing, pushing, or deploying.

## Project Context

- Repo root: `/Volumes/DISK NOT FOUND/DATA/SitesALL/magicgreenastro`.
- Default ship target is `origin/main` only when the user explicitly asks to ship or push.
- The worktree is often dirty with user changes. Never revert unrelated changes. Work with existing edits if they touch the requested area.
- Use `package.json.version` as the app version source. Do not bump the app version unless the user explicitly asks.

## First Pass

1. Run `git status --short`.
2. Identify the exact files and hunks that belong to the current request.
3. If a touched file contains pre-existing unrelated edits, plan selective staging. Do not stage the entire file by habit.
4. Check whether content or route changes affect production visibility, especially posts, tags, drafts, and generated routes.

## Draft And Production Rules

- Draft posts must be omitted from public production pages.
- Public post collection reads should filter with both:

```ts
data.publish && data.pubDate < new Date();
```

- Verify tag routes too, not only homepage, category pages, and post detail pages:
  - `src/pages/[tag].astro`
  - `src/pages/tags/index.astro`
- The draft preview route should remain dev-only:

```ts
if (!import.meta.env.DEV) return [];
```

- Draft content inside `src/content/posts` still has to satisfy the content schema. Blank frontmatter values can block `astro sync` and `astro build`, even when `publish: false`.
- A date such as `2026-02-17` in post frontmatter is content metadata, not an app version bump.

## UI Spacing Rules

- Prefer existing SCSS/CSS primitives such as `var(--spacing)`, `--space`, or `--space_small`.
- Keep styles scoped inside the relevant Astro component unless the existing codebase uses a shared primitive for that exact surface.
- For inline metadata SVG icons, prefer trailing breathing room:

```scss
padding-inline-end: var(--spacing);
```

- Avoid full `padding-inline` on inline icons unless the design explicitly needs both sides.
- For nav/button label spacing, the current desired inline padding is half a spacing unit:

```scss
padding-inline: calc(var(--spacing) * 0.5);
```

## Required Checks

Run these from the repo root before shipping:

```bash
./node_modules/.bin/astro sync
./node_modules/.bin/astro build
git diff --check -- <touched-files>
```

Use the exact touched file list for `git diff --check` when practical.

Known existing warnings that should be reported but are not automatically blockers:

- Sass deprecation warnings.
- `astro-icon` import warnings for known local icons.
- `/solutions` route conflict warnings involving `/[tag]`.
- `/rss.xml` route method warnings.

## Optional Visual Check

- If a browser check matters, prefer a local static preview of `dist` after `astro build`.
- `astro dev` may fail in this workspace with `Dev server process exited before becoming ready`; do not treat that as a regression without confirming.
- If serving `dist` with `python3 -m http.server`, stop the server after the check.

## Ship Discipline

1. Stage only intended files or hunks.
2. If a file has unrelated local edits, do not run `git add <file>` for that file. Stage a patch instead.
3. Review staged changes:

```bash
git diff --cached --stat
git diff --cached
```

4. Commit with a concise message only after checks pass.
5. Push only when the user asked to ship or push.
6. In the final response, report:
   - What changed.
   - Which checks passed.
   - Any known warnings that remain.
   - Commit hash and push status when applicable.
