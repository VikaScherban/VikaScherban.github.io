var ballctx,
    ball;

Ball.prototype.draw = function () {
    clearBallCtx();
    ballctx.beginPath();
    ballctx.fillStyle = "#fff";
    ballctx.arc(this.drawX, this.drawY, this.radius, 0, Math.PI*2, false);
    ballctx.closePath();
    ballctx.fill();
};

Ball.prototype.update = function () {
    //відбиття від другого плеєра
    if (player2.drawY - 10 < this.drawY && player2.drawY + 10 + player2.height > this.drawY && player2.drawX - player2.width / 2 - 3 <= this.drawX){
        this.xspeed = -this.xspeed;
        this.yspeed = -this.yspeed;
        if (this.xspeed > 0)   this.xspeed = this.xspeed1;
        else  this.xspeed = -this.xspeed1;
        if (this.yspeed > 0) this.yspeed = this.yspeed1;
        else this.yspeed = -this.yspeed1;
    }
    //відбиття від першого плеєра
    if (player1.drawY - 10 < this.drawY && player1.drawY + 10 + player1.height > this.drawY && player1.drawX + player1.width + 10 >= this.drawX) {
        this.xspeed = -this.xspeed;
        this.yspeed = -this.yspeed;
        if (this.xspeed > 0)   this.xspeed = this.xspeed2;
        else  this.xspeed = -this.xspeed2;
        if (this.yspeed > 0) this.yspeed = this.yspeed2;
        else this.yspeed = -this.yspeed2;
    }
    if (this.drawX > canvasWidth) {
        this.dir = "STOP2";
    }
    if (this.drawX < 0) {
        this.dir = "STOP1";
    }
    if (this.isSpace) {
        if (this.dir == "STOP1") {
            this.dir = "MOVE";
            this.xspeed = -this.xspeed;
            this.yspeed = -this.yspeed;
        }
        if (this.dir == "STOP2") {
            this.dir = "MOVE";
            this.xspeed = -this.xspeed;
            this.yspeed = -this.yspeed;
        }
    }
    //удар об нижню стінку
    if (this.drawY>canvasHeight) {
        this.yspeed = -this.yspeed;
        this.dir = "MOVE";
    }
    //удар об верхню стінку
    if (this.drawY<0){
        this.yspeed = -this.yspeed;
        this.dir = "MOVE";
    }
    this.BallMove();
};

Ball.prototype.BallMove= function () {
    if (this.dir == "MOVE") {
        this.drawX = this.drawX + this.xspeed;
        this.drawY = this.drawY + this.yspeed;
        prevDir = "MOVE";
    }
    if (this.dir == "STOP1") {
        if (prevDir!="STOP1") score2++;
        this.drawX = player1.width +14;
        this.drawY = player1.drawY + player1.height/2;
        prevDir = "STOP1";
    }
    if (this.dir == "STOP2") {
        if (prevDir!="STOP2") score1++;
        this.drawX = canvasWidth - player2.width - 14;
        this.drawY = player2.drawY + player2.height/2;
        prevDir = "STOP2";
    }
};

function Ball() {
    this.drawX = 0;
    this.drawY = 0;
    this.radius = 10;
    this.speed = 3;
    this.xspeed = 3;
    this.yspeed = 4;
    this.xspeed1 = 4;
    this.yspeed1 = 5;
    this.xspeed2 = 3;
    this.yspeed2 = 4;
    //direction
    this.dir = "MOVE";
    this.isSpace = false;
}

//Clear functions
function clearBallCtx() {
    ballctx.clearRect(0,0,canvasWidth, canvasHeight);
}