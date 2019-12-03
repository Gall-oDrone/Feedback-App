const path = require('path');


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
   },
   resolve: {
      modules: ['src/front', 'node_modules'],
      extensions: ['.js', 'jsx', '.less'],
   },
   devServer: {
      inline: true,
      contentBase: path.resolve(__dirname, "/bundle"),
      historyApiFallback: true,
      port: 8001
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
   plugins: [
      new HtmlWebpackPlugin({
         template: './public/index.html',
         filename: 'index.html',
         favicon: './public/favicon.ico',
         inject: 'body'
      })
   ]
}