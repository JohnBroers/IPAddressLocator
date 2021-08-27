const { merge } = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, {
    mode: 'development', 
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'src'),
        },
        compress: true,
        port: 3000,
        open: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    'style-loader',
                    'css-loader', 
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    optimization: {
        moduleIds: 'named'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});