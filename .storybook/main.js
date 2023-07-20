module.exports = {
  stories: [
    "../src/components/**/*.stories.mdx",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/directives/**/*.stories.mdx",
    "../tokens/**/*.stories.mdx"
  ],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: '@storybook/addon-styling',
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: {
          implementation: require.resolve('postcss')
        }
      }
    }
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
    return config
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
