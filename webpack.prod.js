const path = require('path');
const common = require("./webpack.common");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
   mode: "production",
   devtool: "none",
   entry: {
      // vendor: ['react', 'react-dom', 'antd'],
      app: './src/index.js',
   },
   output: {
      filename: '[name].[hash:7].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
   },
   plugins: [
      new MiniCssExtractPlugin({ filename: "[name].[contentHash:5].css" }),
      new CleanWebpackPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader, //3. Extract css into files
            "css-loader", //2. Turns css into commonjs
            "sass-loader" //1. Turns sass into css
          ]
        },
        {
          test: /\.less$/,
          use: [{
              loader: 'style-loader' // creates style nodes from JS strings
          },
          {
              loader: 'css-loader' // translates CSS into CommonJ
          },
          {
              loader: 'less-loader', // compiles Less to CSS
              options: {
                  javascriptEnabled: true
              }
          }]
        },
        {
          test: /\.(js|jsx)/,
          exclude: /node_modules/,
          use: {
             loader: 'babel-loader',
             options: {
                "plugins": [
                  ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
                ],
              }
          },
          
       },
      ]
    }
});