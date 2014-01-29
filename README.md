controulr
=========

fun and simple little framework for creating controls in the browser

all parameters in each object are optional.

to use:
```
  var controller = document.getElementById('controller');
	var mycontrol = new Controller(controller, {supportclick: false});
```

create a multi-touch controller
```
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

create a button example:
```javascript
	/** Setup Button Controller **/
	var buttoncontrolstart = new Controller.Button({
		text: "start",
		color: "#3333cc",
		position: {top: 6, left: 10},
		size: {height: 1, width: 2}
		start: function(e) { /*logic goes here for the 'start' event*/ },
		end: function(e) { /*logic goes here for the 'end' event*/ },
	});
	
	// and add it to the controller
	mycontrol.add(buttoncontrolstart);
```

---

you may optinally generate the controller using the editor, copy the output in to this stub:
```
<html>
<head>
	<title>controller</title>
	<meta name="viewport" content="width=device-width, user-scalable=no">
	<meta name="mobile-web-app-capable" content="yes">

	<script type="text/javascript" src='http://rawgithub.com/kyleshay/controulr/master/controul.min.js'></script>
</head>
<body>
	<div id="controller"></div>
	<script type="text/javascript" >
	  ******* paste code here ******* 
	</script>
</body>
</html>
```

to configure the event handlers for the generated code:
```
var control = new EZController(document.getElementById('controller'), {
    'start_button': {
        start: function () {
            console.log('start_button_start')
        },
        end: function () {
            console.log('start_button_end')
        },
        move: function () {
            console.log('start_button_move')
        },
    },
}, {
    supportmouse: false
});
```
