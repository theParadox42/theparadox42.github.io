
var networkContainer = document.getElementsByClassName("network-container")[0];
console.log(networkContainer);

function setup(){
    var canvas = createCanvas()
    canvas.parent("network-container");
    canvas.elt.style.width = "100%";
    canvas.elt.style.height = "300px";
    background(0, 0, 0)
}

function draw(){
    background(0, 0, 0)
}

function windowResized(){
    resizeCanvas();
}
