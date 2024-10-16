const path = require('path')

module.exports = {
  stories: [
    //'../src/components/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/directives/**/*.mdx',
    '../tokens/**/*.mdx'
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    ({
      name: "@storybook/addon-styling-webpack",
      options: {
        rules: [
          {
            test: /\.css$/,
            sideEffects: true,
            use: [
              require.resolve("style-loader"),
              {
                loader: require.resolve("css-loader"),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve("postcss-loader"),
                options: {
                  implementation: require.resolve("postcss"),
                },
              },
            ],
          },
        ],
      }
    }),
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
  framework: '@storybook/vue3-webpack5',
  docs: {
    autodocs: true
  }
}
