var gulp = require('gulp');

gulp.task('deploy', function(cb) {
  var seq  = require('run-sequence');
  seq(
    'clean',
    'build',
    'minify',
    'push',
    cb
  );
});

