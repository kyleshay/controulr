var Controller = Controller || {};

Controller.Touchpad = function(o) {

	var element, size, position, start, end, move;

	if(o.start) start = o.start;
	if(o.end) end = o.end;
	if(o.move) move = o.move;
	
	position = o.position || {top: 0, left: 0};
	size = o.size || {width: 2, height: 2};
	
	element = document.createElement('div');
	element.id = "touchpad";
	if(o.style) element.style.cssText = o.style;

	var s = d = p = { x: 0, y: 0 };
	
	this.handle = function(e) {
		switch(e.type) {
			case 'mousedown':
			case 'touchstart':
				d = { x: 0, y: 0 };
				s = {
					x: e.x || e.changedTouches[0].clientX,
					y: e.y || e.changedTouches[0].clientY
				};
				start();
				break;
			case 'mousemove':
			case 'touchmove':
				d.x = s.x - e.x || e.changedTouches[0].clientX;
				d.y = s.y - e.y || e.changedTouches[0].clientY;				
				move();
				break;
			case 'mouseup':
			case 'touchend': 
				p.x -= d.x;
				p.y -= d.x;
				end();
				break;
		}
	};
	this.touch = function() {
		return {
			x: p.x - d.x,
			y: p.x - d.y			
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