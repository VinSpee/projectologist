var gutil  = require('gulp-util');
var tap    = require('gulp-tap');
var reload = require('browser-sync').reload;
var Styledown = require('styledown');

var foo;

module.exports = function(t) {
  foo = t;
  t.build(t.src(), tap(styleguide), t.dest());
}

function styleguide(file) {
  if (file.contents) {
    var opts = {
    }

    var docs = [
      {
        name: foo.path[0],
        data: file.contents.toString()
      }
    ];
    var res = Styledown.parse(docs, opts);
  }
}
