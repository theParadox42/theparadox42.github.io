let keys = {}, keysReleased = {};
let clicked = false, dragged = false;

function keyPressed(){
	keys[keyCode] = true;
	keys[key] = true;
};
function keyReleased(){
	keys[keyCode] = false;
	keys[key] = false;
	keysReleased[keyCode] = true;
	keysReleased[key] = true;
};

function mouseReleased(){
	clicked = true;
	dragged = false;
};
function mousePressed(){
	dragged = true;
};
function mouseOut(){
	dragged = false;
};

function resetInput(){
	clicked = false;
	keysReleased = {};
};