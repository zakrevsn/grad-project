var spicedPg = require("spiced-pg");

var dbUrl =
    process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/battleship";
var db = spicedPg(dbUrl);

exports.addPlayer = function addPlayer(name, email, password) {
    let q = `INSERT INTO players(name, email, password)
    VALUES ($1, $2, $3) RETURNING * `;
    let params = [name, email, password];
    return db.query(q, params);
};
exports.getPlayer = function getPlayer(email) {
    let q = `SELECT * FROM players WHERE email=$1`;
    let params = [email];
    return db.query(q, params);
};
exports.addGame = function addGame(game, player1Id, player2Id) {
    let q = `INSERT INTO games`;
};
exports.getVictory = function getVictory(game, player1Id, player2Id) {
    let q = `SELECT * games`;
};
