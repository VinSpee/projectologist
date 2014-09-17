var gulp         = require('gulp');

gulp.task('push', function(){
  var awspublish   = require('gulp-awspublish');
  var filter       = require('gulp-filter');
  var paths        = require('../config/paths');
  var plumber      = require('gulp-plumber');
  var handleErrors = require('../util/handleErrors');

  var publisher = awspublish.create(require('./../../aws.json'));
  var headers = {
    'x-amz-acl': 'public-read'
  };
  return gulp.src('./build/**/*')
    .pipe(plumber(handleErrors))
    .pipe(publisher.publish(headers))
    .pipe(publisher.sync())
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});
