var Controller = Controller || {};

Controller.Gesture = function(o) {

	var element, start, end, move;

	if(o.start) start = o.start;
	if(o.end) end = o.end;
	if(o.move) move = o.move;	

	element = document.createElement('div');
	element.id = "gesture";
	if(o.style) element.style = o.style;

	var s = d = p = {
		x: 0, y: 0
	};

	this.handle = function(e) {
		switch(e.type) {
			case 'touchstart':
				d = { x: 0, y: 0 };
				s = {
					x: e.changedTouches[0].clientX,
					y: e.changedTouches[0].clientY
				};
				start();
				break;
			case 'touchmove':
				d.x = s.x - e.changedTouches[0].clientX;
				d.y = s.y - e.changedTouches[0].clientY;				
				move();
				break;
			case 'touchend': 
				p.x -= d.x;
				p.y -= d.x;
				end();
				break;
		}
	};
	this.position = function() {
		return {
			x: p.x - d.x,
			y: p.x - d.y			
		}
	};
	this.element = function() {
		return element;
	}
};