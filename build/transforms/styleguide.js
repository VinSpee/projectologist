module.exports = function(t) {
  var ext       = require('gulp-ext');
  var tap       = require('gulp-tap');
  var reload    = require('browser-sync').reload;

  var dest = t.dest();
  if (t.params.watch) {
    dest.pipe(reload({stream: true}));
  }
  t.build(t.src(), tap(docify), ext.replace('html'), dest);
}

function docify(file) {
  var Styledown = require('styledown');
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
