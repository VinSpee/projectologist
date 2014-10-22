var gulp = require('gulp');
gulp.task('icon-font', function() {

  var gutil        = require('gulp-util');
  var paths        = require('../config/paths');
  var iconFont     = require('gulp-iconfont');
  var changed      = require('gulp-changed');
  var handleErrors = require('../util/handleErrors');
  var plumber      = require('gulp-plumber');

  var DEST = paths.dest.fonts;

  return gulp.src(paths.source.sprites)
    .pipe(plumber(handleErrors))
    .pipe(changed(DEST))
    .pipe(iconFont({
      fontName: 'icons',
      fontHeight: 1000,
      normalize: true,
      appendCodepoints: true
    })).on('codepoints', function(codepoints, options) {
      console.log(codepoints);
    })
    .pipe(gulp.dest(DEST));
});
