var handleErrors = function(err) {
  var gutil = require('gulp-util');
  gutil.beep();
  gutil.log(gutil.colors.red(err.toString()));
};

module.exports = handleErrors;
