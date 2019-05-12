const { createGame, filterGameForPlayer } = require("./game");

let games = [];
let pendingGame;

exports.onConnect = function onConnect(socket) {
    if (pendingGame) {
        pendingGame.player2 = 2; // FIXME INSERT USERID
    } else {
        pendingGame = createGame();
        pendingGame.player1 = 1; // FIXME INSERT USERID
    }

    socket.emit("gameState", filterGameForPlayer(pendingGame, 1));
    // TODO change 1 to USERID;

    // if (pendingGame.player1 && pendingGame.player2) {
    //     games.push(pendingGame);
    //     pendingGame = null;
    // }
};
