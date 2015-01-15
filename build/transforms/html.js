var htmlInclude = require('gulp-html-tag-include');
var reload      = require('browser-sync').reload;

module.exports = function (t) {
  var dest = t.dest();
  if (t.params.watch) {
    dest.pipe(reload({stream: true}));
  }
  t.build(t.src(), htmlInclude(), dest);
};
