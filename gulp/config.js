var globArray = require('glob-array');
var gulpConfig = {
  webPath: 'web',
  appPath: 'web/app',
  buildPath: 'web/build',
  buildDirectoryName: 'build',
  vendorComponentsPath: 'web/components',
  compileFiles: {
    sass: {
      'web/app/styles/main.scss': 'web/build/main.css'
    }
  },
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
    assetsRewrite: {
      fileTypesToRewrite: ['svg', 'eot', 'ttf', 'woff', 'png', 'gif', 'jpeg', 'jpg', 'js', 'css', 'map', 'html'],
      fileTypesToProcess: ['html', 'css', 'js'],
      assetPaths: ['app', 'components', 'build'],
      prependSlash: true,
      addStatic: false,
      domains: [],
      noBuildVersion: [
        'components/backend/backend.js',
        'app/mocked-api.js'
      ],
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
        'web/locale/**/i18n.js',
        'web/components/nucleus-react/assets/javascript/prism.js'
      ],
      manualDirectories: {},
      manualAssets: {
        'assets/javascript/prism.js': 'web/components/nucleus-react/assets/javascript/prism.js',
        'assets/styles/prism.css': 'web/components/nucleus-react/assets/styles/prism.css'
      }
    },
    browserify: {
      transformers: [
        'reactify',
        'envify'
      ],
      libraries: [{
        name: 'react/addons'
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
      }, {
        name: 'jsuri'
      }]
    },
    bowerClean: [
      'bourbon/*.*',
      'bourbon/.*',
      'backend/lib',
      'backend/test',
      'backend/*.*',
      'backend/.*',
      '!backend/backend.js'
    ],
    i18n: {
      languages: ['en'],
      nodeLanguage: 'en'
    }
  }
};

module.exports = gulpConfig;
