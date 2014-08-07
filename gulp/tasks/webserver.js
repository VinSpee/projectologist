var gulp = require('gulp');

gulp.task('webserver', function() {
	var webserver = require('gulp-webserver');

	gulp.src('./build')
		.pipe(webserver({
			livereload: true,
			port: 1337,
			directoryListing: false
			//open: true
		}));
});
