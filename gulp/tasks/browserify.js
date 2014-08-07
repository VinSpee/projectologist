/* browserify task
	 ---------------
	 Bundle javascripty things with browserify!
*/

var gulp = require('gulp');

gulp.task('browserify',function(){
	var browserify   = require('gulp-browserify');
	var debowerify   = require('debowerify');
	var handleErrors = require('../util/handleErrors');
	var paths        = require('../config/paths');
	var rename       = require('gulp-rename');
	var size         = require('gulp-size');
	var plumber      = require('gulp-plumber');

	return gulp.src(paths.source.main_script, {read: false})
		.pipe(plumber(handleErrors))
		.pipe(browserify({
			transform: ['debowerify'],
			debug: true,
			extensions: ['.js']
		}))
		.pipe(rename('app.js'))
		.pipe(size())
		.pipe(gulp.dest(paths.dest.scripts));
});
