var score1 = 0,
    score2 = 0;

function drawScore() {
    drawBackground();
    context.fillStyle = "#fff";
    var str1 = score1.toString() ;
    var str2 = score2.toString();
    context.fillText(str1 + " : " + str2, canvasWidth/2, 20);
}