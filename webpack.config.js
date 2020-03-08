const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LinkTypePlugin = require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin;
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'app/main.js'
    },
    devServer: {
        contentBase: './',
        watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {

                        }
                    },
                    "css-loader",
                    "resolve-url-loader",
                    {
                        loader: "sass-loader?sourceMap",
                        options: {
                            includePaths: [
                            ],
                            sourceMap: true
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    publicPath: "./",
                    outputPath: "app"
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './app/style.css',
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new LinkTypePlugin({
            '**/*.css' : 'text/css'
        }),
        new CopyPlugin([
            { from: 'assets', to: 'assets' }
        ])
    ]
};