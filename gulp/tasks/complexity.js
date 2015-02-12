var gulp = require('gulp');
var gutil = require('gulp-util');
var helpers = require('../helpers');

gulp.task('complexity', 'Run mocha tests', function(done) {
  helpers.childProcess('node', [
    'tasks/complexity.js'
  ], function(error, stdout, stderr) {
    if(stderr) {
      gutil.log(gutil.colors.red(stderr));
    } else {
      console.log(stdout);
    }

    done();
  });
});
