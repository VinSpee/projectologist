var gulp = require('gulp');

gulp.task('styles', function() {
  var handleErrors = require('../util/handleErrors');
  var paths        = require('../config/paths');

  var autoprefixer = require('gulp-autoprefixer');
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
  var plumber      = require('gulp-plumber');
  var rename       = require('gulp-rename');
  var rework       = require('gulp-rework');
  var suit         = require('rework-suit');
  var svg          = require('rework-svg');

  var ns = '';
  return gulp.src(paths.source.main_style)
    .pipe(plumber(handleErrors))
    .pipe(rework(
      svg(),
      inliner(),
      customMedia,
      vars(),
      calc,
      hexAlpha,
      color,
      inherit(),
      ease(),
      dedupe(),
      namespace(ns),
      {sourcemap: true}))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.dest.styles));
});
