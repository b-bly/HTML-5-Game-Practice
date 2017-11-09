
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
    this.groundLevel = 400;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
      
        this.x += this.speedX;

    }
}