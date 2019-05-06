new p5();

function preload() {
	textFont(loadFont("pixelfont.ttf"));
};

function setup() {
	createCanvas(windowWidth, windowHeight).parent('game');
	smooth();
	width = 400;
	height = 400;
}
setup();


var PVector = p5.Vector;
//Mess with these variables{

//Your Name/Username. Something like "Paradox Programming" or "theParadox42"
var name = "You got";

var blockColor = color(60, 219, 222);
var playerColor = color(255, 132, 0);

//How fast to acc/decc
var sensitivity = 1.5;

//Fixed or stay
var view = "fixed"; //I personally like "fixed", but my sisters like "stay"

//Other view stuff
var down = 50; //Feel free to mess around!
var adjustY = -down + 0; //Same!

//Starting hardness
var distBetweenBlocks = 60; //Start distance
var timer = 0; //Start timer
var speed = -1; //Start speed

//}

/*********************************
      MAIN PROGRAM BELOW
*********************************/

//{


//Settup alignments and other variables{
//I didn't have time to create a full block letter text function, so you'll have to live with my few block letters
// textFont(createFont("Impact"));
angleMode = "radians";
smooth(); //I and others need this
noStroke();

var scene = "home";

var paused = false; //Paused

//My key stuff
{
	var keys = []; //array of keys pressed

	keyPressed = function() {
		keys[keyCode] = true; //activate key
	};

	keyReleased = function() {
		keys[keyCode] = false; //deactivate key
		if (scene === "game") {
			if (keyCode === 80) {
				if (paused) {
					paused = false;
				} else {
					paused = true;
				}
			}
		}
	};
}

//My Mouse stuff
{
	var clicked = false;
	mouseReleased = function() {
		clicked = true;
	};
}
//}

//Other variables{

var score = 0;
var highscore = highscore || 0;
var orig = [distBetweenBlocks, speed];
var reset = function(other) {
	scene = "lose";
	distBetweenBlocks = orig[0];
	speed = orig[1];
	other.reset();
	if (score > highscore) {
		highscore = score + 1;
	}
};
//}

var Z = function(p, z) {
	if (z > 0) {
		return p / z * 200;
	} else {
		return p;
	}
}; //Adjusting Function for Zs

var P = {
	x: 0,
	y: 0,
	z: 80,
	vx: 0,
	vy: 0,
	vz: 0,
	w: 10,
	h: 30,
	d: 5,
	fuel: 100,
	grounded: false,
	run: function(other) {
		this.updateKeyMovement();
		if (!paused) {
			this.update(other);
		}
		this.displayPlayer();
		this.grounded = false;
	},
	refill: function() {
		if (this.fuel < 100) {
			this.fuel += 3;
		}
		if (this.fuel < 80) {
			this.fuel += 3;
		}
		if (this.fuel < 60) {
			this.fuel += 3;
		}
		if (this.fuel < 40) {
			this.fuel += 3;
		}
		if (this.fuel < 20) {
			this.fuel += 3;
		}
	},
	update: function(other) {
		if (this.grounded) {
			this.refill();
		} else {
			this.vy -= 0.2;
		}
		this.vz = constrain(this.vz, -sensitivity / 3, sensitivity / 3);
		this.z += this.vz;
		this.z = constrain(this.z, 60, 100);
		this.vx = constrain(this.vx, -sensitivity, sensitivity);
		this.x += this.vx;
		this.vy = constrain(this.vy, -20, 5);
		this.y += this.vy;
		this.fuel = constrain(this.fuel, 0, 100);
		if (this.y < -400) {
			this.reset(other);
		}
	},
	updateKeyMovement: function() {
		var moved = false;
		var depthed = false;
		if (keys[RIGHT_ARROW] || keys[68]) {
			this.vx += sensitivity / 10;
			moved = true;
		}
		if (keys[LEFT_ARROW] || keys[65]) {
			this.vx -= sensitivity / 10;
			moved = true;
		}

		if (keys[UP_ARROW] || keys[87]) {
			this.vz += sensitivity / 30;
			depthed = true;
		}
		if (keys[DOWN_ARROW] || keys[83]) {
			this.vz -= sensitivity / 30;
			depthed = true;
		}

		if (keys[32] && this.fuel > 0) {
			this.fuel -= 2;
			this.vy += 0.5;
		}

		if (!moved) {
			this.vx *= 0.9;
		}
		if (!depthed) {
			this.vz *= 0.9;
		}
	},
	displayFuel: function() {
		fill(0, 0, 0);
		quad(10, 90, 60, 110, 60, 310, 10, 290);
		fill(lerpColor(color(200, 100, 100), color(100, 220, 100), this.fuel / 100));
		quad(12, -constrain(this.fuel, 2, 100) * 1.99 + 294, 58, -constrain(this.fuel, 2, 100) * 2 + 312, 58, 307, 12, 288);
	},
	displayPlayer: function() {

		if (this.y > this.h / 2 - 5) {

			fill(0, 0, 0, 200);

			this.drawQ(-this.w / 2, this.y, this.z, this.w / 2, this.y, this.z, this.w / 2, this.y, this.z + this.d, -this.w / 2, this.y, this.z + this.d);
		}

		fill(lerpColor(playerColor, color(0), 0.6));

		this.drawQ(-this.w / 10, this.h / 4, this.z + this.d, -this.w / 10, this.h / 4, this.z, -this.w / 10, this.h / 2, this.z, -this.w / 10, this.h / 2, this.z + this.d);

		this.drawQ(this.w / 2, this.h / 4, this.z, this.w / 2, -this.h / 4, this.z, this.w / 2, -this.h / 4, this.z + this.d, this.w / 2, this.h / 4, this.z + this.d);

		fill(playerColor);

		this.drawQ(-this.w / 4, -this.h / 2, this.z, -this.w / 4, -this.h / 3.5, this.z, -this.w / 4, -this.h / 3.5, this.z + this.d, -this.w / 4, -this.h / 2, this.z + this.d);


		this.drawQ(-this.w / 2, this.h / 4, this.z, -this.w / 2, -this.h / 4, this.z, -this.w / 2, -this.h / 4, this.z + this.d, -this.w / 2, this.h / 4, this.z + this.d);

		this.drawQ(this.w / 10, this.h / 4, this.z + this.d, this.w / 10, this.h / 4, this.z, this.w / 10, this.h / 2, this.z, this.w / 10, this.h / 2, this.z + this.d);

		this.drawQ(-this.w / 2, -this.h / 4, this.z, this.w / 2, -this.h / 4, this.z, this.w / 2, -this.h / 4, this.z + this.d, -this.w / 2, -this.h / 4, this.z + this.d);

		this.drawQ(-this.w / 2.2, this.h / 2, this.z, -this.w / 2.2, this.h / 4, this.z, -this.w / 2.2, this.h / 4, this.z + this.d, -this.w / 2.2, this.h / 2, this.z + this.d);

		fill(lerpColor(playerColor, color(0), 0.6));

		this.drawQ(this.w / 4, -this.h / 2, this.z, this.w / 4, -this.h / 3.5, this.z, this.w / 4, -this.h / 3.5, this.z + this.d, this.w / 4, -this.h / 2, this.z + this.d);

		this.drawQ(this.w / 2.2, this.h / 2, this.z, this.w / 2.2, this.h / 4, this.z, this.w / 2.2, this.h / 4, this.z + this.d, this.w / 2.2, this.h / 2, this.z + this.d);

		fill(playerColor);

		this.drawQ(-this.w / 4, -this.h / 2, this.z, this.w / 4, -this.h / 2, this.z, this.w / 4, -this.h / 2, this.z + this.d, -this.w / 4, -this.h / 2, this.z + this.d);

		fill(lerpColor(playerColor, color(0), 0.4));

		this.drawQ(-this.w / 2.2, this.h / 4, this.z, -this.w / 10, this.h / 4, this.z, -this.w / 10, this.h / 2, this.z, -this.w / 2.2, this.h / 2, this.z);

		this.drawQ(this.w / 2.2, this.h / 4, this.z, this.w / 10, this.h / 4, this.z, this.w / 10, this.h / 2, this.z, this.w / 2.2, this.h / 2, this.z);

		this.drawQ(-this.w / 4, -this.h / 2, this.z, this.w / 4, -this.h / 2, this.z, this.w / 4, -this.h / 3.5, this.z, -this.w / 4, -this.h / 3.5, this.z);

		this.drawQ(-this.w / 2, -this.h / 4, this.z, this.w / 2, -this.h / 4, this.z, this.w / 2, this.h / 4, this.z, -this.w / 2, this.h / 4, this.z);

	},
	drawQ: function(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4) {
		if (view === "fixed") {
			quad(Z(x1, z1), Z(y1 + down, z1), Z(x2, z2), Z(y2 + down, z2), Z(x3, z3), Z(y3 + down, z3), Z(x4, z4), Z(y4 + down, z4));
		} else {
			var x = this.x;
			quad(Z(x1 + x, z1), Z(y1 + down, z1), Z(x2 + x, z2), Z(y2 + down, z2), Z(x3 + x, z3), Z(y3 + down, z3), Z(x4 + x, z4), Z(y4 + down, z4));
		}
	},
	reset: function(other) {
		this.z = 80;
		this.y = 0;
		this.x = 0;
		this.vx = 0;
		this.vy = 0;
		this.fuel = 100;
		reset(other);
	}
}; //Player object

//Block functions{

var block = function(pos, type) {
	this.pos = pos.copy();
	this.type = type;
	this.w = 20;
	this.d = 40;
	this.h = 5;
};

block.prototype.update = function() {
	this.pos.z += speed;
};

block.prototype.display = function() {
	var tx = this.pos.x;
	if (view === "fixed") {
		tx = this.pos.x - P.x;
	}
	var ty = this.pos.y + P.y + down;
	var z = this.pos.z;

	var leftColor, rightColor, topColor, frontColor;
	if (z < 500) {
		leftColor = lerpColor(blockColor, color(255), 0.2);
		rightColor = lerpColor(blockColor, color(0), 0.4);
		topColor = blockColor;
		frontColor = lerpColor(blockColor, color(0), 0.2);
	} else {
		leftColor = lerpColor(lerpColor(blockColor, color(255), 0.2), color(0), (z - 500) / 500);
		rightColor = lerpColor(lerpColor(blockColor, color(0), 0.4), color(0), (z - 500) / 500);
		topColor = lerpColor(blockColor, color(0), (z - 500) / 500);
		frontColor = lerpColor(lerpColor(blockColor, color(0), 0.2), color(0), (z - 500) / 500);
	}

	if (tx > 0) {

		fill(leftColor);

		quad(Z(tx, z), Z(ty, z), Z(tx, z + this.d), Z(ty, z + this.d), Z(tx, z + this.d), Z(ty + this.h, z + this.d), Z(tx, z), Z(ty + this.h, z));

	} else {

		fill(rightColor);

		quad(Z(tx + this.w, z), Z(ty, z), Z(tx + this.w, z + this.d), Z(ty, z + this.d), Z(tx + this.w, z + this.d), Z(ty + this.h, z + this.d), Z(tx + this.w, z), Z(ty + this.h, z));

	}

	fill(topColor);

	quad(Z(tx, z), Z(ty, z), Z(tx + this.w, z), Z(ty, z), Z(tx + this.w, z + this.d), Z(ty, z + this.d), Z(tx, z + this.d), Z(ty, z + this.d)); //Top Quad

	fill(frontColor);

	quad(Z(tx, z), Z(ty, z), Z(tx + this.w, z), Z(ty, z), Z(tx + this.w, z), Z(ty + this.h, z), Z(tx, z), Z(ty + this.h, z)); //Front Quad


};

block.prototype.collide = function() {
	var tx = this.pos.x + P.x;
	var ty = this.pos.y + P.y;
	var z = this.pos.z;

	if (P.x + P.w / 2 > this.pos.x && P.x - P.w / 2 < this.pos.x + this.w && P.y + P.h / 2 > this.pos.y && P.y - P.h / 2 < this.pos.y + this.h && P.z + P.d > z && P.z < z + this.d) {
		P.grounded = true;
		P.y = constrain(P.y, this.pos.y + P.h / 2, 500);
		P.vy = constrain(P.vy, -1, 50);
	}
};

block.prototype.run = function() {
	if (!paused) {
		this.update();
	}
	this.collide();
	if (this.pos.z > 0) {
		this.display();
	}
};

var objects = []; //array of objects

var resetO = {
	reset: function() {
		objects = [];
		for (var i = 1000; i > 200; i -= distBetweenBlocks) {
			objects.push(new block(new PVector(random(-80, 60), 0, i)));
		}
		for (var x = -16; x < -5; x += 10) {
			for (var z = 10; z < 200; z++) {
				objects.push(new block(new PVector(x, 0, z)));
			}
		}

	}
};
resetO.reset();

//}

//Scene Background{
var coolBackground = function() {
	rectMode(CENTER);
	for (var i = width * 4; i > 0; i -= 20) {
		fill(i / (width * 2) * 255);
		if (view === "fixed") {
			rect(Z(-P.x, 1000 - i), Z(P.y, 1000 - i), Z(1, 1000 - i) * i * 4, Z(1, 1000 - i) * i * 4);
		} else {
			rect(Z(0, 1000 - i), Z(P.y, 1000 - i), Z(1, 1000 - i) * i * 4, Z(1, 1000 - i) * i * 4);
		}
	} //Cool square background
};

var demo = [];
for (var i = 1000; i > 0; i -= 60) {
	demo[i] = new block(createVector(random(-80, 80), 60, i));
}
var demoBackground = function() {
	push();
	translate(width / 2, height / 2);
	coolBackground();
	if (frameCount % 50 === 0) {
		demo.push(new block(createVector(random(-80, 80), 60, 1000)));
	}
	for (var i in demo) {
		if (demo[i].pos.z <= 2) {
			demo.splice(0, i);
		} else {
			demo[i].update();
			demo[i].display();
		}
	}

	pop();

};
//}

//Scenes{
var game = function() {
	background(255); //You SHOULD know what this means...

	//Translates to middle
	push();
	translate(width / 2, height / 2 + adjustY);

	coolBackground();

	if (keys[82]) {
		keys = [];
	} //Resets Key

	if (!paused) {
		//Adds new Block
		if (timer >= distBetweenBlocks / abs(speed)) {
			objects.push(new block(new PVector(random(-80, 60), 0, 1000)));
			timer = 0;
		} else {
			timer++;
		}

		//Increases distance
		if (frameCount % 85) {
			speed -= 0.005;
			distBetweenBlocks += 0.5;
			speed = constrain(speed, -8, 0);
			distBetweenBlocks = constrain(distBetweenBlocks, 0, 40 * abs(speed));
		}
	}

	objects.sort(function(a, b) {
		return a.pos.z - b.pos.z;
	}); //Sorts blocks

	for (var i = objects.length - 1; i > -1; i--) {
		objects[i].run();
		if (objects[i] instanceof block) {
			if (objects[i].pos.z <= 0) {
				objects.splice(0, i);
			}
		} else {
			P = objects[i];
		}
	} //Draws blocks

	P.run(resetO);

	pop(); //Reverts Matrix

	P.displayFuel();

	if (paused) {
		rectMode(CORNER);
		fill(0, 0, 0, 100);
		rect(0, 0, width, height);
		fill(255, 255, 255, 200);
		rect(width / 2 - 50, height / 2 - 60, 40, 120);
		rect(width / 2 + 10, height / 2 - 60, 40, 120);
		cursor(HAND);
		if (clicked) {
			paused = false;
		}
	}

	if (!paused) {
		score++;
	}

	textSize(15);
	textAlign(LEFT, TOP);
	text("Score: " + score, 10, 10);
};

var lose = function() {
	demoBackground();

	fill(255, 255, 255, 200);
	textSize(40);
	textAlign(CENTER, TOP);
	text("You lost, with a score of " + score + "\nHighscore is " + highscore, 10, 0, width, height);

	textSize(35);
	text("Play Again?", width / 2, height / 2 + 20);

	text("Score Page?", width / 2, height / 2 + 80);

	if (mouseX > width / 2 - textWidth("Play Again?") / 2 && mouseX < width / 2 + textWidth("Play Again?") / 2 && mouseY > height / 2 + 20 && mouseY < height / 2 + 60) {
		cursor(HAND);
		if (clicked) {
			scene = "home";
			score = 0;
		}
	}

	if (mouseX > width / 2 - textWidth("Score Page?") / 2 && mouseX < width / 2 + textWidth("Score Page?") / 2 && mouseY > height / 2 + 80 && mouseY < height / 2 + 120) {
		cursor(HAND);
		if (clicked) {
			scene = "scores";
			score = 0;
		}
	}
};

var how = function() {
	demoBackground();

	rectMode(CORNER);

	fill(255, 255, 255, 200);
	push();
	translate(width / 2, 70);
	scale(1.5);
	translate(-width / 2 - 20, -height + 70);
	rect(160, 300, 10, 60);
	rect(180, 300, 10, 60);
	rect(170, 320, 10, 10);
	rect(200, 300, 10, 60);
	rect(220, 300, 10, 60);
	rect(210, 300, 10, 10);
	rect(210, 350, 10, 10);
	rect(240, 300, 10, 50);
	rect(260, 300, 10, 50);
	rect(280, 300, 10, 50);
	rect(250, 350, 10, 10);
	rect(270, 350, 10, 10);
	pop();

	textSize(19);
	textAlign(LEFT, TOP);

	text(" » Use Arrows/WASD to move side to side and forward and backwards.\n » Use space to fly upwards.\n » You have a limited amount of fuel so be sure to make it to another block before it runs out!\n » Land on blocks to recharge on fuel\n » Try to stay alive as long as you can.\n » Press 'P' to Pause/Resume\n » If you start going in a weird direction, press 'R'\n » Have fun! :P", 20, 130, width - 40, height - 100);

	textAlign(RIGHT, BOTTOM);
	text("Back  ==>", width - 10, height - 10);

	if (mouseX > 300 && mouseY > 360) {
		cursor(HAND);
		if (clicked) {
			scene = "home";
		}
	}
};

var scores = [
	[highscore, name],
	[1191, "Paradox Programming"],
	[1034, "Flying Scribble"],
	[1471, "CompoundMaster"],
	[1022, "bryler.castle"],
	[1262, "appleapple22"],
	[1073, "RedEagl3"],
	[332, "Beans!?!?!"],
	[1687, "AquA217"],
	[540, "My Sister"],
	[464, "Orange Programer"],
	[744, "STORMBREAKER9"],
	[804, 'Fari$$'],
	[828, "snoozingnewt"],
	[856, "Christopher Tanner"],
	[402, "BlackLemon"],
	[1081, "Droidsb"],
	[899, "AnimStudioz #Tree"]
];

var scorePage = function() {
	scores[0][0] = highscore;

	var sorted = [];
	for (var i in scores) {
		sorted[i] = scores[i];
	}

	sorted.sort(function(a, b) {
		return b[0] - a[0];
	});

	demoBackground();

	textSize(80);
	fill(255, 255, 255, 200);
	textAlign(CENTER, TOP);
	text("SCORES!", width / 2, 20);

	var txtSize = 200 / sorted.length;
	textSize(txtSize);
	for (var i in sorted) {
		push();
		translate(width / 2, i * (txtSize * (3 / 2)) + 102);

		var rank = i - 1;
		rank += 2;

		text(rank + ": " + sorted[i][1] + " " + sorted[i][0] + " points!", 0, 0);

		pop();
	}

	textAlign(RIGHT, BOTTOM);
	text("==> HOME", width - 10, height - 10);

	if (mouseX > width - textWidth("==> HOME") && mouseY > height - 40) {
		cursor(HAND);
		if (clicked) {
			scene = "home";
		}
	}
};

var home = function() {
	demoBackground();

	fill(255, 255, 255, 200);
	//Play {


	push();

	translate(+30, +10);

	beginShape(); //P
	vertex(100, 200);
	vertex(130, 200);
	vertex(130, 230);
	vertex(110, 230);

	vertex(110, 220);
	vertex(120, 220);
	vertex(120, 210);
	vertex(110, 210);

	vertex(110, 260);
	vertex(100, 260);

	endShape();

	beginShape(); //L

	vertex(140, 200);
	vertex(150, 200);
	vertex(150, 250);

	vertex(160, 250);
	vertex(160, 260);
	vertex(140, 260);

	endShape();

	beginShape(); //A

	vertex(170, 200);
	vertex(200, 200);
	vertex(200, 230);
	vertex(180, 230);
	vertex(180, 220);
	vertex(190, 220);
	vertex(190, 210);
	vertex(180, 210);
	vertex(180, 260);
	vertex(170, 260);
	vertex(170, 200);
	vertex(180, 230);
	vertex(200, 230);
	vertex(200, 260);
	vertex(190, 260);
	vertex(190, 230);
	vertex(180, 230);

	endShape();

	rectMode(CORNER); //Y
	rect(210, 200, 10, 30);
	rect(230, 200, 10, 30);
	rect(220, 220, 10, 40);

	pop();



	if (mouseX > 130 && mouseX < 270 && mouseY > 210 && mouseY < 270) {
		cursor(HAND);
		if (clicked) {
			scene = "game";
		}
	}
	//}

	textSize(50);
	textAlign(CENTER);
	push();
	translate(width / 2, 140);
	scale(1, 3);
	text("Blockit Runner", 0, 0);
	pop();



	push();
	translate(-20, -10);
	rect(160, 300, 10, 60);
	rect(180, 300, 10, 60);
	rect(170, 320, 10, 10);
	rect(200, 300, 10, 60);
	rect(220, 300, 10, 60);
	rect(210, 300, 10, 10);
	rect(210, 350, 10, 10);
	rect(240, 300, 10, 50);
	rect(260, 300, 10, 50);
	rect(280, 300, 10, 50);
	rect(250, 350, 10, 10);
	rect(270, 350, 10, 10);
	pop();


	if (mouseX > 140 && mouseX < 260 && mouseY > 290 && mouseY < 360) {
		cursor(HAND);
		if (clicked) {
			scene = "how";
		}
	}
};
//}

draw = function() {
	cursor("default");

	push();

	translate(windowWidth / 2 - width / 2, windowHeight / 2 - height / 2);

	mouseX = pmouseX - windowWidth / 2 + width / 2;
	mouseY = pmouseY - windowHeight / 2 + height / 2;

	switch (scene) {
		case "home":
			home();
			break;
		case "game":
			game();
			break;
		case "lose":
			lose();
			break;
		case "how":
			how();
			break;
		case "scores":
			scorePage();
			break;
	}

	pop();

	clicked = false;
};

//}

//728 lines in like 3.5 days!
