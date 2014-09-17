var gulp = require('gulp');

gulp.task('webserver', function() {
  var webserver    = require('gulp-webserver');
  var plumber      = require('gulp-plumber');
  var handleErrors = require('../util/handleErrors');

  gulp.src('./build')
    .pipe(plumber(handleErrors))
    .pipe(webserver({
      livereload: true,
      port: 1337,
      directoryListing: false
      //open: true
    }));
});
