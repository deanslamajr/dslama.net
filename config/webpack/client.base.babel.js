const HtmlWebpackPlugin  = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Post CSS Plugins
const cssNext   = require('postcss-cssnext');
const cssImport = require('postcss-import');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './src/client/index.js',
    ],
  },
  
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel',
        ],
      },

      { 
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      }
    ]
  },

  postcss: function (webpack) {
    return [
      cssImport,
      cssNext
    ];
  },

  output: {
    publicPath: '/assets/',
    path: './public/assets',
    filename: '[name].js',
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/../../src/client/index.ejs',
      filename: '../index.ejs',
      inject: 'body',
      markupTarget: '<%- markup -%>'
    }),

    new ExtractTextPlugin('[contenthash][name].css', {
      allChunks: true
    })
  ]
};