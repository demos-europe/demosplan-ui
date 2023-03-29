/**
 * (c) 2010-present DEMOS E-Partizipation GmbH.
 *
 * This file is part of the package demosplan,
 * for more information see the license file.
 *
 * All rights reserved
 */

const path = require('path')

module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node'],
  },
  moduleFileExtensions: ['js'],
  transform: {
    // '^.+\\.(js)$': 'babel-jest',
    '.+\\.(vue)$': '@vue/vue2-jest'
  }
}

module.exports = {
  testEnvironment: 'jsdom',
  testRegex: './src/tests/.*(test|spec)\\.js]?$',
  rootDir: path.resolve(__dirname, './'),
  roots: ['./src'],
  modulePaths: ['./src'],
  moduleDirectories: [
    'node_modules'
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  modulePathIgnorePatterns: [
    './dist'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!@tiptap)(.*)'
  ],
  // Send a notification when tests fail or once when they pass
  notifyMode: 'failure-success',
  // reporters: [
  //   'default',
  //   [
  //     'jest-junit',
  //     {
  //       suiteName: 'Jest Tests',
  //       outputName: 'jenkins-build-jest.junit.xml',
  //       outputDirectory: '.build/'
  //     }
  //   ]
  // ],
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
  // setupFiles: ['./client/setup/jest/setup.js']
}
