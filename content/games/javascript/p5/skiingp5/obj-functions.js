
var objs = [];

function keepObjOnScreen(obj,p){
	if(obj.y+obj.r<-transY-cameraY){
		obj.y+=height+obj.h*2;
		obj.x = random(width)-width/2;
		if(obj.setRandom){
			obj.setRandom();
		}
	}
	if(!obj.x||!obj.w){
		obj.x = obj.x || 0;
		obj.w = obj.w || 20;
	}
  while (obj.x+obj.w/2<p.x-width/2){
		obj.x+=width+obj.w;
	}
	while (obj.x-obj.w/2>p.x+width/2){
		obj.x-=width+obj.w;
	}
};
function findSkier(obj){
	return obj.type == "skier";
};
function findObstacles(obj){
	return obj.collide == true || obj.obstacle;
};
function createObjects(){
	objs = [];
	let newSkier = skier.copy();
	transX = -newSkier.x;
	transY = -newSkier.y;
	objs.push(newSkier);
	Tree.create(treeAmount);
	Bear.create(treeAmount/5);
	DefaultPowerUp.create(2);
};
function sortObjects(a,b){
	if(a && b){
		if(a.type=="trail"||b.type=="trail"){
			if(a.type=="trail"&&b.type=="trail"){
				return b.y-a.y;
			} else {
				if(a.type=="trail"){
					return 1;
				} else {
					return -1;
				}
			}
		} else {
			return b.y - a.y;
		}
	} else {
		return 0;
	}
};
function addObjects(p){
	if(frameCount%400==0){
		Tree.create(4,p.y+height);
		Bear.create(2,p.y+height);
		DefaultPowerUp.create(1,p.y+height);
	}
};
function runObjects(){
	objs.sort(sortObjects);
	
	let p = objs.find(findSkier);
	setTrans(-p.x,-p.y);
	
	for(var i = objs.length-1; i > -1; i --){
		let o = objs[i];
		if(o){
			if(o.remove){
				objs.splice(i, 1);
			} else {
				let type = o.type;
				switch(type){
					case "tree":
						o.draw(p);
					break;
					case "skier":
						o.run();
					break;
					case "trail":
						o.display();
						if(o.y<p.y-cameraY-30){
							objs.splice(i,1);
						}
					break;
					case "bear":
						o.run(p);
					break;
					case "powerup":
						o.run(p);
						if(o.collected){
							objs.splice(i,1);
						}
					break;
					default:
						if(o.run){
							o.run(p);
						} else if(o.draw){
							o.draw(p);
						} else if(o.display){
							if(o.update){
								o.update(p);
							}
							o.display();
						}
					break;
				}
			}
		}
	}
	let obstacles = objs.filter(findObstacles);
	p.collide(obstacles);
	addObjects(p);
};






