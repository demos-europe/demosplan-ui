const plugin = require('tailwindcss/plugin')

const borderRadius = Object.fromEntries(
  Object.values(require('./tokens/dist/js/rounded').rounded)
    // Filter out aliases here because they are only included for backward compatibility with Scss
    .filter(({ original }) => original.value.includes('{') === false)
    .map(({ attributes, value }) => [attributes.type, value])
)

const boxShadow = Object.fromEntries(
  Object.values(require('./tokens/dist/js/boxShadow')['box-shadow'])
    // Filter out aliases here because they are only included for backward compatibility with Scss
    .filter(({ original }) => original.value.includes('{') === false)
    .map(({ attributes, value }) => [attributes.type, value])
)

const screens = Object.fromEntries(
  Object.values(require('./tokens/dist/js/breakpoints').breakpoints).map(
    ({ attributes, value }) => [attributes.type, value]
  )
)

const zIndex = Object.fromEntries(
  Object.values(require('./tokens/dist/js/zIndex')['z-index']).map(
    ({ attributes, value }) => [attributes.type, value]
  )
)

module.exports = {
  content: [
    './src/components/**/*.{js,vue}',
    './src/directives/**/*.js'
  ],
  important: true, // Utilities should always win https://sebastiandedeyne.com/why-we-use-important-with-tailwind/
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
      })
    })
  ],
  safelist: [
    {
      pattern: /./// Disable purging https://github.com/tailwindlabs/tailwindcss/discussions/6557#discussioncomment-1838214
    }
  ],
  theme: {
    screens,
    borderRadius,
    boxShadow,
    zIndex,
    extend: {
      flexShrink: {
        2: '2'
      }
    }
  }
}
