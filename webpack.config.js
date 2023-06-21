const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const bundleAnalyzer = new BundleAnalyzerPlugin({
  analyzerMode: 'static',
  reportFilename: resolve(`./bundle_analysis.html`)
})

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = MiniCssExtractPlugin.loader;

function resolve (dir) {
  return path.join(__dirname, dir)
}

const transpileNodeModules = [
  'tiptap',
  'tiptap-commands',
  'tiptap-extensions',
].map(module => resolve('node_modules/' + module))

const config = {
  entry: resolve('./src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'demosplan-ui.umd.js',
    library: {
      name: '__demos_europe_demosplan_ui',
      type: 'var'
    },
    libraryExport: 'default',
    libraryTarget: 'umd',
    clean: true
  },
  externalsType: 'commonjs',
  externals: [
    '@braintree/sanitize-url',
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
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.ts', '.js', '.vue'],
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
        include: transpileNodeModules,
        loader: 'babel-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
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

  if (process.argv.includes('--analyze')) {
    config.plugins.unshift(bundleAnalyzer)
  }

  return config;
};
