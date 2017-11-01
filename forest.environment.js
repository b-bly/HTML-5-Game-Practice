//for reference
//from https://www.khanacademy.org/computing/computer-programming/programming-games-visualizations/side-scroller/a/forest-environment
//need to source in processing.js
//need to format code differently: 
//https://github.com/jdsutton/ProcessingTemplate
var Beaver = function(x, y) {
    this.x = x;
    this.y = y;
    this.img = getImage("creatures/Hopper-Happy");
    this.sticks = 0;
};

Beaver.prototype.draw = function() {
    fill(255, 0, 0);
    this.y = constrain(this.y, 0, height-50);
    image(this.img, this.x, this.y, 40, 40);
};

Beaver.prototype.hop = function() {
    this.img = getImage("creatures/Hopper-Jumping");
    this.y -= 5;
};

Beaver.prototype.fall = function() {
    this.img = getImage("creatures/Hopper-Happy");
    this.y += 5;
};


var beaver = new Beaver(10, 300);

var sceneX = 0;
// moving
// snake like fashion, wrap around
var grassXs = [];
for (var i = 0; i < 25; i++) {
    grassXs.push(i*20);
}

draw = function() {
    
    // static
    background(227, 254, 255);
    fill(130, 79, 43);
    rect(0, height*0.90, width, height*0.10);
    
    // draw the blocks
    for (var i = 0; i < grassXs.length; i++) {
        image(getImage("cute/GrassBlock"), grassXs[i], height*0.85, 20, 20);
        // subtract one, so that they appear to move to left (hopper appears to move to right)
        grassXs[i] -= 1;
        // Now move the blocks over once they wrap around
        if (grassXs[i] <= -20) {
            grassXs[i] = width;
        }
    }
    
    if (keyIsPressed && keyCode === 0) {
        beaver.hop();
    } else {
        beaver.fall();
    }
    beaver.draw();
};
