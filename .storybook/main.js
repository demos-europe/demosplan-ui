const path = require('path')

module.exports = {
  stories: [
    //'../src/components/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpAccordion/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpAutocomplete/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpBadge/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpBulkEditHeader/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpButton/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpButtonIcon/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpButtonRow/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpCard/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpCheckbox/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpCheckboxGroup/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpColumnSelector/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpConfirmDialog/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpContextualHelp/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpDataTable/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpDataTableExtended/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpDateRangePicker/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpDatepicker/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpDatetimePicker/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpDetails/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpDraggable/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpEditableList/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpEditor/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpFlyout/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpFormRow/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpIcon/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpInlineNotification/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpInput/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpLabel/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpLoading/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpModal/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpMultiselect/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpMultistepNav/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpNotification/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpPager/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpProgressBar/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpRadio/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpResettableInput/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpSearchField/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpSelect/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpSkeletonBox/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpSlidebar/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpSlidingPagination/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpSplitButton/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpStickyElement/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpTabs/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpTextArea/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpTimePicker/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpToggle/*.@(mdx|stories.@(js|jsx|ts|tsx))',
    '../src/components/DpTooltip/*.@(mdx|stories.@(js|jsx|ts|tsx))',
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
