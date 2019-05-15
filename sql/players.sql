DROP TABLE IF EXISTS players;

CREATE TABLE players(
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL CHECK (name!=''),
    email TEXT NOT NULL UNIQUE CHECK (email!=''),
    password VARCHAR(250) NOT NULL CHECK (password!=''),
);
