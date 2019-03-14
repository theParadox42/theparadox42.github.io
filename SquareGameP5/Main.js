

let width, height, font, hue = 300, scene = "home", clicked = false, highscore;

function mouseReleased(){
	clicked = true;
};

function setup() {
	width = windowWidth;
	height = windowHeight;
	createCanvas(width,height);
	mouseX = width / 2;
	mouseY = height / 2;
	colorMode(HSB, 360, 255, 255, 1);
	angleMode(DEGREES);
	font = loadFont("coolfont.ttf");
	textFont(font);
	
	Enemy.Create(width/50);
	Player.Init(mouseX, mouseY,20,20,50,15);
	
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










