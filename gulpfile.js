var gulp     = require('gulp');
var connect  = require('connect');
var http     = require('http');
var open     = require('open');
var lr       = require('tiny-lr');
var plugins  = require("gulp-load-plugins")();
var server = lr();

var sources = {
	styles    : './app/styles/**/*.sass',
	scripts   : './app/scripts/**/*.coffee',
	images    : './app/images/**',
	html      : './app/*.html',
	templates : './app/templates/**/*.hbs'
};

var dests = {
	styles    : './build/styles/',
	scripts   : './build/scripts/',
	images    : './build/images/',
	html      : './build/',
	templates : './build/templates/'
};

gulp.task('scripts', function() {
	return gulp.src(sources.scripts)
		.pipe(plugins.coffeelint())
		.pipe(plugins.coffeelint.reporter())
		.pipe(plugins.coffee().on('error', plugins.util.log))
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('default'))
		.pipe(gulp.env.production ? plugins.uglify() : plugins.util.noop())
		.pipe(gulp.dest(dests.scripts));
});

gulp.task('styles', function() {
	return gulp.src(sources.styles)
		.pipe(plugins.compass({
			sass: './app/styles/',
			css: './build/styles/',
			image: './images/',
			font: './fonts/',
			require: ['singularitygs']
		}))
		.pipe(plugins.autoprefixer("last 2 version", "> 1%"))
		.pipe(plugins.csslint({
			'compatible-vendor-prefixes': false
		}))
		.pipe(plugins.csslint.reporter())
		.pipe(gulp.env.production ? plugins.csso() : plugins.util.noop())
		.pipe(gulp.dest('build/styles'))
		.pipe(plugins.livereload(server))
		.pipe(plugins.notify({ message: 'Styles task complete' }));
});


gulp.task('html', function() {
	return gulp.src(sources.html)
		.pipe(plugins.htmlhint())
		.pipe(plugins.htmlhint.reporter())
		//.pipe(plugins.usemin)
		.pipe(plugins.htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('build/'));
});

gulp.task('images', function() {
	return gulp.src(sources.images)
		.pipe(plugins.imagemin())
		.pipe(plugins.svgmin)
		.pipe(gulp.dest('build/images'));
});

gulp.task('lr-server', function() {
	server.listen(35729, function(err){
		if(err) return console.log(err);
	});
});

// Rerun the task when a file changes
gulp.task('watch', function () {
	gulp.watch(sources.styles, ['lr-server', 'styles']);
	gulp.watch(sources.scripts, ['lr-server', 'scripts']);
	gulp.watch(sources.images, ['lr-server', 'images']);
	//gulp.watch(sources.templates, ['lr-server', 'templates']);
	gulp.watch(sources.html, ['lr-server', 'html']);
});

gulp.task('server', function(callback) {
	var devApp, devServer, devAddress, devHost, url, log=plugins.util.log, colors=plugins.util.colors;

	devApp = connect()
		.use(connect.logger('dev'))
		.use(connect.static('build'));

	// change port and hostname to something static if you prefer
	devServer = http.createServer(devApp).listen(0 /*, hostname*/);

	devServer.on('error', function(error) {
		log(colors.underline(colors.red('ERROR'))+' Unable to start server!');
		callback(error); // we couldn't start the server, so report it and quit gulp
	});

	devServer.on('listening', function() {
		devAddress = devServer.address();
		devHost = devAddress.address === '0.0.0.0' ? 'localhost' : devAddress.address;
		url = 'http://' + devHost + ':' + devAddress.port + '/index.html';

		log('');
		log('Started dev server at '+colors.magenta(url));
		if(gulp.env.open) {
			log('Opening dev server URL in browser');
			open(url);
		} else {
			log(colors.gray('(Run with --open to automatically open URL on startup)'));
		}
		log('');
		callback(); // we're done with this task for now
	});
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'styles', 'html']);
gulp.task('serve', ['watch', 'server', 'default']);
