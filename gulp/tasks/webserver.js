var gulp = require('gulp');

gulp.task('webserver', ['watch'], function() {
  var browserSync  = require('browser-sync');
  var paths        = require('../config/paths');

  browserSync({
    notify: false,
    logPrefix: 'PROJECTOLOGIST',
    server: {
      baseDir: paths.dest.app,
      index: "index.html",
    },
    port: 1337,
    open: false
  });

});
