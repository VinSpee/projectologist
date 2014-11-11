var gulp = require('gulp');

gulp.task('svg-icons', function() {
  var changed      = require('gulp-changed');
  var handleErrors = require('../util/handleErrors');
  var paths        = require('../config/paths');
  var size         = require('gulp-size');
  var plumber      = require('gulp-plumber');
  var imagemin     = require('gulp-imagemin');
  var gulpif       = require('gulp-if');
  var symbols      = require('gulp-svgstore');

  var SVG_DEST  = paths.dest.images;
  var CSS_DEST  = paths.source.icons_dir;
  var HTML_DEST = paths.dest.app;

  return gulp.src(paths.source.sprites)
    .pipe(plumber(handleErrors))
    .pipe(symbols({
      fileName: 'symbols.svg',
      transformSvg: function($svg, done) {
        $svg.find('[fill]').removeAttr('fill');
        done(null, $svg);
      }

    }))
   .pipe(gulp.dest(SVG_DEST));
});
