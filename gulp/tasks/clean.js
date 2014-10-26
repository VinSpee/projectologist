var gulp  = require('gulp');

gulp.task('clean', function (cb) {
  var clean        = require('del');
  var paths        = require('../config/paths');
  clean([paths.app + '**'], cb);
});
