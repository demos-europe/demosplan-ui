const path = require('path')

module.exports = {
  stories: [
    "../src/components/**/*.stories.@(js|jsx|mdx|ts|tsx)",
    "../src/directives/**/*.stories.mdx",
    "../tokens/**/*.stories.mdx"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-mdx-gfm",
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

    return config
  },
  framework: {
    name: "@storybook/vue-webpack5",
    options: {}
  },
  docs: {
    autodocs: true
  }
};
