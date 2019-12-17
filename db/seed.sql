DROP TABLE IF EXISTS games_junction;
DROP TABLE IF EXISTS moves;
DROP TABLE IF EXISTS fen;
DROP TABLE IF EXISTS chess_users;
DROP TABLE IF EXISTS chess_hash;
DROP TABLE IF EXISTS games;

CREATE TABLE chess_users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR
    username VARCHAR(100),
    hash_id TEXT,
    portrait TEXT
);

CREATE TABLE games (
    g_id SERIAL PRIMARY KEY
);

CREATE TABLE chess_hash (
    hash_id SERIAL PRIMARY KEY,
    hash TEXT
);

ALTER TABLE chess_users DROP COLUMN hash_id;

ALTER TABLE chess_users ADD COLUMN hash_id INT REFERENCES chess_hash(hash_id);

CREATE TABLE moves (
    move_id SERIAL PRIMARY KEY,
    before VARCHAR(10),
    after VARCHAR(10),
    g_id INT REFERENCES games(g_id),
    user_id INT REFERENCES chess_users(user_id)
);

CREATE TABLE fen (
    fen_id SERIAL PRIMARY KEY,
    fen_string TEXT,
    g_id INT REFERENCES games(g_id),
    user_id INT REFERENCES chess_users(user_id)
);

CREATE TABLE games_junction(
    j_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES chess_users(user_id),
    g_id INT REFERENCES games(g_id),
    accepted BOOLEAN DEFAULT FALSE
);

CREATE TABLE portraits (
    picture_id SERIAL PRIMARY KEY,
    image TEXT,
    user_id INT REFERENCES chess_users(user_id)
);

INSERT INTO chess_hash (hash)
VALUES ('hash1'),
('hash2'),
('hash3');

INSERT INTO chess_users (username, hash_id)
VALUES ('user1', 1),
('user2', 2),
('user3', 3);

INSERT INTO games (g_id)
VALUES(1),
(2);

INSERT INTO moves (before, after, g_id, user_id)
VALUES ('WPA2', 'WPA3', 1, 2),
('BPD7', 'BPD6', 1, 3);

INSERT INTO fen (fen_string, g_id, user_id)
VALUES ('rnbqkb1r/pp1pp1pp/5p1n/2p5/1P3P2/4P3/P1PP2PP/RNBQKBNR w KQkq - 1 4', 1, 2);

INSERT INTO games_junction (user_id, g_id, accepted)
VALUES (2, 1, true),
(3, 1, true),
(1, 2, true),
(2, 2, false);