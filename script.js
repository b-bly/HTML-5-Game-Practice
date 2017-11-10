
//modified from https://www.w3schools.com/graphics/game_intro.asp
var myGamePiece;
var ground;
var groundTwo;
var foreground, foregroundTwo, foregroundThree, background, backgroundTwo;
var temporaryGroundArr = [];
var allComponents = [];

//replace ground vars with ground = []
var GROUND_LEVEL = 400;
//the foreground image is supposed to be 200px high.  
//When bottom = 888 it looks like the game piece is sitting right at ground level.
var BOTTOM = 888;

function startGame() {
    myGameArea.start();
    //parameters: width, height, color, x, y
    var height = 30;
    var width = 30;
    myGamePiece = new gamePiece(width, height, "red", 100, GROUND_LEVEL - height);


    //myObstacle = new component(10, 200, "green", 300, 120);
    height = 10, width = 400;
    ground = new component(width, height, "green", 0, BOTTOM - height);

    

    height = 50, width = 2000;
    groundTwo = new component(width, height, "green", 400, BOTTOM - height);

    height = 1000, width = 1000;
    background = new image(width, height, 'forest/Trees.png', 0, 0, 'image');
    height = 1000, width = 1000;
    backgroundTwo = new image(width, height, 'forest/Trees.png', 1000, 0, 'image');

    height = 200, width = 1000;
    foreground = new image(width, height, 'forest/grass.png', 0, 800, 'image');
    height = 200, width = 1000;
    foregroundTwo = new image(width, height, 'forest/grass.png', 1000, 800, 'image');
    height = 200, width = 1000;
    foregroundThree = new image(width, height, 'forest/grass.png', 1000, 688, 'image');
    //if I define backgroundTwo below background, it throws an error
    
    //replace
    temporaryGroundArr.push(ground);
    temporaryGroundArr.push(groundTwo);
    allComponents = [background, backgroundTwo, ground, groundTwo, foreground, foregroundTwo, foregroundThree];
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

//the game loop
function updateGameArea() {
    //stop all components from moving in x directions.
    allComponents.forEach(function (component, i) {
        component.speedX = 0;
    })
    


    myGamePiece.getGROUND_LEVEL(temporaryGroundArr);
    //myGamePiece.speedY = 0;

    //MOVE LEFT RIGHT
    //move all components except game piece if there is no horizontal collision.
    //37 = left, 39 = right
    var hitsGround = crashWithGround(temporaryGroundArr);
    if (myGameArea.keys && myGameArea.keys[37] && hitsGround !== 'right') { //right refers to ground side
        allComponents.forEach(function (component, i) {
            component.speedX = 5;
        });

    }
    if (myGameArea.keys && myGameArea.keys[39] && hitsGround !== 'left') {
        allComponents.forEach(function (component, i) {
            component.speedX = -5;
        });
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
    //find new positions and redraw the game area.
    myGameArea.clear();
//the order the update functions are called determines what image is in front of what
   
    allComponents.forEach(function (component, i) {
        component.newPos();
        component.update();
    });
    myGamePiece.newPos();
    myGamePiece.update();
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

//Site organization:

//projects
//links - github etc
//contact?

//Components
//Have different arrays for how far back a game component is:
    //foreground array 2x as long as midground
    //midground array 2 x as long as background
    //background array
//draw in photoshop and add them several times so they can be looped trough.
//For components that are as wide as the screen, make sure they begin and end at the 
//same height, so that they can be looped through.

//ERROR
//got this after adding background image
// Uncaught TypeError: Cannot read property 'y' of undefined
// at gamePiece.getGROUND_LEVEL (game.piece.js:98)
// at updateGameArea (script.js:65)