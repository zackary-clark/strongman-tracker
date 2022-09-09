const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    mode: "production",
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
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: "babel-loader",
            exclude: /node_modules/,
        },
        {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
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
        }),
        new webpack.DefinePlugin({
            PACKAGE_VERSION: JSON.stringify(require("./package.json").version),
        }),
    ],
    devServer: {
        client: {
            overlay: {errors: true, warnings: false},
            logging: "info"
        },
        hot: false,
        port: 8081,
        historyApiFallback: true,
    },
};
