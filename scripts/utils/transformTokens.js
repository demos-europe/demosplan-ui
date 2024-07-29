const StyleDictionary = require("style-dictionary");
const {
  createPropertyFormatter,
  fileHeader,
  sortByReference
} = StyleDictionary.formatHelpers

// Resolve token values with fallback, for css variables nesting
const resolveValue = (token, dictionary) => {
  let value = token.value
  const seen = new Set()

  while (dictionary.usesReference(value)) {
    seen.add(value)
    value = dictionary.getReferences(value)[0].value
    if (seen.has(value)) break
  }

  return value
}

// Turn a dash-case-string into a lowerCamelString
const dashToLowerCamel = (str) => {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase()
  })
}

// Turn a lowerCamelString into a dash-case-string
const lowerCamelToDash = (str) => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// Build Css variables chain to resolve aliases
const transformTailwindTokenValue = (token, formatterArguments) => {
  const { dictionary, platform } = formatterArguments
  const varName = `--${platform.prefix}${transformTailwindTokenName(token, true).replace(/\./g, '-')}`
  let fallback = resolveValue(token, dictionary)

  let current = token
  let cssVar = `var(${varName}`
  while (current.original && current.original.value.startsWith('{')) {
    const ref = dictionary.getReferences(current.original.value)[0]
    let refName = transformTailwindTokenName(ref, true)
    refName = `--${platform.prefix}${refName.replace(/\./g, '-')}`
    cssVar += `, var(${refName}`

    current = ref
  }

  // Add final fallback, close with brackets corresponding to the amount of "var" usages found
  cssVar += `, ${fallback}` + ')'.repeat(cssVar.match(/var\(/g).length)

  return cssVar
}

const transformTailwindTokensGrouped = (formatterArguments, corePluginsColor) => {
  const { dictionary, file } = formatterArguments
  const groupedTokens = {}

  corePluginsColor.forEach(plugin => {
    groupedTokens[plugin] = {}
  })

  dictionary.allTokens.forEach(token => {
    // Do not include legacy ui and palette colors
    if (token.path[0] !== 'color' || token.path[0] === 'color' && ['ui', 'palette'].includes(token.path[1])) {
      return false
    }

    const tokenName = transformTailwindTokenName(token)
    const replaced = transformTailwindTokenValue(token, formatterArguments)

    // Sort token definition into respective group
    corePluginsColor.forEach(plugin => {
      if (token.path[2] === plugin || ['brand', 'data'].includes(token.path[1]) && plugin === 'color') {
        groupedTokens[plugin][tokenName] = replaced + ';'
      }
    })
  })

  return `module.exports = ${JSON.stringify(groupedTokens[file.destination.replace('.js', '')], null, 2)};`
}

const isDestination = (file, token) => {
  const filePart = file.destination.replace('.js', '')
  const dashedTokenPath = dashToLowerCamel(token.path[0])
  return dashedTokenPath === filePart
}

const isDeprecated = (token) => token['$status'] === 'Deprecated'

const isTailwindExcluded = (token) => {
  return token.path[0] === 'fontSize' && token.path[1] === 'scale'
}

const transformTailwindTokensFlat = (formatterArguments) => {
  const { dictionary, file } = formatterArguments
  const tokens = {}

  dictionary.allTokens.forEach(token => {
    if (!isDestination(file, token) || isDeprecated(token) || isTailwindExcluded(token)) {
      return
    }

    const tokenName = transformTailwindTokenName(token)
    const tokenValue = transformTailwindTokenValue(token, formatterArguments)

    tokens[tokenName] = tokenValue + ';'
  })

  return `module.exports = ${JSON.stringify(tokens, null, 2)};`
}

// Extract variable name from Scss variables declaration
const getScssVariableName = (declaration) => {
  const regex = /\$([\w.-]+)\s*:/
  const match = declaration.match(regex)

  if (match) {
    return match[1]
  }

  return null
}

// Replace string in Scss variable name via regex
const replaceScssVariableName = (declaration, searchRegex, replaceStr) => {
  const variableName = getScssVariableName(declaration)
  if (variableName) {
    const updatedVariableName = variableName.replace(searchRegex, replaceStr)
    return declaration.replace(variableName, updatedVariableName)
  }

  return declaration
}

// Transforms that apply to both Scss and Tailwind platforms
const transformDeclarationDefault = (declaration, tokenPath) => {
  // The domain part within font-size tokens should not be part of the variable name.
  if (tokenPath[0] === 'fontSize') {
    declaration = declaration.replace(/-(scale|brand|heading|ui)/g, '')
  }

  // The domain part within color tokens should not be part of the variable name.
  if (tokenPath[0] === 'color') {
    declaration = declaration.replace(/-(brand|data|palette|ui-tailwind|ui)/g, '')
  }

  return declaration
}

// Transforms that only apply to Tailwind token name
const transformTailwindTokenName = (token, keepPluginName = false) => {
  let declaration = token.name
  const tokenPath = token.path

  declaration = transformDeclarationDefault(declaration, tokenPath)

  // Within css variable declarations, we want to keep plugin names
  if (!keepPluginName) {
    if (tokenPath[0] === 'color' || tokenPath[1] === 'ui-tailwind') {
      declaration = declaration.replace(/color-/g, '')
    }

    if (tokenPath[0] === 'color' && tokenPath[1] === 'ui-tailwind') {
      declaration = declaration.replace(/(textColor|backgroundColor|borderColor)-/g, '')
    }

    if (['boxShadow', 'breakpoints', 'fontSize', 'rounded', 'space', 'zIndex'].includes(tokenPath[0])) {
      declaration = declaration.replace(/(boxShadow|breakpoints|fontSize|rounded|space|zIndex)-/g, '')
    }
  }

  // Handle special cases with css var naming
  if (tokenPath[1] === 'ui-tailwind' && tokenPath[2] !== 'color') {
    declaration = declaration.replace(/color-/g, '')
  } else if (tokenPath[1] === 'ui-tailwind' && tokenPath[2] === 'color') {
    declaration = declaration.replace(/color-color-/g, 'color-')
  }

  // "DEFAULT" is a Tailwind convention which should not be part of the declaration key.
  declaration = declaration.replace(/-DEFAULT/g, '')

  return declaration
}

// Transforms that only apply to Scss platform
const transformDeclarationScss = (declaration, tokenPath) => {
  declaration = transformDeclarationDefault(declaration, tokenPath)

  // The key "z-index" should be shortened in the variable name to match Tailwind syntax
  if (tokenPath[0] === 'zIndex') {
    declaration = declaration.replace(/(z-index|zIndex)-/g, 'z-')
  }

  // Scss does not like variable names with dots in them.
  declaration = replaceScssVariableName(declaration, /\./g, '_')

  // Where possible, the lowerCamel case is used for naming in token sources. In Scss, dash-case is the convention.
  declaration = declaration.replace(/(fontSize|boxShadow|zIndex)/g, lowerCamelToDash)

  // "DEFAULT" is a Tailwind convention that should not be part of the Scss name.
  declaration = declaration.replace(/-DEFAULT/g, '')

  return declaration
}

const transformScssTokens = ({dictionary, options, file}) => {
  const { outputReferences, formatting } = options

  let { allTokens } = dictionary

  if (outputReferences) {
    allTokens = [...allTokens].sort(sortByReference(dictionary))
  }

  const propertyFormatter = createPropertyFormatter({ outputReferences, dictionary, format: 'sass', formatting })

  const tokens = allTokens
    .map(token => {
      /**
       * Within color.ui.json, legacy tokens for scss and tailwind tokens are separated into two top-tier
       * properties "ui" and "ui-tailwind". For Scss, only the tokens in the "ui" group should be rendered.
       */
      if (token.path[1] ===  'ui-tailwind') {
        return
      }

      // First, the token is formatted with the default Scss propertyFormatter
      const formattedTokenDeclaration = propertyFormatter(token)

      // Then, our specific transforms are applied to each line.
      return transformDeclarationScss(formattedTokenDeclaration, token.path)
    })
    .filter(function(strVal) { return !!strVal })
    .join('\n')

  return fileHeader({file, commentStyle: 'short'}) + '\n' + tokens + '\n'
}

const transformTailwindTokens =  (formatterArguments, corePluginsColor) => {
  const { file } = formatterArguments
  const isColorTokenFile = corePluginsColor.some(plugin => file.destination.startsWith(plugin))

  return isColorTokenFile
    ? transformTailwindTokensGrouped(formatterArguments, corePluginsColor)
    : transformTailwindTokensFlat(formatterArguments)
}

module.exports = { transformScssTokens, transformTailwindTokens }
