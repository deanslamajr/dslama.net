const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Post CSS Plugins
const cssNext   = require('postcss-cssnext');
const cssImport = require('postcss-import');

module.exports = {
  externals: [
    nodeExternals(),
  ],

  target: 'node',

  entry: {
    server: [
      'babel-polyfill',
      './src/server/index.js',
    ],
  },

  output: {
    path: './public',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: '/public/',
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

  plugins: [
    new ExtractTextPlugin('./assets/styles.css', {
      allChunks: true
    })
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
};