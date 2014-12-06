var gulp = require('gulp');

gulp.task('webserver', function() {
  var browserSync  = require('browser-sync');
  var reload       = browserSync.reload;
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

  gulp.watch(paths.source.styles , reload);
  gulp.watch(paths.source.images , reload);
  gulp.watch(paths.source.sprites, reload);
  gulp.watch(paths.source.views  , reload);

});
