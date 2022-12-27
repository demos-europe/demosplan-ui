module.exports = {
    presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
    plugins: [
        '@babel/transform-runtime',
        '@babel/proposal-object-rest-spread',
        '@babel/syntax-dynamic-import',
        '@babel/plugin-syntax-jsx'
    ],
    overrides: [{
        plugins: [
            '@babel/transform-runtime',
            '@babel/proposal-object-rest-spread',
            '@babel/syntax-dynamic-import',
            '@babel/transform-object-assign',
            '@babel/transform-modules-commonjs',
            '@babel/plugin-syntax-jsx'
        ]
    }]
};