var gulp = require('gulp');

gulp.task('watch', function() {
  var paths       = require('../config/paths');
  var reload = require('browser-sync').reload;

  gulp.watch(paths.source.styles  , ['styles']     , reload);
  gulp.watch(paths.source.images  , ['images']     , reload);
  gulp.watch(paths.source.sprites , ['svg-icons']  , reload);
  gulp.watch(paths.source.fonts   , ['fonts']      , reload);
  gulp.watch(paths.source.views   , ['views']      , reload);
  gulp.watch(paths.source.scripts , ['browserify'] , reload);

});
