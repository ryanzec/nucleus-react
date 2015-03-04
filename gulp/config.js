var globArray = require('glob-array');
var gulpConfig = {
  webPath: 'web',
  appPath: 'web/app',
  buildPath: 'web/build',
  vendorComponentsPath: 'web/components',
  compileFiles: {
    sass: {
      'web/app/styles/main.scss': 'web/build/main.css'
    }
  },
  jsHintFiles: [
    'assets/**/*.js',
    'assets/**/*.jsx',
    '!assets/javascript/prism.js'
  ],
  sassFiles: [
    'assets/**/*.scss',
    'web/app/**/*.scss',
    'web/components/**/*.scss'
  ],
  htmlFiles: [
    'web/*.html',
    'web/components/**/*.html',
    'web/app/components/**/*.html'
  ],
  tasks: {
    staticRewrite: {
      fileTypesToRewrite: ['svg', 'eot', 'ttf', 'woff', 'png', 'gif', 'jpeg', 'jpg', 'js', 'css', 'map', 'html'],
      fileTypesToProcess: ['html', 'css', 'js'],
      assetPaths: ['app', 'components', 'build'],
      prependSlash: true,
      domains: [],
      assetPatterns: [
        'web/*.html',
        'web/app/**/*.*',
        'web/components/**/*.*',
        //test files should not trigger static rewrite
        '!web/app/**/*.spec.js'
      ]
    },
    copyStaticAssets: {
      staticAssetExtensions: ['svg', 'eot', 'ttf', 'woff', 'png', 'gif', 'jpeg', 'jpg', 'css'],
      staticAssetFolders: [
        'web/components',
        'web/app/components'
      ],
      manualGlobs: [
        'web/locale/**/i18n.js'
      ],
      manualAssets: {
        'web/app/misc/svg-4-everybody.js': 'web/build/app/misc/svg-4-everybody.js',
        'assets/javascript/prism.js': 'web/build/components/nucleus-react/assets/javascript/prism.js',
        'assets/styles/prism.css': 'web/build/components/nucleus-react/assets/styles/prism.css'
      }
    },
    browserify: {
      transformers: [
        'reactify'
      ],
      libraries: [{
        name: 'react/addons'
      }, {
        name: 'react/lib/merge'
      }, {
        name: 'lodash'
      }, {
        name: 'superagent'
      }, {
        name: 'bluebird'
      }, {
        name: 'react-router'
      }, {
        name: 'deep-equal'
      }]
    },
    bowerClean: [
      'bourbon/*.*',
      'bourbon/.*'
    ],
    i18n: {
      languages: ['en'],
      nodeLanguage: 'en'
    }
  }
};

module.exports = gulpConfig;
