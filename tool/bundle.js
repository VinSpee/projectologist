var browserify = require('browserify');
var source     = require('vinyl-transform');

module.exports = function(t) {
	var b = browserify();
	b.add(source(t.path[0]));

	t.build(b.bundle(), t.dest());
}
