const webpack = require("webpack");
const path = require("path");
const common = require("./webpack.public.common");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    // host: 'localhost',
    port: '8080', // devserver errors and does not refresh without 'port' property!
    // 'contentBase' is directories served and auto-refreshed
    contentBase: [path.join(process.cwd(), 'server-source/views')],
    // 'watchContentBase' enables auto-refresh contentBase on changes
    watchContentBase: true,
    // publicPath: '/', // url path where compiled files are served
    writeToDisk: true,
    compress: false,
  },
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
    })
  ],
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        { loader: MiniCssExtractPlugin.loader }, // 4. Convert the JS string into CSS files
        {
          loader: "css-loader", // 3. Turn CSS into a JS string
          options: { url: false } // disable url handling in css...
        },
        { loader: "postcss-loader" }, // 2. for autoprefixer
        {
          loader: "sass-loader", // 1. Turn SASS into CSS through node-sass module
          options: { outputStyle: 'expanded' }
        }
      ]
    }]
  }
}
) // merge ends
