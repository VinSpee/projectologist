var gulp = require('gulp');

gulp.task('watch', function() {
	var lr        = require('tiny-lr');
	var server    = lr();
	var paths     = require('../config/paths');
	var handleErr = require('../util/handleErrors');

	server.listen(35728, function (err) {
		if (err) {
			return handleErrors(err);
		}

		gulp.watch(paths.source.templates,  ['views'] );
		gulp.watch(paths.source.styles,     ['styles']);
		gulp.watch(paths.source.images,     ['images']);
		gulp.watch(paths.source.views,      ['views']);
		gulp.watch(paths.source.scripts,    ['browserify']);
	});

});
