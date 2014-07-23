var gulp = require('gulp');

gulp.task('minify', function(){
  var csso         = require('gulp-csso');
  var filter       = require('gulp-filter');
  var handleErrors = require('../util/handleErrors');
  var imagemin     = require('gulp-imagemin');
  var minifyHTML   = require('gulp-minify-html');
  var paths        = require('../config/paths');
  var processHTML  = require('gulp-processhtml');
  var rename       = require('gulp-rename');
  var size         = require('gulp-size');
  var uglify       = require('gulp-uglify');

  var images  = filter('**/*.{svg,png,gif,jpg,jpeg}');
  var pages   = filter('**/*.html');
  var styles  = filter('**/*.css');
  var scripts = filter('**/*.js');
  return gulp.src('./build/**')
    .pipe(styles)
    .pipe(csso())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(paths.dest.styles))
    .pipe(size())
    .pipe(styles.restore())
    .pipe(scripts)
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest(paths.dest.scripts))
    .pipe(size())
    .pipe(scripts.restore())
    .pipe(images)
    .pipe(imagemin())
    .pipe(size())
    .pipe(images.restore())
    .pipe(pages)
    .pipe(processHTML('index.html'))
    .pipe(minifyHTML({ empty: false }))
    .pipe(gulp.dest(paths.dest.app))
    .pipe(size())
    .pipe(pages.restore());
});

