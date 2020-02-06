const path = require('path');
const common = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = {
   mode: "production",
   devtool: "none",
   entry: {
      // vendor: ['react', 'react-dom', 'antd'],
      app: './src/index.js',
   },
   output: {
      filename: 'index_bundle.[contentHash:7].js',
      path: path.resolve(__dirname, 'bundle'),
      // path.resolve(__dirname, 'dist/static'),
      // publicPath: 'static/',
      publicPath: '/'
   }