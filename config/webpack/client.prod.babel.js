import merge from 'webpack-merge';

import client from './client.base.babel';

import HtmlWebpackPlugin  from 'html-webpack-plugin';
import DedupePlugin from 'webpack/lib/optimize/DedupePlugin';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import DefinePlugin from 'webpack/lib/DefinePlugin';
import CompressionPlugin from 'compression-webpack-plugin';

// App constants
import constants from '../constants';

// Mapping of build-time replacements for DefinePlugin
const replacements =  {
  'process.env': {
    'NODE_ENV': JSON.stringify('production'),
    sentryDNS: JSON.stringify(constants.get('SENTRY_DNS'))
  }
};

module.exports = merge(client, {
  output: {
    publicPath: constants.get('ASSETS_DOMAIN') + '/',
    path: './public/assets',
    filename: '[hash][name].js',
  },
  plugins: [
    // needed for react to be put in production mode
    // @see https://facebook.github.io/react/docs/optimizing-performance.html#use-the-production-build
    new DefinePlugin(replacements),
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
    }),
    new HtmlWebpackPlugin({
      template: __dirname + '/../../src/client/index.ejs',
      filename: '../index.ejs',
      inject: 'body',
      markupTarget: '<%- markup -%>',
      initialState: '<%- initialState -%>',
      sentryCDN: '<script src="https://cdn.ravenjs.com/3.9.2/raven.min.js"></script>'
    }),
  ],
  devtool: 'source-map',
});