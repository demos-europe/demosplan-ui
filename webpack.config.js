const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = MiniCssExtractPlugin.loader;

function resolve (dir) {
  return path.join(__dirname, dir)
}

const config = {
  entry: {
    'demosplan-ui.umd': {
      import: resolve('./src/index.js'),
      dependOn: [
        'demosplan-ui.editor',
        'demosplan-ui.dataTable',
        'demosplan-ui.utils',
        'demosplan-ui.directives'
      ]
    },
    'demosplan-ui.editor': {
      import: resolve('./src/components/core/DpEditor/DpEditor.vue')
    },
    'demosplan-ui.dataTable': {
      import: resolve('./src/components/core/DpDataTable/DpDataTable.vue')
    },
    'demosplan-ui.utils': {
      import: resolve('./src/utils/index.js')
    },
    'demosplan-ui.directives': {
      import: resolve('./src/directives/index.js')
    }
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js',
    library: '@demos-europe/demosplan-ui',
    libraryTarget: 'umd',
    libraryExport: "default"
  },
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
