var gutil     = require('gulp-util');
var reload    = require('browser-sync').reload;
var Styledown = require('styledown');
var tap       = require('gulp-tap');
var ext       = require('gulp-ext');

module.exports = function(t) {
  t.build(t.src(), tap(docify), ext.replace('html'), t.dest());
}

var docFiles = [];

function docify(file) {
  if(file.contents) {
    var opts = {
      inline: true
    };

    var currentFile = {
      name: file.relative,
      data: file.contents.toString()
    };

    var res = Styledown.parse([currentFile], opts)
    file.contents = Buffer(res, 'utf8');
  }
}
