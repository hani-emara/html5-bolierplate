const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


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
                        presets: ['@babel/preset-env']
                    }
                }
            },

            {

                test: /\.s?css$/,

                use: ["style-loader",MiniCssExtractPlugin.loader , "css-loader", "sass-loader"]

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
            template: "./src/index.html"
        })

    ]

}