/**
 * (c) 2010-present DEMOS E-Partizipation GmbH.
 *
 * This file is part of the package demosplan,
 * for more information see the license file.
 *
 * All rights reserved
 */

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const path = require('path')

module.exports = {
  displayName: 'demosplan-ui',
  collectCoverage: false,
  collectCoverageFrom: [
      './utils/*.{js}',
      './mixins/*.{js}',
      './lib/*.{js}',
  ],
  coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],
  coverageDirectory: './coverage',
  moduleFileExtensions: ['js', 'ts', 'vue'],
  modulePathIgnorePatterns: [
    './dist'
  ],
  testRegex: './(src|utils)/tests/.*(test|spec)\\.js]?$',
  rootDir: path.resolve(__dirname, './'),
  roots: ['./src'],
  modulePaths: ['./src'],
  moduleDirectories: [
    'node_modules'
  ],
  transform: {
      '.*\\.js$': './babel-jest-transformer.js',
      '.*\\.vue$': '@vue/vue2-jest',
      '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!@tiptap)(.*)'
  ],
  verbose: true,
  testEnvironment: "jsdom",
  globals: {
    '@vue/vue2-jest': {
      babelConfig: {
        plugins: ['dynamic-import-node']
      }
    }
  },
  testEnvironmentOptions: {
    customExportConditions: [
      'node',
      'node-addons'
    ]
  }
}
