var gulp = require('gulp');

gulp.task('build', function(cb){
	var seq  = require('run-sequence');
	seq(
		'clean',
		['browserify', 'styles', 'views'],
		//'styleguide',
		'ghost',
		cb
	);
});
