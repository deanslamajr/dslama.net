const nodeExternals = require('webpack-node-externals');

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
      }
    ]
  },

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
};