var Controller = Controller || {};

Controller = function(element, o) {
	var controls = [];

	function HandleTouch(e) {
		// if(o.preventdefault)

		if(e.target == element) return;
		if(e.type.indexOf('key') == -1) {
			e.preventDefault();
			controls[e.target.getAttribute('id')].handle(e);
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
		element.addEventListener("mousemove", HandleTouch);
		element.addEventListener("mouseup", HandleTouch);
		element.addEventListener("mousedown", HandleTouch);
	}
	document.body.addEventListener("keydown", HandleTouch);
	document.body.addEventListener("keyup", HandleTouch);
	element.addEventListener("touchstart", HandleTouch);
	element.addEventListener("touchmove", HandleTouch);
	element.addEventListener("touchend", HandleTouch);

	function updateControl(grid, control, flip) {
		var c = control.element();
		c.style.position = 'absolute';
		c.style.left = grid.w * control.position().left;
		c.style.top = grid.h * control.position().top;
		c.style.width = grid.w * control.size().width - 1;
		c.style.height = grid.h * control.size().height - 1;
		if(flip) {
			c.style.left = grid.w * control.position().top;
			c.style.top = grid.h * control.position().left;
			//c.style.width = grid.w * control.size().height - 1;
			//c.style.height = grid.h * control.size().width - 1;
		}
		return c;
	}

	this.add = function(control) {
		controls[control.element().getAttribute('id')] = control;

		element.appendChild(updateControl(grid, control));
	};
};