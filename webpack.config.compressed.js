var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

var extractSass = new ExtractTextPlugin('main.css');

module.exports = {
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: [
        path.resolve(__dirname, "node_modules")
      ],
      query: {
        presets: ['react', 'es2015-without-strict-loose'],
        plugins: ['static-fs']
      }
    }, {
      test: /\.scss$/,
      loader: extractSass.extract('style-loader', 'css-loader!postcss-loader!sass-loader?outputStyle=compact&sourceMap=false&sourceMapContents=false')
    }, {
      test: /\.html$/,
      loader: 'file?name=[name].[ext]'
    }, {
      test: /\.css$/,
      loader: 'file?name=[name].[ext]'
    }, {
      test: /\/misc\/.*\.js$/,
      loader: 'file?name=/misc/[name].[ext]'
    }, {
      test: /\.(png|jpg|jpeg|)$/,
      loader: 'file?name=/images/[hash].[ext]'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  postcss: function () {
    return [autoprefixer, precss];
  },
  plugins: [
    extractSass,
    new webpack.optimize.CommonsChunkPlugin({
      names: ['libraries-react', 'libraries-core']
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],
  entry: {
    //3rd party libraries
    'libraries-core': [
      'bluebird',
      'form-data-validation',
      'immutable',
      'jsuri',
      'moment',
      'moment-timezone',
      'redux',
      'redux-thunk',
      'reselect',
      'store-cacheable',
      'superagent',
      'tether'
    ],

    'libraries-react': [
      'react',
      'react-dom',
      'react-router',
      'react-redux',
      'react-router-redux',
      'react-router-scroll',
      'react-tether',
      'react-dnd',
      'react-dnd-html5-backend'
    ],

    //application code
    application: './web/app/application',

    //mocks
    'mocked-api': './web/app/mock/api.js',
    'mocked-local-storage': './web/app/mock/local-storage.js'
  },
  output: {
    path: './web/build',
    publicPath: '/build',
    filename: '[name].js'
  }
}
