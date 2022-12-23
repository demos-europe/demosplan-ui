const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = MiniCssExtractPlugin.loader;

function resolve (dir) {
  return path.join(__dirname, dir)
}

const config = {
  entry: resolve('./src/index.js'),
  experiments: {
    topLevelAwait: true
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'demosplan-ui.umd.js',
    library: '@demos-europe/demosplan-ui',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: `typeof self !== 'undefined' ? self : this`,
    clean: true
  },
  externalsType: 'umd',
  externals: [
      '@braintree/sanitize-url',
      '@demos-europe/demosplan-utils',
      /^@uppy\/.+$/,
      'dayjs',
      'dompurify',
      'lscache',
      'plyr',
      'tippy.js',
      'uuid',
      'v-tooltip',
      'vue-multiselect',
      'vuedraggable',
      'vuex'
  ],
  resolve: {
    extensions: ['.js', '.vue'],
    symlinks: false
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: [
          stylesHandler,
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }

  return config;
};
