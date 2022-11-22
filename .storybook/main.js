module.exports = {
  stories: [
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
    "../directives/**/*.stories.mdx",
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
    return config
  }
}
