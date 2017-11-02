
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
        this.getGROUND_LEVEL(temporaryGroundArr);
        //for initial jump
        //shouldn't need this if statement, only the next one with gravity written like:
        //myBottom <= GROUND_Level
        // but I get a weird
        //vibrating of the square if I don't include this.
        if (myBottom == GROUND_LEVEL) {
            this.y += this.speedY;
        }
        // if in air, let speed and gravity change its position
        
        if (myBottom < GROUND_LEVEL) {
            this.y += this.speedY + this.gravitySpeedDifferential;
            this.gravitySpeedDifferential += this.gravityAcceleration;
            if (this.y < 0) { //if above canvas
                this.y = 0;
            }
        }
        // if below ground level, it should stop falling and return to ground level.
        if (myBottom > GROUND_LEVEL) {
            this.y = GROUND_LEVEL - this.height;
            this.speedY = 0;
            this.gravitySpeedDifferential = 0;
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
        if ((mybottom <= othertop) ||
            (mytop >= otherbottom) ||
            (myright <= otherleft) ||
            (myleft >= otherright)) {
            crash = false;
        }
        return crash;
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
                pieceLeft < groundRight &&
                groundTop > pieceTop) {
                currentGroundPieces.push(obj);
            }
        });
        //groundPiece with highest groundTop  = GROUND_LEVEL
        var highestGround = currentGroundPieces.reduce(function (acc, groundPiece, i) {
            if (acc.y < groundPiece.y) {
                acc = groundPiece;
            }
            return acc;
        }, currentGroundPieces[0]);
        console.log('highestGround');
        console.log(highestGround);

    }
}