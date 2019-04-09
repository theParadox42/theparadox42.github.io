
function Trail(x,y,x1,y1,s,c){
	this.x = x1;
	this.y = y1;
	this.x1 = x;
	this.y1 = y;
	this.s = s;
	this.color = c;
	this.type = "trail";
	this.obstacle = false;
};
Trail.prototype.display = function(){
	push();
	stroke(this.color);
	strokeWeight(this.s);
	line(this.x,this.y,this.x1,this.y1);
	pop();
};