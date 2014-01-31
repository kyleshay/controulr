var Controller = Controller || {};

Controller.Joystick = function(o) {
	var element, size, position, move;

	if(o.move) move = o.move;
	
	position = o.position || {top: 0, left: 0};
	size = o.size || {width: 2, height: 2};
	
	element = document.createElement('div');
	element.id = "joystick";
	if(o.style) element.style.cssText = o.style;

	var s = { x: 0, y: 0 };
	var dir = '';
	this.handle = function(e) {
		switch(e.type) {
			case 'mousedown':
			case 'touchstart':
				s = {
					x: e.x || e.changedTouches[0].clientX,
					y: e.y || e.changedTouches[0].clientY
				};
				break;
			case 'mousemove':
			case 'touchmove':
				if(s.x <= 0 && s.y <= 0) return;

				var x = s.x - (e.x || e.changedTouches[0].clientX),
					y = s.y - (e.y || e.changedTouches[0].clientY);

				if(Math.abs(x) >= Math.abs(y)) {
					dir = x > 0 ? "left" : "right";
				} else {
					dir = y > 0 ? "up" : "down";
				}

				//if(element.dir == dir) return;
				//element.dir = dir;
				move(e, dir);
				break;
			case 'mouseup':
			case 'touchend':
				// reset stuff back to neutral postion?
				break;
		}
	};
	this.element = function() {
		return element;
	};
	this.position = function() {
		return position;
	};
	this.size = function() {
		return size;
	}
};