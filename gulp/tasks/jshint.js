var gulp = require('gulp');

gulp.task('jshint', function(){
  var handleErrors = require('../util/handleErrors');
  var jshint       = require('gulp-jshint');
  var coffeelint   = require('gulp-coffeelint');
  var paths        = require('../config/paths');
  var plumber      = require('gulp-plumber');
  var filter       = require('gulp-filter');

  var js     = filter('**/*.js');
  var coffee = filter('**/*.coffee');
  return gulp.src(paths.source.scripts)
    .pipe(plumber(handleErrors))
    .pipe(js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
    .pipe(js.restore())
    .pipe(coffee)
    .pipe(coffeelint())
    .pipe(coffeelint.reporter())
    .pipe(coffeelint.reporter('fail'))
    .pipe(coffee.restore());
});
