
new p5();

let difficulty = "easy";
var amountMultiplyer = 1;
var treeAmount;
var transX = 0, transY = 0;
var cameraX, cameraY;
let polarBearImg = {};
let treeImgs = [];
let snowFont = {};

let scores = {
	highscores: {},
	scores: {},
	allTime: {
		insane: 316,
		hard: 625,
		medium: 402,
		easy: 677,
		soeasy: 1001,
	},
};

function setLocalStorage(data){
	for(let i in data){
		localStorage[i] = data[i];
	}
};
function getLocalStorage(){
	if(!(localStorage.soeasy&&localStorage.easy&&localStorage.medium&&localStorage.hard&&localStorage.insane)){
		setLocalStorage({
			soeasy: 0,
			easy: 0,
			medium: 0,
			hard: 0,
			insane: 0,
		});
	}
	return localStorage;
};

function preload(){
	polarBearImg = loadImage('polarbear.png');
	for(var i = 1; i <= 6; i ++){
		treeImgs.push(loadImage('tree'+i+'.png'));
	}
	snowFont = loadFont("SnowtopCaps.otf");
};

function setup() {
	scores["highscores"] = getLocalStorage();

	for(var i in scores["highscores"]){
		let value = scores["highscores"];
		if(value){
			print(value+","+i);
		}
	}


	let canvas = createCanvas(1000,windowHeight-30);
	canvas.parent('game');
	frameRate(40);
	cameraX = width/2;
	cameraY = min(height/3,200);
	angleMode(DEGREES);
	background(50);
	noStroke();
	textFont(snowFont);
};

function setTrans(x,y){
	transX = lerp(transX,x,0.3);
	transY = lerp(transY,y,0.3);
};

function draw() {
	if(frameRate()<10){
		cursor("loading");
		return;
	} else {
		cursor("default");
	}

	fill(237,237,240);
	rect(0,0,width,height);

	switch(scene){
		case "home":
			home();
		break;
		case "game":
			game();
		break;
		case "lose":
			lose();
		break;
	}

	resetInput();
};
