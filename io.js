const { createGame, filterGameForPlayer, checkVictory } = require("./game");

let games = [];
let pendingGame;

exports.onConnect = function onConnect(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);
    if (!socket.request.session.playerId) {
        return;
    }
    let session = socket.request.session;
    if (pendingGame) {
        pendingGame.player2 = session;
        pendingGame.player2.socket = socket;
    } else {
        pendingGame = createGame();
        pendingGame.player1 = session;
        pendingGame.player1.socket = socket;
    }
    socket.on("placeShip", place =>
        onPlaceShip(pendingGame, session.playerId, place, socket)
    );
    socket.on("shoot", place =>
        onShoot(pendingGame, session.playerId, place, socket)
    );
    socket.on("startGame", () =>
        onStartGame(pendingGame, session.playerId, socket)
    );
    socket.emit(
        "gameState",
        filterGameForPlayer(pendingGame, session.playerId)
    );

    // if (pendingGame.player1 && pendingGame.player2) {
    //     games.push(pendingGame);
    //     pendingGame = null;
    // }
};
function onStartGame(game, player, socket) {
    let otherSocket =
        player == game.player1.playerId
            ? game.player2.socket
            : game.player1.socket;
    let otherPlayer =
        player == game.player1.playerId
            ? game.player2.playerId
            : game.player1.playerId;
    if (!game.turn) {
        game.turn = player;
    }
    socket.emit("gameState", filterGameForPlayer(game, player));
    otherSocket.emit("gameState", filterGameForPlayer(game, otherPlayer));
}

function onPlaceShip(game, player, place, socket) {
    console.log("onPlaceShip", game, player, place);
    let ships = player == game.player1.playerId ? game.ships1 : game.ships2;
    ships.push([place]);
    socket.emit("gameState", filterGameForPlayer(game, player));
}
function onShoot(game, player, place, socket) {
    console.log("onShoot", game, player, place);
    let shots = player == game.player1.playerId ? game.shots1 : game.shots2;
    let otherSocket =
        player == game.player1.playerId
            ? game.player2.socket
            : game.player1.socket;
    let otherPlayer =
        player == game.player1.playerId
            ? game.player2.playerId
            : game.player1.playerId;

    let ships = player == game.player1.playerId ? game.ships2 : game.ships1;
    let hit = false;
    for (let i in ships) {
        for (let j in ships[i]) {
            if (place.x == ships[i][j].x && place.y == ships[i][j].y) {
                hit = true;
            }
        }
    }

    shots.push({ x: place.x, y: place.y, hit });

    if (!hit) {
        game.turn = otherPlayer;
    }
    checkVictory(game);
    socket.emit("gameState", filterGameForPlayer(game, player));
    otherSocket.emit("gameState", filterGameForPlayer(game, otherPlayer));
}
