var gulp = require('gulp');

gulp.task('browserSync', function() {
  var browserSync = require('browser-sync');
  var paths       = require('../config/paths');

  browserSync.init(
    [
      paths.dest.scripts,
      paths.dest.fonts,
      paths.dest.images,
      paths.dest.scripts
    ], {
    server: {
      baseDir: 'build'
    },
    debugInfo: false,
    open: false,

  });
});
