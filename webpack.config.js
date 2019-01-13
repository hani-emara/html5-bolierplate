const path = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const nodeExternals = require("webpack-node-externals");
 

module.exports = {

    entry: "./src/index.js",

    output: {

        path: path.resolve(__dirname, 'dist'),

        filename: "[name].[chunkhash].js"

    },

    optimization: {
        splitChunks: {

            chunks: "all",

        }
    },

    module: {

        rules: [

            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },

            {

                test: /\.s?css$/,

                use: ["style-loader",MiniCssExtractPlugin.loader , "css-loader","postcss-loader", "sass-loader"]

            },

            {

                test: /\.(png|jpg|gif)$/,

                use: [
                    "file-loader", {
                   
                        loader: "url-loader",

                        options: {
                            limit: 5000
                        }
                        
                    }

                ]

            }

        ]

    },

    plugins: [

        new HtmlWebpackPlugin({
            // inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),

        new MiniCssExtractPlugin(),

        new CleanWebpackPlugin('dist', {}),

        new WebpackMd5Hash(),

        // new webpack.HotModuleReplacementPlugin()


    ]

}