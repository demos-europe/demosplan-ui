const path = require('path')

module.exports = {
  stories: [
    '../src/index.mdx',
    '../src/components/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/directives/**/*.mdx',
    '../tokens/**/*.mdx'
  ],

  addons: [
    "@storybook/addon-links",
    '@storybook/addon-docs'
  ],

  features: {
    backgrounds: false,  // uncomment to disable backgrounds
    measure: false,      // uncomment to disable measure tool
    outline: false,      // uncomment to disable outline tool
  },

  viteFinal: async (config) => {
    // Alias for ~ to src directory (already in vite.config.mjs, but ensuring it's available in Storybook)
    config.resolve.alias['~'] = path.resolve(__dirname, '../src')
    return config
  },

  framework: '@storybook/vue3-vite'
}
