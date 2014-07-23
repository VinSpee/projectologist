var gulp  = require('gulp');

gulp.task('fonts',  function () {
  var paths = require('../config/paths')

  return gulp.src(paths.source.fonts)
    .pipe(gulp.dest(paths.dest.fonts));
});
