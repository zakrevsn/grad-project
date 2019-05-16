const { createGame, filterGameForPlayer, checkVictory } = require("./game");

let games = [];
let pendingGame;

exports.onConnect = function onConnect(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);
    if (!socket.request.session.playerId) {
        return;
    }
    let session = socket.request.session;
    let game,
        foundGame = false;
    for (let i in games) {
        if (
            session.sessionId == games[i].player1.sessionId ||
            session.sessionId == games[i].player2.sessionId
        ) {
            game = games[i];
            foundGame = true;
        }
    }
    if (!foundGame) {
        if (pendingGame) {
            pendingGame.player2 = session;
            pendingGame.player2.socket = socket;
            pendingGame.player2.ready = false;
            pendingGame.player1.socket.emit(
                "gameState",
                filterGameForPlayer(pendingGame, pendingGame.player1.playerId)
            );
        } else {
            pendingGame = createGame();
            pendingGame.player1 = session;
            pendingGame.player1.socket = socket;
            pendingGame.player1.ready = false;
        }
        game = pendingGame;
    }

    socket.on("placeShip", place =>
        onPlaceShip(game, session.playerId, place, socket)
    );
    socket.on("shoot", place => onShoot(game, session.playerId, place, socket));
    socket.on("startGame", () => onStartGame(game, session.playerId, socket));
    socket.emit("gameState", filterGameForPlayer(game, session.playerId));

    if (!foundGame && pendingGame.player1 && pendingGame.player2) {
        games.push(pendingGame);
        pendingGame = null;
    }
};
function onStartGame(game, player, socket) {
    if (!game.player2) {
        game.player1.ready = true;
        socket.emit("gameState", filterGameForPlayer(game, player));
        return;
    }
    let otherSocket =
        player == game.player1.playerId
            ? game.player2.socket
            : game.player1.socket;
    let otherPlayer =
        player == game.player1.playerId
            ? game.player2.playerId
            : game.player1.playerId;
    if (player == game.player1.playerId) {
        game.player1.ready = true;
    } else {
        game.player2.ready = true;
    }
    if (game.player1.ready && game.player2.ready) {
        game.turn = otherPlayer;
    }
    socket.emit("gameState", filterGameForPlayer(game, player));
    otherSocket.emit("gameState", filterGameForPlayer(game, otherPlayer));
}

function onPlaceShip(game, player, place, socket) {
    console.log("onPlaceShip", game, player, place);
    if (
        game.turn ||
        (player == game.player1.playerId
            ? game.player1.ready
            : game.player2.ready)
    ) {
        console.log("not allowed");
        return;
    }
    let ships = player == game.player1.playerId ? game.ships1 : game.ships2;
    ships.push([place]);
    socket.emit("gameState", filterGameForPlayer(game, player));
}
function onShoot(game, player, place, socket) {
    console.log("onShoot", game, player, place);
    if (game.turn != player) {
        console.log("not allowed");
        return;
    }
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
    if (game.outcome) {
        // TODO save outcome in DB
        game.player1 = {};
        game.player2 = {};
    }
}
