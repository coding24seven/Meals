const common = require("./webpack.public.common");
const merge = require("webpack-merge");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(), // minify CSS
      new TerserWebpackPlugin() // minify JS (enabled by default if no other minimizers are configured)
    ]
  }
}
) // merge ends
