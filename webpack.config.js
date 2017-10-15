var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var extractSass = new ExtractTextPlugin({
  filename: 'main-[chunkhash].css',
  allChunks: true
});
var babelPlugins = [
  'transform-class-properties',
  'transform-object-rest-spread',
  'static-fs'
];

const isDevMode = process.env.WEBPACK_PRODUCTION_BUILD !== 1 && process.env.WEBPACK_PRODUCTION_BUILD !== '1';

var webpackConfig = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx$/,
      use: {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015-without-strict-loose'],
          plugins: babelPlugins
        }
      }
    }, {
      test: /\.js$/,
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      use: {
        loader: 'babel-loader',
        query: {
          presets: ['es2015-without-strict-loose'],
          plugins: babelPlugins
        }
      }
    }, {
      test: /\.(css|scss)$/,
      use: extractSass.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            sourceMap: isDevMode
          }
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: isDevMode
          }
        }, {
          loader: 'resolve-url-loader',
          query: {
            sourceMap: isDevMode
          }
        }, {
          loader: 'sass-loader',
          options: {
            // NOTE: source maps are needed here for the resolve url loader to work properly
            sourceMap: true
          }
        }]
      })
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      use: {
        loader: 'file-loader?name=/images/[hash].[ext]'
      }
    }]
  },
  plugins: [
    extractSass,
    //NOTE: the ordering of these is needed to get the generate html to have the scripts included in the right order
    new webpack.optimize.CommonsChunkPlugin({
      names: [
        'application',
        'libraries-react',
        'libraries-core',
        'ua-parser-setup',
        'ua-parser'
      ],
      minChunks: 5
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: __dirname + '/web/index.html',
      // NOTE: not quite sure how this works: https://github.com/jantimon/html-webpack-plugin/issues/140#issuecomment-263927464
      chunksSortMode: function(a, b) {
        var order = [
          'ua-parser',
          'ua-parser-setup',
          'libraries-core',
          'libraries-react',
          'application'
        ];

        return order.indexOf(a.names[0]) - order.indexOf(b.names[0]);
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new CleanObsoleteChunks(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"' + (isDevMode ? 'development' : 'production') + '"'
    })
  ],
  entry: {
    //3rd party libraries
    'libraries-core': [
      'bluebird',
      'holderjs',
      'immutable',
      'jsuri',
      'moment',
      'moment-timezone',
      'popper.js',
      'redux',
      'reselect',
      'store-cacheable',
      'superagent',
      'ua-parser-js'
    ],

    'libraries-react': [
      'react',
      'react-dom',
      'react-router',
      'react-redux',
      'react-router-redux',
      'react-router-scroll',
      'react-transition-group',
      'prop-types'
    ],

    //application code
    application: './web/app/Application.js',
  },
  output: {
    path: __dirname + '/web/build',
    publicPath: '/',
    filename: '[name]-[chunkhash].js'
  }
};

if (isDevMode) {
  webpackConfig.devtool = 'source-map';

  webpackConfig.plugins.push(
    new LiveReloadPlugin({
      appendScriptTag: true
    })
  );
} else {
  webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  );

  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  );
}

module.exports = webpackConfig;
