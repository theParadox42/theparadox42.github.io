
function home(){
	fill(0);
	textSize(width/30);
	text("Welcome the the SQUARE GAME",width/2,50);
	textSize(width/80);
	text("You are a square. You absolutely hate colors.\n" + 
			 "You also hate this screen because it is so colorful.\n" + 
			 "Don't let the colors get you!", 200, 100, width-400, height);
	
	Button("Play",width/2-200,180,400,60,function(){
		highscore = max(highscore,Player.score);
		enemies = [];
		Enemy.Create(width/50);
		Player.Init(mouseX, mouseY,20,20,50,15);
		scene = "game";
	});
};

function game(){
	Enemy.Run(Player);
	Player.Run();
};

function gameOver(){
	
	fill(0);
	textSize(width/20);
	text("You Lost",width/2,30);
	textSize(20);
	text("You got of score of "+Player.score+"\nbefore the colors got you!"+
			 (highscore?("\nYour previous highscore is "+highscore):""),width/2,100);
	Button("Try Again", width/2-200,highscore?180:160,400,60,function(){
		scene = "home";
	});
};


