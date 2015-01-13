var gulp = require('gulp');

gulp.task('styles', function() {
  var handleErrors     = require('../util/handleErrors');
  var paths            = require('../config/paths');
  var plumber          = require('gulp-plumber');
  var reload           = require('browser-sync').reload;
  var sourcemaps       = require('gulp-sourcemaps');
  var rename           = require('gulp-rename');
  var postcss          = require('gulp-postcss');
  var autoprefixer     = require('autoprefixer-core');
  var calc             = require('postcss-calc');
  var colorFunction    = require('postcss-color-function');
  var gray             = require('postcss-color-gray');
  var colorHexAlpha    = require('postcss-color-hex-alpha');
  var customMedia      = require('postcss-custom-media');
  var customProperties = require('postcss-custom-properties');
  var fontVariant      = require('postcss-font-variant');
  var inline           = require('postcss-import');
  var nested           = require('postcss-nested');

  return gulp.src(paths.source.main_style)
    .pipe(plumber(handleErrors))
    .pipe(sourcemaps.init())
    .pipe(postcss([
      inline({
        path: ['app/styles/']
      }),
      nested,
      customProperties(),
      calc(),
      customMedia(),
      gray(),
      colorHexAlpha(),
      colorFunction(),
      fontVariant(),
      autoprefixer({ browsers: 'last 2 versions' })
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dest.styles))
    .pipe(reload({stream:true}));
});
