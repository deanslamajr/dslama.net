import merge from 'webpack-merge';

import client from './client.base.babel';

import DefinePlugin from 'webpack/lib/DefinePlugin';
import HtmlWebpackPlugin  from 'html-webpack-plugin';

// App constants
import constants from '../constants';

// Mapping of build-time replacements for DefinePlugin
const replacements =  {
  'process.env': {
    // JSON.stringify() renders in app as undefined, this is expected behavior
    sentryDNS: JSON.stringify()
  }
};

module.exports = merge(client, {
  plugins: [
    new DefinePlugin(replacements),
    new HtmlWebpackPlugin({
      template: __dirname + '/../../src/client/index.ejs',
      filename: '../index.ejs',
      inject: 'body',
      markupTarget: '<%- markup -%>',
      initialState: '<%- initialState -%>',
      sentryCDN: ''
    }),
  ],
  devtool: 'eval-source-map'
});