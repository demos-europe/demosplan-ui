/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    testEnvironmentOptions: {
        customExportConditions: ['node'],
    },
    moduleFileExtensions: ['js', 'vue'],
    globals: {
        'vue-jest': {
            transform: {
                js: './babel-jest-transformer.js',
            },
        },
    },
    transform: {
        '.*\\.js$': './babel-jest-transformer.js',
        '.*\\.vue$': '@vue/vue2-jest',
    },
    verbose: true,
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    testEnvironment: "jsdom",
    dependencyExtractor: "<rootDir>/dependencyExtractor.js",

}