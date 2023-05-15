# MAGIC GREEN ASTRO

## WIP:

- tag icon before tags in posts
- new posts

## 2DOs:

- move img to post folder (finally can, but need testing!)
- tags see Astro Paper
- make head menu responsive
- standalone web-app
- search
- Add Patreon
- build ADD YOURSELF FORM > gform > gsheet
- css overlay ala VEGAS, via frontmatter true false, for crappy jpgs
- i18n + make indo posts (using G translate)
- Know section: make memes img 4 social with pill statistics phrases (img)
- tooltip showing categories descriptions
- FB post some stuff + setup post robot (buffer?)
- make contributor guide page w/ what's needed in an article, writing style, checklist.
- Twitter account
- add ?ref=magicgreen.org with JS
- footer: accordion | only popular posts, just topics..
- web mentions
- feed
- gsheet is shared with iam.gservice user (magicgreen-admin@magicgreen-205703.iam.gserviceaccount.com) and given EDIT permissions, maybe need only read, test later, when it's working!
- listen to this post (use Soundcloud! + find free tier pro text-to-speach )
- why medium-zoom use jpgs and not avifs?

## DONE:

- install
- PICO
- improved logos
- add posts
- add pages
- top nav
- astro image
- esperimental assets
- add img caption from alt via JS
- GA4
- partytown

## Get VSCode, eslint & prettier working with Astro

(from [patheticgeek](https://patheticgeek.dev/blog/astro-prettier-eslint-vscode))

### 0. Install deps

```sh
pnpm i -D eslint eslint-plugin-astro eslint-plugin-jsx-a11y @typescript-eslint/parser prettier prettier-config-standard prettier-plugin-astro
```

### 1. Set up prettier

1.Specify the absolute dir in which to search for plugins using 'pluginSearchDirs', prettier is dumb af with this.

2.Use 'require.resolve' to specify absolutely where the plugin is.

3.Set the override and parser for .astro files.
'prettier.config.cjs':

```cjs
/** @type {import("prettier").Config} */
module.exports = {
  // i am just using the standard config, change if you need something else
  ...require('prettier-config-standard'),
  pluginSearchDirs: [__dirname],
  plugins: [require.resolve('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ]
}
```

### 2. Set up eslint

1.The extension cant find '@typescript-eslint/parser', so set the parser explicitly.
2.Set the 'ecmaVersion' & 'sourceType', for error “The keyword import/export is reserved”.
3.Add the override for .astro files.
'.eslintrc.cjs':

```cjs
/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['plugin:astro/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      }
    }
  ]
}
```

### 3. Set up Prettier ESLint extension

The issue with this extension is that it doesn’t know its own abilities, so lets fix that.

1.Set 'eslint.validate' to include astro, to tell eslint to validate astro files.
2.Set 'prettier.documentSelectors', to tell prettier to format astro files.
3.Set the default formatter for astro files.
In your VSCode’s 'setting.json' file add the following:

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "astro",
    "typescript",
    "typescriptreact"
  ],
  "prettier.documentSelectors": ["**/*.astro"],
  "[astro]": { "editor.defaultFormatter": "esbenp.prettier-vscode" }
}
```

### 4. Add the script in package.json

Add the script in 'package.json' to lint all files

```json
{
  "script": {
    "lint": "prettier --write  \"**/*.{js,jsx,ts,tsx,md,mdx,astro}\" && eslint --fix \"src/**/*.{js,ts,jsx,tsx,astro}\""
  }
}
```
