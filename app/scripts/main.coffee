require.config
	shim: {}
	paths:
		jquery: "../components/jquery/jquery.min"

define (require, module, exports) ->

	app = require "app"

	# use app here
	console.log app

