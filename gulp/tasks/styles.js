var gulp = require('gulp');

gulp.task('styles', function() {
	var handleErrors = require('../util/handleErrors');
	var paths        = require('../config/paths');
	var plumber      = require('gulp-plumber');
	var rename       = require('gulp-rename');
	var rework       = require('gulp-rework');
	var dedupe       = require('rework-deduplicate');
	var inherit      = require('rework-inherit');
	var namespace    = require('rework-namespace');
	var ease         = require('rework-plugin-ease');
	var myth         = require('myth');
	var suit         = require('rework-suit');
	var imprt        = require('rework-npm');
	var autoprefixer = require('gulp-autoprefixer');

	var ns = '';
	return gulp.src(paths.source.main_style)
		.pipe(plumber(handleErrors))
		.pipe(rework(
			suit({
				path: [
					'./app/styles',
					'node_modules',
				]
			}),
			inherit(),
			myth(),
			ease(),
			dedupe(),
			namespace(ns),
			{sourcemap: true}))
		.pipe(gulp.dest(paths.dest.styles));
});
