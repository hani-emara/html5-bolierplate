const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const CleanWebpackPlugin = require('clean-webpack-plugin');
 

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
                use: ["style-loader",MiniCssExtractPlugin.loader , "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require("autoprefixer")()
                            ],
                        }
                    },
                 "sass-loader"]
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                use: [
                    "file-loader", {          
                        loader: "url-loader",
                        options: {
                            limit: 5000
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "fonts/[name].[ext]",
                    },
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin('dist', {}),
        new WebpackMd5Hash(),
    ]
}