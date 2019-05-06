
/**
 * WOW, the TOP??? With only 37 Votes? :O

    SINGLE PLAYER
 * Use WASD or ARROWS to move

    MULTIPLAYER
 * Player 1 (LEFT) use WASD to move
 * Player 2 (RIGHT) use ARROWS to move
 * Score is on the same side you are

    GENERAL
 * You can press 'r' to reset the score at any time during gameplay
 * Win by 2 to win

    FUN FACTS
 * No one has beaten the insane AI so tell me if you do!
 * I posted this before I finished this and then I had to finish it like crazy fast xD
 * Have fun
*/
var pauseImage;
function setup(){
	var canvas = createCanvas(windowWidth, windowHeight-30);
	canvas.parent('game');
	colorMode(HSB, 255, 255, 255, 255);
	pauseImage = get();
	angleMode(DEGREES);
}
setup();
//Variables{
var scene = "menu";
var cameraMode = "fixed";
var particleAmount = 100;
var playerMode = "single";//single || double
var speedMultiplyer = 2;
var ballGraphics = "high";
var player, player2;
//}

//Setup{
//colorMode(HSB);
//}

//Input{

//Keys{
var keys = {};
keyPressed = function(){
    keys[key] = true;
    keys[keyCode] = true;
};
keyReleased = function(){
    delete keys[key];
    delete keys[keyCode];
};
//}

//Mouse{

var pressed = false;
var clicked = false;

mousePressed = function(){
    pressed = true;
};
mouseReleased = function(){
    clicked = true;
};

//}

//}

//Pixelated stuff{
var charLib = {
    "a": 0,
    "b": 1,
    "c": 2,
    "d": 3,
    "e": 4,
    "f": 5,
    "g": 6,
    "h": 7,
    "i": 8,
    "j": 9,
    "k": 10,
    "l": 11,
    "m": 12,
    "n": 13,
    "o": 14,
    "p": 15,
    "q": 16,
    "r": 17,
    "s": 18,
    "t": 19,
    "u": 20,
    "v": 21,
    "w": 22,
    "x": 23,
    "y": 24,
    "z": 25,
    1: 26,
    2: 27,
    3: 28,
    4: 29,
    5: 30,
    6: 31,
    7: 32,
    8: 33,
    9: 34,
    0: 35,
    "!": 36,
    "(": 37,
    ")": 38,
    "&": 39,
    " ": 40,
    ":": 41,
};
var characters = [
    [0, 1, 1, 0,
     1, 0, 0, 1,
     1, 0, 0, 1,
     1, 1, 1, 1,
     1, 0, 0, 1,
     1, 0, 0, 1],
    [1, 1, 1, 0,
     1, 0, 0, 1,
     1, 1, 1, 0,
     1, 0, 0, 1,
     1, 0, 0, 1,
     1, 1, 1, 0],
    [0, 1, 1, 1,
     1, 0, 0, 0,
     1, 0, 0, 0,
     1, 0, 0, 0,
     1, 0, 0, 0,
     0, 1, 1, 1,],
    [1, 1, 1, 0,
     1, 0, 0, 1,
     1, 0, 0, 1,
     1, 0, 0, 1,
     1, 0, 0, 1,
     1, 1, 1, 0],
    [1, 1, 1, 1,
     1, 0, 0, 0,
     1, 1, 1, 0,
     1, 0, 0, 0,
     1, 0, 0, 0,
     1, 1, 1, 1,],
    [1, 1, 1, 1,
     1, 0, 0, 0,
     1, 1, 1, 0,
     1, 0, 0, 0,
     1, 0, 0, 0,
     1, 0, 0, 0],
    [0, 1, 1, 1,
     1, 0, 0, 0,
     1, 0, 0, 0,
     1, 0, 1, 1,
     1, 0, 0, 1,
     0, 1, 1, 1],
    [1, 0, 0, 1,
     1, 0, 0, 1,
     1, 1, 1, 1,
     1, 0, 0, 1,
     1, 0, 0, 1,
     1, 0, 0, 1],
    [0, 1, 1, 0,
     0, 1, 1, 0,
     0, 1, 1, 0,
     0, 1, 1, 0,
     0, 1, 1, 0,
     0, 1, 1, 0],
    [1, 1, 1, 1,
     0, 1, 0, 0,
     0, 1, 0, 0,
     0, 1, 0, 0,
     0, 1, 0, 1,
     0, 1, 1, 1],
    [1, 0, 0, 1,
     1, 0, 1, 0,
     1, 1, 0, 0,
     1, 0, 1, 0,
     1, 0, 0, 1,
     1, 0, 0, 1],
    [1, 0, 0, 0,
     1, 0, 0, 0,
     1, 0, 0, 0,
     1, 0, 0, 0,
     1, 0, 0, 0,
     1, 1, 1, 1],
    [1, 1, 0, 1, 1,
     1, 0, 1, 0, 1,
     1, 0, 1, 0, 1,
     1, 0, 0, 0, 1,
     1, 0, 0, 0, 1,
     1, 0, 0, 0, 1],
    [1, 0, 0, 1,
     1, 1, 0, 1,
     1, 0, 1, 1,
     1, 0, 0, 1,
     1, 0, 0, 1,
     1, 0, 0, 1],
    [0, 1, 1, 0,
     1, 0, 0, 1,
     1, 0, 0, 1,
     1, 0, 0, 1,
     1, 0, 0, 1,
     0, 1, 1, 0],
    [1, 1, 1, 0,
     1, 0, 0, 1,
     1, 0, 0, 1,
     1, 1, 1, 0,
     1, 0, 0, 0,
     1, 0, 0, 0],
    [0, 1, 1, 0,
     1, 0, 0, 1,
     1, 0, 0, 1,
     1, 0, 0, 1,
     1, 0, 1, 1,
     0, 1, 1, 1],
    [1, 1, 1, 0,
     1, 0, 0, 1,
     1, 0, 0, 1,
     1, 1, 1, 0,
     1, 0, 0, 1,
     1, 0, 0, 1],
    [0, 1, 1, 1,
     1, 0, 0, 0,
     0, 1, 1, 0,
     0, 0, 0, 1,
     0, 0, 0, 1,
     1, 1, 1, 0],
    [1, 1, 1, 1,
     0, 1, 1, 0,
     0, 1, 1, 0,
     0, 1, 1, 0,
     0, 1, 1, 0,
     0, 1, 1, 0],
    [1, 0, 0, 1,
     1, 0, 0, 1,
     1, 0, 0, 1,
     1, 0, 0, 1,
     1, 0, 0, 1,
     1, 1, 1, 1],
    [1, 0, 0, 1,
     1, 0, 0, 1,
     1, 0, 0, 1,
     1, 0, 0, 1,
     1, 0, 0, 1,
     0, 1, 1, 0],
    [1, 0, 0, 0, 1,
     1, 0, 1, 0, 1,
     1, 0, 1, 0, 1,
     1, 0, 1, 0, 1,
     1, 0, 1, 0, 1,
     0, 1, 0, 1, 0],
    [1, 0, 0, 1,
     1, 0, 0, 1,
     0, 1, 1, 0,
     0, 1, 1, 0,
     1, 0, 0, 1,
     1, 0, 0, 1],
    [1, 0, 0, 1,
     1, 0, 0, 1,
     0, 1, 1, 0,
     0, 1, 1, 0,
     0, 1, 1, 0,
     0, 1, 1, 0],
    [1, 1, 1, 1,
     0, 0, 0, 1,
     0, 0, 1, 0,
     0, 1, 0, 0,
     1, 0, 0, 0,
     1, 1, 1, 1],
    [0, 1, 1, 0,
     1, 0, 1, 0,
     0, 0, 1, 0,
     0, 0, 1, 0,
     0, 0, 1, 0,
     1, 1, 1, 1],
    [0, 1, 1, 0,
     1, 0, 0, 1,
     0, 0, 1, 0,
     0, 1, 0, 0,
     1, 0, 0, 0,
     1, 1, 1, 1],
    [1, 1, 1, 0,
     0, 0, 0, 1,
     0, 1, 1, 0,
     0, 0, 0, 1,
     0, 0, 0, 1,
     1, 1, 1, 0],
    [1, 0, 0, 1,
     1, 0, 0, 1,
     1, 1, 1, 1,
     0, 0, 0, 1,
     0, 0, 0, 1,
     0, 0, 0, 1],
    [1, 1, 1, 1,
     1, 0, 0, 0,
     1, 1, 1, 0,
     0, 0, 0, 1,
     0, 0, 0, 1,
     1, 1, 1, 0],
    [0, 1, 1, 0,
     1, 0, 0, 0,
     1, 1, 1, 0,
     1, 0, 0, 1,
     1, 0, 0, 1,
     0, 1, 1, 0],
    [1, 1, 1, 1,
     0, 0, 0, 1,
     0, 0, 1, 0,
     0, 1, 0, 0,
     1, 0, 0, 0,
     1, 0, 0, 0],
    [0, 1, 1, 0,
     1, 0, 0, 1,
     0, 1, 1, 0,
     1, 0, 0, 1,
     1, 0, 0, 1,
     0, 1, 1, 0],
    [0, 1, 1, 0,
     1, 0, 0, 1,
     1, 0, 0, 1,
     0, 1, 1, 1,
     0, 0, 0, 1,
     0, 0, 0, 1],
    [0, 1, 1, 0,
     1, 0, 0, 1,
     1, 0, 1, 1,
     1, 1, 0, 1,
     1, 0, 0, 1,
     0, 1, 1, 0],
    [0, 1, 0, 0,
     0, 1, 0, 0,
     0, 1, 0, 0,
     0, 1, 0, 0,
     0, 0, 0, 0,
     0, 1, 0, 0],
    [0, 0, 1, 0,
     0, 1, 0, 0,
     1, 0, 0, 0,
     1, 0, 0, 0,
     0, 1, 0, 0,
     0, 0, 1, 0],
    [0, 1, 0, 0,
     0, 0, 1, 0,
     0, 0, 0, 1,
     0, 0, 0, 1,
     0, 0, 1, 0,
     0, 1, 0, 0],
    [0, 0, 0, 0,
     0, 0, 0, 0,
     0, 0, 0, 0,
     0, 0, 0, 0,
     0, 0, 0, 0,
     0, 0, 0, 0],
    [0, 0, 0, 0,
     0, 0, 0, 0,
     0, 0, 0, 0,
     0, 0, 0, 0,
     0, 0, 0, 0,
     0, 0, 0, 0],
    [0, 1, 1, 0,
     0, 1, 1, 0,
     0, 0, 0, 0,
     0, 0, 0, 0,
     0, 1, 1, 0,
     0, 1, 1, 0],
];
var drawLetter = function(x, y, w, h, index) {
    if (index === 12 || index === 22) {
        for (var i = 0; i < 30; ++i) {
            if (characters[index][i] === 1) {
                rect(i%5*(w/5) + x, floor(i/5)*h/6 + y, w/5, h/6);
            }
        }
    } else {
        for (var i = 0; i < 24; ++i) {
            if (characters[index][i] === 1) {
                rect(i%4*(w/4) + x, floor(i/4)*h/6 + y, w/5, h/6);
            }
        }
    }
};
var drawText = function(txt,x,y,s){
    txt = txt.toLowerCase();
    var w = txt.length*s;
    x-=w/2;
    var ox = x;
    for(var i = 0; i < txt.length; i ++){
        var letter = charLib[txt[i]];
        drawLetter(x,y,s*5/6,s,letter);
        if(letter===12||letter===22){
            x+=s;
        } else if(letter===39){
            x = ox;
            y += s*1.3;
        } else {
            x+=s;
        }
    }
};
//}

//Objects{

//Scoring{
var scores = {};
scores = {
    p1: scores.p1 || 0,
    p2: scores.p2 || 0,
    goToScore: 11,
    display: function(){
        if(keys.r){
            this.reset();
        }
        fill(255);
        strokeWeight(1);
        stroke(255);
        drawText((this.p1+":"+this.p2),width/2,10,30);
        if(max(this.p1,this.p2)>=this.goToScore&&max(this.p1,this.p2)-min(this.p1,this.p2)>=2){
            scene = "won";
        }
    },
    reset: function(){
        this.p1 = 0;
        this.p2 = 0;
    }
};
//}

//Enviroment{
var room = {
    w: 1000,
    h: 1000,
    d: 2500,
    color: color(150,50,150),
    display: function(){
        g.fill(lerpColor(this.color,color(255),0.1));
        g.xrect(-this.w/2,0,0,this.h,this.d);
        g.fill(this.color);
        g.yrect(0,-this.h/2,0,this.w,this.d);
        g.yrect(0,this.h/2,0,this.w,this.d);
        g.fill(lerpColor(this.color,color(0),0.1));
        g.xrect(this.w/2,0,0,this.h,this.d);
    },
};
var ball = {
    x: 0,
    y: 0,
    z: 0,
    vx: random()*5-2.5,
    vy: random()*5-2.5,
    vz: -10,
    w: 50,
    h: 50,
    d: 50,
    display: function(){
        g.fill(frameCount%255,200,200,150);
        g.strokeWeight(3);
        g.stroke(0,50,50,100);
        g.pushMatrix();
        g.translate(this.x,this.y,this.z);
        g.cube(0,0,0,this.w,this.h,this.d);
        var r = this.w;
        if(ballGraphics==="high"){
            for(var i = 0; i < 5; i ++){
                r/=sqrt(2);
                g.rotate(frameCount*(i+1),frameCount/3*(i+1),0);
                g.stroke(0, 0, 0);
                g.cube(0,0,0,r,r,r);
            }
        }
        g.popMatrix();
        if(ballGraphics!=="low"){
            g.noStroke();
            g.fill(frameCount%255,255,200,30);
            var m = 5;
            while(m>0.9){
                m/=1.2;
                if(this.x-this.w*m/2<-room.w/2||this.x+this.w*m/2>room.w/2){
                    if(this.x<0){
                        var change = abs((this.x-this.w*m/2)+room.w/2);
                        g.yrect(this.x+change/2,room.h/2,this.z,this.w*m-change,this.d*m);
                        g.yrect(this.x+change/2,-room.h/2,this.z,this.w*m-change,this.d*m);
                    } else {
                        var change = abs((this.x+this.w*m/2)-room.w/2);
                        g.yrect(this.x-change/2,room.h/2,this.z,this.w*m-change,this.d*m);
                        g.yrect(this.x-change/2,-room.h/2,this.z,this.w*m-change,this.d*m);

                    }
                } else {
                    g.yrect(this.x,room.h/2,this.z,this.w*m,this.d*m);
                    g.yrect(this.x,-room.h/2,this.z,this.w*m,this.d*m);
                }
                if(this.y-this.h*m/2<-room.h/2||this.y+this.h*m/2>room.h/2){
                    if(this.y<0){
                        var change = abs((this.y-this.h*m/2)+room.h/2);
                        g.xrect(-room.w/2,this.y+change/2,this.z,this.h*m-change,this.d*m);
                        g.xrect(room.w/2,this.y+change/2,this.z,this.h*m-change,this.d*m);
                    } else {
                        var change = abs((this.y+this.h*m/2)-room.h/2);
                        g.xrect(-room.w/2,this.y-change/2,this.z,this.h*m-change,this.d*m);
                        g.xrect(room.w/2,this.y-change/2,this.z,this.h*m-change,this.d*m);

                    }
                } else {
                    g.xrect(-room.w/2,this.y,this.z,this.h*m,this.d*m);
                    g.xrect(room.w/2,this.y,this.z,this.h*m,this.d*m);
                }
            }
        }
    },
    update: function(){
        this.x+=this.vx*speedMultiplyer;
        this.y+=this.vy*speedMultiplyer;
        this.z+=this.vz*speedMultiplyer;
        if(this.vz>0){
            this.vz+=0.01;
        } else {
            this.vz-=0.01;
        }
    },
    collideWithPlayer: function(p){
        if(this.z+this.d/2>p.z-p.d/2&&this.z-this.d/2<p.z+p.d/2){
            if(this.x+this.w/2>p.x-p.w/2&&this.x-this.w/2<p.x+p.w/2){
                if(this.y+this.h/2>p.y-p.h/2&&this.y-this.h/2<p.y+p.h/2){
                    if(this.z>0){
                        this.vz = -abs(this.vz);
                    } else {
                        this.vz = abs(this.vz);
                    }
                    this.vy+=map(this.y,p.y-p.h/2,p.y+p.h/2,-2,2);
                    this.vx+=map(this.x,p.x-p.w/2,p.x+p.w/2,-2,2);
                }
            }
        }
    },
    collide: function(p1,p2){
        if(p1){
            this.collideWithPlayer(p1);
        } if(p2){
            this.collideWithPlayer(p2);
        }
        if(abs(this.z)>room.d/2+p1.d+p2.d+this.d){
            this.reset(p1,p2);
        }
        if(this.x-this.w/2<-room.w/2){
            this.vx = abs(this.vx);
        } else if(this.x+this.w/2>room.w/2){
            this.vx = -abs(this.vx);
        } if(this.y-this.h/2<-room.h/2){
            this.vy = abs(this.vy);
        } else if(this.y+this.h/2>room.h/2){
            this.vy = -abs(this.vy);
        }
    },
    reset: function(p1,p2){
        this.vx = random(5)-2.5;
        this.vy = random(5)-2.5;
        this.x = 0;
        this.y = 0;
        if(p2){
            p1.reset();
            p2.reset();
        }
        if(scene==="game"){
            if(this.z<0){
                this.vz = 5;
                scores.p2++;
            } else {
                this.vz = -5;
                scores.p1++;
            }
        }
        this.z = 0;
    },
};
//}

//Particles{
var particle = function(){
    return {
        x: 0,
        y: 0,
        z: 0,
        alpha: 0,
        stage: -1,
        alphas: [],
        alphaIndex: 0,
        rx: 0,
        ry: 0,
        rz: 0,
        ax: random(5),
        ay: random(5),
        az: random(5),
        ls: random(0.01,0.12),
        hue: random(255),
        update: function(){
            this.rx+=this.ax;
            this.ry+=this.ay;
            this.rz+=this.az;
            if(this.stage===0){
                this.alpha = lerp(this.alpha,255,this.ls);
                this.alphas.push(this.alpha);
                if(this.alpha>230){
                    this.alphaIndex = this.alphas.length-1;
                    this.stage++;
                }
            } else if(this.stage===1) {
                this.alpha = this.alphas[this.alphaIndex];
                this.alphaIndex--;
                if(this.alphaIndex<0){
                    this.stage++;
                }
            } else {
                this.reset();
            }
        },
        display: function(){
            g.pushMatrix();
            g.translate(this.x,this.y,this.z);
            g.rotate(this.rx,this.ry,this.rz);
            g.fill(this.hue,50,255,this.alpha);
            g.noStroke();
            g.ellipse(0,0,0,10,10);
            g.popMatrix();
        },
        reset: function(){
            this.x = random(-room.w/2,room.w/2);
            this.y = random(-room.h/2,room.h/2);
            this.z = random(-room.d/2,room.d/2);
            this.alphas = [];
            this.alphaIndex = 0;
            this.alpha = 0;
            this.stage = 0;
            this.hue = random(255);
        },

    };
};
var particles = [];
//}

//Player{
var Player = function(x,y,z,w,h,d,cx,cy,cz,controlMode){
    this.x = x;
    this.ox = x;
    this.oy = y;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
    this.d = d;
    this.cvx = 0;
    this.cvy = 0;
    this.cx = cx+x;
    this.cy = cy+y;
    this.cz = z+cz;
    this.mode = controlMode;
};
Player.prototype.setMatrix = function(){
    g.pushMatrix();
    if(this.cz>this.z){
        g.rotateY(-180);
    }
    if(cameraMode=="lead"){
        g.translate(-this.cx,-this.cy,-this.cz);
    } else {
        g.translate(-this.x,-this.y,-this.cz);
    }
};
Player.prototype.displaySelf = function(){
    g.fill(0,0,255,128);
    g.strokeWeight(0.1);
    g.stroke(0,0,0,255);
    g.cube(this.x,this.y,this.z,this.w,this.h,this.d);
};
Player.prototype.control = function(){
    var xs = 0.5;
    if(this.cz>this.z){
        xs *= -1;
    }
    if(this.mode==="all"){
        if(keys.d||keys[RIGHT_ARROW]){
            this.cvx+=xs;
        } if(keys.a||keys[LEFT_ARROW]){
            this.cvx-=xs;
        } if(keys.w||keys[UP_ARROW]){
            this.cvy-=0.5;
        } if(keys.s||keys[DOWN_ARROW]){
            this.cvy+=0.5;
        }
    } else if(this.mode==="keys"){
        if(keys[RIGHT_ARROW]){
            this.cvx+=xs;
        } if(keys[LEFT_ARROW]){
            this.cvx-=xs;
        } if(keys[UP_ARROW]){
            this.cvy-=0.5;
        } if(keys[DOWN_ARROW]){
            this.cvy+=0.5;
        }
    } else if(this.mode==="wasd"){
        if(keys.d){
            this.cvx+=xs;
        } if(keys.a){
            this.cvx-=xs;
        } if(keys.w){
            this.cvy-=0.5;
        } if(keys.s){
            this.cvy+=0.5;
        }

    } else {
        print("Invalid movement mode");
    }
};
Player.prototype.update = function(){
    this.cx+=this.cvx*speedMultiplyer;
    this.cy+=this.cvy*speedMultiplyer;

    this.cvx*=0.9;
    this.cvy*=0.9;
    this.x = lerp(this.x,this.cx,0.075*speedMultiplyer);
    this.y = lerp(this.y,this.cy,0.075*speedMultiplyer);

    if(this.cx-this.w/2<-room.w/2){
        this.cx = max(-room.w/2+this.w/2,this.cx);
        this.cvx = 0;
    } else if(this.cx+this.w/2>room.w/2){
        this.cx = min(room.w/2-this.w/2,this.cx);
        this.cvx = 0;
    } if(this.cy-this.h/2<-room.h/2){
        this.cy = max(-room.h/2+this.h/2,this.cy);
        this.cvy = 0;
    } else if(this.cy+this.h/2>room.h/2){
        this.cy = min(room.h/2-this.h/2,this.cy);
        this.cvy = 0;
    }
};
Player.prototype.run = function(){
    this.displaySelf();
    this.control();
    this.update();
};
Player.prototype.reset = function(){
    this.x = this.ox;
    this.y = this.oy;
    this.cx = this.ox;
    this.cy = this.oy;
    this.cvx = 0;
    this.cvy = 0;
};

var AI = function(x,y,w,h,d,cx,cy,cz,useless){
    Player.call(this,x,y,w,h,d,cx,cy,cz,useless);
    this.delayTime = 10;
    this.delayCounter = this.delayTime;
};
AI.prototype = Object.create(Player.prototype);
AI.prototype.control = function(){
    var offx = this.x-ball.x;
    var offy = this.y-ball.y;
    if(abs(offx)<this.w/2){
        offx = 0;
    } if(abs(offy)<this.h/2){
        offy = 0;
    }
    var m = sqrt(offx*offx+offy*offy);
    if(m!==0){
        if(this.delayCounter>0){
            this.delayCounter--;
        } else {
            this.cvx-=offx/m*0.75;
            this.cvy-=offy/m*0.75;
        }
    } else if(this.delayCounter<this.delayTime/speedMultiplyer) {
        this.delayCounter++;
    }
};

var cameraDistance = 500;

var menuAI1 = new AI(0,0,-room.d/2,133,100,100,0,0,-cameraDistance);
var menuAI2 = new AI(0,0,room.d/2,133,100,100,0,0,cameraDistance);

var setPlayers = function(){
    var playerW = 133;
    var p1mode = "all";
    if(playerMode==="single"){
        player2 = new AI(0,0,room.d/2,playerW,100,100,0,0,cameraDistance);
    } else {
        playerW/=2;
        player2 = new Player(0,0,room.d/2,playerW,100,100,0,0,cameraDistance,"keys");
        p1mode = "wasd";
    }
    player = new Player(0,0,-room.d/2,playerW,100,100,0,0,-cameraDistance,p1mode);
};

//}

//}

//User Interface(UI) objects{

var UIColoring = {
    fill: color(170,50,200,200),
    stroke: color(0,200),
    weight: 2,
    text: color(0,0,0,200),
    selected: color(170,200,200,200),
    smallSize: 15,
    mediumSize: 15,
    bigSize: 30,
};

//Slider{
var Slider = function(label,x,y,w,h,thumbnailWidth,percent,min,max){
    this.label = label;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.t = map(percent,0,100,this.x,this.x+this.w);
    this.tw = thumbnailWidth;
    this.value = min;
    this.min = min;
    this.max = max;
    this.dragged = false;
};
Slider.prototype.display = function(){
    var uic = UIColoring;

    stroke(uic.text);
    strokeWeight(1);
    fill(uic.text);
    drawText(""+round(this.min),this.x,this.y-this.h,uic.smallSize);
    drawText(""+round(this.max),this.x+this.w,this.y-this.h,uic.smallSize);
    drawText(""+round(this.value),this.x+this.w/2,this.y-this.h,uic.smallSize);

    textSize(uic.mediumSize);
    drawText(""+this.label,this.x+this.w/2,this.y+this.h+5,uic.mediumSize);

    fill(uic.fill);
    stroke(uic.stroke);
    strokeWeight(uic.weight);
    rect(this.x,this.y+2,this.w,this.h-4,2);

    fill(uic.selected);
    rect(this.t-this.tw/2,this.y,this.tw,this.h,2);
};
Slider.prototype.update = function(){

    if(mouseX>this.t-this.tw/2&&mouseX<this.t+this.tw/2&&mouseY>this.y&&mouseY<this.y+this.h){
        cursor(HAND);
        if(pressed){
            this.dragged = true;
            pressed = false;
        }
    } if(this.dragged){
        cursor(HAND);
        if(clicked){
            this.dragged = false;
            clicked = false;
        }
        this.t = mouseX;
    }

    this.t = constrain(this.t,this.x,this.x+this.w);

    this.value = map(this.t,this.x,this.x+this.w,this.min,this.max);

};
Slider.prototype.get = function(){
    this.update();
    return round(this.value);
};
Slider.prototype.set = function(v){
    this.t = map(v,this.min,this.max,this.x,this.x+this.w);
};
Slider.prototype.draw = function() {
    this.update();
    this.display();
};

var pointsSlider = pointsSlider || new Slider("To Score",width/2+10,height/2+140,200,20,20,45,3,21);

var particleSlider = particleSlider || new Slider("Particles",width/2-200,110,400,30,30,25,0,500);

//}

//Selector{

var Selector = function(name,x,y,w,h,list,selection,data){
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = w/list.length;
    this.h = h;
    this.list = list || [];
    this.data = data || list || [];
    if(typeof selection === "number"){
        if(selection-1 > this.list.length){
            this.selection = this.list[0];
            this.index = 0;
        } else {
            this.selection = this.list[selection];
            this.index = selection;
        }
    } else if(typeof selection === "string"){
        var found = false;
        for(var i = 0; i < this.list.length; i ++){
            if(this.list[i] === selection){
                found = true;
                this.selection = this.list[i];
                this.index = i;
            }
        }
        if(!found){
            this.selection = this.list[0];
            this.index = 0;
        }
    } else {
        this.selection = this.list[0];
        this.index = 0;
    }
};
Selector.prototype.update = function(){
    for(var i = 0; i < this.list.length; i ++){
        if(i!=this.index){
            if(mouseX>this.x+this.w*i&&mouseX<this.x+this.w*(i+1)&&mouseY>this.y&&mouseY<this.y+this.h){
                cursor(HAND);
                if(pressed){
                    this.selection = this.list[i];
                    this.index = i;
                    pressed = false;
                }
            }
        }
    }
};
Selector.prototype.display = function(){
    var uic = UIColoring;
    stroke(0);
    strokeWeight(uic.weight);
    fill(uic.fill);
    rect(this.x,this.y,this.w*this.list.length,this.h,5);
    for(var i = 1; i < this.list.length; i ++){
        line(this.x+i*this.w,this.y,this.x+i*this.w,this.y+this.h);
    }
    strokeWeight(1);
    for(var i = 0; i < this.list.length; i ++){
        if(i==this.index){
            fill(uic.selected);
            stroke(uic.selected);
        } else {
            stroke(uic.text);
            fill(uic.text);
        }
        drawText(this.list[i],this.x+this.w*i+this.w/2,this.y+this.h/2-uic.smallSize/2,uic.smallSize);
    }
    fill(uic.text);
    stroke(uic.text);
    drawText(this.name,this.x+(this.w*this.list.length)/2,this.y+this.h+5,uic.mediumSize);
};
Selector.prototype.draw = function() {
    this.update();
    this.display();
};
Selector.prototype.get = function(){
    return this.data[this.index];
};

var modeSelector = modeSelector || new Selector("Difficulty",width/2-200,height/2-20,400,40,["Easy","Medium","Hard","Insane"],"Medium",[1,2,3,5]);
var playerSelector =  playerSelector || new Selector("Players",width/2+10,height/2+50,190,40,["1","2"],"1",["single","double"]);
var cameraSelector = cameraSelector || new Selector("Camera",width/2-200,height/2+120,190,40,["Fixed","Lead"],"Fixed",["fixed","lead"]);
var ballSelector = ballSelector || new Selector("Ball Graphics",width/2-200,190,400,60,["low","medium","high"],"high");

//}

//Button{
var Button = function(text,x,y,w,h,react,s){
    this.text = text;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.react = react || function(){
        print("You pressed me!\nAdd a react function for me to do something better!");
    };
    this.s = s;
};
Button.prototype.update = function(){
    if(mouseX>this.x&&mouseX<this.x+this.w&&mouseY>this.y&&mouseY<this.y+this.h){
        cursor(HAND);
        if(pressed){
            pressed = false;
        }
        if(clicked){
            clicked = false;
            this.react();
        }
    }
};
Button.prototype.display = function(){
    var uic = UIColoring;
    fill(uic.fill);
    stroke(uic.stroke);
    strokeWeight(uic.weight);
    rect(this.x,this.y,this.w,this.h,5);
    fill(uic.text);
    strokeWeight(1);
    stroke(uic.text);
    drawText(this.text,this.x+this.w/2,this.y+this.h/2-(this.s || uic.bigSize)/2,this.s || uic.bigSize);
};
Button.prototype.draw = function(textColor) {
    this.update();
    this.display(textColor);
};

var playButton = new Button("Play",width/2-200,height/2-100,400,65,function(){
    scene="game";
    ball.reset();
    scores.reset();
    setPlayers();
    speedMultiplyer = modeSelector.get();
},UIColoring.bigSize);

var graphicButton = new Button("Set Graphics",width/2-200,height/2+50,190,60,function(){
    scene="graphics";
},UIColoring.smallSize);

var backButton = new Button("Menu",10,height-60,100,50,function(){
    scene="menu";
},UIColoring.mediumSize);

//}

//}

//Functions{
var displayAll = function(p1,p2){
    for(var i in particles){
        particles[i].display();
    }
    p1.displaySelf();
    p2.displaySelf();
    ball.display();
    room.display();
};
var updateAll = function(p1,p2){
    for(var i in particles){
        particles[i].update();
    }
    p1.update();
    p1.control();
    p2.update();
    p2.control();
    ball.update();
    ball.collide(p1,p2);
};
var blur = function(x,y,w,h,n){
    image(get(x,y,w,h),x+w/n/2,y+h/n/2,w/n,h/n);
    image(get(x+w/n/2,y+h/n/2,w/n,h/n),x,y,w,h);
};
var pause = function(){
    noStroke();
    fill(0,200);
    rect(0,0,width,height);
    strokeWeight(3);
    stroke(255);
    fill(255);
    drawText("RESUME",width/2,height/2-30,60);
    strokeWeight(2);
    drawText("home",width/2,height/2+45,20);
    pauseImage = get();
    scene = "paused";
};
//}

//Scenes{
var paused = function(){
    image(pauseImage,0,0,width,height);
    cursor(HAND);
    if(clicked){
        clicked = false;
        if(mouseX>width/2-50&&mouseX<width/2+50&&mouseY>height/2+40&&mouseY<height/2+75){
            scene = "home";
        } else {
            scene = "game";
        }
    }
};
var AIBackground = function(){

    return function(){
        updateAll(menuAI1,menuAI2);

        g.background(150, 50,220);
        push();
        translate(width/2,height/2);

        g.pushMatrix();
        menuAI1.setMatrix();

        displayAll(menuAI1,menuAI2);

        g.popMatrix();
        g.draw();

        pop();

			  // if(!detectmob()){
            // blur(0,0,width,height,2);
				// }
    };
}();
var menu = function(){
    AIBackground();
    strokeWeight(3);
    stroke(0,200);
    fill(0,200);
    drawText("3D PONG",width/2+5,25,60);
    fill(255);
    stroke(255);
    drawText("3D PONG",width/2,20,60);
    modeSelector.draw();
    playButton.draw();
    graphicButton.draw();
    playerSelector.draw();
    setPlayerMode = playerSelector.get();
	  if(detectmob()&&setPlayerMode!="single"){
			alert("2 players not supported in mobile");
			playerSelector.selection = playerSelector.list[0];
			playerSelector.index = 0;
		} else {
			playerMode = setPlayerMode;
		}
    cameraSelector.draw();
    cameraMode = cameraSelector.get();
    pointsSlider.draw();
    scores.goToScore = pointsSlider.get();
};
var game = function(){

    updateAll(player,player2);

    if(playerMode==="single"){
        g.background(150, 50,220);
        push();

        translate(width/2,height/2);
        player.setMatrix();

        displayAll(player,player2);

        g.popMatrix();
        g.draw();
        pop();
    } else {
        push();
        translate(width/4,height/2);

        g.background(150, 50,220);
        player.setMatrix();

        displayAll(player,player2);

        g.popMatrix();
        g.draw();

        pop();
        var player1Image = get(0,0,width/2,height);

        push();
        translate(width/4,height/2);

        g.background(150, 50,220);
        player2.setMatrix();

        displayAll(player,player2);

        g.popMatrix();
        g.draw();

        pop();
        var player2Image = get(0,0,width/2,height);


        image(player1Image,0,0,width/2,height);
        image(player2Image,width/2,0,width/2,height);
        stroke(0);
        strokeWeight(3);
        line(width/2,-10,width/2,height+10);
    }

    scores.display();

    fill(255);
    strokeWeight(1);
    stroke(255);
    drawText("pause",width-40,5,15);
    if(mouseX>width-80&&mouseY<25){
        cursor(HAND);
        if(clicked){
            pause();
            clicked = false;
        }
    }
};
var setGraphics = function(){
    AIBackground();
    strokeWeight(3);
    stroke(0,200);
    fill(0,200);
    drawText("Set Graphics",width/2+5,25,40);
    fill(255);
    stroke(255);
    drawText("Set Graphics",width/2,20,40);
    particleSlider.draw();
    particleAmount = particleSlider.get();
    while(particles.length>particleAmount){
        particles.pop();
    } while(particles.length<particleAmount){
        particles.push(particle());
    }
    ballSelector.draw();
    ballGraphics = ballSelector.get();
    backButton.draw();
};
setGraphics();
var won = function(){
    AIBackground();
    strokeWeight(3);
    stroke(0,200);
    fill(0,200);
    drawText("GAME Over",width/2+5,25,60);
    fill(255);
    stroke(255);
    drawText("game over",width/2,20,60);
    var p2name = playerMode==="single"?"The AI":"Player 2";
    strokeWeight(2);
    stroke(0,200);
    fill(0,200);
    drawText("Player 1 got "+scores.p1,width/2+2,100+2,20);
    drawText(p2name+" got "+scores.p2,width/2+2,130+2,20);
    fill(255);
    stroke(255);
    drawText("Player 1 got "+scores.p1,width/2,100,20);
    drawText(p2name+" got "+scores.p2,width/2,130,20);
    backButton.draw();
};
//}

draw = function() {

    if(frameRate()<10){
        frameCount--;
        cursor('wait');
        return particles.pop();
    } else {
        cursor("default");
    }

    switch(scene){
        default:
            menu();
        break;
        case "game":
            game();
        break;
        case "graphics":
            setGraphics();
        break;
        case "paused":
            paused();
        break;
        case "won":
            won();
        break;
    }

    clicked = false;
    pressed = false;

};
