const path = require('path');
const fs = require('fs');
var HtmlWebpackPlugin = require("html-webpack-plugin");
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './ant-theme-vars.less'), 'utf8'));

// lessToJs does not support @icon-url: "some-string", so we are manually adding it to the produced themeVariables js object here
themeVariables["@icon-url"] = "'//localhost:8080/fonts/iconfont'";


module.exports = {
   entry: {
      main: "./src/index.js",
      // vendor: "./src/vendor.js"
    },
   module: {
      rules: [
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
         {
            test: /\.less$/,
            use: [{
               loader: 'style-loader',
             }, {
               loader: 'css-loader', // translates CSS into CommonJS
             }, {
               loader: 'less-loader', // compiles Less to CSS
               options: {
                  sourceMap: true,
                  javascriptEnabled: true,
                  modifyVars: themeVariables
               }
            }],
         },
         {
            test: /\.css$/,
            use: [ { loader: "style-loader" }, { loader: "css-loader" } ]
         },
         { 
            test: /\.(png|jpg|jpeg|gif|ico)$/, 
            use: [ { loader: 'url-loader' } ] 
        },
      ]
   },
}