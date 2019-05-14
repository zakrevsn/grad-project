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
    socket.on("placeShip", place => onPlaceShip(pendingGame, 1, place));
    socket.emit("gameState", filterGameForPlayer(pendingGame, 1));
    // TODO change 1 to USERID;

    // if (pendingGame.player1 && pendingGame.player2) {
    //     games.push(pendingGame);
    //     pendingGame = null;
    // }
};

function onPlaceShip(game, player, place) {
    console.log("onPlaceShip", game, player, place);
}
