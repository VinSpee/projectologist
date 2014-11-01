var gulp = require('gulp');

gulp.task('styles', function() {
  var rework       = require('gulp-rework');
  var paths        = require('../config/paths');
  var handleErrors = require('../util/handleErrors');
  var plumber      = require('gulp-plumber');
  var calc         = require('rework-calc');
  var customMedia  = require('rework-custom-media');
  var inliner      = require('rework-npm');
  var vars         = require('rework-vars');
  var dedupe       = require('rework-deduplicate');
  var ease         = require('rework-plugin-ease');
  var inherit      = require('rework-inherit');
  var color        = require('rework-color-function');
  var hexAlpha     = require('rework-hex-alpha');
  var fontVariant  = require('rework-font-variant');
  var namespace    = require('rework-namespace');
  var autoprefixer = require('gulp-autoprefixer');

  var ns = '';
  return gulp.src(paths.source.main_style)
    .pipe(plumber(handleErrors))
    .pipe(rework(
      inliner(),
      vars(),
      customMedia(),
      calc,
      hexAlpha,
      color,
      inherit(),
      ease(),
      dedupe(),
      namespace(ns),
      {sourcemap: true}
      )
    )
    .pipe(autoprefixer()
    .pipe(gulp.dest(paths.dest.styles))
  );
});
