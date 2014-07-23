/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var gulp = require('gulp');

gulp.task('browserify',function(){
  var browserify   = require('gulp-browserify');
  var debowerify   = require('debowerify');
  var handleErrors = require('../util/handleErrors');
  var paths        = require('../config/paths');
  var reactify     = require('reactify');
  var rename       = require('gulp-rename');
  var size         = require('gulp-size');
  var browserSync  = require('browser-sync');

  return gulp.src(paths.source.main_script, {read: false})
    .pipe(browserify({
      transform: ['reactify', 'debowerify'],
      alias: [
        './client/scripts/mixins/element-query.js:element-query',
        './client/scripts/utils/loggers.js:loggers',
        './client/scripts/utils/url.js:url'
      ],
      debug: true,
      extensions: ['.jsx', '.js', '.coffee']
    }))
    .pipe(rename('main.js'))
    .pipe(size())
    .pipe(gulp.dest(paths.dest.scripts))
    .pipe(browserSync.reload({stream:true}));
});
