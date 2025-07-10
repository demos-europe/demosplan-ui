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
     * We must duplicate the aliases set within ../webpack.config.js,
     * but with an added ../ because storybook parses the whole thing
     * from its own root directory, "./storybook".
     * @type {string}
     */
    config.resolve.alias['~'] = path.resolve(__dirname, '../src')

    // Webpack needs to use '@babel/preset-react' for React templates in storybook components
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    })

    return config
  },

  framework: '@storybook/vue3-vite'
}
