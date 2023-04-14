/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    testEnvironment: 'jsdom',
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
}