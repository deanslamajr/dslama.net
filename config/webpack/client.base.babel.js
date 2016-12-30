import HtmlWebpackPlugin  from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import DefinePlugin from 'webpack/lib/DefinePlugin';

// Post CSS Plugins
import cssNext from 'postcss-cssnext';
import cssImport from 'postcss-import';

// App constants
import constants from '../constants';

// Mapping of build-time replacements for DefinePlugin
const PICS_DOMAIN = 'PICS_DOMAIN';
const replacements =  {
  'process.env': {
    [PICS_DOMAIN]: JSON.stringify(constants.get(PICS_DOMAIN))
  }
};

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
    new DefinePlugin(replacements),
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