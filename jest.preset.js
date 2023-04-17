module.exports = {
    displayName: 'demosplan-ui',
    testEnvironment: 'node',
    transform: {
        '\\.(js)$': 'babel-jest',
        '.*\\.(vue)$': 'vue-jest'
    },
    collectCoverage: true,
    collectCoverageFrom: [
        './utils/*.{js}',
        './mixins/*.{js}',
        './lib/*.{js}',
    ],
    coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],
    coverageDirectory: './coverage'
}
