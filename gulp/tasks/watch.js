var gulp = require('gulp');

gulp.task('watch', function() {
	var paths     = require('../config/paths');
	var handleErr = require('../util/handleErrors');

	gulp.watch(paths.source.templates,  ['views'] );
	gulp.watch(paths.source.styles,     ['styles']);
	gulp.watch(paths.source.images,     ['images']);
	gulp.watch(paths.source.views,      ['views']);
	gulp.watch(paths.source.scripts,    ['browserify']);

});
