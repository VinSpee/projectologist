var gulp = require('gulp');

gulp.task('sass', function() {
  var notify       = require('gulp-notify');
  var sass         = require('gulp-ruby-sass');
  var handleErrors = require('../util/handleErrors');
  var paths        = require('../config/paths');
  var autoprefixer = require('gulp-autoprefixer');

  return gulp.src(paths.source.main_style)
  .pipe(sass({
    loadPath: [
      'client/bower_components/sass-contrast',
      'client/bower_components/modularized-normalize-scss',
      'client/bower_components/modular-scale/stylesheets',
      'client/bower_components/breakpoint-sass/stylesheets',
      'client/bower_components/sass-toolkit/stylesheets',
      'client/bower_components/eq.js/sass',
      'client/bower_components/leveleleven-builder-component-library/styles/'
    ]
  }))
  .on('error', handleErrors(false))
  .pipe(autoprefixer('last 2 version', '> 1%'))
  .pipe(gulp.dest(paths.dest.styles))
  .on('error', handleErrors(true));
});
