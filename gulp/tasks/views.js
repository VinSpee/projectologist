var gulp = require('gulp');

gulp.task('views', function(){
  var paths        = require('../config/paths');
  var plumber      = require('gulp-plumber');
  var handleErrors = require('../util/handleErrors');
  var inject       = require('gulp-inject');

  function fileContents (filePath, file) {
    return file.contents.toString('utf8')
  }

  return gulp.src(paths.source.views)
    .pipe(plumber(handleErrors))
    .pipe(inject(
      gulp.src(paths.dest.images +  'svg-symbols.svg', {transform: fileContents})
    ))
    .pipe(gulp.dest(paths.dest.app));
});
