var gulp = require('gulp');

gulp.task('jshint', function(){
  var handleErrors = require('../util/handleErrors');
  var jshint       = require('gulp-jshint');
  var paths        = require('../config/paths');

  var str = gulp.src(paths.source.scripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));

    str.on('error', handleErrors(true));

    return str;
});
