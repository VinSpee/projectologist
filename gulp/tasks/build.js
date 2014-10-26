var gulp = require('gulp');

gulp.task('build', function(cb){
  var seq  = require('run-sequence');
  seq(
    'clean',
    ['images', /*'icon-font'*/'svg-icons', 'webpack', 'styles'],
    'views',
    'watch',
    cb
  );
});
