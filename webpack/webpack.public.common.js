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
        // 4. Convert the JS string into CSS files
        {
          loader: MiniCssExtractPlugin.loader,
          options: { sourceMap: true }
        },
        // 3. Turn CSS into a JS string
        {
          loader: "css-loader",
          options: {
            url: false, // disable url handling in css...
            sourceMap: true
          }
        },
        // 2. for autoprefixer
        {
          loader: "postcss-loader",
          options: { sourceMap: true }
        },
        // 1. Turn SASS into CSS via node-sass module
        {
          loader: "sass-loader",
          options: {
            outputStyle: 'expanded',
            sourceMap: true
          }
        }
      ]
    }]
  }
}
