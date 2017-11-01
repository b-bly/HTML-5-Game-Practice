console.log('script loaded');

//modified from https://www.w3schools.com/graphics/game_intro.asp
var myGamePiece;
var ground = [];
var GROUND_LEVEL = 400;

function startGame() {
    myGameArea.start();
    //parameters: width, height, color, x, y
    var height = 30;
    myGamePiece = new component(height, 30, "red", 10, GROUND_LEVEL - height);
    //myObstacle = new component(10, 200, "green", 300, 120);
    ground = new component(400, 10, "green", 0, 400);
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

function component(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.gravityAcceleration = 1;
    this.gravitySpeedDifferential = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        var myBottom = this.y + this.height;
        this.x += this.speedX;
        if (myBottom < GROUND_LEVEL) { // if in air
            this.gravitySpeedDifferential += this.gravityAcceleration;
            this.y += this.speedY + this.gravitySpeedDifferential;
            if (this.y  < 0) { //if above canvas
                this.y = 0;
            }
 
        } else { //not in air
            this.y += this.speedY;
        }
        if (myBottom > GROUND_LEVEL) { // if below ground level
            this.y = GROUND_LEVEL - this.height;
            this.speedY = 0;
        }
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        // if myRight < yourRight && myBottom > yourTop
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
    this.getGROUND_LEVEL = function (otherObjectsArray) {
        //search for objects within the myleft and myright range below gamePiece
        //object with highest otherObjTop that is lower than mybottom = GROUND_LEVEL
        
        otherObjectsArray.forEach(function(obj, i) {

        })
    }
}

function updateGameArea() {
    myGamePiece.speedX = 0;
    //myGamePiece.speedY = 0;
    // if (myGamePiece.crashWith(myObstacle)) {
    //     
    // } 
    // else {
        if (myGameArea.keys && myGameArea.keys[37]) { myGamePiece.speedX = -20; }
        if (myGameArea.keys && myGameArea.keys[39]) { myGamePiece.speedX = 20; }
        // if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; } //down
        // if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1; } //up

        if (myGamePiece.y + myGamePiece.height >= GROUND_LEVEL) {//so you can't jump while already in air
            if (myGameArea.keys && myGameArea.keys[32]) { //jump
                myGamePiece.speedY = -20;
                //reset gravitySpeedDifferential
                myGamePiece.gravitySpeedDifferential = 0;
            }
        }

        myGameArea.clear();
        ground.update();
        myGamePiece.newPos();
        myGamePiece.update();
    //}
}

//PLAN
//1. draw land 
//2. land collision function:
    // if you run into a wall, you need to jump over it.  If crashing on x value, speedX = 0
    // how to handle different y values of ground level for character
//3. replace 