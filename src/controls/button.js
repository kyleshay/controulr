var Controller = Controller || {}

Controller.Button = function(o) {

	var element, size, position, start, end, buttons;

	if(o.start) start = o.start;
	if(o.end) end = o.end;
	if(o.buttons) buttons = o.buttons;

	position = o.position || {top: 0, left: 0};
	size = o.size || {width: 1, height: 1};

	element = document.createElement('div');
	element.id = "button" + o.text;
	element.style.borderRadius = "100";
	element.style.boxShadow = "1px 1px 1px #222";
	element.style.textAlign = "center";
	element.style.backgroundColor = o.color || "";
	element.innerText = o.text || 'x';

	this.handle = function(e) {
		switch(e.type) {
			case 'mousedown':
			case 'touchstart':
				e.target.className = 'active';
				start(e);
				break;
			case 'mouseup':
			case 'touchend':
				e.target.className = '';
				end(e);
				break;
		}
	}
	this.element = function() {
		return element;
	}
	this.position = function() {
		return position;		
	}
	this.size = function() {
		return size;		
	}
}