//Keys functions
function checkKeyDown(e) {
    var keyID = e.keyCode || e.which;
    var keyChar = String.fromCharCode(keyID);

    if (keyChar == "W") {
        player1.isUp = true;
        e.preventDefault();
    }
    if (keyChar == "S") {
        player1.isDown = true;
        e.preventDefault();
    }

    if (keyID == 38){
        player2.isUp = true;
        e.preventDefault()
    }
    if (keyID == 40){
        player2.isDown = true;
        e.preventDefault();
    }

    if (keyID == 32){
        ball.isSpace = true;
        e.preventDefault();
    }
    if (keyID == 13){
        game.isEnter = true;
        e.preventDefault();
    }
}

function checkKeyUp(e) {
    var keyID = e.keyCode || e.which;
    var keyChar = String.fromCharCode(keyID);

    if (keyChar == "W") {
        player1.isUp = false;
        e.preventDefault();
    }
    if (keyChar == "S") {
        player1.isDown = false;
        e.preventDefault();
    }
    if (keyID == 38){
        player2.isUp = false;
        e.preventDefault()
    }
    if (keyID == 40){
        player2.isDown = false;
        e.preventDefault();
    }
    if (keyID == 32){
        ball.isSpace = false;
        e.preventDefault();
    }
    if (keyID == 13){
        game.isEnter = false;
        e.preventDefault();
    }
}