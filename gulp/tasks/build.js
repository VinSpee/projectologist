var gulp = require('gulp');

gulp.task('build', function(cb){
	var seq  = require('run-sequence');
	seq(
		'clean',
		['images', 'icon-font', 'browserify', 'styles', 'views'],
		'watch',
		cb
	);
});
