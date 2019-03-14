
function home(){
	print(width);
	
	var y = 0;
	
	fill(0);
	textSize(50);
	text("Welcome to the SQUARE GAME",0,50,width,height-50);
	if(width < 535){
		y += 130;
	} else if(width < 935){
		y += 70;
	}
	textSize(20);
	text("You are a square. You absolutely hate colors.\n" + 
			 "You also hate this screen because it is so colorful.\n" + 
			 "Don't let the colors get you!", 
			 max(width/2-600,0), 100+y, min(width/2+600,width)-max(width/2-600,0), 
			 height-y-100);
	if(width < 590){
		y += 55;
	} else if(width < 690){
		y += 30;
	}
	Button("Play",width/2-200,y+180,400,60,function(){
		highscore = max(highscore,Player.score);
		enemies = [];
		Enemy.Create(width/50);
		Player.Init(mouseX, mouseY,20,20,50,15);
		scene = "game";
	});
	
	resetMatrix();
};

function game(){
	Enemy.Run(Player);
	Player.Run();
};

function gameOver(){
	
	fill(0);
	textSize(50);
	text("You Lost",width/2,30);
	textSize(20);
	text("You got of score of "+Player.score+"\nbefore the colors got you!"+
			 (highscore?("\nYour previous highscore is "+highscore):""),width/2,100);
	Button("Try Again", width/2-200,highscore?180:160,400,60,function(){
		scene = "home";
	});
};


