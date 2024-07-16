import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { fileURLToPath } from 'url'

function resolve (dir) {
    return path.join(path.dirname(fileURLToPath(import.meta.url)), dir.replace('./', ''))
}


const bundleAnalyzer = new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: resolve(`./bundle_analysis.html`)
})

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = MiniCssExtractPlugin.loader;

const webpackConfig = {
    entry: resolve('./src/index.js'),
    experiments: {
        outputModule: true,
    },
    output: {
        path: path.resolve('dist'),
        publicPath: '',
        filename: 'demosplan-ui.mjs',
        library: {
            // name: '__demos_europe_demosplan_ui',
            type: 'module'
        },
        libraryExport: 'default',
        libraryTarget: 'module',
        clean: true
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
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false
                }
            },
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
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    transpileOnly: true,
                },
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

export default function config() {
    if (isProduction) {
        webpackConfig.mode = 'production';
    } else {
        webpackConfig.mode = 'development';
    }

    if (process.argv.includes('--analyze')) {
        webpackConfig.plugins.unshift(bundleAnalyzer)
    }

    return webpackConfig;
};
