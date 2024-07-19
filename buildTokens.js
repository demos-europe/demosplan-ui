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
    .filter(filePath => !filePath.startsWith('_')) // Do not render tokens only used internally

// Resolve token values with fallback, for css variables nesting
function resolveValue(token, dictionary) {
  let value = token.value
  const seen = new Set()

  while (dictionary.usesReference(value)) {
    seen.add(value)
    value = dictionary.getReferences(value)[0].value
    if (seen.has(value)) break
  }

  return value
}

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
 * In the json tokens sources, some nesting is used for better structuring token groups.
 * This must be resolved when transforming them into target formats.
 * @param tokenName
 * @param tokenPath
 * @param targetFormat
 * @return {*}
 */
const transformTokenName = (tokenName, tokenPath, targetFormat) => {
  // The domain part within color tokens should not be part of the variable name.
  if (tokenPath[0] === 'color') {
    tokenName = tokenName.replace(/-(brand|data|palette|ui-tailwind|ui)/g, '')

    if (tokenPath[1] === 'ui-tailwind' && tokenPath[2] !== 'color') {
      tokenName = tokenName.replace(/color-/g, '')
    } else if (tokenPath[1] === 'ui-tailwind' && tokenPath[2] === 'color') {
      tokenName = tokenName.replace(/color-color-/g, 'color-')
    }
  }

  // The domain part within font-size tokens should not be part of the variable name.
  if (tokenPath[0] === 'font-size') {
    tokenName = tokenName.replace(/-(scale|brand|heading|ui)/g, '')
  }

  // The key "z-index" should be shortened in the variable name to match Tailwind syntax
  if (tokenPath[0] === 'z-index') {
    tokenName = tokenName.replace(/z-index-/g, 'z-')
  }

  // "DEFAULT" is a Tailwind convention that should not be part of the Scss name
  tokenName = tokenName.replace(/-DEFAULT/g, '')

  if (targetFormat === 'scss') {
    // Scss does not like variable names with dots in them, but Tailwind does, apparently.
    if (tokenPath[0] === 'space') {
      tokenName = tokenName.replace(/\./g, '_')
    }
  }

  if (targetFormat === 'tailwind') {
    if (tokenPath[0] === 'color' || tokenPath[1] === 'ui-tailwind') {
      tokenName = tokenName.replace(/color-/g, '')
    }
    if (tokenPath[0] === 'color' && tokenPath[1] === 'ui-tailwind') {
      tokenName = tokenName.replace(/(textColor|backgroundColor|borderColor)-/g, '')
    }
  }

  return tokenName
}

const corePlugins = ['color', 'color.palette', 'color.brand', 'color.data', 'textColor', 'backgroundColor', 'borderColor']

/**
 * Custom format that generates javascript modules ready to be used as Tailwind config files.
 * The values use a nested set of css variables to enable theming on multiple levels.
 */
StyleDictionary.registerFormat({
  name: 'tailwind/variables',
  formatter({ dictionary, file  }) {
    const groupedTokens = {}
    corePlugins.forEach(plugin => {
      groupedTokens[plugin] = {}
    })

    dictionary.allTokens.forEach(token => {
      const tokenName = transformTokenName(token.name, token.path, 'tailwind')
      const varName = `--${prefix}${transformTokenName(token.name, token.path).replace(/\./g, '-')}`
      let fallback = resolveValue(token, dictionary)

      let current = token
      let cssVar = `var(${varName}`
      while (current.original && current.original.value.startsWith('{')) {
        const ref = dictionary.getReferences(current.original.value)[0]
        let refName = transformTokenName(ref.name, ref.path)
        refName = `--${prefix}${refName.replace(/\./g, '-')}`
        cssVar += `, var(${refName}`

        current = ref
      }

      cssVar += `, ${fallback})`.repeat(cssVar.match(/var\(/g).length)

      let regex = /#([0-9a-fA-F]{6})\), #([0-9a-fA-F]{6})/
      let replaced = cssVar.replace(regex, '#$1)')

      // Sort token definition into respective group
      corePlugins.forEach(plugin => {
        const isCorePluginDefinition = token.path[2] === plugin
        const isColorDefinition = token.path[1] === plugin.replace('color.', '') && token.path[0] === 'color'
        if (isCorePluginDefinition || isColorDefinition) {
          groupedTokens[plugin][tokenName.replace(/\./g, '-')] = replaced + ';'
        }
      })
    })

    return `module.exports = ${JSON.stringify(groupedTokens[file.destination.replace('.js', '')], null, 2)};`
  }
})

/**
 * This format is a customized version of the implementation
 * in `formattedVariables`. It applies some transformations
 * to scss variables according to the conventions in demosplan-ui.
 * See https://github.com/amzn/style-dictionary/blob/17f4cb2f30bd002dfd55d6ef8c5bee4138de8d64/lib/common/formatHelpers/formattedVariables.js#L46
 */
StyleDictionary.registerFormat({
  name: 'scss/customVariables',
  formatter: ({dictionary, options, file}) => {
    const { outputReferences, themeable = false, formatting } = options
    let { allTokens } = dictionary

    if (outputReferences) {
      allTokens = [...allTokens].sort(sortByReference(dictionary))
    }

    const propertyFormatter = createPropertyFormatter({ outputReferences, dictionary, format: 'sass', formatting, themeable })

    const tokens = allTokens
      .map(token => {
        return transformTokenName(propertyFormatter(token), token.path, 'scss')
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
      prefix,
      buildPath: 'tokens/dist/scss/',
      files: files
        .map((filePath) => {
          return {
            destination: `_${filePath}.scss`,
            format: 'scss/customVariables',
            filter: (token) => token.filePath.includes(filePath) && !token.filePath.includes('color.ui-tailwind'),
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
          filter: (token) => {
            return token.filePath.includes(filePath) && token.$status !== 'Deprecated'
          },
          options: {
            outputReferences: true
          }
        }
      })
    },
    web: {
      transformGroup: 'custom/web',
      buildPath: 'tokens/dist/tailwind/',
      files: corePlugins.map((plugin) => {
        return {
          destination: `${plugin}.js`,
          format: 'tailwind/variables'
        }
      }),
    },
  }
})

StyleDictionaryExtended.buildAllPlatforms()
