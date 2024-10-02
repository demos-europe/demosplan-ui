const plugin = require('tailwindcss/plugin')

const tailwindTheme = {
  borderRadius: require('./tokens/dist/tailwind/rounded'),
  boxShadow: require('./tokens/dist/tailwind/boxShadow'),
  fontSize: require('./tokens/dist/tailwind/fontSize'),
  lineHeight: require('./tokens/dist/tailwind/space'),
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
  },
  animation: {
    busy: 'busy 1.5s linear infinite',
  },
  keyframes: {
    busy: {
      'from': { 'background-position': '0 0' },
      'to': { 'background-position': '30px 30px' },
    },
  },
}

module.exports = {
  content: [
    './tokens/*.mdx',
    './src/components/**/*.{js,vue}',
    './src/directives/**/*.js',
    './.storybook/**/*.jsx'
  ],
  plugins: [
    plugin(function({ addBase, addUtilities }) {
      addBase({
        html: {
          'color': require('./tokens/dist/tailwind/textColor').default,
        }
      })

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
        },
        /**
         * Visualize indeterminate system action. Use in conjunction with "animate-busy".
         */
        '.bg-busy': {
          'background-image': 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.3) 75%, transparent 75%, transparent)',
          'background-size': '60px 60px'
        },
        /**
         * Visualize invalid input elements. Applied by dpValidateMixin.
         */
        '.is-invalid': {
          '@apply outline-interactive-warning border-interactive-warning': {},
        }
      })
    })
  ],
  theme: tailwindTheme
}
