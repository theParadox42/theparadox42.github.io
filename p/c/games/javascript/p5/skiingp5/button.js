
function button(x,y,w,h,txt,txtColor,func){
	push();
	rectMode(CENTER);
	rect(x,y,w,h);
	push();
	textAlign(CENTER,CENTER);
	noStroke();
	fill(txtColor);
	text(txt,x,y);
	pop();
	if(mouseX>x-w/2&&mouseX<x+w/2&&mouseY>y-h/2&&mouseY<y+h/2){
		cursor(HAND);
		if(clicked){
			clicked = false;
			func();
		}
	}
	pop();
};