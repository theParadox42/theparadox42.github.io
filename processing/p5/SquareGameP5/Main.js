

let width, height, font, hue = 300, scene = "home", clicked = false, highscore;

function mouseReleased(){
	clicked = true;
};

function preload(){
	font = loadFont("coolfont.ttf");
}

function setup() {
	width = windowWidth;
	height = windowHeight - 30;
	createCanvas(width,height);
	mouseX = width / 2;
	mouseY = height / 2;
	colorMode(HSB, 360, 255, 255, 1);
	angleMode(DEGREES);
	if(!font){
		font = loadFont("coolfont.ttf");
	} else {
		textFont(font);
	}

	if(!highscore){
		highscore = 0;
	}
}

function draw() {


	noStroke();
	cursor('default');
	textAlign(CENTER,TOP);
	hue = map(sin(frameCount),-1,1,200,400) % 360;

	//For trails
	fill(hue, 20, 255,0.2);
	rect(0,0,width,height);

	switch(scene){
		case "home":
			home();
		break;
		case "game":
			game();
		break;
		case "game over":
			gameOver();
		break;
	}

	clicked = false;
}
