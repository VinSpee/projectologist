var paths = require('../paths');

module.exports = function(t) {
  if (t.params.watch) {
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

