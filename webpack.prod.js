const path = require('path');
const common = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = {
   mode: "development",
   devtool: "none",
   entry: {
      // vendor: ['react', 'react-dom', 'antd'],
      app: './src/index.js',
   },
   output: {
      filename: 'index_bundle.[contentHash].js',
      path: path.resolve(__dirname, 'bundle'),
      publicPath: '/'
   }