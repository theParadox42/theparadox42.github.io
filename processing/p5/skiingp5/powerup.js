 
//Default Power Up
{
function DefaultPowerUp(x,y){
	this.x = x;
	this.y = y;
	this.color = this.color || color(200);
	this.stroke = this.stroke || color(100);
	this.r = 10;
	this.w = this.r * 2;
	this.h = this.w;
	this.collide = true;
	this.type = "powerup";
	this.powerType = this.powerType || "default";
	this.time = this.time || 100;
	this.value = 1;
	this.activeColor = this.activeColor || color(200,128);
	this.collected = false;
};
DefaultPowerUp.prototype.display = function(){
	push();
	strokeWeight(3);
	stroke(this.stroke);
	fill(this.color);
	ellipse(this.x,this.y,this.w,this.h);
	pop();
};
DefaultPowerUp.prototype.run = function(p){
	keepObjOnScreen(this,p);
	this.display();
};
DefaultPowerUp.prototype.onCollision = function(p){
	this.collected = true;
	this.add(p);
};
DefaultPowerUp.prototype.add = function(p){
	p.addPUP({
		time: this.time,
		maxTime: this.time,
		type: this.powerType,
		value: this.value,
		activeColor: this.activeColor,
	});
};
DefaultPowerUp.prototype.setRandom = function(p){
	this.collected = true;
	objs.push(generatePowerUp(this.x,this.y));
};
DefaultPowerUp.create = function(amount,y){
	for(var i = 0; i < amount; i ++){
		objs.push(generatePowerUp(random(width)-width/2,random(height)+(y||300)));
	}
};
}

//Speed Power Up
{
function SpeedPUP(x,y){
	DefaultPowerUp.call(this,x,y);
	this.color = color(240,100,10);
	this.stroke = color(250,10,10);
	this.time = 75;
	this.powerType = "speed";
	this.activeColor = color(250,80,10,128);
	this.value = 2;
};
SpeedPUP.prototype = Object.create(DefaultPowerUp.prototype);
}

//Slow Power Up
{
function SlowPUP(x,y){
	SpeedPUP.call(this,x,y);
	this.color = color(50,50,250);
	this.stroke = color(0,0,150);
	this.time = 125;
	this.powerType = "speed";
	this.activeColor = color(20,50,200,128);
	this.value = 0.4;
};
SlowPUP.prototype = Object.create(SpeedPUP.prototype);
}
	
//Destroy Power Up
{
function DestroyPUP(x,y){
	DefaultPowerUp.call(this,x,y);
	this.color = color(200,10,10);
	this.stroke = color(20);
	this.time = 10;
	this.powerType = "default";
	this.activeColor = color(255,128);
};
DestroyPUP.prototype = Object.create(DefaultPowerUp.prototype);
DestroyPUP.prototype.onCollision = function(p){
	this.collected = true;
	this.add(p);
	for(var i = 0; i < objs.length; i ++){
		let o = objs[i];
		if(o.type!="skier"&&o.type!="trail"){
			o.y+=height*1.3;
			o.x = random(width);
			if(o.setRandom){
				o.setRandom;
			}
		}
	}
};
}
	
//Invincible Power Up
{
function InvinciblePUP(x,y){
	DefaultPowerUp.call(this,x,y);
	this.color = color(10,240,240);
	this.stroke = color(0,150,240);
	this.powerType = "invincible";
	this.time = 200;
	this.value = true;
	this.activeColor = color(5,255,255,128);
};
InvinciblePUP.prototype = Object.create(DefaultPowerUp.prototype);
}

//Coin multiplier
{
function CoinPUP(x,y){
	DefaultPowerUp.call(this,x,y);
	this.color = color(250,250,20);
	this.stroke = color(175, 175, 0);
	this.activeColor = color(255,255,0,128);
	this.powerType = "coin";
	this.time = 50;
	this.value = 0.2;
};
CoinPUP.prototype = Object.create(DefaultPowerUp.prototype);
}

//Shrink Power Up
{
function ShrinkPUP(x,y){
	DefaultPowerUp.call(this,x,y);
	this.color = color(0,230,0);
	this.stroke = color(0,150,0);
	this.activeColor = color(0,255,0,128);
	this.powerType = "shrink";
	this.time = 250;
	this.value = true;
};
ShrinkPUP.prototype = Object.create(DefaultPowerUp.prototype);
}

//Giant Power Up
{
function GiantPUP(x,y){
	DefaultPowerUp.call(this,x,y);
	this.color = color(200,20,200);
	this.stroke = color(120,20,120);
	this.activeColor = color(255,0,255,64);
	this.powerType = "giant";
	this.time = 75;
	this.value = true;
};
GiantPUP.prototype = Object.create(DefaultPowerUp.prototype);
GiantPUP.prototype.onCollision = function(p){
	this.add(p);
	this.powerType = "invincible";
	this.add(p);
	this.collected = true;
};
}

//Generate Power Up
{
var powerUpTypes = [SpeedPUP,SlowPUP,DestroyPUP,InvinciblePUP,CoinPUP,ShrinkPUP,GiantPUP];
function generatePowerUp(x,y){
	let pUpArr = powerUpTypes;
	return new pUpArr[~~random(pUpArr.length)](x,y);
};
}






















