const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "production",
    entry: {
        index1: path.resolve('src/index.js'),
        // index2: path.resolve('src/index2.js'),
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    optimization: {
        minimize: false,
        splitChunks: {
            minSize: 1,
            cacheGroups: {
                default: false,
                commons: {
                    name: 'common',
                    minChunks: 2,
                    // chunks: 'initial' 
                    chunks: 'all' 
                }
            }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(),
    ]
}