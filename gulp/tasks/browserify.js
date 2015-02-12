var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var gulpConfig = require('../config.js');
var through = require('through2');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');

gulp.task('browserify', function(done) {
  var count = 2;

  var libraries = browserify();
  var application = browserify();

  gulpConfig.tasks.browserify.transformers.forEach(function(transform) {
    libraries.transform(transform);
    application.transform(transform);
  });

  gulpConfig.tasks.browserify.libraries.forEach(function(metaData) {
    if(metaData.path) {
      libraries.require(metaData.path, {
        expose: metaData.name
      });
    } else {
      libraries.require(metaData.name);
    }

    application.external(metaData.name);
  });

  application.add(process.cwd() + '/web/app/application.jsx');

  var libraryStream = libraries.bundle()
  .on('error', function(err){
    var message;

    if(err.description)
      message = 'browserify error: ' + err.description + ' when parsing ' + err.fileName + ' | Line ' + err.lineNumber + ', Column ' + err.column;
    else {
      message = err.message;
    }

    gutil.log(gutil.colors.red(message));

    this.emit('end');
  })
  .pipe(source('libraries.js'));

  libraryStream.pipe(gulp.dest(gulpConfig.buildPath))
  .pipe(through.obj(function(file, encoding, cb) {
    count -= 1;

    if(count == 0) {
      done();
    }

    cb(null, file);
  }));

  var applicationStream = application.bundle()
  .on('error', function(err){
    var message;

    if(err.description)
      message = 'browserify error: ' + err.description + ' when parsing ' + err.fileName + ' | Line ' + err.lineNumber + ', Column ' + err.column;
    else {
      message = err.message;
    }

    gutil.log(gutil.colors.red(message));

    this.emit('end');
  })
  .pipe(source('application.js'));

  applicationStream.pipe(gulp.dest(gulpConfig.buildPath))
  .pipe(through.obj(function(file, encoding, cb) {
    count -= 1;

    if(count == 0) {
      done();
    }

    cb(null, file);
  }));
});

gulp.task('browserify-production', function(done) {
  runSequence(
    'browserify',
    'browserify-uglify',
    done
  );
});

gulp.task('browserify-uglify', function(done) {
  var count = 2;

  gulp.src(['web/build/application.js'])
  .pipe(uglify())
  .pipe(gulp.dest(gulpConfig.buildPath))
  .pipe(through.obj(function(file, encoding, cb) {
    count -= 1;

    if(count == 0) {
      done();
    }

    cb(null, file);
  }));

  gulp.src(['web/build/libraries.js'])
  .pipe(uglify())
  .pipe(gulp.dest(gulpConfig.buildPath))
  .pipe(through.obj(function(file, encoding, cb) {
    count -= 1;

    if(count == 0) {
      done();
    }

    cb(null, file);
  }));
});
