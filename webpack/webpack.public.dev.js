const common = require("./webpack.public.common");
const merge = require("webpack-merge");
const path = require("path");

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
  } 
}
) // merge ends
