var scene = "home";

function startGame(){
	scene = "game";
	difficulty = difficulty || "easy";
	amountMultiplyer = difficulty=="soeasy"?
		0.5:(difficulty=="medium"?
		1.5:(difficulty=="hard"?
		2:(difficulty=="insane"?3:1)));
	treeAmount = (width*height)/50000*amountMultiplyer;
	createObjects();
};
function home(){
	let sinFrame = sin(frameCount*5)*20+20;
	let shadeOfBlue = color(0,0,sinFrame);
	let lightShadeOfBlue = color(215,215,255-sinFrame);
	push();
	textAlign(CENTER,TOP);
	textSize(150);
	fill(shadeOfBlue);
	text("SKI GAME",width/2,50);
	pop();
	push();
	fill(lightShadeOfBlue);
	stroke(0);
	strokeWeight(3);
	textSize(40);
	
	button(width/2-130,230,240,50,"So Easy",shadeOfBlue,function(){
		difficulty = "soeasy";
		startGame();
	});
	button(width/2+130,230,240,50,"Easy",shadeOfBlue,function(){
		difficulty = "easy";
		startGame();
	});
	button(width/2-130,300,240,50,"Medium",shadeOfBlue,function(){
		difficulty = "medium";
		startGame();
	});
	button(width/2+130,300,240,50,"Hard",shadeOfBlue,function(){
		difficulty = "hard";
		startGame();
	});
	button(width/2,370,250,50,"Insane",shadeOfBlue,function(){
		difficulty = "insane";
		startGame();
	});
	pop();
};

function game(){
	
	push();
	translate(cameraX, cameraY);
	translate(transX,transY);
	runObjects();
	pop();
	
	push();
	fill(0);
	textSize(50,100);
	textAlign(LEFT,TOP);
	text(scores["scores"][difficulty],10,10);
	pop();
	
};

function lose(){
	fill(0,0,50);
	push();
	textAlign(CENTER,TOP);
	textSize(150);
	text("You lost",width/2,25);
	textSize(40);
	text("You got a score of " + scores["scores"][difficulty] + 
			 "\nYour highscore for "+difficulty+" is "+scores["highscores"][difficulty]+"\nThe all time highscore for " + 
			 difficulty+" is "+scores["allTime"][difficulty],width/2,175);
	strokeWeight(5);
	stroke(0,0,50);
	fill(230,230,255);
	button(width/2,350,550,50,"Try Again",color(0,0,50),function(){
		scene = "home";
	});
	pop();
};





