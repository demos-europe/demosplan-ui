const globals = require('globals')
const eslintJs = require('@eslint/js')
const pluginVue = require('eslint-plugin-vue')
const pluginVueA11y = require('eslint-plugin-vuejs-accessibility')
// const stylistic = import('@stylistic/eslint-plugin')
const tsEslint = require('typescript-eslint')
const vueEslintParser = require('vue-eslint-parser')

async function getConfig () {
  const stylistic = await import('@stylistic/eslint-plugin')

  return [
    eslintJs.configs.recommended,
    ...tsEslint.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    ...pluginVueA11y.configs['flat/recommended'],
    {
      ignores: [
        "**/node_modules/**",
        '**/.yarn/**',
        '**/tokens/dist/**',
        '**/dist/**',
        '**/.storybook/**'
      ]
    },
    {
      files: ["**/*.js", "**/*.ts", "**/*.vue"],
      languageOptions: {
        globals: globals.browser,
        parser: vueEslintParser,
        parserOptions: {
          parser: tsEslint.parser
        }
      },
      plugins: {
        '@stylistic': stylistic,
        'typescript': tsEslint.plugin,
        'vue': pluginVue,
        'vuejs-accessibility': pluginVueA11y
      },
      rules: {
        'generator-star-spacing': 'off',
        'multiline-comment-style': 'error',
        'sort-imports': ['error', { 'ignoreCase': true }],
        '@/object-curly-spacing': ['error', 'always'],
        '@/indent': ['error', 2],
        'vue/html-closing-bracket-newline': ['error', {
          'singleline': 'never',
          'multiline': 'never'
        }],
        'vue/object-curly-spacing': ['error', 'always'],
        'vue/order-in-components': ['error', {
          'order': [
            'el',
            'name',
            'parent',
            'functional',
            ['delimiters', 'comments'],
            ['components', 'directives'],
            'extends',
            'mixins',
            'inheritAttrs',
            'model',
            ['props', 'propsData'],
            'emits',
            'data',
            'computed',
            'watch',
            'methods',
            'LIFECYCLE_HOOKS',
            ['template', 'render'],
            'renderError'
          ]
        }],
        'vue/block-order': ['error', {
          'order': [
            'docs',
            'template',
            'script:not([setup])',
            'script[setup]',
            'style'
          ]
        }],
        'vue/define-macros-order': ['error', {
          'order': ['defineProps', 'defineEmits'],
          'defineExposeLast': true
        }],
        'vue/v-slot-style': ['error', {
          'atComponent': 'longform',
          'default': 'longform',
          'named': 'longform'
        }],
        'vue/multi-word-component-names': 'warn',
        'vuejs-accessibility/label-has-for': 'warn'
      }
    }
  ]
}

module.exports = getConfig()
