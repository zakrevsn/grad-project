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
    if (player == player1) {
        return {
            size,
            ships: ships1,
            myShots: shots1,
            enemyShots: shots2,
            myTurn: turn ? turn == player1 : null,
            outcome
        };
    }
    if (player == player2) {
        return {
            size,
            ships: ships2,
            myShots: shots2,
            enemyShots: shots1,
            myTurn: turn ? turn == player2 : null,
            outcome
        };
    }
};

exports.findShips = function findShips(ships) {
    return ships;
};

exports.shoot = function shoot(game, x, y) {
    if (game.turn == 1) {
        game.shots1.push({ hit: false, sink: null, x, y });
        game.turn = 2;
    } else if (game.turn == 2) {
        game.shots2.push({ hit: false, sink: null, x, y });
        game.turn = 1;
    }
    return game;
};

exports.checkVictory = function checkVictory(game) {
    return false;
};
