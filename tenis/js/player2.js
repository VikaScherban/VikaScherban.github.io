var ctxPlayer2,
    player2;

Player2.prototype.draw = function () {
    clearPlayer2Ctx();
    ctxPlayer2.drawImage( board, 400, 400, 500, 300, //only image
        this.drawX,this.drawY, this.width, this.height );
};

Player2.prototype.update = function () {
    if( this.drawY <= 3 ) this.drawY = 0;
    if ( this.drawY > canvasHeight-100 ) this.drawY = canvasHeight-100;
    this.chooseDir();
};


Player2.prototype.chooseDir = function () {
    if (this.isUp) {
        this.drawY -= this.speed;
    }
    if (this.isDown) {
        this.drawY += this.speed;
    }

};


function Player2() {
    this.drawX = 780;
    this.drawY = canvasHeight/2 -50;
    this.width = 20;
    this.height = 100;
    this.speed = 5;
    //for keys
    this.isUp = false;
    this.isDown = false;
}

//Clear functions
function clearPlayer2Ctx() {
    ctxPlayer2.clearRect( 0, 0, canvasWidth, canvasHeight );
}