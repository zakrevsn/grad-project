exports.createGame = function createGame() {
    return {
        size: 10,
        player1: null,
        player2: null,
        ships1: [],
        ships2: [],
        shots1: [],
        shots2: [],
        turn: null,
        outcome: null
    };
};

exports.filterGameForPlayer = function filterGameForPlayer(game, player) {
    const {
        size,
        player1,
        player2,
        ships1,
        ships2,
        shots1,
        shots2,
        turn,
        outcome
    } = game;
    if (player == player1.playerId) {
        return {
            size,
            ships: ships1,
            myShots: shots1,
            enemyShots: shots2,
            myTurn: turn ? turn == player1.playerId : null,
            outcome,
            ready: player1.ready,
            otherPlayerReady: player2 ? player2.ready : null,
            otherPlayer: player2 ? player2.name : null
        };
    }
    if (player == player2.playerId) {
        return {
            size,
            ships: ships2,
            myShots: shots2,
            enemyShots: shots1,
            myTurn: turn ? turn == player2.playerId : null,
            outcome,
            ready: player2.ready,
            otherPlayerReady: player1 ? player1.ready : null,
            otherPlayer: player1 ? player1.name : null
        };
    }
};

exports.findShips = function findShips(ships) {
    return ships;
};

exports.checkVictory = function checkVictory(game) {
    let ships1 = 0,
        sunk1 = 0,
        ships2 = 0,
        sunk2 = 0;
    for (let i in game.ships1) {
        ships1 += game.ships1[i].length;
    }
    for (let i in game.ships2) {
        ships2 += game.ships2[i].length;
    }
    for (let i in game.shots2) {
        if (game.shots2[i].hit) {
            sunk1++;
        }
    }
    for (let i in game.shots1) {
        if (game.shots1[i].hit) {
            sunk2++;
        }
    }
    if (ships1 == sunk1) {
        game.outcome = "The winner is " + game.player2.name;
    }
    if (ships2 == sunk2) {
        game.outcome = "The winner is " + game.player1.name;
    }
};
