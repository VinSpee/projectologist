var gulp = require('gulp');

gulp.task('browserSync', function() {
	var browserSync = require('browser-sync');
	var paths       = require('../config/paths');

	browserSync.init(
		[
			paths.dest.scripts,
			paths.dest.images,
			paths.dest.scripts,
			paths.dest.app
		], {
		server: {
			baseDir: 'build'
		},
		debugInfo: true,
		open: false,

	});
});
