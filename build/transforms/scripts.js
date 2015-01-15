var browserify = require('browserify');
var reload     = require('browser-sync').reload;

module.exports = function(t) {
  var b = browserify({debug: true});
  b.add(t.path[0]);
  b.transform('reactify');
  var bundle = b.bundle().on('error', console.log);
  var source = t.source(t.path[1]);
  var dest = t.dest();
  if (t.params.watch) {
    dest.pipe(reload({stream: true}));
  }
  t.build(bundle, source, dest);

  // helps sometimes
  // console.log(t.path);
  // console.log(t.params);
};
