var gulp = require('gulp');

gulp.task('views', function(){
  var paths        = require('../config/paths');
  var plumber      = require('gulp-plumber');
  var handleErrors = require('../util/handleErrors');
  var reload       = require('browser-sync').reload;

  return gulp.src(paths.source.views)
    .pipe(plumber(handleErrors))
    .pipe(gulp.dest(paths.dest.app))
    .pipe(reload({stream:true}));
});
