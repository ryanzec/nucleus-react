var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var AssetsRewrite = require('./webpack/assets-rewrite-plugin');
var extractSass = new ExtractTextPlugin('/css/main.css');

module.exports = [{
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
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  entry: {
    '/javascript/mocker/server': './web/app/mocker/server.js'
  },
  devtool: ['source-map'],
  output: {
    path: './web/build',
    publicPath: '/build',
    filename: '[name].js'
  }
}, {
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
      loader: extractSass.extract('style-loader', 'css-loader?sourceMap!postcss-loader?sourceMaps!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
    }, {
      test: /\.html$/,
      loader: 'file?name=[name].[ext]'
    }, {
      test: /\.css$/,
      loader: 'file?name=/css/[name].[ext]'
    }, {
      test: /\/misc\/.*\.js$/,
      loader: 'file?name=/javascript/misc/[name].[ext]'
    }, {
      test: /prism\.js$/,
      loader: 'file?name=/javascript/misc/[name].[ext]'
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
    //NOTE: this is in specific order so that the libraries-core defines the webpackJsonp function (multiple common chunk does not seem to work)
    new webpack.optimize.CommonsChunkPlugin({
      names: ['/javascript/libraries-react', '/javascript/libraries-core']
    }),
    new AssetsRewrite({
      fileTypesToRewrite: ['svg', 'eot', 'ttf', 'woff', 'png', 'gif', 'jpeg', 'jpg', 'js', 'css', 'map', 'html'],
      fileTypesToProcess: ['html', 'css', 'js'],
      assetPaths: ['locale', 'javascript', 'misc', 'images', 'css'],
      prependSlash: true,
      addStatic: true,
      domains: [],
      assetPatterns: [
        'web/*.html',
        'web/app/**/*.*',
        'web/components/**/*.*',
        //test files should not trigger static rewrite
        '!web/app/**/*.spec.js'
      ]
    })
  ],
  entry: {
    //3rd party libraries
    '/javascript/libraries-core': [
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

    '/javascript/libraries-react': [
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
    '/javascript/application': './web/app/application',

    //mocks
    '/javascript/mocked-local-storage': './web/app/mock/local-storage.js'
  },
  devtool: ['source-map'],
  output: {
    path: './web/build',
    publicPath: '/build',
    filename: '[name].js'
  }
}]
