module.exports = function(t) {
  var paths = require('../paths');
  if (t.params.watch) {
    var browserSync = require('browser-sync');
    browserSync({
      notify: true,
      logPrefix: 'PJT',
      server: {
        baseDir: paths.dest.html,
        index: "index.html"
      },
      port: 1337,
      open: false
    });
  }
  t.done();
}
