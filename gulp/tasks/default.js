var gulp = require('gulp');
var seq  = require('run-sequence');

gulp.task('default', function(cb) {
  seq(
    'build',
    'webserver',
    cb
  );
});
