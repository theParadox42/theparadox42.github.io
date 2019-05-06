
//3D{
var g = {
    //This code was made by Paradox Programming for 3D use
    
    //Perspective, recommended 500-1500
    TDPerspective: 1000,
    /**This is how far back the camera is
     * 1st person, make it 0,
     * 3rd person, recommended the TDPerspective + 250
    */
    stepBack: 0,
    //Perspective
    TD: function(x,y,z){
        var Z = z+this.stepBack;
        var d = sqrt(Z*Z+x*x+y*y);
        
        
        
        //Does some perspective stuff
        var dx = x/z*this.TDPerspective;
        var dy = y/z*this.TDPerspective;
        
        
        //Returns the 2D version of it
        return {x: dx,y: dy,dist:d};
        
    },
    //Matrix
    matrix: [[]],
    //Shapes, and complex "shape"
    shapes: [],
    shape: [],
    //Color setup
    colorSetup: {
        fill: color(255),
        doFill: true,
        stroke: color(0),
        strokeWeight: 1,
        doStroke: true,
    },
    modes: {
        ellipseDetail: 90,
        ellipseType: "bezier",
        ellipseMode: CENTER,
        rectMode: CENTER,
    },
    groundData: false,
    //Color functions{
    /**PLEASE USE*/
    background: function(r,g,b,a){
        this.resetShapes();
        this.matrix = [[]];
        background(r,g,b,a);
    },
    fill: function(r,g,b,a){
        if(g===undefined){
            this.colorSetup.fill = color(r);
        } else if(a===undefined){
            this.colorSetup.fill = color(r,g,b);
        } else {
            this.colorSetup.fill = color(r,g,b,a);
        }
        this.colorSetup.doFill = true;
    },
    noFill: function(){
        this.colorSetup.doFill = true;
    },
    stroke: function(r,g,b,a){
        if(g===undefined){
            this.colorSetup.stroke = color(r);
        } else if(a===undefined){
            this.colorSetup.stroke = color(r,g,b);
        } else {
            this.colorSetup.stroke = color(r,g,b,a);
        }
        this.colorSetup.doStroke = true;
    },
    strokeWeight: function(thickness){
        this.colorSetup.weight = thickness;
    },
    noStroke: function(){
        this.colorSetup.doStroke = false;
    },
    getColor: function(){
        var cs = this.colorSetup;
        return {fill: cs.fill,stroke: cs.stroke, weight: cs.weight,doStroke: cs.doStroke,doFill: cs.doFill};
    },
    //}
    //Mode functions{
    ellipseDetail: function(n){
        this.modes.ellipseDetail = n;
    },
    ellipseType: function(TYPE){
        if(TYPE==="bezier"||TYPE==="vertex"){
            
        } else {
            throw {
                message: 'Ellipse Types can only be of type "bezier" and type "vertex"'
            };
        }
    },
    ellipseMode: function(MODE){
        if(MODE===CORNER||MODE===CORNERS||MODE===CENTER){
            this.modes.ellipseMode = MODE;
        } else {
            throw {
                message: 'Ellipse Modes can only be "CORNER", "CORNERS", or "CENTER"'
            };
        }
            
    },
    rectMode: function(MODE){
        if(MODE===CORNER||MODE===CORNERS||MODE===CENTER){
            this.modes.rectMode = MODE;
        } else {
            throw {
                message: 'Rect Modes can only be "CORNER", "CORNERS", or "CENTER"'
            };
        }
    },
    //}
    //Matrix functions{
    pushMatrix: function(){
        this.matrix.push([]);
    },
    translate: function(x,y,z){
        var endOfMatrix = this.matrix.length-1;
        this.matrix[endOfMatrix].push({type: "translate", data: {x: x||0, y: y||0, z: z||0}});
    },
    scale: function(x,y,z){
        var endOfMatrix = this.matrix.length-1;
        var data = {};
        if(!y){
            data.x = x||1;
            data.y = x||1;
            data.z = x||1;
        } else {
            data.x = x||1;
            data.y = y||1;
            data.z = z||1;
        }
        this.matrix[endOfMatrix].push({type: "scale", data: data});
    },
    rotate: function(x,y,z){
        var endOfMatrix = this.matrix.length-1;
        x = x||0;
        y = y||0;
        z = z||0;
        var cosX = cos(x);
        var sinX = sin(x);
        var cosY = cos(y);
        var sinY = sin(y);
        var cosZ = cos(z);
        var sinZ = sin(z);
        
        this.matrix[endOfMatrix].push({type: "rotate", data: {x: x, y: y, z: z,
        cos:{
        x: cosX,
        y: cosY,
        z: cosZ,
        },
        sin: {
        x: sinX,
        y: sinY,
        z: sinZ,
        }
        }});
    },
    rotateX: function(a){
        this.rotate(a,0,0);
    },
    rotateY: function(a){
        this.rotate(0,a,0);
    },
    rotateZ: function(a){
        this.rotate(0,0,a);
    },
    resetMatrix: function(){
        this.matrix = [[]];
    },
    popMatrix: function(){
        this.matrix.pop();
    },
    //}
    //Position functions{
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
                    if(data.x){
                        var dummyY = Y;
                        Y = data.cos.x * Y - data.sin.x * Z;
                        Z = data.cos.x * Z + data.sin.x * dummyY;
                    } if(data.y){
                        var dummyX = X;
                        X = data.cos.y * X - data.sin.y * Z;
                        Z = data.cos.y * Z + data.sin.y * dummyX;
                    } if(data.z){
                        var dummyX = X;
                        X = data.cos.z * X - data.sin.z * Y;
                        Y = data.cos.z * Y + data.sin.z * dummyX;
                    }
                }
            }
        }
        var td = this.TD(X,Y,Z);
        var d = this.TD(1,0,Z).x;
        return {x: td.x, y: td.y, X: X, Y: Y, Z: Z,ry: ry,d:d,dist: td.dist};
    },
    minAvgMax: function(points){
        var starterPoint = points[0];
        var c = {x:0,y:0,z:0,dist:0};
        var ma = {x:starterPoint.X,y:starterPoint.Y,z:starterPoint.Z,dist:starterPoint.dist};
        var mi = {x: starterPoint.X,y:starterPoint.Y,z:starterPoint.Z,dist:starterPoint.dist};
        for(var i = 0; i < points.length; i ++){
            var p = points[i];
            var x = p.X;
            var y = p.Y;
            var z = p.Z;
            var d = p.dist;
            c.x+=x;
            c.y+=y;
            c.z+=z;
            c.dist+=d;
            ma.x = max(ma.x,x);
            ma.y = max(ma.y,y);
            ma.z = max(ma.z,z);
            ma.dist = max(ma.dist,d);
            mi.x = min(mi.x,x);
            mi.y = min(mi.y,y);
            mi.z = min(mi.z,z);
            mi.dist = min(mi.dist,d);
        }
        c.x/=points.length-1;
        c.y/=points.length-1;
        c.z/=points.length-1;
        c.dist/=points.length-1;
        return {avg:c,max:ma,min:mi};
    },
    //}
    //Shape functions{
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
        if(this.modes.rectMode===CORNER){
            this.quad(x,y,z,x,y+h,z,x,y+h,z+d,x,y,z+d);
        } else if(this.modes.rectMode===CORNERS){
            this.quad(x,y,z,x,h,z,x,h,d,x,y,d);
        } else if(this.modes.rectMode===CENTER){
            this.quad(x,y-h/2,z-d/2,x,y+h/2,z-d/2,x,y+h/2,z+d/2,x,y-h/2,z+d/2);
        }
    },
    yrect: function(x,y,z,w,d){
        if(this.modes.rectMode===CORNER){
            this.quad(x,y,z,x+w,y,z,x+w,y,z+d,x,y,z+d);
        } else if(this.modes.rectMode===CORNERS){
            this.quad(x,y,z,w,y,z,w,y,d,x,y,d);
        } else if(this.modes.rectMode===CENTER){
            this.quad(x-w/2,y,z-d/2,x+w/2,y,z-d/2,x+w/2,y,z+d/2,x-w/2,y,z+d/2);
        }
    },
    zrect: function(x,y,z,w,h){
        if(this.modes.rectMode===CORNER){
            this.quad(x,y,z,x,y+h,z,x+w,y+h,z,x+w,y,z);
        } else if(this.modes.rectMode===CORNERS){
            this.quad(x,y,z,x,h,z,w,h,z,w,y,z);
        } else if(this.modes.rectMode===CENTER){
            this.quad(x-w/2,y-h/2,z,x-w/2,y+h/2,z,x+w/2,y+h/2,z,x+w/2,y-h/2,z);
        }
    },
    cube: function(x,y,z,w,h,d,c1,c2,c3){
        if(c1){
            this.fill(c1);
        }
        if(this.modes.rectMode===CORNER){
            this.xrect(x,y,z,h,d);
            this.xrect(x+w,y,z,h,d);
        } else if(this.modes.rectMode===CENTER){
            this.xrect(x-w/2,y,z,h,d);
            this.xrect(x+w/2,y,z,h,d);
        } else if(this.modes.rectMode===CORNERS){
            this.xrect(x,y,z,h,d);
            this.xrect(w,y,z,h,d);
        } else {
            throw {
                message: 'Not a valid "rectMode"'
            };
        }
        if(c2){
            this.fill(c2);
        }
        if(this.modes.rectMode===CORNER){
            this.yrect(x,y,z,w,d);
            this.yrect(x,y+h,z,w,d);
        } else if(this.modes.rectMode===CENTER){
            this.yrect(x,y-h/2,z,w,d);
            this.yrect(x,y+h/2,z,w,d);
        } else if(this.modes.rectMode===CORNERS){
            this.yrect(x,y,z,w,d);
            this.yrect(x,h,z,w,d);
        }
        if(c3){
            this.fill(c3);
        }
        if(this.modes.rectMode===CORNER){
            this.zrect(x,y,z,w,h);
            this.zrect(x,y,z+d,w,h);
        } else if(this.modes.rectMode===CENTER){
            this.zrect(x,y,z-d/2,w,h);
            this.zrect(x,y,z+d/2,w,h);
        } else if(this.modes.rectMode===CORNERS){
            this.zrect(x,y,z,w,h);
            this.zrect(z,y,d,w,h);
        }
    },
    ellipse: function(x,y,z,w,h){
        w/=2;
        h/=2;
        var x0, y0, x1, y1, x2, y2, x3, y3;
        if(this.modes.ellipseType==="bezier"){
            if(this.modes.ellipseMode===CENTER){
                x0 = x-w;
                y0 = y;
                x1 = x;
                y1 = y-h;
                x2 = x+w;
                y2 = y;
                x3 = x;
                y3 = y+h;
            } else if(this.modes.ellipseMode===CORNER){
                x0 = x;
                y0 = y+h;
                x1 = x+w;
                y1 = y;
                x2 = x+w*2;
                y2 = y+h;
                x3 = x+w;
                y3 = y+h*2;
            } else if(this.modes.ellipseMode===CORNERS){
                w*=2;
                h*=2;
                var mx = (x+w)/2;
                var my = (y+h)/2;
                x0 = x;
                y0 = my;
                x1 = mx;
                y1 = y;
                x2 = w;
                y2 = my;
                x3 = mx;
                y3 = h;
            }
            this.beginShape();
            this.vertex(x0 ,y0 ,z);
            this.bezierVertex(x0,y0,z,x0,y1,z,x1,y1,z);
            this.bezierVertex(x1,y1,z,x2,y1,z,x2,y2,z);
            this.bezierVertex(x2,y2,z,x2,y3,z,x3,y3,z);
            this.bezierVertex(x3,y3,z,x0,y3,z,x0,y0,z);
            this.endShape();
        } else {
            
        }
    },
    sphere: function(x,y,z,r){
        var p = this.r(x,y,z);
        var av = {x: p.X, y: p.Y, z: p.Z};
        var ma = {x: p.X, y: p.Y, z: p.Z+r*p.d};
        var mi = {x: p.X, y: p.Y, z: p.Z-r*p.d};
        this.shapes.push({type:"sphere",point:p,r:r,stats:{min:mi,avg:av,max:ma},color:this.getColor()});
        
    },
    beginShape: function(MODE){
        this.shape = [];
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
    curveVertex: function(x,y,z){
        this.shape.push({type: "cv",p:this.r(x,y,z)});
    },
    cv: function(x,y,z){
        this.curveVertex();
    },
    endShape: function(MODE){
        this.shape.push({type:"end",mode:MODE});
        var shape = [].concat(this.shape);
        var points = [];
        try {
            for(var i = 1; i < this.shape.length-1; i ++){
                points.push(shape[i].p);
            }
        } catch(e){
            println('An error occured while generating a complex shape\nDid you put "g.beginShape()" before all vertexes?');
        }
        this.shapes.push({
            type:"complex-shape",
            points:shape,
            stats:this.minAvgMax(points),
            color:this.getColor(),
            modes:{
                begin:shape[0].mode,
                end:shape[this.shape.length-1].mode
            }
        });
        this.shape = [];
    },
    ground: function(y,z){
        var p = this.r(0,y,z);
        var p2 = this.TD(0,p.Y,z);
        this.groundData = {
            color: this.getColor(),
            p: p2,
        };
    },
    //}
    //Drawing, sorting, and reseting{
    sort: function(){
        this.shapes.sort(function(a,b){
            try {
                var s1 = a.stats;
                var s2 = b.stats;
                if(!s1.max||!s2.max){
                    return 0;
                } else {
                    return s2.max.dist-s1.max.dist;
                }
            } catch(e){
                return 0;
            }
        });
        
    },
    resetShapes: function(){
        this.shapes = [];
        this.shape = [];
    },
    draw: function(){
        this.sort();
        if(this.groundData){
            var colorSetup = this.groundData.color;
            fill(colorSetup.fill);
            if(!colorSetup.doFill){
                noFill();
            }
            stroke(colorSetup.stroke);
            if(!colorSetup.doStroke){
                noStroke();
            }
            rect(-width,this.groundData.p.y,width*2,height*2);
        }
        for(var i = 0; i < this.shapes.length; i ++){
            var shape = this.shapes[i];
            var stats = shape.stats;
            if(stats.max.z>-this.stepBack){
                stroke(shape.color.stroke);
                strokeWeight(shape.color.weight*this.TD(1,0,stats.avg.z).x);
                if(!shape.color.doStroke){
                    noStroke();
                }
                fill(shape.color.fill);
                if(!shape.color.doFill){
                    noFill();
                }
                var points = shape.points;
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
                        var d = this.TD(1,0,stats.avg.z).x|| width*height;
                        ellipse(shape.point.x,shape.point.y,shape.r*d,shape.r*d);
                    break;
                    case "complex-shape":
                        beginShape(shape.modes.begin);
                        for(var j = 0; j < points.length; j ++){
                            var v = points[j];
                            if(v.type==="v"){
                                vertex(v.p.x,v.p.y);
                            } else if(v.type==="bv"){
                                bezierVertex(v.c1.x,v.c1.y,v.c2.x,v.c2.y,v.p.x,v.p.y);
                            } else if(v.type==="cv"){
                                curveVertex(v.p.x,v.p.y);
                            }
                        }
                        
                        endShape(shape.modes.end);
                    break;
                }
            }
        }
        this.resetShapes();
    },
    //}
};
//}
