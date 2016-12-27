const merge = require('webpack-merge');

const client = require('./client.base.babel')

const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(client, {
  output: {
    publicPath: 'http://assets.deanslamajr.com/',
    path: './public/assets',
    filename: '[hash][name].js',
  },
  plugins: [
    new DedupePlugin(),
    new UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
});