exports.createGame = function createGame() {
    return {
        size: 10,
        ships1: [],
        ships2: [],
        shots1: [],
        shots2: [],
        turn: null,
        outcome: null
    };
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
