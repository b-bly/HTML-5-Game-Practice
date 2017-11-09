
//modified from https://www.w3schools.com/graphics/game_intro.asp
var myGamePiece;
var ground;
var groundTwo;
var background;
var temporaryGroundArr = [];

//replace ground vars with ground = []
var GROUND_LEVEL = 400;
var BOTTOM = 410;

function startGame() {
    myGameArea.start();
    //parameters: width, height, color, x, y
    var height = 30;
    var width = 30;
    myGamePiece = new component(width, height, "red", 10, GROUND_LEVEL - height);
    //myObstacle = new component(10, 200, "green", 300, 120);
    height = 10, width = 400;
    ground = new component(width, height, "green", 0, BOTTOM - height);
    height = 50, width = 400;
    groundTwo = new component(width, height, "green", 400, BOTTOM - height);

    height = 40, width = 200;
    background = new component(width, height, "gray", 400, BOTTOM/2);
    //replace
    temporaryGroundArr.push(ground);
    temporaryGroundArr.push(groundTwo);
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
    myGamePiece.getGROUND_LEVEL(temporaryGroundArr);
    //myGamePiece.speedY = 0;
    //MOVE LEFT RIGHT
    //*****need to distinguish between left and right crashes.  Right now I can't
    //move after a collision***
    //37 = left, 39 = right
    var hitsGround = crashWithGround(temporaryGroundArr);
        if (myGameArea.keys && myGameArea.keys[37] && hitsGround !== 'right') { //right refers to ground side
            myGamePiece.speedX = -20; 
        }
        if (myGameArea.keys && myGameArea.keys[39] && hitsGround !== 'left') { 
            myGamePiece.speedX = 20; 
        }
     
    //test ground level function: 71 = G key
    if (myGameArea.keys && myGameArea.keys[71]) {
        //myGamePiece.getGROUND_LEVEL(temporaryGroundArr);
        console.log('hitsGround');
        console.log(hitsGround);
    }
    // if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; } //down
    // if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1; } //up

    //JUMP
    if (myGamePiece.y + myGamePiece.height >= myGamePiece.groundLevel) { //if at or below ground level
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
    background.update();
}

function crashWithGround(groundArray) {
    for (var i = 0; i < groundArray.length; i++) {
        var collision = myGamePiece.collide(groundArray[i]);
        if (collision != 'none') {
            if (collision == 'right') return 'right';
            if (collision == 'left') return 'left';
        }
    }
    return false;
}
//Next steps:

//Add background

//separate ground into:
    //mainGround component
    //array of groundPieces
//the mainGround will not be passed to the crashWithGround function
//pass mainGround to check for ground level?  or just set to ground level default if no other groundPiece
//is under the player?

//Scroll background when player moves.
//Make sprite for character.