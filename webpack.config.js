const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    contentBase: './dist',
    historyApiFallback: {
       index: 'index.htm'
    }
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'window'
  },
  module:{
    rules:[
        {
          test:/\.css$/,
          use: [
            {
                loader:'style-loader'
                },
              {
                loader:'css-loader',
                options: {
                    modules: true,
                }
              }
            ]
        }
   ]
  }
};