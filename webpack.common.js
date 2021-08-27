const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        app: './src/index.js'
    },

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].[fullhash].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: { 
                        minimize: false 
                    }
                }
            },
            { 
                test: /\.(woff|woff2|eot|ttf|otf)$/, 
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },

    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        })
    ]
}