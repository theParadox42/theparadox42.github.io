var enemies = [];

//Clone Functions
function Enemy(x,y,r,speed,w) {
	enemies.push(this);
	this.x = x;
	this.y = y;
	this.vx = sin(r) * speed;
	this.vy = cos(r) * speed;
	this.w = 0;
	this.h = 0;
	this.goW = ceil(w);
	this.goH = ceil(w);
	this.value = round(w/4);
	this.updateWidth = true;
};
Enemy.prototype.ChangeSize = function(a){
	this.w += a;
	this.h += a;
	this.x -= a / 2;
	this.y -= a / 2;
};
Enemy.prototype.Update = function(){
	this.x += this.vx;
	this.y += this.vy;
	if(this.x+this.w+5<0){
		this.x = width;
	} else if(this.x>width+5){
		this.x = -this.w;
	} if(this.y + this.h+5 < 0){
		this.y = height;
	} else if(this.y>height+5){
		this.y = -this.h;
	}
	if(this.updateWidth){
		this.ChangeSize(1);
		if(this.goW == this.w){
			this.w = this.goW;
			this.h = this.goH;
			this.updateWidth = false;
		}
	} else {
		this.ChangeSize(-0.05);
	}
};
Enemy.prototype.Collide = function(p){
	if(p.x+p.w>this.x&&p.x<this.x+this.w){
		if(p.y+p.h>this.y&&p.y<this.y+this.h){
			p.health--;
		}
	}
};
Enemy.prototype.Display = function(){
	fill(hue, 100, 100, 0.75);
	rect(this.x-this.vx,this.y-this.vy,this.w,this.h);
	fill(hue, 255, 255, 0.75);
	rect(this.x,this.y,this.w,this.h);
};
Enemy.prototype.Run = function(p){
	this.Update();
	this.Collide(p);
	this.Display();
};


//Base functions

Enemy.CreateNew = function(){
	new Enemy(random(width),random(height),random(360),random(0.5,5),random(30,50));
};
Enemy.Create = function(amount){
	for(var i = 0; i < amount; i ++){
		this.CreateNew();
	}
};
Enemy.Run = function(p){
	for(var i = enemies.length-1; i > -1; i --){
		enemies[i].Run(p);
		if(enemies[i].w<=0){
			p.score += enemies[i].value;
			enemies.splice(i, 1);
		}
	}
	if(frameCount%10 == 1){
		this.CreateNew();
		p.score ++;
	}
};











