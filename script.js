console.log('script loaded');

//modified from https://www.w3schools.com/graphics/game_intro.asp
var myGamePiece;
var groundLevel = 400;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "red", 10, groundLevel);
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.gravityAcceleration = 10;
    this.gravitySpeedDifferential = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.x += this.speedX;
        if (this.y < groundLevel) { // if in air
            this.gravitySpeedDifferential += this.gravityAcceleration;
            this.y += this.speedY + this.gravitySpeedDifferential;
            if (this.y < 0) { //if above canvas
                this.y = 0;
            }
        } else { //not in air
            this.y += this.speedY;
            if (this.y > groundLevel) { //if below ground level
                this.y = groundLevel;
            }
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.key && myGameArea.key == 37) { myGamePiece.speedX = -20; } //left
    if (myGameArea.key && myGameArea.key == 39) { myGamePiece.speedX = 20; } //right
    // if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; } //down
    // if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1; } //up
    //add if statement: so you can't jump while already in air
    if (myGameArea.key && myGameArea.key == 32) { //jump
        myGamePiece.speedY = -100;
        //reset gravitySpeedDifferential
        myGamePiece.gravitySpeedDifferential = 0;
    }

    myGamePiece.newPos();
    myGamePiece.update();
}