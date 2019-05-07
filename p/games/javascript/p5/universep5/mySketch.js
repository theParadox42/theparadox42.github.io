new p5();

function setup(){
	var smallest = min(windowWidth, windowHeight-30);
	createCanvas(smallest, smallest).parent('game');
	angleMode(RADIANS);
	colorMode(RGB, 255, 255, 255, 255);
};
setup();

//About and how{
/**

 THE SIZES AND PROPORTIONS ARE NOT TO SCALE

 + You are going ~157680000 times the speed of light at max speed, while acceleration is 1/400 of that.
 + The stars are also insanely enlarged so they actually appear on the screen
 + Gravity would cause an insane amount of lag unless I had less than 50 stars, and I want more than 50 stars.

 CONTROLS

 + To look around, use WASD, arrow keys, or the mouse
 + SPACE accelerates you in the direction you are looking
 + z decelerates you, or slows you down, very quickly

 SETTINGS

 + Most computers can handle at least 1000 stars
 + Mine can handle 10000, with some lag
 + The universe size does not affect runtime
 + The lower the generate speed is the longer, but more efficiently it will load
 + I would keep it at max unless you are doing spiral galaxy
*/
//}


//Variables{


//Settup{

var scene = "load";

//}

var f10, f11, f12, f13, f20, f21;
function preload(){
	f10 = loadFont("Roboto-Regular.ttf");
	f11 = loadFont("Roboto-Bold.ttf");
	f12 = loadFont("Roboto-Italic.ttf");
	f13 = loadFont("Roboto-BoldItalic.ttf");
	f20 = loadFont("Anton-Regular.ttf");
	f21 = loadFont("Anton-Regular.ttf");
}


//Mouse & Key{

var keys = {};
var pressed = false;
var canPress = true;
var clicked = false;

//}


//Generator{
var generatedStars = [];
var loadStar = 0;
//}


//Previews{
var universe;

var load = 0;

var nl = {message: "not loaded"};

var spiralGalaxy = nl;
var spiralGalaxyImage = nl;

var tubeGalaxy = nl;
var tubeGalaxyImage = nl;

var infiniteGalaxy = nl;
var infiniteGalaxyImage = nl;

var sphereGalaxy = nl;
var sphereGalaxyImage = nl;

var sphereCenterGalaxy = nl;
var sphereCenterGalaxyImage = nl;

var sphereOuterGalaxy = nl;
var sphereOuterGalaxyImage = nl;

var outlineGalaxy = nl;
var outlineGalaxyImage = nl;

var images = {};

//}


//Settings{


//Tube, infinite, sphere-center, sphere-outer, sphere, outline, spiral
var universeType = "spiral";
var sizeOfUniverse = 50000;
var amountOfStars = 500;
var generateSpeed = 10;

//100<= gives you some weird stuff
var depthPerspectiveDivider = 500;


//Colors{
var colors = [color(255, 0, 0),color(255, 86, 13),color(255, 225, 0),color(255, 255, 255),color(163, 232, 255),color(255, 77, 0),color(255, 0, 89),color(255, 187, 0),color(255, 196, 0),color(255, 247, 0),color(232, 255, 242),color(255, 255, 255),color(255),color(255),color(255, 82, 82),color(255, 178, 178),color(253, 255, 127),color(143, 248, 255),color(255, 209, 117),color(255, 207, 207),color(255, 221, 0),color(255, 229, 143)];

//}

//}


//}


//Keyboard & mouse stuff{

keyPressed = function(){
    keys[keyCode] = true;
    keys[key] = true;
};
keyReleased = function(){
    keys[key] = false;
    keys[keyCode] = false;
};

mousePressed = function(){
    if(canPress){
        pressed = true;
        canPress = false;
    }
};
mouseReleased = function(){
    canPress = true;
    clicked = true;
};

//}


//Laser stuff{
var Laser = function(x,y,z,vx,vy,vz,color){
    this.x = x;
    this.y = y;
    this.z = z;
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
    this.color = color;
};
Laser.prototype.display = function(g) {
    g.strokeWeight(50);
    g.stroke(this.color);
    g.point(this.x,this.y,this.z);
    //g.line(this.x,this.y,this.z,this.x+this.vx*10,this.y+this.vy*10,this.z+this.vz*10);
};
Laser.prototype.update = function(){
    this.x+=this.vx;
    this.y+=this.vy;
    this.z+=this.vz;
};
Laser.prototype.run = function(g){
    this.display(g);
    this.update();
};
//}


//View controller{
var view = {
    //Attributes{
    x: 0,
    y: 0,
    z: 0,

    vx: 0,
    vy: 0,
    vz: 0,
    mag: 0,

    ax: 0,
    ay: 0,

    vax: 0,
    vay: 0,

    ts: 0.01,
    acc: 10,
    maxSpeed: 300,

    lasers: [],
    maxLasers: 20,
    lastShot: 0,
    //}

    //Functions{
    getDirection: function(mag){
        var x = sin(this.ay)*cos(this.ax);
        var y = sin(this.ax);
        var z = cos(this.ay)*cos(this.ax);
        var m = mag || 1;
        return {
            x: x*m,
            y: y*m,
            z: z*m,
        };
    },
    respondToUser: function(){
        if(keys[RIGHT_ARROW]||keys.d){
            this.vay+=this.ts;
        } if(keys[LEFT_ARROW]||keys.a){
            this.vay-=this.ts;
        } if(keys[UP_ARROW]||keys.w){
            this.vax-=this.ts;
        } if(keys[DOWN_ARROW]||keys.s){
            this.vax+=this.ts;
        } if(keys[32]){
            var d = this.getDirection(this.acc);
            this.vx += d.x;
            this.vy += d.y;
            this.vz += d.z;
        } if(keys.z){
            this.vx*=0.8;
            this.vy*=0.8;
            this.vz*=0.8;
        } if(keys.x&&this.lastShot===0&&this.lasers.length<this.maxLasers){
            var d = this.getDirection(this.maxSpeed*1.1);
            this.lasers.push(new Laser(this.x+d.x,this.y+d.y,this.z+d.z,d.x+this.vx,d.y+this.vy,d.z+this.vz,color(30, 230, 43)));
            this.lastShot+=20;
        }
        this.ay+=(mouseX-pmouseX)/(1/this.ts);
        this.ax+=(mouseY-pmouseY)/(1/this.ts);
    },
    update: function(){
        this.lastShot--;
        this.lastShot = max(0,this.lastShot);
        this.vax*=0.9;
        this.vay*=0.9;

        this.ax+=this.vax;
        this.ay+=this.vay;

        this.ax = constrain(this.ax,-PI/2,PI/2);
        this.ay = this.ay%TWO_PI;

        this.vx*=0.99;
        this.vy*=0.99;
        this.vz*=0.99;

        this.mag = sqrt(sq(this.vx)+sq(this.vy)+sq(this.vz));
        if(this.mag>this.maxSpeed){
            this.vx*=this.maxSpeed/this.mag;
            this.vy*=this.maxSpeed/this.mag;
            this.vz*=this.maxSpeed/this.mag;
        }

        this.x+=this.vx;
        this.y+=this.vy;
        this.z+=this.vz;
    },
    displayCockpit: function(){

        //Craft{
        push();
        translate(width/2,height/2);

        stroke(50);
        strokeWeight(10);
        line(60,height/4,180,-height/2);
        line(-60,height/4,-180,-height/2);

        fill(80);
        stroke(100);
        strokeWeight(5);

        beginShape();

        vertex(-width/2,height/2);
        vertex(width/2,height/2);
        vertex(width/2,height/3);

        bezierVertex(width/2,height/3,width/3,height/5,60,height/5);
        vertex(60,height/5);
        vertex(-60,height/5);
        bezierVertex(-60,height/5,-width/3,height/5,-width/2,height/3);

        endShape();

        beginShape();

        vertex(width/2,-height/2);
        vertex(-width/2,-height/2);
        vertex(-width/2,-height/4);

        bezierVertex(-width/2,-height/4,-width/2,-height/3,-60,-height/3);
        vertex(-60,-height/3);
        vertex(60,-height/3);
        bezierVertex(60,-height/3,width/2,-height/3,width/2,-height/4);

        endShape();

        noStroke();
        fill(255,255,255,100);

        var w = 2;
        var l = 10;
        beginShape();

        vertex(-l,-w);
        vertex(-w,-w);
        vertex(-w,-l);
        vertex(w,-l);
        vertex(w,-w);
        vertex(l,-w);
        vertex(l,w);
        vertex(w,w);
        vertex(w,l);
        vertex(-w,l);
        vertex(-w,w);
        vertex(-l,w);

        endShape();

        pop();
        //}

        //Numbers at top{
        textSize(50);
        textSize(20);
        textAlign(LEFT,TOP);
        fill(50);
        text("X: "+round(view.x)+"\nY: "+round(view.y)+"\nZ: "+round(view.z),5,5);
        textAlign(RIGHT,TOP);
        text("RotateX(deg): "+round(degrees(view.ax))+"\nRotateY(deg): "+round(degrees(view.ay)),width-5,5);

        //}

        //Meters{
        stroke(0);
        strokeWeight(5);
        fill(82, 82, 82);
        rect(40,height-60,200,30);
        rect(50,height-100,200,30);
        var p = min(this.mag/this.maxSpeed,1);
        fill(lerpColor(color(25, 227, 42),color(217, 24, 24),p));
        rect(40,height-60,p*200,30);

        p = min(this.lasers.length/this.maxLasers,1);
        fill(lerpColor(color(25, 227, 42),color(217, 24, 24),p));
        rect(50,height-100,p*200,30);


        strokeWeight(2);
        fill(0, 230, 255,128);
        push();
        translate(width-70,height-40);

        ellipse(0,0,50,50);

        fill(50,128);
        rotate(-this.ax);
        rect(-24,-10,48,20,10);
        rect(-24,-10,24,20,10);
        pop();


        fill(0, 230, 255,128);
        push();
        translate(width-70,height-100);

        ellipse(0,0,50,50);

        fill(50,128);
        rotate(this.ay);
        rect(-24,-10,48,20,10);
        rect(-24,-10,24,20,10);
        pop();

        //}

    },
    runLasers: function(g){
        for(var i in this.lasers){
            var l = this.lasers[i];
            l.run(g);
            var offx = this.x-l.x;
            var offy = this.y-l.y;
            var offz = this.z-l.z;
            if(sqrt(sq(offx)+sq(offy)+sq(offz))>50000){
                this.lasers.splice(i,1);
            }
        }
    },
    run: function(){
        this.respondToUser();
        this.update();
        this.displayCockpit();
    },
    //}
};
//}


//Star generator and updator{
var generateStar = function(type,starAmount,distance,i){
    var star = {};
    var randomColor = colors[floor(random(colors.length))];
    var randomSize = random(10,100);
    switch(type){

        //Tube{
        case "tube":
            var r = random(TWO_PI);
            var m = random(random(random(random(200000))));
            var s = random(50);
            star = {
                x: cos(r)*m,
                y: sin(r)*m,
                z: random(-distance,distance),
                r: randomSize,
                color: randomColor
            };
        break;
        //}
        //Sphere related ones{
        case "sphere":
            var rx = random(TWO_PI);
            var ry = random(TWO_PI);
            var mag = random(random(distance),distance);
            star = {
                x: cos(ry)*mag*sin(rx),
                y: cos(rx)*mag,
                z: sin(ry)*mag*sin(rx),
                r: randomSize,
                color: randomColor
            };
        break;
        case "sphere-center":
            var rx = random(TWO_PI);
            var ry = random(TWO_PI);
            var mag = random(0,random(distance));
            star = {
                x: cos(ry)*mag*sin(rx),
                y: cos(rx)*mag,
                z: sin(ry)*mag*sin(rx),
                r: randomSize,
                color: randomColor
            };
        break;
        case "sphere-outer":
            var rx = random(TWO_PI);
            var ry = random(TWO_PI);
            var mag = random(random(random(distance),distance),distance);
            star = {
                x: cos(ry)*mag*sin(rx),
                y: cos(rx)*mag,
                z: sin(ry)*mag*sin(rx),
                r: randomSize,
                color: randomColor
            };
        break;
        case "outline":
            var rx = random(TWO_PI);
            var ry = random(TWO_PI);
            var mag = random(distance+5,distance-5);
            star = {
                x: cos(ry)*mag*sin(rx),
                y: cos(rx)*mag,
                z: sin(ry)*mag*sin(rx),
                r: randomSize,
                color: randomColor
            };
        break;
        //}
        //Infinite{
        case "infinite":
            var rx = random(TWO_PI);
            var ry = random(TWO_PI);
            var mag = random(random(distance),distance);
            star = {
                x: cos(ry)*mag*sin(rx),
                y: cos(rx)*mag,
                z: sin(ry)*mag*sin(rx),
                r: randomSize,
                color: randomColor
            };
        break;
        //}
        //Galaxy{
        case "spiral":
            var bands = 7;


            var positive = round(random()) ? -1:1;
            var r = i*(TWO_PI/bands)+random(0,random(0,random(0,random())))*positive;


            var mag = random(0,random(distance/2,distance));
            var dfc = 0;//distance from center

            var multiplyer = distance/10000;
            while(dfc<mag){
                dfc+=multiplyer;
                r+=multiplyer/dfc;
            }

            positive = round(random()) ? -1:1;
            var y = positive*random(mag)/10+random(100);

            star = {
                x: cos(r)*mag,
                y: y,
                z: sin(r)*mag,
                r: randomSize,
                color: randomColor
            };

        break;
        //}
    }
    return star;
};
var generateStars = function(type,stars,i,starAmount,distance,maxStars){
    var message = "loading";

    if(starAmount>(maxStars||Infinity)){
        message = "done";
    }
    while(i<=min(starAmount,(maxStars||Infinity))){
        i++;
        stars.push(generateStar(type,starAmount,distance,i));
    }
    return {
        message: message,
        i: i,
        stars: stars,
        length: distance,
    };
};
var collideWithLaser = function(lasers,lr,star,sr){
    for(var i in lasers){
        var l = lasers[i];
        var offx = l.x-star.x;
        var offy = l.y-star.y;
        var offz = l.z-star.z;
        return sqrt(sq(offx)+sq(offy)+sq(offz))<lr+sr;
    }
};
var runStars = function(type,ss,starLength){
    switch(type){
        case "tube":
            for(var i in ss){
                var s = ss[i];
                while(s.z-view.z<-starLength/2){
                    s.z += starLength;
                } while(s.z-view.z>starLength/2){
                    s.z -= starLength;
                }
            }
        break;
        case "infinite":
            for(var i in ss){
                var s = ss[i];
                var offx = view.x-s.x;
                var offy = view.y-s.y;
                var offz = view.z-s.z;
                if(sqrt(sq(offx)+sq(offy)+sq(offz))>starLength){
                    s.x+=offx*1.99;
                    s.y+=offy*1.99;
                    s.z+=offz*1.99;
                }
            }
        break;
        default:

        break;
    }

    for(var i in ss){
        if(collideWithLaser(view.lasers,25,ss[i],ss[i].r)){
            ss.splice(i,1);
        }
    }

    return ss;
};
//}


//Universe object displayer{
var Universe = function(type,stars,length){
    this.stars = stars;
    this.type = type;
    this.starLength = length;
};
Universe.prototype.g = {
    //This code was made by Paradox Programming for 3D use
    TDPerspective: depthPerspectiveDivider,
    TD: function(x,y,z){
        var Z = z;

        //Does some perspective stuff
        var X = x/Z*this.TDPerspective;
        var Y = y/Z*this.TDPerspective;

        //Returns the 2D version of it
        return {x: X,y: Y};

    },
    matrix: [[]],
    shapes: [],
    shape: [],
    fillColor: color(255),
    strokeColor: color(0),
    weight: 1,
    doStroke: true,
    background: function(r,g,b,a){
        this.resetShapes();
        this.matrix = [[]];
        background(r,g,b,a);
    },
    fill: function(r,g,b,a){
        if(g===undefined){
            this.fillColor = color(r);
        } else if(a===undefined){
            this.fillColor = color(r,g,b);
        } else {
            this.fillColor = color(r,g,b,a);
        }
    },
    stroke: function(r,g,b,a){
        if(g===undefined){
            this.strokeColor = color(r);
        } else if(a===undefined){
            this.strokeColor = color(r,g,b);
        } else {
            this.strokeColor = color(r,g,b,a);
        }
        this.doStroke = true;
    },
    strokeWeight: function(thickness){
        this.weight = thickness;
        this.doStroke = true;
    },
    noStroke: function(){
        this.doStroke = false;
    },
    getColor: function(){
        return {fill: this.fillColor,stroke: this.strokeColor, weight: this.weight,doStroke: this.doStroke};
    },
    pushMatrix: function(){
        this.matrix.push([]);
    },
    popMatrix: function(){
        this.matrix.pop();
    },
    resetMatrix: function(){
        this.matrix = [[]];
    },
    translate: function(x,y,z){
        var endOfMatrix = this.matrix.length-1;
        this.matrix[endOfMatrix].push({type: "translate", data: {x: x, y: y, z: z}});
    },
    scale: function(x,y,z){
        var endOfMatrix = this.matrix.length-1;
        this.matrix[endOfMatrix].push({type: "scale", data: {x: x, y: y, z: z}});
    },
    rotate: function(x,y,z){
        var endOfMatrix = this.matrix.length-1;
        this.matrix[endOfMatrix].push({type: "rotate", data: {x: x, y: y, z: z}});
    },
    r: function(x,y,z){
        var X = x;
        var Y = y;
        var Z = z;
        var ry = y;
        for(var i = this.matrix.length-1; i > -1; i --){
            for(var j = this.matrix[i].length-1; j > -1; j --){
                var type = this.matrix[i][j].type;
                var data = this.matrix[i][j].data;
                if(type==="translate"){
                    X+=data.x;
                    Y+=data.y;
                    Z+=data.z;
                } else if(type==="scale"){
                    X*=data.x;
                    Y*=data.y;
                    Z*=data.z;
                } else if(type==="rotate"){
                    if(data.x!==0){
                        var dummyY = Y;
                        Y = cos(data.x) * Y - sin(data.x) * Z;
                        Z = cos(data.x) * Z + sin(data.x) * dummyY;
                    } if(data.y!==0){
                        var dummyX = X;
                        X = cos(data.y) * X - sin(data.y) * Z;
                        Z = cos(data.y) * Z + sin(data.y) * dummyX;
                    } if(data.z!==0){
                        var dummyX = X;
                        X = cos(data.z) * X - sin(data.z) * Y;
                        Y = cos(data.z) * Y + sin(data.z) * dummyX;
                    }
                }
            }
        }
        var td = this.TD(X,Y,Z);
        var d = this.TD(1,0,Z).x;
        return {x: td.x, y: td.y, X: X, Y: Y, Z: Z,ry: ry,d:d};
    },
    minAvgMax: function(points){
        var starterPoint = points[0];
        var c = {x:0,y:0,z:0,ry:0};
        var ma = {x:starterPoint.X,y:starterPoint.Y,z:starterPoint.Z};
        var mi = {x: starterPoint.X,y:starterPoint.Y,z:starterPoint.Z};
        for(var i = 0; i < points.length; i ++){
            var p = points[i];
            var x = p.X;
            var y = p.Y;
            var z = p.Z;
            var ry = p.ry;
            c.x+=x;
            c.y+=y;
            c.ry+=ry;
            c.z+=z;
            ma.x = max(ma.x,x);
            ma.y = max(ma.y,y);
            ma.ry = max(ma.ry,ry);
            ma.z = max(ma.z,z);
            mi.x = min(mi.x,x);
            mi.y = min(mi.y,y);
            mi.ry = min(mi.ry,ry);
            mi.z = min(mi.z,z);
        }
        c.x/=points.length-1;
        c.y/=points.length-1;
        c.ry/=points.length-1;
        c.z/=points.length-1;
        return {avg:c,max:ma,min:mi};
    },
    point: function(x,y,z){
        var p = this.r(x,y,z);
        var c = {x: p.X, y: p.Y, z: p.Z};
        this.shapes.push({type:"point",point:p,stats:{min:c,avg:c,max:c},color:this.getColor()});
    },
    line: function(x1,y1,z1,x2,y2,z2){
        var p1 = this.r(x1,y1,z1);
        var p2 = this.r(x2,y2,z2);
        var c = {x: (p1.X+p2.X)/2, y: (p1.Y+p2.Y)/2,z:(p1.Z+p2.Z)/2};
        this.shapes.push({type:"line",points:[p1,p2],stats:this.minAvgMax([p1,p2]),color:this.getColor()});
    },
    triangle: function(x1,y1,z1,x2,y2,z2,x3,y3,z3){
        var point1 = this.r(x1,y1,z1);
        var point2 = this.r(x2,y2,z2);
        var point3 = this.r(x3,y3,z3);
        var c = {x:(point1.X+point2.X+point3.X)/3,y:(point1.Y+point2.Y+point3.Y)/3,z:(point1.Z+point2.Z,point3.Z)/3};
        var points = [point1,point2,point3];
        this.shapes.push({type: "triangle", points: points,stats:this.minAvgMax(points),color: this.getColor()});
    },
    quad: function(x1,y1,z1,x2,y2,z2,x3,y3,z3,x4,y4,z4){
        var point1 = this.r(x1,y1,z1);
        var point2 = this.r(x2,y2,z2);
        var point3 = this.r(x3,y3,z3);
        var point4 = this.r(x4,y4,z4);
        var points = [point1,point2,point3,point4];
        var c = {};
        c.x = (point1.X+point2.X+point3.X+point4.X)/4;
        c.y = (point1.Y+point2.Y+point3.Y+point4.Y)/4;
        c.z = (point1.Z+point2.Z+point3.Z+point4.Z)/4;
        this.shapes.push({type:"quad",points:points,stats:this.minAvgMax(points),color:this.getColor()});

    },
    xrect: function(x,y,z,h,d){
        this.quad(x,y,z,x,y+h,z,x,y+h,z+d,x,y,z+d);
    },
    yrect: function(x,y,z,w,d){
        this.quad(x,y,z, x+w,y,z, x+w,y,z+d, x,y,z+d);
    },
    zrect: function(x,y,z,w,h){
        this.quad(x,y,z, x+w,y,z, x+w,y+h,z, x,y+h,z);
    },
    cube: function(x,y,z,w,h,d,c1,c2,c3){
        this.xrect(x,y,z,h,d);
        this.shapes[this.shapes.length-1].color.fill = c1;
        this.xrect(x+w,y,z,h,d);
        this.shapes[this.shapes.length-1].color.fill = c1;

        this.yrect(x,y,z,w,d);
        this.shapes[this.shapes.length-1].color.fill = c2;
        this.yrect(x,y+h,z,w,d);
        this.shapes[this.shapes.length-1].color.fill = c2;

        this.zrect(x,y,z,w,h);
        this.shapes[this.shapes.length-1].color.fill = c3;
        this.zrect(x,y,z+d,w,h);
        this.shapes[this.shapes.length-1].color.fill = c3;
    },
    sphere: function(x,y,z,r){
        var p = this.r(x,y,z);
        var c = {x: p.X, y: p.Y, z: p.Z};
        this.shapes.push({type:"sphere",point:p,r:r,stats:{min:c,avg:c,max:c},color:this.getColor()});

    },
    beginShape: function(MODE){
        this.shape.push({type: "begin",mode:MODE});
    },
    vertex: function(x,y,z){
        this.shape.push({type: "v",p:this.r(x,y,z)});
    },
    v: function(x,y,z){
        this.vertex(x,y,z);
    },
    bezierVertex: function(cx1,cy1,cz1,cx2,cy2,cz2,x,y,z){
        var c1 = this.r(cx1,cy1,cz1);
        var c2 = this.r(cx2,cy2,cz2);
        var p = this.r(x,y,z);
        p.c1 = c1;
        p.c2 = c2;
        this.shape.push({type: "bv",p:p,c1:c1,c2:c2});
    },
    bv: function(cx1,cy1,cz1,cx2,cy2,cz2,x,y,z){
        this.bezierVertex(cx1,cy1,cz1,cx2,cy2,cz2,x,y,z);
    },
    endShape: function(MODE){
        this.shape.push({type:"end",mode:MODE});
        var points = [];
        try {
            for(var i = 1; i < this.shape.length-1; i ++){
                points.push(this.shape[i].p);
            }
        } catch(e){
            println('An error occured while generating a complex shape\nDid you put "g.beginShape()" before all vertexes and "g.endShape()" after?');
        }
        this.shapes.push({
            type:"complex-shape",
            points:this.shape,
            stats:this.minAvgMax(points),
            color:this.getColor(),
            modes:{
                begin:this.shape[0].mode,
                end:this.shape[this.shape.length-1].mode
            }
        });
        this.shape = [];
    },
    sort: function(){
        this.shapes.sort(function(a,b){
            var s1 = a.stats;
            var s2 = b.stats;
            /*
            var md = abs(s1.min.z-s1.max.z)>abs(s2.max.z-s2.max.z) ? s1:s2;
            var d1 = map(s1.avg.z,md.min.z,md.max.z,s1.min.z,s1.max.z);
            var d2 = map(s2.avg.z,md.min.z,md.max.z,s2.min.z,s2.max.z);
            return d1-d2;
            /*var bs = a.stats;
            var ma = (bs.avg.z+bs.min.z)/2;
            return ma-b.stats.avg.z;
            //*/

            /*if(s1.avg.ry===s2.avg.ry){
                return s2.avg.z-s1.avg.z;
            } else {
                return s2.avg.ry-s1.avg.ry;
            }*/
            if(!s1.max.z||!s2.max.z){
                return 0;
            } else {
                return s2.max.z-s1.max.z;
            }

        });

    },
    resetShapes: function(){
        this.shapes = [];
        this.shape = [];
    },
    draw: function(){
        this.sort();
        //{
        for(var i = 0; i < this.shapes.length; i ++){
            var shape = this.shapes[i];
            var stats = shape.stats;
            if(stats.max.z>0){
                stroke(shape.color.stroke);
                strokeWeight(shape.color.weight*this.TD(1,0,stats.avg.z).x);
                if(!shape.color.doStroke){
                    noStroke();
                }
                fill(shape.color.fill);
                var points = shape.points;
                //}
                switch(shape.type){
                    case "point":
                        point(shape.point.x,shape.point.y);
                    break;
                    case "line":
                        line(points[0].x,points[0].y,points[1].x,points[0].y);
                    break;
                    case "triangle":
                        triangle(points[0].x,points[0].y,points[1].x,points[1].y,points[2].x,points[2].y);
                    break;
                    case "quad":
                        quad(points[0].x,points[0].y,points[1].x,points[1].y,points[2].x,points[2].y,points[3].x,points[3].y);
                    break;
                    case "sphere":
                        var d = this.TD(1,0,stats.avg.z).x;
                        ellipse(shape.point.x,shape.point.y,shape.r*d,shape.r*d);
                    break;
                    case "complex-shape":
                        beginShape(shape.modes.begin);

                        for(var i = 0; i < shape.points.length; i ++){
                            var v = shape.points[i];
                            if(v.type==="v"){
                                vertex(v.p.x,v.p.y);
                            } else if(v.type==="bv"){
                                bezierVertex(v.c1.x,v.c1.y,v.c2.x,v.c2.y,v.p.x,v.p.y);
                            }
                        }

                        endShape(shape.modes.end);
                    break;
                }
        //{
            }
        }
        this.resetShapes();
        //}
    },
};
Universe.prototype.create = function(){
    var g = this.g;

    g.background(0, 0, 0);
    g.pushMatrix();

    g.rotate(view.ax,0,0);
    g.rotate(0,view.ay,0);
    g.translate(-view.x,-view.y,-view.z);
    runStars(this.type,this.stars,this.starLength);
    for(var i in this.stars){
        var s = this.stars[i];
        g.fill(s.color);
        g.sphere(s.x,s.y,s.z,s.r);
    }

    view.runLasers(this.g,this.starLength/2);

    g.noStroke();
    g.popMatrix();

    this.g = g;
};
Universe.prototype.display = function(){
    push();
    translate(width/2,height/2);

    this.g.draw();

    pop();
};
Universe.prototype.run = function(){
    try {
        this.create();
    } catch(nothing) {}
    try {
        this.display();
    } catch(nothing) {}
};

var DisplayUniverse = function(s,type,d,rx,ry){
    var gs = generateStars(type,[],0,500,s);
    Universe.call(this,type,gs.stars,gs.length);
    this.d = d || this.starLength*2;
    this.rx = rx || 0;
    this.ry = ry || 0;
};
DisplayUniverse.prototype = Object.create(Universe.prototype);
DisplayUniverse.prototype.create = function(){
    var g = this.g;

    g.background(0, 0, 0);
    g.pushMatrix();

    g.rotate(this.rx,0.0,0.0);
    g.rotate(0.0,this.ry,0.0);
    g.translate(0.0,this.d,0.0);

    g.noStroke();
    for(var i in this.stars){
        var s = this.stars[i];
        g.fill(s.color);
        g.sphere(s.x,s.y,s.z,s.r);
    }

    g.noStroke();
    g.popMatrix();

    this.g = g;

};


//}


//UI Objects{


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
Slider.prototype.display = function(txtColor,smallSize,bigSize,thumbnailColor){
    rect(this.x,this.y+2,this.w,this.h-4,2);

		noStroke();
    fill(txtColor);
    textSize(smallSize);
    text(round(this.min),this.x,this.y-this.h/2);
    text(round(this.max),this.x+this.w,this.y-this.h/2);
    text(round(this.value),this.x+this.w/2,this.y-this.h/2);

    textSize(bigSize);
    text(this.label,this.x+this.w/2,this.y+this.h*2);

    fill(255, 0, 0);
    fill(thumbnailColor);
    rect(this.t-this.tw/2,this.y,this.tw,this.h,2);
};
Slider.prototype.update = function(){

    if(mouseX>this.t-this.tw/2&&mouseX<this.t+this.tw/2&&mouseY>this.y&&mouseY<this.y+this.h){
        cursor(HAND);
        if(pressed){
            this.dragged = true;
        }
    } if(this.dragged){
        cursor(HAND);
        if(clicked){
            this.dragged = false;
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
Slider.prototype.draw = function(txtColor,smallSize,bigSize,thumbnailColor) {
    this.update();
    this.display(txtColor,smallSize,bigSize,thumbnailColor);
};

var starAmountSlider = starAmountSlider || new Slider("Stars",50,200,300,20,20,100/3,100,10000);

var universeSizeSlider = universeSizeSlider || new Slider("Universe Size",50,300,300,20,20,66,1000,100000);

var generateSpeedSlider = generateSpeedSlider || new Slider("Generate Speed",50,400,300,20,20,75,1,amountOfStars);
//}


//Selector{

var Selector = function(name,x,y,w,h,list,selection,data){
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = w/list.length;
    this.h = h;
    this.list = list;
    this.data = data || list;
    if(selection instanceof Number){
        if(selection-1 > this.list.length){
            this.selection = this.list[0];
            this.index = 0;
        } else {
            this.selection = this.list[selection];
            this.index = selection;
        }
    } else if(selection instanceof String){
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
        if(i!==this.index){
            if(mouseX>this.x+this.w*i&&mouseX<this.x+this.w*(i+1)&&mouseY>this.y&&mouseY<this.y+this.h){
                cursor(HAND);
                if(pressed){
                    this.selection = this.list[i];
                    this.index = i;
                }
            }
        }
    }
};
Selector.prototype.display = function(titleColor,titleSize,selectColor,textColor){
    stroke(0);
    strokeWeight(1);
    rect(this.x,this.y,this.w*this.list.length,this.h,5);
    for(var i = 1; i < this.list.length; i ++){
        line(this.x+i*this.w,this.y,this.x+i*this.w,this.y+this.h);
    }

		noStroke();
    for(var i = 0; i < this.list.length; i ++){
        if(i===this.index){
            fill(selectColor);
        } else {
            fill(textColor);
        }
        text(this.list[i],this.x+this.w*i,this.y,this.w,this.h);
    }
    fill(titleColor);
    textSize(titleSize);
    text(this.name,this.x+(this.w*this.list.length)/2,this.y+this.h*1.5);
};
Selector.prototype.draw = function(titleColor,titleSize,selectColor,textColor) {
    this.update();
    this.display(titleColor,titleSize,selectColor,textColor);
};
Selector.prototype.get = function(){
    return this.data[this.index];
};

var typeSelector = typeSelector || new Selector("Type",50,475,300,50,["Spiral","Tube","Infinite","Sphere","Sphere Center","Sphere Outer","Outline"],0,["spiral","tube","infinite","sphere","sphere-center","sphere-outer","outline"]);

//}


//Button{
var Button = function(text,x,y,w,h){
    this.text = text;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
};
Button.prototype.update = function(){
    if(mouseX>this.x&&mouseX<this.x+this.w&&mouseY>this.y&&mouseY<this.y+this.h){
        cursor(HAND);
        if(clicked){
            this.react();
        }
    }
};
Button.prototype.display = function(textColor){
    rect(this.x,this.y,this.w,this.h,5);
    fill(textColor);
		noStroke();
    text(this.text,this.x+this.w/2,this.y+this.h/2);
};
Button.prototype.react = function(){
    print("You pressed me!\nAdd a react function for me to do something better!");
};
Button.prototype.draw = function(textColor) {
    this.update();
    this.display(textColor);
};

var generateButton = generateButton || new Button("Generate\nUniverse",390,510,200,80);
generateButton.react = function(){
    scene = "generate";
};

//}


//}


//Scenes{

var loadPreviews = function(){
    switch(load){
        case 0:
            spiralGalaxy = new DisplayUniverse(5000,"spiral",5000,PI/2,0);
        break;
        case 1:
            spiralGalaxy.run();
            spiralGalaxyImage = get();
        break;
        case 2:
            tubeGalaxy=new DisplayUniverse(20000,"tube",10000,PI/2,PI/2);

        break;
        case 3:
            tubeGalaxy.run();
            tubeGalaxyImage = get();
        break;
        case 4:
            infiniteGalaxy=new DisplayUniverse(10000,"infinite",1,0,0);
        break;
        case 5:
            infiniteGalaxy.run();
            infiniteGalaxyImage = get();
        break;
        case 6:
            sphereGalaxy = new DisplayUniverse(4000,"sphere",10000,PI/2,0);
        break;
        case 7:
            sphereGalaxy.run();
            sphereGalaxyImage = get();
        break;
        case 8:
            sphereCenterGalaxy = new DisplayUniverse(5000,"sphere-center",12000,PI/2,0);
        break;
        case 9:
            sphereCenterGalaxy.run();
            sphereCenterGalaxyImage = get();
        break;
        case 10:
            sphereOuterGalaxy = new DisplayUniverse(5000,"sphere-outer",12000,PI/2,0);
        break;
        case 11:
            sphereOuterGalaxy.run();
            sphereOuterGalaxyImage = get();
        break;
        case 12:
            outlineGalaxy = new DisplayUniverse(5000,"outline",12000,PI/2,0);
        break;
        case 13:
            outlineGalaxy.run();
            outlineGalaxyImage = get();

        break;
        default:
            images[".spiral"] = spiralGalaxyImage;
            images[".tube"] = tubeGalaxyImage;
            images[".infinite"] = infiniteGalaxyImage;
            images[".sphere"] = sphereGalaxyImage;
            images[".sphere-center"] = sphereCenterGalaxyImage;
            images[".sphere-outer"] = sphereOuterGalaxyImage;
            images[".outline"] = outlineGalaxyImage;

            scene = "menu";
        break;
    }
    load++;
};

var menu = function(){
    mouseX=pmouseX*600/width;
    mouseY=pmouseY*600/height;
    push();
    scale((width+height)/1200);

    //Title & background{
    image(images["."+universeType],0,0);
    fill(0,200);
    noStroke();
    rect(0,0,width,height);

    textAlign(LEFT,TOP);
    fill(255, 200);
    textFont(f21,50);
    text("UNIVERSE",50,50);
    var h = textAscent()+textDescent()+5;
    textFont(f11,50);
    text("GENERATOR",50,50+h);
    //}


    //Instuctions{
    textFont(f12,20);
    text("   Use WASD, arrows, or your mouse to look around.\n   Use SPACE to accelerate your vehicle\n   X can fire a small green laser into the abyss of space\n   Z slows you down\n   Sizes & distances are not to scale\n   Your speed is also impossible, as your are going thousands of times the speed of light.",390,80,200,height-180);
    //}


    //UI{
    textAlign(CENTER,CENTER);
    textFont(f20);

    fill(255,200);
    starAmountSlider.draw(255,15,30,255);
    amountOfStars = starAmountSlider.get();

    fill(255,200);
    universeSizeSlider.draw(255,15,30,255);
    sizeOfUniverse = universeSizeSlider.get();

    generateSpeedSlider.max = amountOfStars/2;
    fill(255,200);
    generateSpeedSlider.draw(255,15,30,255);
    generateSpeed = generateSpeedSlider.get();

    textSize(13);
    fill(255,200);
    typeSelector.draw(255,30,color(0, 94, 97),0);
    universeType = typeSelector.get();

    fill(255,200);
    noStroke();
    textSize(29);
    generateButton.draw(50);

    //}

    pop();
};

var generate = function(){

    image(images["."+universeType],0,0);
    fill(0,255-(loadStar/amountOfStars)*255);
    noStroke();
    rect(0,0,width,height);

    var gs = generateStars(universeType,generatedStars,loadStar,loadStar+generateSpeed,sizeOfUniverse,amountOfStars);
    generatedStars = gs.stars;
    loadStar = gs.i;
    if(gs.message==="done"){
        scene = "view";
        universe = new Universe(universeType,generatedStars,gs.length);
    }
    fill(255);
    textFont(f13,50);
    textAlign(CENTER,CENTER);
    text("Loading...\n"+round(loadStar)+"/"+round(amountOfStars),width/2,height/2);
};

var viewUniverse = function(){
    universe.run();
    view.run();
};

//}

draw = function() {
    cursor("default");

    switch(scene){
        case "load": loadPreviews(); break;
        case "menu": menu(); break;
        case "generate": generate(); break;
        case "view": viewUniverse(); break;
    }


    clicked = false;
    pressed = false;
};


//Thanks!
