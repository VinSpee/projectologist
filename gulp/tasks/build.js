var gulp = require('gulp');

gulp.task('build', function(cb){
  var seq  = require('run-sequence');
  seq(
    'clean',
    ['styles', 'images', 'browserify', 'svg-icons', 'views'],
    cb
  );
});
