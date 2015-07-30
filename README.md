Code Standards Sandbox
======================

Tools
-----

* [Editor Config](http://editorconfig.org/) Developer will need to install the appropriate plugin for his/her editor of choice.


## INSTALLATION

```bash
npm i
```

## USE

### to develop
```bash
npm start
```
### to build
```bash
npm run build
```
### to clean
```bash
npm run clean
```

### to change namespace
```js
"package.json": {
	"config": {
		"namespace": "your-namespace"
	}
}
```

## TODO

* hook up `stylelint`
* svg icon compilation
* git commit hook to enforce code style
