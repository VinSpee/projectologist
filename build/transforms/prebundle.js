var derequire = require('gulp-derequire');
var gutil = require('gulp-util');
var browserify = require('browserify');

module.exports = function(t) {
  var b = browserify();
  b.transform('envify');
  b.require(t.path);
  t.eos(
    b.bundle()
     .on('error',gutil.log)
     .pipe(t.source('prebundle.js'))
     .pipe(derequire())
     .pipe(t.dest())
  );
};