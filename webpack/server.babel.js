import path from 'path'

import nodeExternals from 'webpack-node-externals'

import ExtractTextPlugin from 'extract-text-webpack-plugin'

import cssNext from 'postcss-cssnext'
import cssImport from 'postcss-import'

export default env => {
  return {
    target: 'node',
    // ------------------------------------
    // Do not bundle any dependencies that can be found in `node_modules`
    // ------------------------------------
    externals: [
      nodeExternals()
    ],
    // ------------------------------------
    // Entry Points
    // ------------------------------------
    entry: {
      server: [
        'babel-polyfill',
        './src/server/index.js'
      ]
    },
    // ------------------------------------
    // Output
    // ------------------------------------
    output: {
      path: path.join(__dirname, '..', 'public'),
      filename: '[name].js',
      publicPath: '/public/',
      libraryTarget: 'commonjs2'
    },
    // ------------------------------------
    // Module
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
    plugins: [
      new ExtractTextPlugin('assets/styles.css')
    ],
    // ------------------------------------
    // Node PolyFills/Mocks
    // ------------------------------------
    node: {
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false
    }
  }
}
