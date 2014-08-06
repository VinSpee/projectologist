var gulp         = require('gulp');

gulp.task('styleguide', function() {
	var styledocco   = require('gulp-styledocco');
	var handleErrors = require('../util/handleErrors');
	var paths        = require('../config/paths');
	var plumber      = require('gulp-plumber');

	var myth         = require('myth');
	var rework       = require('gulp-rework');
	var dedupe       = require('rework-deduplicate');
	var vars         = require('rework-vars');
	var inherit      = require('rework-inherit');
	var namespace    = require('rework-namespace');
	var ease         = require('rework-plugin-ease');
	var imprt        = require('rework-npm');
	var autoprefixer = require('gulp-autoprefixer');

	return gulp.src(paths.source.styles)
		.pipe(plumber(handleErrors))
		.pipe(styledocco({
			out: 'build/styleguide',
			name: 'Styleguide',
			preprocessor: 'node_modules/'
				rework(
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
			include: [paths.dest.styles + 'main.css']
		}));
});
