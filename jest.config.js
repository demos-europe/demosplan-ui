/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    displayName: 'demosplan-ui',
    collectCoverage: true,
    collectCoverageFrom: [
        './utils/*.{js}',
        './mixins/*.{js}',
        './lib/*.{js}',
    ],
    coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],
    coverageDirectory: './coverage',
    moduleFileExtensions: ['js', 'ts', 'vue'],
    transform: {
        '.*\\.js$': './babel-jest-transformer.js',
        '.*\\.vue$': '@vue/vue2-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    verbose: true,
    testEnvironment: "jsdom"
}
