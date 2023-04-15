const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const devServer = require('./webpack/devServer');
const pug = require("./webpack/pug");
const styles = require('./webpack/styles');
const postcss = require('./webpack/postcss');
const images = require('./webpack/images');
const javaScript = require('./webpack/javaScript');

const devMode = process.env.NODE_ENV === "development";
const prodMode = !devMode;

const common = merge([
  {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.pug",
      }),
      new MiniCssExtractPlugin({
        filename: "./styles/main.css",
      }),
      new CopyWebpackPlugin({
        patterns: [{from: 'src/images', to: 'assets/images/' }],
      }),
    ],
  },
  pug(devMode),
  images(),
  javaScript(),
]);

module.exports = function () {
  if (prodMode) {
    return merge([
        common,
        postcss(),
    ]);
  }
  if (devMode) {
    return merge([
        common,
        styles(),
        devServer(),
    ]);
  }
};