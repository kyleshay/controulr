var Controller = Controller || {};

Controller.Gesture = function(o) {

	var element, size, position, end;

	if(o.end) end = o.end;
	
	position = o.position || {top: 0, left: 0};
	size = o.size || {width: 2, height: 2};
	
	element = document.createElement('div');
	element.id = "gesture";
	if(o.style) element.style.cssText = o.style;

	var s = { x: 0, y: 0 };
	var t = Date.now();
	var dir = ''; 
	this.handle = function(e) {
		switch(e.type) {
			case 'mousedown':
			case 'touchstart':
				s = {
					x: e.x || e.changedTouches[0].clientX,
					y: e.y || e.changedTouches[0].clientY
				};
				t = Date.now();
				break;
			case 'mouseup':
			case 'touchend':
				var x = s.x - (e.x || e.changedTouches[0].clientX),
					y = s.y - (e.y || e.changedTouches[0].clientY);
				var dt =  (t - Date.now());
				if(Math.abs(x/dt) > .03 || Math.abs(y/dt) > .03) {
					if(Math.abs(x) >= Math.abs(y)) {
						dir = x > 0 ? "left" : "right";
					} else {
						dir = y > 0 ? "up" : "down";
					}
				}
				end(e, dir);
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