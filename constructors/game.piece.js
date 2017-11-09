
function gamePiece(width, height, color, x, y) {
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
        var myBottom = this.y + this.height;
        //this.x += this.speedX;

        //for initial jump
        //shouldn't need this if statement, only the next one with gravity written like:
        //myBottom <= GROUND_Level
        // but I get a weird
        //vibrating of the square if I don't include this.
        if (myBottom == this.groundLevel) {
            this.y += this.speedY;
        }
        // if in air, let speed and gravity change its position

        if (myBottom < this.groundLevel) {
            this.y += this.speedY + this.gravitySpeedDifferential;
            this.gravitySpeedDifferential += this.gravityAcceleration;
            if (this.y < 0) { //if above canvas
                this.y = 0;
            }
        }
        // if below ground level, it should stop falling and return to ground level.
        if (myBottom > this.groundLevel) {
            this.y = this.groundLevel - this.height;
            this.speedY = 0;
            this.gravitySpeedDifferential = 0;
        }
    }


    this.collide = function (r2) { //r2 == ground 
        var r1 = this;
        var dx = (r1.x + r1.width / 2) - (r2.x + r2.width / 2);
        var dy = (r1.y + r1.height / 2) - (r2.y + r2.height / 2);
        var width = (r1.width + r2.width) / 2;
        var height = (r1.height + r2.height) / 2;
        var crossWidth = width * dy;
        var crossHeight = height * dx;
        var collision = 'none';
        //
        if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
            if (crossWidth > crossHeight) { //'bottom' of r2.  All refer to r2
                collision = (crossWidth > (-crossHeight)) ? 'bottom' : 'left';
            } else {
                collision = (crossWidth > -(crossHeight)) ? 'right' : 'top';
            }
        }
        if (collision == 'left') console.log('collision = left');
        if (collision == 'right') console.log('collision = right');

        //needed to comment these out or the ground pushes the cube back.
        // if (collision == 'left') this.x = r2.x - this.width - 1;
        // if (collision == 'right') this.x = r2.x + r2.width + 1;
        return (collision);
    }
    this.getGROUND_LEVEL = function (groundArr) {
        var pieceLeft = this.x;
        var pieceRight = this.x + this.width;
        var pieceTop = this.y;
        var pieceBottom = this.y + this.height;
        //search for objects within the myleft and myright range below gamePiece that is lower than mybottom
        var currentGroundPieces = [];
        groundArr.forEach(function (obj, i) {
            var groundLeft = obj.x;
            var groundRight = obj.x + obj.width;
            var groundTop = obj.y;
            if (pieceRight > groundLeft &&
                pieceLeft < groundRight 
                ) { //do i need the groundTop statement?
                currentGroundPieces.push(obj);
            }
        });
        //groundPiece with highest groundTop  = GROUND_LEVEL
        if (currentGroundPieces) {
            var highestGround = currentGroundPieces.reduce(function (acc, groundPiece, i) {
                if (acc.y > groundPiece.y) { //REMEMBER higher y is lower on screen
                    acc = groundPiece;
                }
                return acc;
            }, currentGroundPieces[0]);
            this.groundLevel = highestGround.y;
        } else {
            this.groundLevel = GROUND_LEVEL;
        }
        
    }
}