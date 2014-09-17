var handleErrors = function(err) {
  var gutil = require('gulp-util');
  gutil.log(gutil.colors.red(err.toString));
};

module.exports = handleErrors;
