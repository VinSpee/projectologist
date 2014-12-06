/* browserify task
   ---------------
   Bundle javascripty things with browserify!
*/

var gulp       = require('gulp');
var gutil      = require('gulp-util');

var paths      = require('../config/paths');

var source     = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify   = require('reactify');
var errorify   = require('errorify');

gulp.task('browserify', function() {
  var args = {};
  args.extensions = ['.js', '.jsx'];
  var bundler = browserify(paths.source.main_script, args);
  bundler.plugin(errorify);
  bundler.transform(reactify);
  bundler.plugin(errorify);
  function rebundle() {
    var browserSync  = require('browser-sync');
    var reload       = browserSync.reload;
    return bundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('app.js'))
      .pipe(gulp.dest(paths.dest.scripts))
      .pipe(reload({stream: true, once: true}));
  }
  bundler.on('update', rebundle);
  return rebundle();
});
