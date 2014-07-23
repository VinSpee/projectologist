var gulp = require('gulp');

gulp.task('watch', ['browserSync'], function() {
  var paths = require('../config/paths');

  gulp.watch(paths.source.styles, ['build-styleguide']);
  gulp.watch(paths.source.images, ['images']);
  gulp.watch(paths.source.views,   ['views']);
  gulp.watch(paths.source.styleguide, ['styleguide']);
  gulp.watch(paths.source.scripts, ['jshint', 'browserify']);
});
