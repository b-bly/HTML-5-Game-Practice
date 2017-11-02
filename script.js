console.log('script loaded');

//modified from https://www.w3schools.com/graphics/game_intro.asp
var myGamePiece;
var ground;
var groundTwo;
var temporaryGroundArr = [];

//replace ground vars with ground = []
var GROUND_LEVEL = 400;

function startGame() {
    myGameArea.start();
    //parameters: width, height, color, x, y
    var height = 30;
    myGamePiece = new component(height, height, "red", 10, GROUND_LEVEL - height);
    //myObstacle = new component(10, 200, "green", 300, 120);
    ground = new component(400, 10, "green", 0, 400);
    groundTwo = new component(400, 20, "green", 400, 400);

    //replace
    temporaryGroundArr.push(ground);
    temporaryGroundArr.push(ground);
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        this.keys = {};
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateGameArea() {
    myGamePiece.speedX = 0;
    //myGamePiece.speedY = 0;
    //MOVE LEFT RIGHT
    if (crashWithGround(temporaryGroundArr) == false) {

        if (myGameArea.keys && myGameArea.keys[37]) { myGamePiece.speedX = -20; }
        if (myGameArea.keys && myGameArea.keys[39]) { myGamePiece.speedX = 20; }
        // if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; } //down
        // if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1; } //up
    }
    //JUMP
    if (myGamePiece.y + myGamePiece.height >= GROUND_LEVEL) { //if at or below ground level
        //so you can't jump while already in air
        if (myGameArea.keys && myGameArea.keys[32]) { //JUMP
            myGamePiece.speedY = -20;
            //reset gravitySpeedDifferential
            myGamePiece.gravitySpeedDifferential = 0;
        }
    }
    myGameArea.clear();
    ground.update();
    groundTwo.update();
    myGamePiece.newPos();
    myGamePiece.update();
}
function crashWithGround(groundArray) {
    for (var i = 0; i < groundArray.length; i++) {
        if (myGamePiece.crashWith(groundArray[i]) == true) {
            return true;
        }
    }
    return false;
}
//PLAN
//1. draw land 
//2. land collision function:
    // if you run into a wall, you need to jump over it.  If crashing on x value, speedX = 0
    // how to handle different y values of ground level for character
//3. replace 