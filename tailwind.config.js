const plugin = require('tailwindcss/plugin')

const tailwindTheme = {
  borderRadius: require('./tokens/dist/tailwind/rounded'),
  boxShadow: require('./tokens/dist/tailwind/boxShadow'),
  fontSize: require('./tokens/dist/tailwind/fontSize'),
  screens: require('./tokens/dist/tailwind/breakpoints'),
  spacing: require('./tokens/dist/tailwind/space'),
  zIndex: require('./tokens/dist/tailwind/zIndex'),
  colors: {
    ...require('./tokens/dist/tailwind/color'),
    'transparent': 'transparent'
  }
}

const tailwindCorePluginsColor = ['backgroundColor', 'borderColor', 'textColor']

tailwindCorePluginsColor.forEach(corePlugin => {
  tailwindTheme[corePlugin] = {
    ...tailwindTheme.colors,
    ...require(`./tokens/dist/tailwind/${corePlugin}`)
  }
})

tailwindTheme.extend = {
  flexShrink: {
    2: '2'
  }
}

module.exports = {
  content: [
    './tokens/*.mdx',
    './src/components/**/*.{js,vue}',
    './src/directives/**/*.js',
    './.storybook/**/*.jsx'
  ],
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        /**
         * This overrides the Tailwind class of the same name with some
         * styles to ensure browsers are adding hyphens if appropriate.
         */
        '.break-words': {
          'word-wrap': 'break-word',
          'word-break': 'break-word',
          'hyphens': 'auto'
        },
        /**
         * Hide scrollbar while keeping the element scrollable.
         * See https://stackoverflow.com/a/63756377/6234391
         */
        '.scrollbar-none': {
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            'display': 'none'
          }
        }
      })
    })
  ],
  theme: tailwindTheme
}
