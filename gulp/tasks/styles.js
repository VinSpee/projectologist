var gulp = require('gulp');

gulp.task('styles', function() {
	var rework       = require('gulp-rework');
	var handleErrors = require('../util/handleErrors');
	var rename       = require('gulp-rename');
	var suit         = require('rework-suit');
	var whitespace   = require('gulp-css-whitespace');
	var paths        = require('../config/paths');
	var plumber      = require('gulp-plumber');

	return gulp.src(paths.source.main_style)
		.pipe(plumber(handleErrors))
		.pipe(rework(suit(), {sourcemap: true}))
		.pipe(rename('main.css'))
		.pipe(gulp.dest(paths.dest.styles));
});


