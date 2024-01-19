const glob = require('glob')
const StyleDictionary = require('style-dictionary')

const {
  createPropertyFormatter,
  fileHeader,
  sortByReference
} = StyleDictionary.formatHelpers

const prefix = 'dp-'

const tokensPath = 'tokens/src/**/*.json'

const files = glob
  .sync(tokensPath)
  .map(filePath => filePath
    .replace('tokens/src/', '')
    .replace('color/', '')
    .replace('.json', ''))
  // Do not render tokens only used internally
  .filter(filePath => !filePath.startsWith('_'))

// Adds prefix to variables
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

/**
 * This format is a customized version of the implementation
 * in `formattedVariables`. It applies some transformations
 * to scss variables according to the conventions in demosplan-ui.
 */
StyleDictionary.registerFormat({
  name: 'scss/customVariables',
  formatter: ({dictionary, options, file}) => {
    const { outputReferences, themeable = false, formatting} = options
    let { allTokens } = dictionary

    if (outputReferences) {
      allTokens = [...allTokens].sort(sortByReference(dictionary))
    }

    const propertyFormatter = createPropertyFormatter({ outputReferences, dictionary, format: 'sass', formatting, themeable })

    const tokens = allTokens
      .map(token => {
        let formattedVar = propertyFormatter(token)

        // The domain part within color tokens should not be part of the variable name.
        if (token.path[0] === 'color') {
          formattedVar = formattedVar.replace(/-(brand|data|palette|ui)/g, '')
        }

        // The domain part within font-size tokens should not be part of the variable name.
        if (token.path[0] === 'font-size') {
          formattedVar = formattedVar.replace(/-(scale|brand|heading|ui)/g, '')
        }

        // The key "z-index" should be shortened in the variable name to match Tailwind syntax
        if (token.path[0] === 'z-index') {
          formattedVar = formattedVar.replace(/z-index-/g, 'z-')
        }

        // Scss does not like variable names with dots in them, but Tailwind does, apparently.
        if (token.path[0] === 'space') {
          formattedVar = formattedVar.replace(/\./g, '_')
        }

        // "DEFAULT" is a Tailwind convention that should not be part of the Scss name
        formattedVar = formattedVar.replace(/-DEFAULT/g, '')

        return formattedVar
      })
      .filter(function(strVal) { return !!strVal })
      .join('\n')

    return fileHeader({file, commentStyle: 'short'}) + '\n' + tokens + '\n'
  }
})

const StyleDictionaryExtended = StyleDictionary.extend({
  source: [tokensPath],
  platforms: {
    scss: {
      transformGroup: 'custom/scss',
      buildPath: 'tokens/dist/scss/',
      files: files.map((filePath) => {
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
    js: {
      transformGroup: 'js',
      buildPath: 'tokens/dist/js/',
      files: files.map((filePath) => {
        return {
          destination: `${filePath}.js`,
          format: 'javascript/module',
          filter: (token) => token.filePath.includes(filePath),
          options: {
            outputReferences: true
          }
        }
      })
    }
  }
})

StyleDictionaryExtended.buildAllPlatforms()
