var gulp = require('gulp');

gulp.task('styles', function() {
	var handleErrors = require('../util/handleErrors');
	var livereload   = require('gulp-livereload');
	var lr           = require('tiny-lr');
	var server       = lr();
	var myth         = require('myth');
	var paths        = require('../config/paths');
	var plumber      = require('gulp-plumber');
	var rename       = require('gulp-rename');
	var rework       = require('gulp-rework');
	var dedupe       = require('rework-deduplicate');
	var vars         = require('rework-vars');
	var inherit      = require('rework-inherit');
	var namespace    = require('rework-namespace');
	var ease         = require('rework-plugin-ease');
	var myth         = require('myth');
	var imprt        = require('rework-npm');
	var autoprefixer = require('gulp-autoprefixer');

	var ns = '';
	return gulp.src(paths.source.main_style)
		.pipe(plumber(handleErrors))
		.pipe(rework(
			imprt({
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
		.pipe(gulp.dest(paths.dest.styles))
		.pipe(livereload(server));
});
