const glob = require('glob')
const StyleDictionary = require('style-dictionary')

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

StyleDictionary.registerTransform({
  name: 'name/scss',
  type: 'name',
  transformer: (token) => {
    // The domain part ("palette", "ui"...) within color tokens should not be part of the variable name.
    // The domain part ("scale", "heading", "ui"...) within font-size tokens should not be part of the variable name.
    if (token.path[0] === 'color' || token.path[0] === 'font-size') {
      token.path.splice(1, 1)
    }
    // The key "z-index" should be shortened in the variable name to match Tailwind syntax
    if (token.path[0] === 'z-index') {
      token.path[0] = 'z'
    }
    if (token.path[0] === 'space') {
      token.path[1] = token.path[1].replace('.', '_')
    }
    // "DEFAULT" is a Tailwind convention that should not be part of the Scss name
    if (token.path[1] === 'DEFAULT') {
      token.path.splice(1, 1)
    }
    return prefix + token.path.join('-')
  }
})

StyleDictionary.registerTransformGroup({
  name: 'custom/scss',
  transforms: StyleDictionary.transformGroup.scss.concat(['name/scss'])
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
          format: 'scss/variables',
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
