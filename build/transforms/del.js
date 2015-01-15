var del = require('del');

module.exports = function(t) {
  del(t.path, function(err) {
    t.done(err);
  });
};