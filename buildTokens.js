const glob = require('glob')
const StyleDictionary = require('style-dictionary')

const prefix = 'dp-'

const tokensPath = 'tokens/**/*.json'
const files = glob
  .sync(tokensPath)
  .map(filePath => filePath
    .replace('tokens/', '')
    .replace('color/', '')
    .replace('.json', ''))
  // Do not render tokens only used internally
  .filter(filePath => !filePath.startsWith('_'))

StyleDictionary.registerTransform({
  name: 'name/scss',
  type: 'name',
  transformer: (token) => {
    // "palette" or "ui" within colors should not be part of the variable name.
    if (token.path[0] === 'color' && /(palette|ui)/.test(token.path[1])) {
      token.path.splice(1, 1)
    }
    // "scale", "brand" or "heading" within fontSize tokens should not be part of the variable name.
    if (token.path[0] === 'fontSize') {
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
      buildPath: 'tokens/',
      files: files.map((filePath) => {
        return {
          destination: `scss/_${filePath}.scss`,
          format: 'scss/variables',
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
