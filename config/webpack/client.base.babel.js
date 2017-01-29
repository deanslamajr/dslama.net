import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Post CSS Plugins
import cssNext from 'postcss-cssnext';
import cssImport from 'postcss-import';

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
    new ExtractTextPlugin('[contenthash][name].css', {
      allChunks: true
    })
  ]
};