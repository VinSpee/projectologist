var gulp = require('gulp');

gulp.task('build-styleguide', function(cb){
  var seq  = require('run-sequence');
  seq(
    'styles',
    //'styleguide',
    cb
  );
});

