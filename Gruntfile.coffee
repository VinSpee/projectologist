# Generated on 2013-06-27 using generator-webapp 0.1.5
"use strict"
lrSnippet = require("grunt-contrib-livereload/lib/utils").livereloadSnippet
mountFolder = (connect, dir) ->
	connect.static require("path").resolve(dir)


# # Globbing
# for performance reasons we're only matching one level down:
# 'test/spec/{,*/}*.js'
# use this if you want to match all subfolders:
# 'test/spec/**/*.js'
module.exports = (grunt) ->

	# load all grunt tasks
	require("matchdep").filterDev("grunt-*").forEach grunt.loadNpmTasks
	grunt.loadNpmTasks "grunt-symlink"

	# configurable paths
	yeomanConfig =
		app: "app"
		dist: "dist"

	grunt.initConfig
		yeoman: yeomanConfig
		watch:
			coffee:
				files: ["<%= yeoman.app %>/scripts/**/*.coffee"]
				tasks: ["coffee:dist"]

			coffeeTest:
				files: ["test/spec/{,*/}*.coffee"]
				tasks: ["coffee:test"]

			compass:
				files: ["<%= yeoman.app %>/styles/**/*.{scss,sass}"]
				tasks: ["compass"]

			stylus:
				files: ["<%= yeoman.app %>/styles/**/*.styl"]
				tasks: ["stylus"]

			livereload:
				files: ["<%= yeoman.app %>/*.html", "{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css", "{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js", "<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,webp,svg}"]
				tasks: ["livereload"]

		connect:
			options:
				port: 9000

				# change this to '0.0.0.0' to access the server from outside
				hostname: "localhost"

			livereload:
				options:
					middleware: (connect) ->
						[lrSnippet, mountFolder(connect, ".tmp"), mountFolder(connect, "app")]

			test:
				options:
					middleware: (connect) ->
						[mountFolder(connect, ".tmp"), mountFolder(connect, "test")]

			dist:
				options:
					middleware: (connect) ->
						[mountFolder(connect, "dist")]

		open:
			server:
				path: "http://localhost:<%= connect.options.port %>"

		clean:
			dist: [".tmp", "<%= yeoman.dist %>/*"]
			server: ".tmp"

		jshint:
			options:
				jshintrc: ".jshintrc"

			all: ["Gruntfile.js", "<%= yeoman.app %>/scripts/{,*/}*.js", "!<%= yeoman.app %>/scripts/vendor/*", "test/spec/{,*/}*.js"]

		mocha:
			all:
				options:
					run: true
					urls: ["http://localhost:<%= connect.options.port %>/index.html"]

		coffee:
			dist:
				files: [

					# rather than compiling multiple files here you should
					# require them into your main .coffee file
					expand: true
					cwd: "<%= yeoman.app %>/scripts"
					src: "*.coffee"
					dest: ".tmp/scripts"
					ext: ".js"
				]

			test:
				files: [
					expand: true
					cwd: ".tmp/spec"
					src: "*.coffee"
					dest: "test/spec"
				]

		stylus:
			compile:
				options:
					paths: ["node_modules/grunt-contrib-stylus/node_modules"]
					use: [require("axis-css")] # use stylus plugin at compile time
					"include css": false
					compress: false

				files:
					".tmp/styles/main.css": "<%= yeoman.app %>/styles/main.styl"

		compass:
			options:
				require: ["modular-scale", "singularitygs", "color-schemer", "toolkit"]
				sassDir: "<%= yeoman.app %>/styles"
				cssDir: ".tmp/styles"
				imagesDir: "<%= yeoman.app %>/images"
				javascriptsDir: "<%= yeoman.app %>/scripts"
				fontsDir: "<%= yeoman.app %>/styles/fonts"
				importPath: "app/components"
				httpImagesPath: "/images"
				httpGeneratedImagesPath: "/images/generated"
				httpFontsPath: "/styles/fonts"
				relativeAssets: false

			dist: {}
			server:
				options:
					debugInfo: true


		requirejs:
			dist:
				options:
					# `name` and `out` is set by grunt-usemin
					baseUrl: ".tmp/scripts"
					optimize: "none"
					preserveLicenseComments: false
					useStrict: true
					wrap: true

		useminPrepare:
			html: "<%= yeoman.app %>/index.html"
			options:
				dest: "<%= yeoman.dist %>"

		usemin:
			html: ["<%= yeoman.dist %>/{,*/}*.html"]
			css: ["<%= yeoman.dist %>/styles/{,*/}*.css"]
			options:
				dirs: ["<%= yeoman.dist %>"]

		imagemin:
			dist:
				files: [
					expand: true
					cwd: "<%= yeoman.app %>/images"
					src: "{,*/}*.{png,jpg,jpeg}"
					dest: "<%= yeoman.dist %>/images"
				]

		svgmin:
			dist:
				files: [
					expand: true
					cwd: "<%= yeoman.app %>/images"
					src: "{,*/}*.svg"
					dest: "<%= yeoman.dist %>/images"
				]

		cssmin:
			dist:
				files:
					"<%= yeoman.dist %>/styles/main.css": [".tmp/styles/{,*/}*.css", "<%= yeoman.app %>/styles/{,*/}*.css"]

		htmlmin:
			dist:
				options: {}
				files: [
					expand: true
					cwd: "<%= yeoman.app %>"
					src: "*.html"
					dest: "<%= yeoman.dist %>"
				]

		copy:
			js:
				files: [
					expand: true
					dot: true
					cwd: "<%= yeoman.app %>/scripts"
					dest: ".tmp/scripts"
					src: ["{,*/}*.js"]
				]

			dist:
				files: [
					expand: true
					dot: true
					cwd: "<%= yeoman.app %>"
					dest: "<%= yeoman.dist %>"
					src: ["*.{ico,png,txt}", ".htaccess", "images/{,*/}*.{webp,gif}", "styles/fonts/*"]
				]

		symlink:
			js:
				dest: ".tmp/components"
				relativeSrc: "../app/components"
				options:
					type: "dir"

		bower:
			all:
				rjsConfig: "<%= yeoman.app %>/scripts/main.js"

	grunt.renameTask "regarde", "watch"
	grunt.registerTask "server", (target) ->
		#if target is dist then grunt.task.run(["build", "open", "connect:dist:keepalive"])
		grunt.task.run ["clean:server", "coffee:dist", "stylus", "livereload-start", "connect:livereload", "open", "watch"]

	grunt.registerTask "test", ["clean:server", "coffee", "compass", "connect:test", "mocha"]
	grunt.registerTask "build", ["clean:dist", "coffee", "compass:dist", "useminPrepare", "copy:js", "symlink:js", "requirejs", "imagemin", "svgmin", "htmlmin", "concat", "cssmin", "uglify", "copy:dist", "usemin"]
	grunt.registerTask "default", ["jshint", "test", "build"]
