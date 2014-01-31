var Controller = Controller || {};

Controller = function(element, o) {
	var controls = [];

	function HandleTouch(e) {
		if(!Controller.mousedown && e.target == document.body) return;
		if(e.type.indexOf('key') == -1) {
			e.preventDefault();

			// handle mouse stuff
			switch(e.type) {
				case 'mousedown':
					Controller.mousedown = e.target;
					break;
				case 'mouseup':
					e.targ = Controller.mousedown;
					Controller.mousedown = null;
					break;
			}

			var c = e.targ && e.targ.getAttribute('id') || e.target.getAttribute('id');
			if(c) controls[c].handle(e);
		} else {
			for(var i in controls) {
				if(controls[i].element().keyBind == e.keyCode) {
					e.type = 'mouse' + e.type.substring(3);
					e.keytarget = controls[i].element();
					controls[i].handle(e);
					break;
				}
			};
		}
	};

	function createGrid(row, column) {
		var ratioW = Math.floor((window.innerWidth || document.documentElement.offsetWidth) / column),
		    ratioH = Math.floor((window.innerHeight || document.documentElement.offsetHeight) / row);

		var parent = document.getElementById('grid-parent')
		if(!parent) {
			parent = document.createElement('div');
			parent.id = 'grid-parent';
			parent.className = 'grid';
		}
		parent.style.height = (ratioH * row) + 'px';
		parent.style.width = (ratioW * column) + 'px';
		
		parent.innerHTML = "";		
		for (var r = 0; r < row; r++) {
		    for (var c = 0; c < column; c++) {
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
	};

	var grid = createGrid(o.row || 15, o.column || 10);

	var supportsOrientationChange = "onorientationchange" in window,
		orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

	window.addEventListener(orientationEvent, function() {
		if(window.orientation || window.innerWidth < 350) grid = createGrid(o.column || 15, o.row || 10);
		else grid = createGrid(o.row || 15, o.column || 10);

		for(var c in controls) {
			updateControl(grid, controls[c], window.innerWidth < 350);
		}
	}, false);	

	/* Attach Listeners */
	if(o.supportmouse) {
		document.body.addEventListener("mousemove", HandleTouch);
		document.body.addEventListener("mouseup", HandleTouch);
		document.body.addEventListener("mousedown", HandleTouch);
	}
	document.body.addEventListener("keydown", HandleTouch);
	document.body.addEventListener("keyup", HandleTouch);
	document.body.addEventListener("touchstart", HandleTouch);
	document.body.addEventListener("touchmove", HandleTouch);
	document.body.addEventListener("touchend", HandleTouch);

	function updateControl(grid, control, flip) {
		var c = control.element();
		c.style.position = 'absolute';
		c.style.left = grid.w * control.position().left;
		c.style.top = grid.h * control.position().top;
		c.style.width = grid.w * control.size().width - 3;
		c.style.height = grid.h * control.size().height - 3;
		c.style.lineHeight = (grid.h - 3) + 'px';
		c.style.fontSize = Math.min(grid.h/2, grid.w/2) + 'px';
		if(flip) {
			c.style.left = grid.w * control.position().top;
			c.style.top = grid.h * control.position().left;
		}
		return c;
	}

	this.add = function(control) {
		controls[control.element().getAttribute('id')] = control;

		element.appendChild(updateControl(grid, control));
	};
};