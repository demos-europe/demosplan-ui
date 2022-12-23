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
  entry: {
    // The key is used as the default chunk name within 'demosplan-ui.[name].umd.js'
    main: resolve('./src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'demosplan-ui.[name].umd.js',
    library: '@demos-europe/demosplan-ui',
    libraryTarget: 'umd',
    libraryExport: 'default',
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
    'vue',
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
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: resolve(`./bundle_analysis.html`)
    })
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        tiptap: {
          name: 'tiptap',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](tiptap|prosemirror)/,
          priority: 1
        },
        plyr: {
          name: 'plyr',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]plyr/,
          priority: 1
        },
        vueOmnibox: {
          name: 'vueOmnibox',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]vue-omnibox/,
          priority: 1
        },
        highlightJs: {
          name: 'highlightJs',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]highlight\.js/,
          priority: 1
        },
        allyDatepicker: {
          name: 'allyDatepicker',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]a11y-datepicker/,
          priority: 1
        }
      }
    }
  }
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }

  return config;
};
