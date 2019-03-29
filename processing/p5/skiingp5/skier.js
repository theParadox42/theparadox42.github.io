
	
function Skier(x,y,c){
	this.x = x;
	this.y = y;
	this.color = c;
	this.rot = 0;
	this.pr = this.r;
	this.vx = 0;
	this.vy = 0;
	this.speed = 0;
	this.type = "skier";
	this.w = 20;
	this.l = this.w*2;
	this.h = this.w*1.7;
	this.r = this.w/2;
	this.default = {
		w: this.w,
		h: this.h,
		l: this.l,
		r: this.r
	};
	this.score = 0;
	this.scoreEvery = 30;
	this.scoreY = this.scoreEvery;
	this.pups = {};
};
Skier.prototype.input = function(){
	var r = this.rot;
	if(dragged){
		r += constrain((mouseX-pmouseX)*abs(mouseX-pmouseX)/10,-20,20);
	} else if(keys[32]){
		r = map(mouseX,width/8,width*7/8,-90,90);
	}
	if(keys[39]||keys.d){
		r -= 5;
	} 
	if(keys[37]||keys.a){
		r += 5;
	}
	this.rot = lerp(this.rot,r,0.7);
	this.rot = constrain(this.rot,-80,80);
};
Skier.prototype.update = function(){
	
	//Rotation stuff
	let cosR = cos(this.rot);
	let speedIncrease = cosR;
	let vx = sin(this.rot)*speedIncrease;
	let vy = cosR*speedIncrease*1.2;
	
	//Move stuff
	this.vx*=0.9;
	this.vy*=0.9;
	let speedUp = this.getVal("speed",1);
	this.vx+=vx*speedUp;
	this.vy+=vy*speedUp;
	this.speed = mag(this.vx,this.vy);
	this.x+=this.vx;
	this.y+=this.vy;
	
	while(this.y>this.scoreY){
		this.scoreY+=this.scoreEvery*this.getVal("coin",1);
		this.score++;
	}
	scores["scores"][difficulty] = this.score;
	
	//Trail stuff
	objs.push(
		new Trail(this.x,this.y-1,
							this.x-this.vx,this.y-this.vy-1,
							min(map(this.speed,0,2.5,this.w/2,this.w),this.w),color(255))
	);
	
	if(this.getVal("giant",false)){
		for(var i in this.default){
			this[i] = this.default[i] * 2;
		}
	} else if(this.default.r!=this.r){
		for(var i in this.default){
			this[i] = this.default[i];
		}
	}
	
};
Skier.prototype.runPUPs = function(){
	for(var key in this.pups){
		let pup = this.pups[key];
		
		pup.time --;
		if(pup.time <= 0){
			delete this.pups[key];
		} else {
			push();
			fill(pup.activeColor);
			noStroke();
			arc(this.x,this.y,this.h*1.5,this.h*1.5,0,pup.time/pup.maxTime*360);
			pop();
		}
	}
};
Skier.prototype.display = function(){
	push();
	rectMode(CENTER);
	fill(this.color);
	translate(this.x,this.y);
	rotate(-this.rot);
	rect(-this.w*1.5/5,0,this.w*2/5,this.l, 7);
	rect(this.w*1.5/5, 0,this.w*2/5,this.l, 7);
	pop();
};
Skier.prototype.run = function(){
	this.input();
	this.update();
	this.runPUPs();
	this.display();
};
Skier.prototype.getVal = function(key,def){
	let dval = def;
	if(def==undefined){
		dval = 1;
	}
	return this.pups[key]?this.pups[key].value||dval:dval;
};
Skier.prototype.collide = function(arr){
	for(var i = 0; i < arr.length; i ++){
		let obj = arr[i];
		if(this.getVal("shrink",false)){
			if(!obj.defR){
				obj.defR = obj.r;
				obj.r /= 2;
				obj.w /= 2;
				obj.h /= 2;
			}
		} else if(obj.defR){
			if(obj.defR!=obj.r){
				obj.r = obj.defR;
				obj.w *= 2;
				obj.h *= 2;
				obj.defR = void 0;
			} 
		}
		if(this.checkCollide(obj)){
			if(obj.obstacle){
				if(this.getVal("invincible",false)){
					obj.remove = true;
				} else {
					scores["highscores"][difficulty] = max(this.score,(scores["highscores"][difficulty]||0));
					scene = "lose";
				}
			} else if(obj.onCollision){
				obj.onCollision(this);
			}
		}
	}
};
Skier.prototype.checkCollide = function(obj){
	let distance = dist(this.x,this.y,obj.x,obj.y);
	let collisionMin = this.r+obj.r;
	if(distance<=collisionMin){
		return true;
	}
};
Skier.prototype.addPUP = function(pup){
	this.pups[pup.type] = pup;
};
Skier.prototype.copy = function(){
	let copy = new Skier(this.x,this.y,this.color);
	copy.r = this.r;
	//copy.pr = this.pr;
	copy.vx = this.vx;
	copy.vy = this.vy;
	copy.speed = this.speed;
	copy.type = this.type;
	return copy;
};

var skier = new Skier(0,0,color(0,50,100));








