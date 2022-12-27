/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        customExportConditions: ['node'],
    },
    moduleFileExtensions: ['js', 'vue'],
    transform: {
        '^.+\\.(js)$': 'babel-jest',
        '.*\\.(vue)$': 'vue-jest'
    }
}