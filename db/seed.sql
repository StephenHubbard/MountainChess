DROP TABLE IF EXISTS portraits;
DROP TABLE IF EXISTS games_junction;
DROP TABLE IF EXISTS friends;
DROP TABLE IF EXISTS moves;
DROP TABLE IF EXISTS chess_hash;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS chess_users;

CREATE TABLE chess_users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR,
    username VARCHAR(100),
    portrait TEXT,
    logged_in BOOLEAN DEFAULT FALSE
);

CREATE TABLE games (
    g_id SERIAL PRIMARY KEY
);


CREATE TABLE chess_hash (
    hash_id SERIAL PRIMARY KEY,
    hash TEXT,
    user_id INT REFERENCES chess_users(user_id)
);

CREATE TABLE moves (
    move_id SERIAL PRIMARY KEY,
    before VARCHAR(10),
    after VARCHAR(10),
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

CREATE TABLE friends (
    user_1 INT REFERENCES chess_users(user_id),
    user_2 INT REFERENCES chess_users(user_id)
);

INSERT INTO chess_users (email, username)
VALUES ('user1', 'username1'),
('user2', 'username2'),
('user3', 'username3');

INSERT INTO chess_hash (hash, user_id)
VALUES ('password', 1),
('s3cret', 2),
('hash', 3);


INSERT INTO games (g_id)
VALUES(1),
(2);

INSERT INTO moves (before, after, g_id, user_id)
VALUES ('WPA2', 'WPA3', 1, 2),
('BPD7', 'BPD6', 1, 3);

INSERT INTO games_junction (user_id, g_id, accepted)
VALUES (2, 1, true),
(3, 1, true),
(1, 2, true),
(2, 2, false);




