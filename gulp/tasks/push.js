var gulp         = require('gulp');

gulp.task('push', function(){
  var awspublish   = require('gulp-awspublish');
  var filter       = require('gulp-filter');
  var handleErrors = require('../util/handleErrors');
  var paths        = require('../config/paths');

  var publisher = awspublish.create(require('./../../aws.json'));
  var headers = {
    'x-amz-acl': 'public-read'
  };
  return gulp.src('./build/**/*')
    .pipe(publisher.publish(headers))
    .on('error', handleErrors(false))
    .pipe(publisher.sync())
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});
