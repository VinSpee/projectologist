var gulp  = require('gulp');
var clean = require('gulp-rimraf');

gulp.task('clean', function () {
  var handleErrors = require('../util/handleErrors');
  var plumber      = require('gulp-plumber');
  return gulp.src('build')
    .pipe(plumber(handleErrors))
    .pipe(clean());
});

