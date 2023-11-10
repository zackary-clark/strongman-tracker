const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const webpack = require("webpack");

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    entry: {
        bundle: {
            import: "./src/index.tsx",
            filename: "[contenthash].bundle.js"
        },
        env: {
            import: "./src/env/defaults.ts",
            filename: "env.js"
        }
    },
    output: {
        clean: true,
    },
    optimization: {
        runtimeChunk: "single",
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: "babel-loader",
            exclude: /node_modules/,
        },
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "ts-loader",
                    options: {
                        getCustomTransformers: () => ({
                            before: isDevelopment ? [ReactRefreshTypeScript()] : [],
                        }),
                        transpileOnly: isDevelopment,
                    },
                },
            ],
        },
        {
            test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.ttf$/,
            loader: "file-loader",
        },
        {
            test: /\.m?js/,
            resolve: {
                fullySpecified: false
            }
        }]
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
    },
    target: "web",
    plugins: [
        new HtmlWebpackPlugin({
            title: "Strongman Tracker",
            filename: "index.html",
            template: "./index.html.template",
            favicon: "./src/images/favicon.png",
            publicPath: "/",
        }),
        new webpack.DefinePlugin({
            PACKAGE_VERSION: JSON.stringify(require("./package.json").version),
        }),
        ...(isDevelopment ? [new ReactRefreshWebpackPlugin()] : []),
    ],
    devServer: {
        client: {
            overlay: {errors: true, warnings: false},
            logging: "info"
        },
        hot: true,
        port: 8081,
        historyApiFallback: true,
    },
};
