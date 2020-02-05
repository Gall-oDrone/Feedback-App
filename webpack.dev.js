const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require("./webpack.common");
const merge = require("webpack-merge");

// lessToJs does not support @icon-url: "some-string", so we are manually adding it to the produced themeVariables js object here
themeVariables["@icon-url"] = "'//localhost:8080/fonts/iconfont'";


module.exports = {
   mode: "development",
   devtool: "none",
   entry: {
      // vendor: ['react', 'react-dom', 'antd'],
      app: './src/index.js',
   },
   output: {
      filename: 'index_bundle.js',
      path: path.resolve(__dirname, 'bundle'),
      publicPath: '/'
   }