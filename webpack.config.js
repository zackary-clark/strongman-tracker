const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = {
  mode: "production",
  entry: "./frontend/src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./src/main/resources/static"),
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
        test: /\.s?css$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.ttf$/,
        loader: "file-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      title: "Strongman Tracker",
      filename: "index.html",
      template: "./frontend/index.html.template",
      favicon: "./frontend/src/images/favicon.ico",
      xhtml: true,
    }),
  ],
  externals: [],
  devServer: {
    historyApiFallback: true,
    port: 8081,
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
};
