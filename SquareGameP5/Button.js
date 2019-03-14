function Button(t,x,y,w,h,func){
	fill(255,0.3);
	strokeWeight(3);
	stroke(0);
	rect(x,y,w,h,10);
	
	fill(0);
	noStroke();
	textAlign(CENTER,CENTER);
	textSize(40);
	text(t,x,y,w,h);
	
	if(mouseX>x&&mouseX<x+w&&mouseY>y&&mouseY<y+h){
		cursor(HAND);
		if(clicked){
			func();
		}
	}
};