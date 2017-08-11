window.onload = init;

//Main canvas
var canvasWidth = 800;
var canvasHeight = 500;
var context;
var game;

var winscore = 3; //Max score for finish game

var prevDir;

var isPlaying;

var board = new Image();
board.src = "images/board.jpg";

var requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame  ||
    window.oRequestAnimationFrame  ||
    window.msRequestAnimationFrame;

function init() {
    // створення фону
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);

    //м'яч
    this.ballcanvas = document.createElement('canvas');
    document.body.appendChild(this.ballcanvas);

    //гравець 1
    this.player1canvas = document.createElement('canvas');
    document.body.appendChild(this.player1canvas);
    //гравець 2
    this.player2canvas = document.createElement('canvas');
    document.body.appendChild(this.player2canvas);

    //розміри фону
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;

    //розміри канваса м'ячв
    this.ballcanvas.width = this.canvasWidth;
    this.ballcanvas.height = this.canvasHeight;

    //розміри канваса гравця №1
    this.player1canvas.width = this.canvasWidth;
    this.player1canvas.height = this.canvasHeight;
    //розміри канваса гравця №2
    this.player2canvas.width = this.canvasWidth;
    this.player2canvas.height = this.canvasHeight;

    //context
    context = this.canvas.getContext('2d');
    ballctx = this.ballcanvas.getContext('2d');
    ctxPlayer1 = this.player1canvas.getContext('2d');
    ctxPlayer2 = this.player2canvas.getContext('2d');


    //Малювання початкового екрану
    drawBackground();

    //Створення об'єктів - м'яч, гравець №1, гравець №2, поле гри
    player1 = new Player1();
    player2 = new Player2();
    ball = new Ball();
    game = new Game();

    //Запуск циклу гри
    startLoop();


    document.addEventListener("keydown", checkKeyDown, false);
    document.addEventListener("keyup", checkKeyUp, false);
}

//Main game loop
function loop() {
    game.update();
    if (isPlaying) {
        draw();
        update();
    }
    requestAnimFrame(loop);
}

//Start game loop
function startLoop() {
    loop();
}

//Drawing objects, that change their position
function draw() {
    ball.draw();
    player1.draw();
    player2.draw();
    drawScore();
}

//Updating objects
function update() {
    ball.update();
    player1.update();
    player2.update();
}

//Draw main screen
function drawBackground() {
    context.fillStyle = "#3D3D3D";
    context.fillRect(0,0,800,500);
}


Game.prototype.getStatus = function () {
    return this.status;
};
Game.prototype.update = function () {
    // clear scene
    drawBackground();
    drawScore();
    if (score1 == winscore || score2 == winscore)  this.status = "OVER";
    switch (this.getStatus()) {
        //play
        case "PLAY":
            isPlaying = true;
            if (this.isEnter) this.status = "PAUSE";
            break;
        // none
        case "START":
            if (this.isEnter) {isPlaying = true; this.status = "PLAY";}
            this.showMsg('TENIS Game', 'Press Enter to play', 'Space - ball to move', 'Left Player: Play keys - W, S' , 'Right Player: Play keys - Up, Down');
            break;

        // game over
        case "OVER":
            isPlaying = false;
            if (score1 > score2) this.showMsg('Game Over', 'Press Enter to play again', 'Left player is WIN');
            else this.showMsg('Game Over', 'Press Enter to play again', 'Right player is WIN');
            if (this.isEnter) this.status = "PLAY";
            score1 = 0;
            score2 = 0;
            break;

        // pause
        case "PAUSE":
            if (this.isEnter) this.status = "PLAY";
            isPlaying = false;
            this.showMsg('Pause', 'Press Enter to continue');
            break;
    }
};

Game.prototype.showMsg = function(header, action, addition, left, right) {
    // background
    context.beginPath();
    context.fillStyle = 'rgba(0, 0, 0, 0.7)';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.closePath();

    // top text
    context.beginPath();
    context.font = "normal normal 32px cursive";
    context.fillStyle = '#FF0000';
    context.textAlign = "center";
    context.fillText(header, canvasWidth / 2, canvasHeight / 2);
    context.closePath();

    // middle text
    context.beginPath();
    context.font = "normal normal 14px monospace";
    context.fillStyle = '#B22222';
    context.textAlign = "center";
    context.fillText(action, canvasWidth / 2, canvasHeight / 2 + 32);
    context.closePath();

    // bottom addition text
    if (addition !== undefined) {
        context.beginPath();
        context.font = "normal normal 14px monospace";
        context.fillStyle = '#B22222';
        context.textAlign = "center";
        context.fillText(addition, canvasWidth / 2, canvasHeight - 32);
        context.closePath();
    }

    //left and right text for players
    if (left !== undefined && right !== undefined){
        context.beginPath();
        context.font = "normal normal 14px monospace";
        context.fillStyle = '#fff';
        context.fillText(left, canvasWidth/2 - 200, canvasHeight/2 + 130);
        context.fillText(right, canvasWidth/2 + 180, canvasHeight/2 + 130);
        context.closePath();
    }

};


function Game() {
    this.status = "START";
    this.isEnter = false;
}




