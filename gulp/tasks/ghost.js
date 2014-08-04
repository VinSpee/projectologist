var gulp = require('gulp');

gulp.task('ghost', function() {
	var exec = require('gulp-exec');
	gulp.src('')
		.pipe(exec( 'cd ../../../; npm start' ));
});
