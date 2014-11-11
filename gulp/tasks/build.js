var gulp = require('gulp');

gulp.task('build', function(cb){
  var seq  = require('run-sequence');
  seq(
    'clean',
    ['styles', 'images', 'svg-icons', 'views'],
    'webserver',
    cb
  );
});
