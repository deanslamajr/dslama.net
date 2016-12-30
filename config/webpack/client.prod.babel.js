const merge = require('webpack-merge');

const client = require('./client.base.babel')

const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(client, {
  output: {
    publicPath: 'http://assets.deanslamajr.com/',
    path: './public/assets',
    filename: '[hash][name].js',
  },
  plugins: [
    // needed for react to be put in production mode
    // @see https://facebook.github.io/react/docs/optimizing-performance.html#use-the-production-build
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
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