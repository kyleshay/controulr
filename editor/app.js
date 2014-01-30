'use strict';

// Declare app level module
var app = angular.module('createApp', []);

/* Controllers */

function AppCtrl($scope) {
	var ratioW, ratioH;
	var parent = document.getElementById('grid-parent');

	$scope.controls = [];

	$scope.updateGrid = function() {
		if($scope.rowcount > 20) $scope.rowcount = 20;
		if($scope.colcount > 20) $scope.colcount = 20;

		ratioW = Math.floor((window.innerWidth || document.documentElement.offsetWidth) / $scope.colcount),
		ratioH = Math.floor((window.innerHeight || document.documentElement.offsetHeight) / $scope.rowcount);
		
		if(!parent) {
			parent = document.createElement('div');
			parent.id = 'grid-parent';
			parent.className = 'grid';
			parent.style.position = 'absolute';
			parent.style.zIndex = '-100'
			parent.style.top = parent.style.left = 0;
		}
		parent.style.width = (ratioW * $scope.colcount) + 'px';
		parent.style.height = (ratioH * $scope.rowcount) + 'px';
		
		parent.innerHTML = "";		
		for (var r = 0; r < $scope.rowcount; r++) {
		    for (var c = 0; c < $scope.colcount; c++) {
		    	//g[r+','+c] = {top: ratioH * r, left: ratioW * c};
		    	parent.innerHTML += 
		    		"<div style='" +
		    		    "border:1px solid #ccc;" +
    					"border-width:0 1px 1px 0;" +
    					"float:left;" +
		    			"width:" + (ratioW - 1) + "px;" +
		    			"height:" + (ratioH - 1) + "px" +
		    		"'></div>";
		    }
		}
		document.body.appendChild(parent);

		var c;
		for(var i in $scope.controls) {
			c = $scope.controls[i];

			c.style.top = ratioH * c.grid.top;
			c.style.left = ratioW * c.grid.left;
			c.style.width = ratioW;// * c.size.width;
			c.style.height = ratioH;// * c.size.height;
		}
	}

	function handlemove(e) {
		e.preventDefault();

		switch(e.type) {
			case 'dblclick':
				$scope.editButton(e.target);
				break;
			case 'mousedown':
				e.target.drag = true;
				e.target.style.border = '2px solid blue';
				e.target.style.width = ratioW;
				e.target.style.height = ratioH;
				break;
			case 'mousemove':
				if(!e.target.drag) return;
				e.target.style.left = e.x - (ratioW / 2);
				e.target.style.top = e.y - (ratioH / 2);
				break;
			case 'mouseup':
				e.target.drag = false;
				e.target.style.left = Math.round((e.x - (ratioW / 2)) / ratioW) * ratioW;
				e.target.style.top = Math.round((e.y - (ratioH / 2)) / ratioH) * ratioH;
				e.target.grid.top = e.target.style.top.replace('px', '') / ratioH;
				e.target.grid.left = e.target.style.left.replace('px', '') / ratioW;
				console.log(e.target.grid)
				e.target.style.border = '';
				break;
		}
	}

	var buttonToEdit = null;
	$scope.editButton = function(target) {
		buttonToEdit = target;
		$scope.editBox = true;

		$scope.editText = buttonToEdit.innerText;
		$scope.editColor = buttonToEdit.style.backgroundColor;
		$scope.editRound = buttonToEdit.round;
		$scope.editKey = buttonToEdit.key;
		$scope.$apply();
	}

	$scope.saveEdit = function() {
		if($scope.editColor == '') $scope.editColor = '#ddd';
		buttonToEdit.innerText = $scope.editText;
		buttonToEdit.style.backgroundColor = $scope.editColor;
		buttonToEdit.round = $scope.editRound;
		buttonToEdit.key = $scope.editKey;
		buttonToEdit.name = $scope.editText.replace(' ', '_');

		$scope.editText = $scope.editColor = buttonToEdit = null;
		$scope.editBox = false;
	}

	$scope.addButton = function() {
		var button = document.createElement('div');
		button.style.position = 'absolute';
		button.style.zIndex = '100'
		button.style.top = button.style.left = 0;
		button.style.height = ratioH;
		button.style.width = ratioW;
		button.style.backgroundColor = 'red';
		button.round = false;
		button.key = '';
		button.grid = {
			top: 0,
			left: 0
		}
		button.name = $scope.controls.length;

		button.addEventListener('mousedown', handlemove)
		button.addEventListener('mousemove', handlemove)
		button.addEventListener('mouseup', handlemove)
		button.addEventListener('dblclick', handlemove)

		document.body.appendChild(button)
		$scope.controls.push(button);
	}

	// set grid defaults, and print.
	$scope.rowcount = 10;
	$scope.colcount = 15;
	$scope.updateGrid();
	$scope.print = false;
	$scope.editBox = false;
	$scope.editKey = '';
	$scope.editText = '';
	$scope.editColor = '';
	$scope.editRound = false;
}