var globArray = require('glob-array');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var colors = require('colors');

function AssetsRewrite(options) {
  this.options = _.extend({}, options);
}

function makeID() {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i=0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

AssetsRewrite.prototype.apply = function(compiler) {
  var config = this.options;

  compiler.plugin('done', function(compilation, callback) {
    function getRewriteAssetsPath(asset, fullPath) {
      var shasum = crypto.createHash('sha1');
      var filePath = fullPath;

      if(!fs.existsSync(filePath) && config.preprocessors && config.preprocessors[path.extname(filePath)]) {
        filePath = filePath.substr(0, filePath.length - path.extname(filePath).length) + config.preprocessors[path.extname(filePath)];
      } else if(!fs.existsSync(filePath) && asset.substr(0, 6) === 'build/') {
        filePath = filePath.replace(asset, asset.substr(6));
        asset = asset.substr(6);
      }

      // NOTE: generally if a file could not be found it mean there was an error in generating the file however the error that producing in here prevent the
      // NOTE: webpack error from showing so this is the easiest way to prevent that though there is probably a better way within webpack to do it.
      if (!fs.existsSync(filePath)) {
        shasum.update(makeID());
      } else {
        shasum.update(fs.readFileSync(filePath, {
          encoding: 'utf8'
        }));
      }

      var sha = shasum.digest('hex');
      var assetParts = asset.split('/');

      if(config.addStatic === true) {
        assetParts.splice(0, 0, 'static', sha);
      }

      return assetParts.join('/');
    };

    var rewritableAssetExtensions = _.map(config.fileTypesToRewrite, function(item) {
      return '.' + item;
    });
    var processAssetExtensions = _.map(config.fileTypesToProcess, function(item) {
      return '.' + item;
    });

    var allAssets = globArray.sync(config.assetPatterns);
    var rewriteAssets = [];

    allAssets.forEach(function(item) {
      if(fs.statSync(process.cwd() + '/' + item).isDirectory() === false && rewritableAssetExtensions.indexOf(path.extname(item)) !== -1) {
        rewriteAssets.push(item.replace(process.cwd() + '/', ''));
      }
    });

    var filesToProcess = [];
    var searchFor = [
      process.cwd() + '/web/build/**/*.*'
    ];

    filesToProcess = globArray.sync(searchFor);

    filesToProcess = filesToProcess.filter(function(filePath) {
      return processAssetExtensions.indexOf(path.extname(filePath)) !== -1;
    });

    var count = filesToProcess.length;

    filesToProcess.forEach(function(fileToProcess) {
      var fileContents = fs.readFileSync(fileToProcess, 'utf8');
      var regex = new RegExp("[\"']((http[s]?:)?//[a-zA-Z0-9-_.]*\\.[a-zA-Z0-9-_]*\\.[a-zA-Z0-9-_]{2,6})?/?(((static/[0-9a-zA-Z]*/)+)?((" + config.assetPaths.join('|') + ")/[a-zA-Z0-9-_./]+\\.(" + config.fileTypesToRewrite.join('|') + ")))(#)?([0-9a-zA-Z-_]*)?[\"']", 'g');
      var noMatches = false;
      var match;
      var assetMatches = [];

      do {
        match = regex.exec(fileContents);

        if(match === null) {
          noMatches = true;
        } else {
          var matchObject = {};
          matchObject[match[0]] = match[6];
          assetMatches.push(matchObject);
        }
      } while(noMatches === false);

      if (assetMatches.length > 0) {
        console.log(('rewriting assets in ' + fileToProcess + ':').magenta);
        assetMatches.forEach(function(matchObject) {
          var toReplace = Object.keys(matchObject)[0];
          var assetPath = matchObject[Object.keys(matchObject)[0]];
          var rewrittenPath = getRewriteAssetsPath(assetPath, process.cwd() + '/' + 'web/build' + '/' + assetPath);

          if(config.domains.length > 0) {
            rewrittenPath = config.domains[currentDomainKey] + '/' + rewrittenPath;

            if(currentDomainKey >= config.domains.length - 1) {
              currentDomainKey = 0;
            } else {
              currentDomainKey += 1;
            }
          } else if(config.prependSlash === true) {
            rewrittenPath = '/' + rewrittenPath;
          }

          rewrittenPath = '"' + rewrittenPath + '"';

          console.log((toReplace + ' => ' + rewrittenPath).cyan);

          fileContents = fileContents.replace(toReplace, rewrittenPath);
        });
      } else {
        console.log(('no assets to rewrite in ' + fileToProcess).green);
      }

      fs.writeFileSync(fileToProcess, fileContents, 'utf8');
    });
  });
};

module.exports = AssetsRewrite;
