var appleImg = new Image();
appleImg.src = "img/apple.png";

function Apple(game) {
    // get data from game
    this.game = game;

    // apple object
    this.pos = {
        x: -1,
        y: -1
    };
}

Apple.prototype.update = function() {

}

Apple.prototype.render = function() {
    if (this.pos.x != -1 && this.pos.y != -1) {
        this.game.context.beginPath();
        this.game.context.fillStyle = '#228B22';
        this.game.context.drawImage(appleImg, 0,0, 16, 18, this.pos.x * this.game.cellSize, this.pos.y * this.game.cellSize, 16, 18);
        this.game.context.fill();
        this.game.context.closePath();
    }
}

Apple.prototype.create = function() {
    // set new apple pos
    var newPos = {
        x: Math.floor(Math.random() * this.game.sceneWidth),
        y: Math.floor(Math.random() * this.game.sceneHeight)
    };

    // not on previous pos
    if (newPos.x == this.pos.x && newPos.y == this.pos.y) {
        this.create();
        return;
    }

    // not on snake
    for (var i = 0; i < this.game.snake.getSize(); i++) {
        if (newPos.x == this.game.snake.body[i].x && newPos.y == this.game.snake.body[i].y) {
            this.create();
            return;
        }
    }

    // update
    this.pos.x = newPos.x;
    this.pos.y = newPos.y;
}

Apple.prototype.remove = function() {
    this.pos.x = -1;
    this.pos.y = -1;
}