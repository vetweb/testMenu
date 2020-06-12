const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');


const config = {
    entry: {
        app: './index.js'
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'build'),
        publicPath: "/build/"
    },
    devServer: {
        overlay: true,
        inline: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node-modules/'
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { sourceMap: true },
                    },
                    {
                        loader: "postcss-loader",
                        options: { sourceMap: true, config: { path: './js/postcss.config.js' } }
                    },
                    {
                        loader: "sass-loader",
                        options: { sourceMap: true },
                    }
                ]
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "main.css"
        }),
        ...glob.sync('./*.html').map(htmlFile => {
            return new HtmlWebpackPlugin({
                inject: true,
                interpolate: true,
                filename: path.basename(htmlFile),
                template: htmlFile,
            });
        }),
    ],
    node: {
        __dirname: false
    }
};

module.exports = (env, argv) => {
    if (argv.mode === "production") {
        config.plugins.push(new CleanWebpackPlugin());
    }
    return config;
};
