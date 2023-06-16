const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./components/**/*.{js,vue}', './directives/**/*.js'],
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
    extend: {
      flexShrink: {
        2: '2'
      }
    }
  }
}
