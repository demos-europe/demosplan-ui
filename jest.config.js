/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    testEnvironmentOptions: {
        customExportConditions: ['node'],
    },
    moduleFileExtensions: ['js', 'vue'],
    transform: {
        '.*\\.js$': './babel-jest-transformer.js',
        '.*\\.vue$': '@vue/vue2-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    verbose: true,
    testEnvironment: "jsdom"
}
