var gulp = require('gulp');

gulp.task('images', function() {
  var changed      = require('gulp-changed');
  var handleErrors = require('../util/handleErrors');
  var paths        = require('../config/paths');
  var size         = require('gulp-size');
  var plumber      = require('gulp-plumber');
  var imagemin     = require('gulp-imagemin');

  var DEST = paths.dest.images;

  return gulp.src(paths.source.images)
    .pipe(plumber(handleErrors))
    .pipe(changed(DEST)) // Ignore unchanged files
    .pipe(imagemin())
    .pipe(gulp.dest(DEST));
});
