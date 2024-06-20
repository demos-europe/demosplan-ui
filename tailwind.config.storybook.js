/**
 * We're generating tailwind bg-classes on the fly in the storybook documentation
 * in tokens/tokens.color.stories.mdx. However these classes are not recognised
 * by the Purge algorithm of Tailwind, that is why they're safe listed here.
 */
const config = {
  ...require('./tailwind.config'),
  safelist: [
    {
      pattern: /bg-(.*)/,
    }
  ]
}

module.exports = config
