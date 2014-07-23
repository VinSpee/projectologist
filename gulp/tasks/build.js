var gulp = require('gulp');

gulp.task('build', function(cb){
  var seq  = require('run-sequence');
  seq(
    'clean',
    'jshint',
    ['browserify', 'sass', 'views', 'fonts', 'images'],
    'styleguide',
    cb
  );
});
