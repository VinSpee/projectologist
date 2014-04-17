var browserSync = require('browser-sync');
var coffeeify   = require('coffeeify');
var env         = require('minimist')(process.argv.slice(2));
var gulp        = require('gulp');
var plugins     = require("gulp-load-plugins")();

var sources = {
	styles       : './app/styles/**/*.sass',
	scripts      : './app/scripts/**/*.coffee',
	main_scripts : './app/scripts/app.coffee',
	images       : './app/images/**',
	html         : './app/*.html',
	templates    : './app/templates/**/*.hbs'
};

var dests = {
	styles    : './build/styles/',
	scripts   : './build/scripts/',
	images    : './build/images/',
	html      : './build/',
	templates : './build/templates/'
};

var handleError = function(err) {
	console.log(err.toString());
	this.emit('end');
};

gulp.task('scripts', function() {
	return gulp.src(sources.main_scripts, {read: false})
		.pipe(plugins.coffeelint())
		.pipe(plugins.coffeelint.reporter())
		.pipe(plugins.browserify({
			transform: ['coffeeify'],
			extensions: ['.coffee'],
			debug: !env.production
		}))
		.pipe(plugins.concat('app.js'))
		.pipe(env.production ? plugins.uglify() : plugins.util.noop())
		.pipe(gulp.dest(dests.scripts));
});

gulp.task('styles', function() {
	return gulp.src(sources.styles)
		.pipe(plugins.rubySass({
			trace: true,
			loadPath: ['bower_components/modular-scale/stylesheets', 'bower_components/singularity/stylesheets','bower_components/sass-toolkit/stylesheets','bower_components/singularity-extras/stylesheets'],
			bundleExec: true
		}))
		.on('error', handleError)
		.pipe(plugins.autoprefixer("last 2 version", "> 1%"))
		//.pipe(plugins.csslint({
		//	'compatible-vendor-prefixes': false
		//}))
		//.pipe(plugins.csslint.reporter())
		.pipe(env.production ? plugins.csso() : plugins.util.noop())
		.pipe(gulp.dest('./build/styles'));
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
		.on('error', handleError)
		.pipe(gulp.dest('build/images'));
});

gulp.task('browser-sync', ['watch'], function() {
	browserSync.init([
		dests.styles + '*.css',
		dests.scripts + '*.js',
		dests.html + '*.html'
	], {
		server: {
			baseDir: './build'
		}
	});
});

// Rerun the task when a file changes
gulp.task('watch', function () {
	gulp.watch(sources.styles, ['styles']);
	gulp.watch(sources.scripts, ['scripts']);
	gulp.watch(sources.images, ['images']);
	//gulp.watch(sources.templates, ['templates']);
	gulp.watch(sources.html, ['html']);
});

gulp.task('clean', function() {
	return gulp.src([dests.scripts, dests.styles, dests.images, dests.html, dests.templates], {read: false})
		.pipe(plugins.clean());
});

// The default task (called when you run `gulp` from cli)
gulp.task('build', ['html', 'styles', 'scripts']);
gulp.task('default', ['build', 'browser-sync']);
