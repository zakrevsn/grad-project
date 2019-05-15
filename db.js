var spicedPg = require("spiced-pg");

var dbUrl =
    process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/gard-project";
var db = spicedPg(dbUrl);

exports.addPlayer = function addPlayer(firstname, lastname, email, password) {
    let q = `INSERT INTO players(firstname, lastname, email, password)
    VALUES ($1, $2, $3, $4) RETURNING * `;
    let params = [firstname, lastname, email, password];
    return db.query(q, params);
};
exports.getPlayer = function getPlayer(playerId) {
    let q = `SELECT * FROM players WHERE id=$1`;
    let params = [playerId];
    return db.query(q, params);
};
exports.addGame = function addGame(game, player1Id, player2Id) {
    let q = `INSERT INTO games`;
};
exports.getVictory = function getVictory(game, player1Id, player2Id) {
    let q = `SELECT * games`;
};
