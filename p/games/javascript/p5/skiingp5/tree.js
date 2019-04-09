

function Tree(x, y){
	this.x = x;
	this.y = y;
	this.img = treeImgs[~~random(treeImgs.length)];
	this.w = 50;
	this.tw = this.w*2/5;
	this.h = this.w*this.img.height/this.img.width;
	this.type = "tree";
	this.obstacle = true;
	this.collide = this.obstacle;
	this.r = this.tw/2;
};
Tree.prototype.display = function(){
	push();
	translate(this.x,this.y);
	fill(0, 50);
	ellipse(0,0,this.w*0.9,this.tw);
	imageMode(CENTER);
	image(this.img,0,-this.h/2,this.w,this.h);
	pop();
};
Tree.prototype.draw = function(p){
	this.display();
	keepObjOnScreen(this,p);
};
Tree.create = function(amount,y){
	for(var i = 0; i < amount; i ++){
		objs.push(new Tree(random(-width/2,width/2),random(height)+(y||300)));
	}
};




