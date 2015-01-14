var browserify = require('browserify');
var source     = require('vinyl-transform');

module.exports = function(t) {
	var b = browserify();
	b.add(t.src(t.path[0]));

	t.build(b.bundle(), t.source(t.path[1]), t.dest());
}
