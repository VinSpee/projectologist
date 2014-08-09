var gulp = require('gulp');
gulp.task('icon-font', function() {

  var paths    = require('../config/paths');
  var iconFont = require('gulp-iconfont');
  var changed  = require('gulp-changed');

  var DEST = paths.dest.fonts;

  return gulp.src(paths.source.sprites)
    .pipe(changed(DEST))
    .pipe(iconFont({
      fontName: 'icons',
      fontHeight: 1000,
      normalize: true,
      appendCodepoints: true
    })).on('codepoints', function(codepoints, options) {
      console.log(codepoints);
    })
    .pipe(gulp.dest(DEST));
});
