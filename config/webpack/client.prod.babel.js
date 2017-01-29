import merge from 'webpack-merge';

import client from './client.base.babel';

import DedupePlugin from 'webpack/lib/optimize/DedupePlugin';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import DefinePlugin from 'webpack/lib/DefinePlugin';
import CompressionPlugin from 'compression-webpack-plugin';

// App constants
import constants from '../constants';

module.exports = merge(client, {
  output: {
    publicPath: constants.get('ASSETS_DOMAIN') + '/',
    path: './public/assets',
    filename: '[hash][name].js',
  },
  plugins: [
    // needed for react to be put in production mode
    // @see https://facebook.github.io/react/docs/optimizing-performance.html#use-the-production-build
    new DefinePlugin({
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
  ],
  devtool: 'source-map',
});