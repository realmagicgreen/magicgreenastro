/** @type {import("prettier").Config} */
module.exports = {
  // i'm just using the standard config, change if you need
  ...require('prettier-config-standard'),
  pluginSearchDirs: [__dirname],
  plugins: [require.resolve('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    },
    {
      files: '*.svg',
      options: {
        parser: 'html'
      }
    }
  ]
}
