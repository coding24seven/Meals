
const path = require('path');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './server-source/app.js',
  mode: "production",
  target: 'node',
  output: {
    path: path.resolve(process.cwd(), "server"),
    filename: "kuchnia-server.js"
  },
  optimization: {
    minimize: false
  },
  externals: nodeModules
}
