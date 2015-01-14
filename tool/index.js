var chron = require('chronic');
var concat = require('gulp-concat');

chron('default', chron.once('bundle'));

chron('bundle', chron.once('concat')
	.path('../app/scripts/**/*.js', 'bundle.js')
	.dest('./ex-test.js'),
	require('./bundle.js'));
