var gulp         = require('gulp');
gulp.task('styleguide', function() {
  var handleErrors = require('../util/handleErrors');
  var exec         = require('gulp-exec');
  var browserSync  = require('browser-sync');

  return gulp.src('')
    .pipe(exec('hologram'))
    .pipe(exec.reporter())
    .on('error', handleErrors(true))
    .pipe(browserSync.reload({stream:true, once: true}));
});
