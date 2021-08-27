const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', 
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/style.[contenthash].css',
        }),
        new OptimizeCssAssetsPlugin()
    ]
});