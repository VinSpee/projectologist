var gulp = require('gulp');

gulp.task('build', function(cb){
  var seq  = require('run-sequence');
  seq(
    'clean',
    ['styles', 'images', 'svg-icons', 'views'],
    'webpack-dev-server',
    cb
  );
});
