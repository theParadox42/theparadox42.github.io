
new p5();

var sportFont;

function preload(){
	sportFont = loadFont("sportfont.ttf");
	textFont(sportFont);
};
var height = window.height;
var width = window.width;
function setup(){
	var canvas = createCanvas(windowWidth, windowHeight-30);
	canvas.parent('game');
	frameRate(50);
	smooth();
	terrainHeight = height*0.8;
	sandHeight = height-100;
}
setup();

//My variables{


//Terrain stuff{
var transX = 0;//Start translate, changing shouldn't do anything
var transY = 80;

var quality = 4;//The lower the better, the higher the less lag
quality = max(1,quality);//Protects against errors in loops

var gravity = 1;
var traction = 2;
var acceleration = 0.1;
var randomNoiseSeed = random();//It was going to be `randomSeed` or `noiseSeed`, but i guess those are both taken...

var airFriction = 0.99;//1 is no air resistance, 0 is ultimate friction, like the air is pure metal
var groundFriction = 0.94;

var bumpiness = transY/5;
var terrainHeight;

var grassColor = color(34, 168, 34);
var grassWeight = 5;
var terrainColor = color(156, 103, 19);
var terrainColor2 = color(186, 106, 26);
var sandHeight;

var holeD = 700;
var holeX = holeD;
var holePX = 0;
var holeH = 70;
var holeW = 30;
var holeR = 30;

var mountainType = "complex";// simple/complex
//}


//UI Variables{
var keys = {};
var clicked = false;
var pressed = false;
//}


//Gameplay variables{
var score = 0;
var highscore = parseInt(localStorage.highscore, 10) || 0;
var holes = 0;
var highholes = parseInt(localStorage.highholes, 10) || 0;
//}


//Pause variables{
var paused = false;
var saveImg = false;
//}

//}


//Terrain function{
//Feel free to put your own equations in for different terrain, just leave the returnY one alone
var returnDefaultY = function(x,y,a){
	var inHole = (x>=holeX&&x<=holeX+holeW);
	var byHole = (!inHole&&x>holeX-holeR&&x<holeX+holeW+holeR);
	var X = inHole ? holeX:x;
	var y = noise(X/100,randomNoiseSeed)*10*-a+y;


	if(inHole){
		y+=holeH;
	} else if(byHole){
		if(x<holeX){
			y-=holeX-x-holeR;
		} else {
			y-=x-(holeX+holeW)-holeR;
		}
	}

	return min(y,height-2);
};

var returnY = function(x,a){

	var b = a ? a:bumpiness;



	var past = {
		x: floor(x/quality)*quality,
	};
	var present = {
		x: ceil(x/quality)*quality,
	};
	present.y = returnDefaultY(present.x,terrainHeight,b);
	past.y = returnDefaultY(past.x,terrainHeight,b);

	var trueY;
	if(past.x!==present.x){
		trueY = map(x,past.x,present.x,past.y,present.y);
	} else {
		trueY = returnDefaultY(x,terrainHeight,b);
	}

	return {y: trueY, past: past, present: present};
};
//}


//PJS functions{
function keyPressed(){
	keys[keyCode] = true;
	keys[key] = true;
};
var keyReleased = function(){
	keys[keyCode] = false;
	keys[key] = false;
};

var mouseOut = function(){
	paused = true;
};
var mousePressed = function(){
	pressed = true;
};
var mouseReleased = function(){
	clicked = true;
};

//}


//Mountain functions{

var simpleMountain = function(){
	strokeWeight(grassWeight);
	stroke(grassColor);
	fill(terrainColor);
	beginShape();
	vertex(floor(transX/quality)*quality-quality,height);
	for(var x = floor(transX/quality)*quality-quality; x < width+quality+ceil(transX/quality)*quality; x +=quality){
		var y = returnY(x).y;
		vertex(x,y);
	}
	vertex(ceil(transX/quality)*quality+width+quality,height);
	endShape();

};
var complexMountain = function(){
	var r = bumpiness;//Roughness
	var tc = 0;//Terrain Color
	var h = 2;
	noStroke();
	while(r>0){
		switch(tc){
			case 0:
			fill(grassColor);
			break;
			case true:
			fill(terrainColor);
			break;
			case false:
			fill(terrainColor2);
			break;
		}
		beginShape();
		vertex(floor(transX/quality)*quality-quality,height);

		for(var x = floor(transX/quality)*quality-quality; x < width+quality+ceil(transX/quality)*quality; x +=quality){
			var y = returnY(x,r).y;
			vertex(x,y);
		}

		vertex(ceil(transX/quality)*quality+width+quality,height);
		endShape();
		r-=h;
		tc = !tc;
		h = 5;
	}
};
var showMountain = function(){
	switch(mountainType){
		case "simple":
		simpleMountain();
		break;
		case "complex":
		complexMountain();
		break;
		default:
		simpleMountain();
		break;
	}
};
//}


//Golf Ball{
var ball = function(x,size){
	this.x = x;
	this.y = returnY(x).y-size/2;
	this.px = this.x;
	this.py = this.y;

	this.vx = 0;
	this.vy = 0;
	this.vm = 0;

	this.ax = 0.01;
	this.ay = 0;

	this.size = size;

	this.maxSpeed = 20;

	this.stage = "launch";
	this.strikes = 0;

	this.still = 0;
	this.touching = false;

	this.doTrail = true;
	this.trail = [];
};
ball.prototype.getSlope = function(x){

	var noiseThing = returnY(x);
	var past = noiseThing.past;
	var present = noiseThing.present;

	var force = {x:past.x-present.x,y:past.y-present.y};

	var forceMag = sqrt(abs(force.x*force.x+force.y*force.y));

	if(forceMag!==0){
		force.x /= forceMag;
		force.y /= forceMag;
	}

	return force;

};
ball.prototype.collide = function(){
	for(var x =  this.x+this.size/2; x > this.x-this.size/2; x -- ){
		var y = returnY(x).y;
		var s = this.getSlope(x);
		if((dist(this.x,this.y,x,y)<this.size/2)){
			this.ax-=s.y/10*this.vm;
			this.ay-=abs(s.x/10*this.vm);
		}
	}
	this.keepAboveGround();
};
ball.prototype.keepAboveGround = function(){
	for(var x =  this.x+this.size/2; x > this.x-this.size/2; x -- ){
		var y = returnY(x).y;
		var s = this.getSlope(x);
		while((dist(this.x,this.y,x,y)<this.size/2)){
			this.x-=s.y;
			this.y-=abs(s.x);
			if(!s.x){
				this.y--;
			}
			this.vy = min(this.vy,1);
			this.touching = 0;
		}
	}
};
ball.prototype.updateTrail = function(){
	if(round(this.px/5)!==round(this.x/5)&&frameCount%1===0){
		this.trail.push({s:this.size,x:this.x,y:this.y});
	}
	for(var i = 0; i < this.trail.length; i ++){
		this.trail[i].s-=2;
		if(this.trail[i].s<=0){
			this.trail.splice(i,1);
		}
	}
};
ball.prototype.update = function(){
	if(this.doTrail){
		this.updateTrail();
	}

	this.vx+=this.ax;
	this.vy+=this.ay;
	this.ax = 0;
	this.ay = 0;

	this.vy+=gravity/10;

	this.vx*=airFriction;
	this.vy*=airFriction;

	if(this.vx!==0&&this.vy!==0){
		this.vm = sqrt(this.vx*this.vx+this.vy*this.vy);
	} else if(this.vx===0){
		this.vm = this.vy;
	} else {
		this.vm = this.vx;
	}

	if(this.vm>this.maxSpeed){
		this.vx = this.vx/this.vm*this.maxSpeed;
		this.vy = this.vy/this.vm*this.maxSpeed;
	}

	this.px = this.x;
	this.py = this.y;
	this.x+=this.vx;
	this.y+=this.vy;

	if(floor(this.vm/10)===0&&this.touching<3&&this.stage!=="launch"){
		this.still++;
	} else {
		this.still = 0;
	}

	this.touching++;
	this.collide();

	if(this.y>height+this.size){
		this.y = 0;
		this.vy = 0;
		this.vx = 0;
	}

	if(this.x>holeX&&this.y > returnY(holeX).y-this.size-1&&this.x<holeX+holeW){
		this.y = returnY(holeX).y-holeH-this.size/2;
		score += 4-this.strikes;
		holes ++;
		holeX+=holeD;
		this.strikes = 0;
	}
	if(this.still>20){
		if(this.strikes>=3&&this.still>50){
			randomNoiseSeed = random();
			holeX = holeD;
			this.reset(0);
			score = 0;
			holes = 0;
		} else if(this.strikes<3) {
			this.stage = "launch";
			this.still = 0;
		}
	}
};
ball.prototype.displayTrail = function(){
	noStroke();
	fill(255,255,255,100);
	for(var i = 0; i < this.trail.length; i ++){
		var t = this.trail[i];
		ellipse(t.x,t.y,t.s,t.s);
	}
};
ball.prototype.display = function(){
	if(this.doTrail){
		this.displayTrail();
	}

	fill(255);
	strokeWeight(1);
	stroke(0);
	ellipse(this.x,this.y,this.size,this.size);

};
ball.prototype.launch = function(mx,my){
	this.strikes++;

	var dx = (this.x-mx)/20;
	var dy = (this.y-my)/20;

	var s = sqrt(dx*dx+dy*dy);
	dx = dx/s*min(s,this.maxSpeed/2);
	dy = dy/s*min(s,this.maxSpeed/2);

	this.ax-=dx;
	this.ay-=dy;

	this.stage = "fly";

};
ball.prototype.reset = function(x){
	this.x = x;
	this.y = returnY(x).y-this.size/2 || 0;

	this.vx = 0;
	this.vy = 0;
	this.vm = 0;

	this.ax = 0.1;
	this.ay = 0;

	this.stage = "fly";
	this.strikes = 0;

};
var golfBall = new ball(0,20);
//}


//Other functions{
var settup = function(){

	push();
	rotate(0);
	translate(-transX,transY);

	background(196, 242, 235);


};

var update = function(){
	transX -= (transX-(golfBall.x-500))/10;
	golfBall.update();

	if(golfBall.stage==="launch"){
		if(pressed){
			if(clicked&&golfBall.strikes<3){
				var mx = mouseX+transX;
				var my = mouseY-transY;
				golfBall.launch(mx,my);
			}
		}
	}

	highscore = max(highscore, score);
	localStorage.highscore = highscore;
	highholes = max(highholes, holes);
	localStorage.highholes = highholes;
};

var displayFlag = function(){
	stroke(0, 0, 0);
	strokeWeight(1);
	fill(255, 255, 255);
	var pw = 5;//pole width
	var ph = holeH*3;//pole height
	var y = returnY(holeX).y-ph;
	var x = holeX+holeW/2-pw/2;
	rect(x,y,pw,ph*2);
	fill(255, 0, 0);
	stroke(133, 34, 34);

	var fh = 30;
	var fw = sqrt(3)/2*fh;
	triangle(x,y,x-fw,y+fh/2,x,y+fh);
};
var displayPath = function(){
	var mx = mouseX+transX;
	var my = mouseY-transY;
	var x = golfBall.x;
	var y = golfBall.y;
	noStroke();
	fill(255, 255, 255,150);
	var d = 15;
	var w = 10;
	while(x<mx){
		var dx = mx-x;
		var dy = my-y;
		var s = sqrt(dx*dx+dy*dy);
		if(dx===0){
			s = dy;
		} else if(dy===0){
			s = dx;
		}
		dx = dx/s*d;
		dy = dy/s*d;
		ellipse(x,y,w,w);
		x+=abs(dx);
		y+=dy;
	}
	while(x>mx){
		var dx = mx-x;
		var dy = my-y;
		var s = sqrt(dx*dx+dy*dy);
		if(dx===0){
			s = dy;
		} else if(dy===0){
			s = dx;
		}
		dx = dx/s*d;
		dy = dy/s*d;
		ellipse(x,y,w,w);
		x-=abs(dx);
		y+=dy;

	}
};
var display = function(){


	displayFlag();
	showMountain(terrainHeight);

	if(pressed&&golfBall.stage==="launch"){
		displayPath();
	}

	golfBall.display();


};

var reset = function(){
	if(clicked){
		pressed = false;
		clicked = false;
	}
};

var displayStrikes = function(){
	for(var i = 0; i < 3; i ++){
		noStroke();
		fill(255,255,255,128);
		if(golfBall.strikes>=i+1){
			fill(255, 255, 255);
		}
		push();
		translate(0,height);
		var s = 50;
		var d = 20;
		var c = 4/5;
		ellipse(i*s+s*c,-s*c,d,d);

		pop();
	}
};
var displayFrameRate = function(){
	fill(0,0,0,150);
	textSize(20);
	textAlign(LEFT,TOP);
	text(round(frameRate())+"/50",10,10);
};
var displayScore = function(){
	textAlign(CENTER,TOP);
	fill(0,0,0,200);
	textSize(50);
	text("Score: "+score+"\nHoles: "+holes,width/2,2);

	textAlign(RIGHT,TOP);
	textSize(20);
	text("Highscore: "+highscore+"\nBest holes: "+highholes, width-2, 2);
};
var displayCursor = function(){

	stroke(0, 0, 0);
	fill(255, 255, 255);

	push();
	translate(mouseX,mouseY);

	var mx = mouseX+transX;
	var my = mouseY-transY;

	var gx = golfBall.x;
	var gy = golfBall.y;
	var s = (my-gy)/(mx-gx);

	var r = atan(s)+PI/2;

	rotate((mx<gx) ? r+TWO_PI: r+PI);


	triangle(-5,0,5,0,0,20);

	pop();

};
var displayStats = function(){
	displayStrikes();
	displayFrameRate();
	displayScore();
	displayCursor();
};



//}


var game = function(){
	settup();

	update();

	display();

	pop();

	displayStats();

};
var pausedScreen = function(){
	cursor(HAND);
	if(!saveImg){
		noStroke();
		fill(0,0,0,100);
		rect(0,0,width,height);

		fill(255,255,255,200);
		var w = 60;
		var d = 30;
		var h = 60;
		rect(width/2-d/2-w,h,w,height-h*2,5);
		rect(width/2+d/2,h,w,height-h*2,5);

		saveImg = get();
	} else {
		image(saveImg,0,0);
	}

	if(clicked){
		saveImg = false;
		paused = false;
		clicked = false;
	}
};


var draw = function() {
	cursor("none");

	if(paused){
		pausedScreen();
	} else {
		game();
	}

	reset();
};













/*

create table SQL khan_academy_projects FROM khanacademy.org

SELECT * FROM khan_academy_projects WHERE awesome_level > Infinity;

//Returns Golf Galore... xD

*/
