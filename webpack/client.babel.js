import path from 'path'

import webpack from 'webpack'

import { getIfUtils, removeEmpty } from 'webpack-config-utils'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'

import cssNext from 'postcss-cssnext'
import cssImport from 'postcss-import'

import constants from '../config/constants'

export default env => {
  const { ifProd } = getIfUtils(env)

  return {
    context: path.resolve(__dirname, '..'),
    // ------------------------------------
    // Entry Points
    // ------------------------------------
    entry: {
      app: [
        'babel-polyfill',
        './src/client/index.js'
      ]
    },
    // ------------------------------------
    // Output
    // ------------------------------------
    output: {
      path: path.join(__dirname, '..', 'public/assets'),
      filename: ifProd('[name]-[hash].js', '[name].js'),
      publicPath: ifProd(`${constants.get('ASSETS_DOMAIN')}/`, '/assets/')
    },
    // ------------------------------------
    // Devtool
    // ------------------------------------
    devtool: ifProd('source-map', 'eval-source-map'),
    // ------------------------------------
    // Modules
    // ------------------------------------
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                  importLoaders: 1
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => ([
                    cssImport,
                    cssNext
                  ])
                }
              }
            ]
          })
        }
      ]
    },
    // ------------------------------------
    // Plugins
    // ------------------------------------
    plugins: removeEmpty([
      new ExtractTextPlugin(ifProd('[name]-[contenthash].css', 'styles.css')),
      new HtmlWebpackPlugin(removeEmpty({
        template: path.join(__dirname, '../src/client/index.ejs'),
        filename: '../index.ejs',
        inject: 'body',
        markupTarget: '<%- markup -%>',
        initialState: '<%- initialState -%>',
        sentryCDN: ifProd('<script src="https://cdn.ravenjs.com/3.9.2/raven.min.js"></script>')
      })),
      new webpack.DefinePlugin({
        'process.env': removeEmpty({
          sentryDNS: ifProd(JSON.stringify(constants.get('SENTRY_DNS'))),
          mediumUser: JSON.stringify(constants.get('MEDIUM_USERNAME')),
          // This informs certain dependencies e.g. React that they should be compiled for prod
          // see https://github.com/facebook/react/issues/6479#issuecomment-211784918
          NODE_ENV: ifProd('"production"', '"development"')
        })
      }),
      ifProd(new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$/,
        threshold: 10240,
        minRatio: 0.8
      }))
    ])
  }
}