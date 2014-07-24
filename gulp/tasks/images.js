var gulp				 = require('gulp');

gulp.task('images', function() {
	var changed      = require('gulp-changed');
	var handleErrors = require('../util/handleErrors');
	var paths        = require('../config/paths');
	var size         = require('gulp-size');
	var plumber      = require('gulp-plumber');

	var dest = paths.dest.images;

	return gulp.src(paths.source.images)
		.pipe(plumber({
			errorHandler: handleErrors
		}))
		.pipe(changed(dest)) // Ignore unchanged files
		.on('error', handleErrors(false))
		.pipe(gulp.dest(dest));
});


