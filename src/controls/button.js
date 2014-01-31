var Controller = Controller || {};

Controller.Button = function(o) {

	var element, size, position, start, end, buttons;

	if(o.start) start = o.start;
	if(o.end) end = o.end;
	if(o.buttons) buttons = o.buttons;

	position = o.position || {top: 0, left: 0};
	size = o.size || {width: 1, height: 1};

	element = document.createElement('div');
	element.id = "button" + o.text;
	element.className = "button";
	element.style.borderRadius = o.round ? "100px" : "";
	element.style.backgroundColor = o.color || "";
	element.innerText = o.text || 'x';
	element.keyBind = (o.key || 'a').toUpperCase().charCodeAt(0);

	this.handle = function(e) {
		var target = e.targ || e.keytarget || e.target;
		switch(e.type) {
			case 'mousedown':
			case 'keydown':
			case 'touchstart':
				if(target.className.indexOf('active') == -1) 
					target.className += ' active';
				start(e);
				break;
			case 'mouseup':
			case 'keyup':
			case 'touchend':
				target.className = target.className.replace(' active', '');
				end(e);
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