
var numSquares = 6;
var colors = [];
var squares = document.getElementsByClassName("square");
var pickedColor;
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetBtn = document.getElementById("reset");
var modeBtns = document.getElementsByClassName("mode");

init();

function init(){
    resetBtn.addEventListener("click", reset);

    for(var i = 0; i < modeBtns.length; i ++){
        modeBtns[i].addEventListener("click", function(){
            modeBtns[0].classList.remove("selected");
            modeBtns[1].classList.remove("selected");
            this.classList.add("selected");
            numSquares = this.textContent == "Easy" ? 3 : 6;
            reset();
        });
    }
    for(var i = 0; i < squares.length; i ++){
        //Add Colors
        squares[i].style.backgroundColor = colors[i];

        //Add click listeners
        squares[i].addEventListener("click", function(){
            let clickedColor = this.style.backgroundColor;
            if(clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                changeColors(pickedColor);
                h1.style.backgroundColor = pickedColor;
                resetBtn.textContent = "Play Again";
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }

    reset();
}

function reset(){
    resetBtn.textContent = "New Colors";
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    h1.style.backgroundColor = "steelblue";
    for(var i = 0; i < squares.length; i ++){
        if(colors[i]) {
            squares[i].style.display = "block"
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    messageDisplay.textContent = "";

}

function changeColors(color) {
    for(var i = 0; i < squares.length; i ++){
        squares[i].style.backgroundColor = color;
    }
};

function pickColor(){
    return colors[Math.floor(Math.random() * colors.length)]
}

function generateRandomColors(n){
    var arr = [];

    for(var i = 0; i < n; i ++){
        let red = Math.floor(Math.random()*256);
        let green = Math.floor(Math.random()*256);
        let blue = Math.floor(Math.random()*256);
        var newColor = "rgb(" + red + ", " + green + ", " + blue + ")";

        arr.push(newColor);
    }

    return arr;
}
