const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
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
      template: "./index.html.template",
      favicon: "./src/images/favicon.ico",
      xhtml: true,
    }),
  ],
  externals: {
    "jspdf": "jspdf", // jspdf is bundled with material table, and is absolutely huge TODO: get rid of this when material-table fixes their shit
  },
  devServer: {
    historyApiFallback: true,
    port: 8081,
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
};
