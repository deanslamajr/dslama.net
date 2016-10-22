const HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './src/client/index.js',
    ],
  },
  output: {
    publicPath: '/assets',
    path: './public/assets',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel',
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/../../src/client/index.ejs',
      filename: '../index.html',
      inject: 'body'
    })
  ]
};