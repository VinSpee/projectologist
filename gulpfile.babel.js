import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import bemLinter from 'postcss-bem-linter';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const CSS_NAMESPACE = require('./package.json').config.namespace;

gulp.task('lint:css', () => {
	return gulp.src(['app/styles/**/*.css', './web_modules/**/*.css'])
	.pipe($.postcss([
		bemLinter('suit', { nameSpace: CSS_NAMESPACE })
	]));
});

gulp.task('styles', ['lint:css'], () => {
	return gulp.src('app/styles/*.css')
	.pipe($.plumber())
	.pipe($.sourcemaps.init())
	.pipe($.cssnext({
		compress: true,
		plugins: [
			require('postcss-font-magician')({
				hosted: './app/fonts'
			})
		],
		sourcemap: true
	}))
	.pipe($.sourcemaps.write())
	.pipe(gulp.dest('.tmp/styles'))
	.pipe(reload({stream: true}));
});

gulp.task('lint:js', () => {
	return gulp.src(['app/scripts/**/*.js'])
	.pipe(reload({stream: true, once: true}))
	.pipe($.eslint())
	.pipe($.eslint.format())
	.pipe($.if(!browserSync.active, $.eslint.failAfterError()));
});

import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import babelify from 'babelify';
gulp.task('scripts', ['lint:js'], () => {
	browserify({
		entries: './app/scripts/main.js',
		debug: true
	})
	.transform(babelify)
	.bundle()
	.pipe(source('app.js'))
	.pipe($.plumber())
	.pipe(buffer())
	.pipe($.sourcemaps.init({ loadMaps: true }))
	.pipe($.sourcemaps.write())
	.pipe(gulp.dest('.tmp/scripts'))
	.pipe(reload({stream: true}));
});

gulp.task('html', ['styles', 'scripts'], () => {
	const assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

	return gulp.src('app/*.html')
	.pipe(assets)
	.pipe($.if('*.js', $.uglify()))
		.pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
	.pipe(assets.restore())
	.pipe($.useref())
	.pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
	.pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
	return gulp.src('app/images/**/*')
	.pipe($.if($.if.isFile, $.cache($.imagemin({
		progressive: true,
		interlaced: true,
		// don't remove IDs from SVGs, they are often used
		// as hooks for embedding and styling
		svgoPlugins: [{cleanupIDs: false}]
	}))
	.on('error', function (err) {
		console.log(err);
		this.end();
	})))
	.pipe(gulp.dest('dist/images'));
});

gulp.task('sprites', () => {
	const config = {
		log: 'verbose',
		shape: {
			transform: [
				{
					svgo: {
						plugins: [
							{ removeDimensions: true },
							{ removeAttrs: { attrs: '(fill|stroke)' } }
						]
					}
				}
			]
		},
		mode: {
			symbol: {
				dest: '.',
				prefix: '.icon-%s',
				sprite: './icons.svg'
			}
		}
	};
	return gulp.src('app/images/icons/*.svg')
	.pipe($.plumber())
	.pipe($.svgSprite(config))
	.pipe(gulp.dest('.tmp/images/'))
	.pipe(gulp.dest('dist/icons'));
});

gulp.task('fonts', () => {
	return gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('.tmp/fonts'))
	.pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
	return gulp.src([
		'app/*.*',
		'!app/*.html'
	], {
		dot: true
	}).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'scripts', 'fonts'], () => {
	browserSync({
		notify: true,
		port: 9000,
		server: {
			baseDir: ['.tmp', 'app']
		}
	});

	gulp.watch([
		'.tmp/*.html',
		'.tmp/images/**/*',
		'.tmp/scripts/**/*.js',
		'.tmp/fonts/**/*'
	]).on('change', reload);

	gulp.watch(['app/scripts/**/*.js', 'web_modules/**/*.js'], ['scripts']);
	gulp.watch(['app/styles/**/*.css', 'web_modules/**/*.css'], ['styles']);
	gulp.watch('app/fonts/**/*', ['fonts']);
});

gulp.task('serve:dist', () => {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['dist']
		}
	});
});

gulp.task('serve:test', () => {
	browserSync({
		notify: false,
		port: 9000,
		ui: false,
		server: {
			baseDir: 'test'
		}
	});

	gulp.watch('test/spec/**/*.js').on('change', reload);
	gulp.watch('test/spec/**/*.js', ['lint:test']);
});

gulp.task('build', ['html', 'images', 'fonts', 'extras'], () => {
	return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
	gulp.start('build');
});
