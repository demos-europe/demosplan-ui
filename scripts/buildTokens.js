const glob = require('glob')
const StyleDictionary = require('style-dictionary')
const {
  transformScssTokens,
  transformTailwindTokens
} = require('./utils/transformTokens')

const prefix = 'dp-'

const tokensPath = 'tokens/src/**/*.json'

const files = glob
  .sync(tokensPath)
  .map(filePath => filePath
    .replace('tokens/src/', '')
    .replace('color/', '')
    .replace('.json', ''))
    .filter(filePath => !filePath.startsWith('_')) // Do not render tokens only used internally

// Define custom output groups for Tailwind, rather than just grouping them by file path
const corePlugins = ['fontSize', 'boxShadow', 'breakpoints', 'rounded', 'space', 'zIndex']
const corePluginsColor = ['color', 'textColor', 'backgroundColor', 'borderColor']

// Adds prefix to variables. Keeps uppercase path parts, which is needed later.
StyleDictionary.registerTransform({
  name: 'name/scss',
  type: 'name',
  transformer: (token) => prefix + token.path.join('-')
})

// Adds prefix transform to default scss transform group
StyleDictionary.registerTransformGroup({
  name: 'custom/scss',
  transforms: StyleDictionary.transformGroup.scss.concat(['name/scss'])
})

// Adds prefix to variables. Keeps uppercase path parts, which is needed later.
StyleDictionary.registerTransform({
  name: 'name/web',
  type: 'name',
  transformer: (token) => token.path.join('-')
})

// Adds prefix transform to default scss transform group
StyleDictionary.registerTransformGroup({
  name: 'custom/web',
  transforms: StyleDictionary.transformGroup.web.concat(['name/web'])
})

/**
 * Custom format that generates javascript modules ready to be used as Tailwind config files.
 * The values use a nested set of css variables to enable theming on multiple levels.
 */
StyleDictionary.registerFormat({
  name: 'tailwind/variables',
  formatter: (formatterArguments) => transformTailwindTokens(formatterArguments, corePluginsColor)
})

/**
 * This format is a customized version of the implementation in `formattedVariables`.
 * It applies some transformations to scss variables according to the conventions in demosplan-ui.
 * See https://github.com/amzn/style-dictionary/blob/17f4cb2f30bd002dfd55d6ef8c5bee4138de8d64/lib/common/formatHelpers/formattedVariables.js#L46
 */
StyleDictionary.registerFormat({
  name: 'scss/customVariables',
  formatter: transformScssTokens
})

const StyleDictionaryExtended = StyleDictionary.extend({
  source: [tokensPath],
  platforms: {
    js: {
      transformGroup: 'js',
      buildPath: 'tokens/dist/js/',
      files: files.map((filePath) => {
        return {
          destination: `${filePath}.js`,
          format: 'javascript/module',
          filter: (token) => {
            return token.filePath.includes(filePath) && token.$status !== 'Deprecated'
          },
          options: {
            outputReferences: true
          }
        }
      })
    },
    scss: {
      transformGroup: 'custom/scss',
      prefix,
      buildPath: 'tokens/dist/scss/',
      files: files
        .map((filePath) => {
          return {
            destination: `_${filePath}.scss`,
            format: 'scss/customVariables',
            filter: (token) => token.filePath.includes(filePath),
            options: {
              outputReferences: true
            }
          }
        })
    },
    web: {
      transformGroup: 'custom/web',
      prefix,
      buildPath: 'tokens/dist/tailwind/',
      files: [...corePlugins, ...corePluginsColor].map((plugin) => {
        return {
          destination: `${plugin}.js`,
          format: 'tailwind/variables'
        }
      }),
    },
  }
})

StyleDictionaryExtended.buildAllPlatforms()
