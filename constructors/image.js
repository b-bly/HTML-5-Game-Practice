function image(width, height, filename, x, y, type) {
    this.type = type;

    this.image = new Image();
    this.image.src = filename;

    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;

        ctx.drawImage(this.image,
            this.x,
            this.y,
            this.width, this.height);

    }
    this.newPos = function () {
        this.x += this.speedX;
    }
}