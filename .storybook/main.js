const projectConfig = require('../webpack.config')
const { merge } = require('webpack-merge')

module.exports = {
  stories: [
    "../src/components/**/*.stories.mdx",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/directives/**/*.stories.mdx",
    "../tokens/**/*.stories.mdx"
  ],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],

  webpackFinal: async config => {
    /**
     * This rule is executed first. It ensures that the <license> blocks
     * at the top of Vue components do not break vue-docgen-loader.
     * The loader returns an empty string for all <license> blocks.
     */
    config.module.rules.push({
      resourceQuery: /blockType=license/,
      loader: require.resolve('./removeSFCBlockLoader.js')
    })

    /**
     * Custom aliases defined within webpack must also be set in storybook.
     */
    const resolveAlias = {
      resolve: {
        alias: projectConfig().resolve.alias
      }
    }

    return merge(
      config,
      resolveAlias
    )
  },

  /**
   * To mitigate issues arising from Webpack 4 (Storybook builder default) being
   * installed alongside Webpack 5 (being the build tool for demosplan-ui),
   * Storybook is configured to use Webpack 5, too.
   *
   * @see https://github.com/vuejs/vue-cli/issues/5986
   * @see https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#fixing-hoisting-issues
   */
  core: {
    builder: 'webpack5'
  }
}
