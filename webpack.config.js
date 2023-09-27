const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const bundleAnalyzer = new BundleAnalyzerPlugin({
  analyzerMode: 'static',
  reportFilename: resolve(`./bundle_analysis.html`)
})

const isProduction = process.env.NODE_ENV === 'production'

function resolve (dir) {
  return path.join(__dirname, dir)
}

const config = {
  entry: resolve('./src/index.js'),
  output: {
    path: resolve('dist'),
    publicPath: '',
    filename: 'demosplan-ui.umd.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    library: '[name]',
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
    'vue',
    'vue-click-outside',
    'vue-multiselect',
    'vuedraggable',
    'vuex'
  ],
  resolve: {
    alias: {
      vue: '@vue/compat',
      '~': path.resolve(__dirname, 'src')
    },
    extensions: ['.ts', '.js', '.vue'],
    symlinks: false
  },
  plugins: [
    // new MiniCssExtractPlugin(),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        }
      },
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                compatConfig: {
                  MODE: 2
                }
              }
            }
          },
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
    ],
  }
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
