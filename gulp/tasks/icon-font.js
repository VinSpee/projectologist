var gulp = require('gulp');

gulp.task('svg-icons', function() {
  var changed      = require('gulp-changed');
  var handleErrors = require('../util/handleErrors');
  var paths        = require('../config/paths');
  var size         = require('gulp-size');
  var plumber      = require('gulp-plumber');
  var imagemin     = require('gulp-imagemin');
  var gulpif       = require('gulp-if');
  var symbols      = require('gulp-svg-symbols');

  var SVG_DEST  = paths.dest.images;
  var CSS_DEST  = paths.source.icons_dir;
  var HTML_DEST = paths.dest.app;

  return gulp.src(paths.source.sprites)
    .pipe(plumber(handleErrors))
    .pipe(changed(SVG_DEST)) // Ignore unchanged files
    .pipe(symbols({
      className: '[data-am-Icon~=%f]'
    }))
   .pipe(gulpif( /[.]svg$/, gulp.dest(SVG_DEST)))
   .pipe(gulpif( /[.]css$/, gulp.dest(CSS_DEST)))
   .pipe(gulpif( /[.]html$/, gulp.dest(HTML_DEST)));
});
