const plugin = require('tailwindcss/plugin')

/**
 * Transform a StyleDictionary js module representation of the tokens object
 * into a simplified object to be consumable for the Tailwind config.
 * It filters out tokens that are aliases for other tokens.
 * @param tokens The original object
 * @return {{[p: string]: unknown}}
 */
const tokensToTailwind = (tokens) => {
  const tokensArray = Object.values(tokens)
  const filteredTokens = tokensArray.filter(({ original }) => original.value.includes('{') === false)
  return Object.fromEntries(filteredTokens.map(({ attributes, value }) => [attributes.type, value]))
}

const borderRadius = tokensToTailwind(require('./tokens/dist/js/rounded').rounded)
const boxShadow = tokensToTailwind(require('./tokens/dist/js/boxShadow')['box-shadow'])
const spacing = tokensToTailwind(require('./tokens/dist/js/space').space)
const screens = tokensToTailwind(require('./tokens/dist/js/breakpoints').breakpoints)
const zIndex = tokensToTailwind(require('./tokens/dist/js/zIndex')['z-index'])

module.exports = {
  content: [
    './tokens/*.mdx',
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
  theme: {
    borderRadius,
    boxShadow,
    screens,
    spacing,
    zIndex,
    extend: {
      flexShrink: {
        2: '2'
      }
    }
  }
}
