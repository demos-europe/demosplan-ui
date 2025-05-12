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
  let current = token

  // Css variables are not supported within media queries. See https://stackoverflow.com/a/40723269
  if (token.path[0] === 'breakpoints') {
    return current.original.value
  }

  const { dictionary, platform } = formatterArguments
  const varName = `--${platform.prefix}${transformTailwindTokenName(token, true).replace(/\./g, '-')}`
  let fallback = resolveValue(token, dictionary)

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

  if (token.path[0] === 'fontSize' && token.original.$lineHeight) {
    cssVar = [cssVar, token.original.$lineHeight]
  }
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
        groupedTokens[plugin][tokenName] = replaced
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
    tokens[tokenName] = transformTailwindTokenValue(token, formatterArguments)
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

const transformScssTokens = ({ dictionary, options, file }) => {
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

  return fileHeader({ file, commentStyle: 'short' }) + '\n' + tokens + '\n'
}

const transformTailwindTokens =  (formatterArguments, corePluginsColor) => {
  const { file } = formatterArguments
  const isColorTokenFile = corePluginsColor.some(plugin => file.destination.startsWith(plugin))

  return isColorTokenFile
    ? transformTailwindTokensGrouped(formatterArguments, corePluginsColor)
    : transformTailwindTokensFlat(formatterArguments)
}

/**
 * Creates a CSS theme file using the @theme directive for Tailwind CSS v4
 * Uses simplified CSS variable references without redundant fallbacks
 */
const transformThemeTokens = ({ dictionary, file, platform = { prefix: 'dp-' } }) => {
  const themeDeclarations = []
  const rootDeclarations = []

  // Group tokens by category for better organization in @theme
  const tokenCategories = {
    'color': 'color',
    'rounded': 'radius',
    'space': 'spacing',
    'fontSize': 'text',
    'boxShadow': 'shadow',
    'zIndex': 'z',
    'breakpoints': 'breakpoint'
  }

  // Transform camelCase to dash-case
  const camelToDash = (str) => {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  }

  // Escape periods in CSS variable names
  const escapeCssVariableName = (name) => {
    // Replace dots in variable names with \. (escaped dot)
    return name.replace(/\.([0-9])/g, '\\.$1')
  }

  // Get raw value for root declaration
  const getRawValue = (token, dictionary) => {
    // For breakpoints, use the raw value
    if (token.path[0] === 'breakpoints') {
      return token.original.value
    }
    // Return the resolved value without CSS variable references
    return resolveValue(token, dictionary)
  }

  // Function to get all possible references for a token, from most specific to most primitive
  const getTokenReferenceChain = (token, dictionary) => {
    const references = []
    let current = token

    // Get the primitive value (final fallback)
    const primitiveValue = resolveValue(token, dictionary)

    // If token doesn't reference another token, just return the primitive value
    if (!token.original || !token.original.value.startsWith('{')) {
      return { references: [], primitiveValue }
    }

    // Build the chain of references
    while (current.original && current.original.value.startsWith('{')) {
      const ref = dictionary.getReferences(current.original.value)[0]
      const refName = transformTailwindTokenName(ref, true).replace(/\./g, '-')
      const dashedRefName = camelToDash(refName)
      // We'll escape these references at usage time, so we keep them in standard format here
      references.push(`--${platform.prefix}${dashedRefName}`)
      current = ref
    }

    return { references, primitiveValue }
  }

  // Prepare a token name for use in CSS variables
  const prepareTokenName = (token, tokenName, keepFullPath = false) => {
    // If this is a full path token name (for root variables)
    const name = keepFullPath
      ? transformTailwindTokenName(token, true).replace(/\./g, '-')
      : tokenName

    // Handle DEFAULT token
    if (!keepFullPath && token.path[token.path.length - 1] === 'DEFAULT') {
      // Get the token path without the DEFAULT key
      const parentPath = token.path.slice(0, -1)
      
      // Special handling for color tokens to avoid "color-color-" duplication
      if (token.path[0] === 'color') {
        // Get the concept/element name (slice from index 2 to skip 'color' and the domain)
        const conceptParts = parentPath.slice(2)
        
        // If the first part is 'color', then remove it to prevent duplication
        if (conceptParts[0] === 'color') {
          return conceptParts.slice(1).join('-').toLowerCase()
        } else {
          return conceptParts.join('-').toLowerCase()
        }
      } else {
        // Standard handling for non-color tokens
        return parentPath.slice(1).join('-').toLowerCase()
      }
    }

    // Convert camelCase to dash-case
    const dashedName = camelToDash(name)
    // Escape periods for CSS compatibility
    return escapeCssVariableName(dashedName)
  }

  // Build a CSS variable reference with fallbacks
  const buildVariableWithFallbacks = (safeFullTokenName, references, primitiveValue, platform) => {
    let varValue = `var(--${platform.prefix}${safeFullTokenName}`

    // Add any referenced tokens as fallbacks
    if (references.length > 0) {
      references.forEach(ref => {
        // Ensure all referenced variables are also escaped
        const safeRef = escapeCssVariableName(ref)
        varValue += `, var(${safeRef}`
      })

      // Add the primitive value as the final fallback
      varValue += `, ${primitiveValue}` + ')'.repeat(references.length + 1)
    } else {
      // If there are no references, just add the primitive value as fallback
      varValue += `, ${primitiveValue})`
    }

    return varValue
  }

  // Add a variable declaration to the root block
  const addRootDeclaration = (name, value) => {
    rootDeclarations.push(`  ${name}: ${value};`)
  }

  // Add a variable declaration to the theme block
  const addThemeDeclaration = (name, value) => {
    themeDeclarations.push(`  ${name}: ${value};`)
  }

  // Determine the property-specific prefix for color tokens
  const getColorPrefix = (token) => {
    let prefix = 'color'

    if (token.path[1] === 'ui-tailwind') {
      if (token.path[2] === 'textColor') {
        prefix = 'text-color'
      } else if (token.path[2] === 'backgroundColor') {
        prefix = 'background-color'
      } else if (token.path[2] === 'borderColor') {
        prefix = 'border-color'
      }
    }

    return prefix
  }

  // Process a single token
  const processToken = (token, sourceCategory = null, targetPrefix = null) => {
    // Skip legacy tokens
    if (token.path[0] === 'color' && token.path[1] === 'ui') {
      return
    }

    // Extract token name
    let tokenName = transformTailwindTokenName(token)

    // Process names and prepare safe versions for CSS
    const safeTokenName = prepareTokenName(token, tokenName)
    const safeFullTokenName = prepareTokenName(token, tokenName, true)

    // Add to root declarations
    const rawValue = getRawValue(token, dictionary)
    addRootDeclaration(`--${platform.prefix}${safeFullTokenName}`, rawValue)

    // Get the reference chain and primitive value for fallbacks
    const { references, primitiveValue } = getTokenReferenceChain(token, dictionary)

    // Build the variable value with fallbacks
    const varValue = buildVariableWithFallbacks(safeFullTokenName, references, primitiveValue, platform)

    // Determine the appropriate prefix for this token category
    const prefix = sourceCategory === 'color'
      ? getColorPrefix(token)
      : targetPrefix

    // Add the main variable to theme declarations with prefix handling
    
    // Detect if we might have duplication of "color-" prefix
    const finalTokenName = prefix === 'color' && safeTokenName.startsWith('color-')
      ? safeTokenName.replace(/^color-/, '') // Remove leading 'color-' if already present
      : safeTokenName
      
    addThemeDeclaration(`--${prefix}-${finalTokenName}`, varValue)

    // Special handling for font-size tokens with line height
    if (sourceCategory === 'fontSize' && token.original.$lineHeight) {
      // For line height, create a paired variable with --line-height suffix
      const lineHeightVar = `--${targetPrefix}-${safeTokenName}--line-height`
      const lineHeightRootVar = `--${platform.prefix}${targetPrefix}-${safeTokenName}--line-height`

      // Add line height to theme declarations with simpler fallback
      addThemeDeclaration(lineHeightVar, `var(${lineHeightRootVar}, ${token.original.$lineHeight})`)

      // Add lineHeight to root variables
      addRootDeclaration(lineHeightRootVar, token.original.$lineHeight)
    }
  }

  // Process color tokens
  dictionary.allTokens
    .filter(token => token.path[0] === 'color' && !isDeprecated(token))
    .forEach(token => processToken(token, 'color'))

  // Process other token categories
  Object.entries(tokenCategories)
    .filter(([category]) => category !== 'color') // Skip color as it's handled separately
    .forEach(([sourceCategory, targetPrefix]) => {
      dictionary.allTokens
        .filter(token => token.path[0] === sourceCategory && !isDeprecated(token))
        .forEach(token => processToken(token, sourceCategory, targetPrefix))
    })

  // Generate the final CSS output
  const fileComment = fileHeader({ file, commentStyle: 'css' })
  return `${fileComment}\n:root {\n${rootDeclarations.join('\n')}\n}\n\n@theme {\n${themeDeclarations.join('\n')}\n}\n`
};

module.exports = { transformScssTokens, transformTailwindTokens, transformThemeTokens }
