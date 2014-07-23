var gulp  = require('gulp');

gulp.task('views', function(){
  var paths = require('../config/paths');

  return gulp.src(paths.source.index)
    .pipe(gulp.dest(paths.dest.app));
});

