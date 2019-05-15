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
    socket.on("placeShip", place => onPlaceShip(pendingGame, 1, place, socket));
    socket.on("shoot", place => onShoot(pendingGame, 1, place, socket));
    socket.on("startGame", () => onStartGame(pendingGame, 1, socket));
    socket.emit("gameState", filterGameForPlayer(pendingGame, 1));

    // TODO change 1 to USERID;

    // if (pendingGame.player1 && pendingGame.player2) {
    //     games.push(pendingGame);
    //     pendingGame = null;
    // }
};
function onStartGame(game, player, socket) {
    game.turn = player;
    socket.emit("gameState", filterGameForPlayer(game, player));
}

function onPlaceShip(game, player, place, socket) {
    console.log("onPlaceShip", game, player, place);
    let ships = player == game.player1 ? game.ships1 : game.ships2;
    ships.push([place]);
    socket.emit("gameState", filterGameForPlayer(game, player));
}
function onShoot(game, player, place, socket) {
    console.log("onShoot", game, player, place);
    let shots = player == game.player1 ? game.shots1 : game.shots2;
    // let ships = player == game.player1 ? game.ships2 : game.ships1;
    shots.push({ x: place.x, y: place.y, hit: false });
    socket.emit("gameState", filterGameForPlayer(game, player));
}
