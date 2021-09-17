const HtmlWebpackPlugin = require("html-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");

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
    plugins: [
        new DashboardPlugin(),
        new HtmlWebpackPlugin({
            title: "Strongman Tracker",
            filename: "index.html",
            template: "./index.html.template",
            favicon: "./src/images/favicon.ico",
        }),
    ],
    devServer: {
        historyApiFallback: true,
        port: 8081,
        proxy: {
            "/api": "http://localhost:8080"
        }
    },
};
