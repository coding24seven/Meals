const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './public-source/entry.js',
  output: {
    path: path.resolve(process.cwd(), 'public'),
    filename: 'bundle.js'
  },
  plugins: [
    // extract CSS from JS output file into CSS file
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer()
        ]
      }
    }),
    new Dotenv()
  ],
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: { sourceMap: true }
        }, // 4. Convert the JS string into CSS files
        {
          loader: "css-loader", // 3. Turn CSS into a JS string
          options: {
            url: false,
            sourceMap: true
          } // disable url handling in css...
        },
        {
          loader: "postcss-loader",
          options: { sourceMap: true }
        }, // 2. for autoprefixer
        {
          loader: "sass-loader", // 1. Turn SASS into CSS through node-sass module
          options: {
            outputStyle: 'expanded',
            sourceMap: true
          }
        }
      ]
    }]
  }
}
