/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const path = require('path')

module.exports = {
  collectCoverage: false,
  collectCoverageFrom: [
      './src/utils/*.{js}',
      './src/mixins/*.{js}',
      './src/lib/*.{js}',
      './src/components/*.{vue}'
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],
  displayName: 'demosplan-ui',
  globals: {
    '@vue/vue2-jest': {
      babelConfig: {
        plugins: ['dynamic-import-node']
      }
    }
  },
  moduleDirectories: [
    'node_modules'
  ],
  moduleFileExtensions: [
    'js',
    'ts',
    'vue'
  ],
  modulePaths: [
    '<rootDir>'
  ],
  modulePathIgnorePatterns: [
    './dist'
  ],
  rootDir: path.resolve(__dirname, './'),
  roots: ['./tests'],
  setupFiles: ['./jest/setup.js'],
  testRegex: '.*(test|spec)\\.js]?$',
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(vue)$': '<rootDir>/node_modules/@vue/vue2-jest',
    '^.+\\.(ts)$': '<rootDir>/node_modules/ts-jest'
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!@tiptap)(.*)'
  ],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: [
      'node',
      'node-addons'
    ]
  },
  verbose: true
}
