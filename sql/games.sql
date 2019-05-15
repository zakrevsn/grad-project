DROP TABLE IF EXISTS games;

CREATE TABLE games(
        player1_id BIGINT REFERENCES players(id) NOT NULL,
        player2_id BIGINT REFERENCES players(id) NOT NULL,
        wins BIGINT REFERENCES players(id) NOT NULL,
        loses BIGINT REFERENCES players(id) NOT NULL
    );
