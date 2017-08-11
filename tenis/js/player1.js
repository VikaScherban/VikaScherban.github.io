var ctxPlayer1,
    player1;

Player1.prototype.draw = function () {
    clearPlayer1Ctx();
    ctxPlayer1.drawImage(board, 400,400, 500, 300, //пов'язано з картинкою
        this.drawX,this.drawY, this.width, this.height);
};

Player1.prototype.update = function () {
    if(this.drawY <= 3 ) this.drawY = 0;
    if (this.drawY > canvasHeight-100) this.drawY = canvasHeight-100;
    this.chooseDir();
};

Player1.prototype.chooseDir =function () {
    if (this.isUp) {
        this.drawY -=this.speed;
    }
    if (this.isDown) {
        this.drawY +=this.speed;
    }
};

function Player1() {
    this.drawX = 0;
    this.drawY = canvasHeight/2 - 50;
    this.width = 20;
    this.height = 100;
    this.speed = 5;
    //for keys
    this.isUp = false;
    this.isDown = false;
}
//Clear functions
function clearPlayer1Ctx() {
    ctxPlayer1.clearRect(0,0,canvasWidth, canvasHeight);
}
