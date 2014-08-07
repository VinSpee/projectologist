var gulp  = require('gulp');
var clean = require('gulp-rimraf');

gulp.task('clean', function () {
  return gulp.src('build').pipe(clean());
});

