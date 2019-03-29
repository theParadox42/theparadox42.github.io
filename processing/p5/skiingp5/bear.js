function Bear(x,y,goRight){
	this.x = x;
	this.y = y;
  this.img = polarBearImg;
	this.speed = random(4,6);
	this.setVX = (goRight?1:-1) * this.speed;
	this.vx = 0;
	this.w = 60;
	this.h = this.w*this.img.height/this.img.height;
	this.r = this.w/2;
	this.obstacle = true;
	this.collide = this.obstacle;
	this.type = "bear";

};
Bear.prototype.display = function(){
	push();
	translate(this.x,this.y);
	if(this.setVX>0){
		scale(-1,1);
	}
	fill(0,50);
	ellipse(0,-this.h/20,this.w,this.h/5);
	imageMode(CENTER);
	image(this.img,0,-this.h/2,this.w,this.h);
	pop();
};
Bear.prototype.update = function(p){
	keepObjOnScreen(this,p);
	if(dist(p.x,p.y,this.x,this.y)<width/4){
		this.vx = lerp(this.vx,this.setVX,0.1);
	}
	if(this.vx){
	  this.x += this.vx*this.r/(this.defR||this.r);
		objs.push(new Trail(this.x,this.y-1,this.x-this.vx,this.y-1,
												map(this.vx,0,this.setVX,0,this.h/6), color(255)));
	}
		
};
Bear.prototype.run = function(p){
	this.update(p);
	this.display();
};
Bear.prototype.setRandom = function(){
	this.vx = 0;
	this.setVX = (round(random())==0?-1:1)*this.speed;
};

Bear.create = function(amount,y){
	for(var i = 0; i < amount; i ++){
		objs.push(new Bear(random(width)-width/2,random(height)+(y||300),round(random())==0));
	}
};













