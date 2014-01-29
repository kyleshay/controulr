var Controller = Controller || {}

Controller = function(element, o) {
	var controls = [];

	function HandleTouch(e) {
		// if(o.preventdefault)
		e.preventDefault();

		var controller = e.target;
		if(e.target == element) return;

		controls[controller.getAttribute('id')].handle(e);
	};

	function createGrid(row, column) {
		var ratioW = Math.floor((window.innerWidth || document.documentElement.offsetWidth) / column),
		    ratioH = Math.floor((window.innerHeight || document.documentElement.offsetHeight) / row);

		var parent = document.getElementById('grid-parent')
		if(!parent) {
			parent = document.createElement('div');
			parent.id = 'grid-parent';
			parent.className = 'grid';
			parent.style.width = (ratioW * column) + 'px';
			parent.style.height = (ratioH * row) + 'px';
		}
		
		parent.innerHTML = "";		
		for (var r = 0; r < row; r++) {
		    for (var c = 0; c < column; c++) {
		    	//g[r+','+c] = {top: ratioH * r, left: ratioW * c};
		    	parent.innerHTML += 
		    		"<div style='" +
		    			"width:" + (ratioW - 1) + "px;" +
		    			"height:" + (ratioH - 1) + "px" +
		    		"'></div>";
		    }
		}
		document.body.appendChild(parent);
		return {
			w: Math.floor((window.innerWidth || document.documentElement.offsetWidth) / column),
			h: Math.floor((window.innerHeight || document.documentElement.offsetHeight) / row)
		};
	}

	var grid = createGrid(20, 30)
/*
	var supportsOrientationChange = "onorientationchange" in window,
		orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

	window.addEventListener(orientationEvent, function() {
		if(window.orientation || screen.width < 350) grid = createGrid(15,10); 
		else grid = createGrid(15,10);
		//alert('HOLY ROTATING SCREENS BATMAN:' + window.orientation + " " + screen.width);
	}, false);	
	console.log(grid)*/

	/* Attach Listeners */
	if(o.supportmouse) {
		element.addEventListener("mousemove", HandleTouch);
		element.addEventListener("mouseup", HandleTouch);
		element.addEventListener("mousedown", HandleTouch);
	}
	element.addEventListener("touchstart", HandleTouch);
	element.addEventListener("touchmove", HandleTouch);
	element.addEventListener("touchend", HandleTouch);

	this.add = function(control) {
		controls[control.element().getAttribute('id')] = control;

		var c = control.element()
		c.style.position = 'absolute',
		c.style.left = grid.w * control.position().left,
		c.style.top = grid.h * control.position().top,
		c.style.width = grid.w * control.size().width - 1,
		c.style.height = grid.h * control.size().height - 1

		element.appendChild(c);
	}
}