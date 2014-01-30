Controulr.js
=========

## Todo list (very much still in development)
#### Controulr.js todo:
	- support gestures.js
	- support joystick.js
	
#### Editor todo:	
	- support add touchpad.js
	- support resizing elements

## Usage:
All parameters in each object are optional.
```javascript
var controller = document.getElementById('controller');
var mycontrol = new Controller(controller, {row: 10, column: 15, supportmouse: true});
```

#### Create a multi-touch controller example:
```javascript
/** Setup Multi-Touch Controller  **/
var touchcontrol = new Controller.Touchpad({
	style: "color:red;border:1px solid black;",
	position: {top: 2, left: 1},
	size: {width: 3, height: 5},
	start: function() { /*logic goes here for the 'start' event*/ },
	end: function() { /*logic goes here for the 'end' event*/ },
	move: function() { /*logic goes here for the 'move' event*/ }
});

// and add it to the controller
mycontrol.add(touchcontrol);
```

#### Create a button controller example:
```javascript
/** Setup Button Controller **/
var buttoncontrolstart = new Controller.Button({
	text: "start",
	color: "#3333cc",
	round: true,
	key: 'a',
	position: {top: 6, left: 10},
	size: {height: 1, width: 2}
	start: function(e) { /*logic goes here for the 'start' event*/ },
	end: function(e) { /*logic goes here for the 'end' event*/ },
});

// and add it to the controller
mycontrol.add(buttoncontrolstart);
```

Controulr.js [Editor/Generator](http://kyleshay.github.io/controulr/editor/)
========

Using the editor you should also use an emulator (firebug/chrome dev tools) to emulate the controller as other devices.

## Setup
You may optinally generate the controller using the editor, copy the output in to this stub:
```html
<html>
<head>
	<title>controller</title>
	<meta name="viewport" content="width=device-width, user-scalable=no">
	<meta name="mobile-web-app-capable" content="yes">
	<link rel="stylesheet" type="text/css" href="http://rawgithub.com/kyleshay/controulr/master/example/style.css">

	<script type="text/javascript" src='http://rawgithub.com/kyleshay/controulr/master/controulr.min.js'></script>
</head>
<body>
	<div id="controller"></div>
	<script type="text/javascript" >
	  <!--******* paste print.js code here *******-->
	</script>
</body>
</html>
```

## Configuration
To configure the event handlers for the generated code:
```javascript
var control = new EZController(document.getElementById('controller'), {
    'select': {
        start: function () { console.log('select_start') },
        end: function () { console.log('select_end') },
        move: function () { console.log('select_move') },
    },
}, {
	row: 10, column: 15, supportmouse: true
});
```
