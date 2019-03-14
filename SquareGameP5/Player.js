
//Player Object/List
var Player = {
	x: 0,
	y: 0,
	w: 25,
	h: 25,
	vx: 0,
	vy: 0,
	maxHealth: 100,
	health: 100,
	maxSpeed: 10,
	score: 0,
	Display: function(){
		fill(0);
		rect(this.x-this.vx,this.y-this.vy,this.w,this.h);
		
		let p = constrain(this.health/this.maxHealth, 0, 1);
		
		fill(hue, -p*255+255, -p*255+255);
		rect(this.x,this.y,this.w,this.h);
		
		//HEALTH BAR
		colorMode(RGB);
		fill(50, 50, 50);
		rect(this.x-2,this.y-10,this.w+4,5,2);
		
		fill(lerpColor(color(200, 0, 0), color(0, 200, 0), p));
		rect(this.x-2,this.y-10, p * (this.w + 4), 5, 2);
		colorMode(HSB);
	},
	Update: function(){
		
		var offX = mouseX-this.x-this.w/2;
		var offY = mouseY-this.y-this.h/2;
		let Mag = mag(offX,offY);
		if(Mag > this.maxSpeed){
			let change = this.maxSpeed/Mag;
			offX *= change;
			offY *= change;
		}
		this.vx*=0.9;
		this.vy*=0.9;
		
		this.vx = (this.vx*3+offX)/4;
		this.vy = (this.vy*3+offY)/4;
		
		this.x+=this.vx;
		this.y+=this.vy;
		
		if(this.health <= 0){
			scene = "game over";
		}
	},
	Run: function(){
		this.Display();
		this.Update();
	},
	Init: function(x,y,w,h,health,maxSpeed){
		this.w = w || this.w;
		this.h = h || this.h;
		this.x = (x || this.x) - this.w/2;
		this.y = (y || this.y) - this.h/2;
		this.maxHealth = health || this.maxHealth;
		this.health = this.maxHealth;
		this.maxSpeed = maxSpeed || this.maxSpeed;
		this.score = 0;
	},
};







