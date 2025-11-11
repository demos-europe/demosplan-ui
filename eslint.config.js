// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
const storybook = require("eslint-plugin-storybook")

const globals = require('globals')
const eslintJs = require('@eslint/js')
const pluginVue = require('eslint-plugin-vue')
const pluginVueA11y = require('eslint-plugin-vuejs-accessibility')
// Const stylistic = import('@stylistic/eslint-plugin')
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
        '**/.storybook/**',
        '*.config.js',
        'babel.config.js',
        'jest.config.js',
        'webpack.config.js',
        'vite.config.mjs',
        'jest/**',
        'scripts/**'
      ]
    },
    {
      files: ["**/*.js", "**/*.ts", "**/*.vue"],
      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.node,
          dplan: 'readonly'
        },
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
        'capitalized-comments': ['error', 'always', {
          'ignoreConsecutiveComments': true,
          'ignoreInlineComments': true
        }],
        'comma-dangle': ['error', 'always-multiline'],
        'generator-star-spacing': 'off',
        'multiline-comment-style': 'error',
        'sort-imports': ['error', { 'ignoreCase': true }],
        '@/object-curly-spacing': ['error', 'always'],
        '@/indent': ['error', 2],
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
    },
    {
      files: ["**/*.spec.js", "**/*.test.js", "tests/**/*.js"],
      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.node,
          ...globals.jest
        }
      }
    }
  ]
}

module.exports = getConfig()
