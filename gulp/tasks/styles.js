var gulp = require('gulp');

gulp.task('styles', function() {
	var handleErrors = require('../util/handleErrors');
	var paths        = require('../config/paths');
	var autoprefixer = require('gulp-autoprefixer');
	var cssLint      = require('gulp-csslint');
	var dedupe       = require('rework-deduplicate');
	var ease         = require('rework-plugin-ease');
	var imprt        = require('rework-npm');
	var inherit      = require('rework-inherit');
	var myth         = require('myth');
	var namespace    = require('rework-namespace');
	var plumber      = require('gulp-plumber');
	var rename       = require('gulp-rename');
	var rework       = require('gulp-rework');
	var suit         = require('rework-suit');

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
		.pipe(cssLint({
			'shorthand': false,
			'display-property-grouping': true,
			'duplicate-properties': true,
			'empty-rules': false,
			'known-properties': false,
			'adjoining-classes': true,
			'box-sizing': false,
			'compatible-vendor-prefixes': false,
			'gradients': false,
			'text-indent': true,
			'vendor-prefix': false,
			'fallback-colors': true,
			'star-property-hack': true,
			'underscore-property-hack': true,
			'bulletproof-font-face': false,
			'font-faces': false,
			'import': true,
			'regex-selectors': false,
			'universal-selector': false,
			'unqualified-attributes': false,
			'zero-units': true,
			'overqualified-elements': true,
			'shorthand': false,
			'duplicate-background-images': true,
			'floats': true,
			'font-sizes': true,
			'ids': true,
			'important': false,
			'outline-none': false,
			'qualified-headings': true,
			'unique-headings': false
		}))
		.pipe(cssLint.reporter())
		.pipe(gulp.dest(paths.dest.styles));
});
