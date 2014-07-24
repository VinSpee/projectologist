var gulp = require('gulp');

gulp.task('jshint', function(){
	var handleErrors = require('../util/handleErrors');
	var jshint       = require('gulp-jshint');
	var paths        = require('../config/paths');
	var plumber      = require('gulp-plumber');


	return gulp.src(paths.source.scripts)
		.pipe(plumber({
			errorHandler: handleErrors
		}))
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});
