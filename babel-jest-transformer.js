const babelConfig = {
    plugins: [
        '@babel/plugin-transform-modules-commonjs',
    ],
};

module.exports = require('babel-jest').createTransformer(babelConfig);