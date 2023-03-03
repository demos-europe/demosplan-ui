const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const env =  require('process').env

const bundleAnalyzer = new BundleAnalyzerPlugin({
  analyzerMode: 'static',
  reportFilename: resolve(`./bundle_analysis.html`)
})

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = MiniCssExtractPlugin.loader;

function resolve (dir) {
  return path.join(__dirname, dir)
}

const transpileNodeModules = [
  'tiptap',
  'tiptap-commands',
  'tiptap-extensions',
].map(module => resolve('node_modules/' + module))

const addonOutput = {
  path: path.resolve(__dirname, "dist"),
  publicPath: '',
  filename: 'demosplan-ui.umd.js',
  library: {
    name: 'demosplan_ui',
    type: 'var'
  },
  libraryExport: 'default',
  libraryTarget: 'var'
}

const config = {
  entry: resolve('./src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'demosplan-ui.umd.js',
    library: '@demos-europe/demosplan-ui',
    libraryTarget: 'umd',
    libraryExport: 'default',
    clean: true
  },
  resolve: {
    extensions: ['.js', '.vue'],
    symlinks: false
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
        include: transpileNodeModules,
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

module.exports = (env) => {
  const isAddon = env.addon === 'true'

  if (isAddon) {
    config.output = addonOutput
  }

  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }

  if (process.argv.includes('--analyze')) {
    config.plugins.unshift(bundleAnalyzer)
  }

  return config;
}