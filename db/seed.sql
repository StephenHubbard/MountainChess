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
    portrait TEXT DEFAULT 'https://engineering.mit.edu/wp-content/uploads/blank-profile-picture.png',
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
    friendship_id SERIAL PRIMARY KEY,
    user_1 INT REFERENCES chess_users(user_id),
    user_2 INT REFERENCES chess_users(user_id)
);

INSERT INTO chess_users (email, username, portrait)
VALUES ('user1', 'username1', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8lJSUAAADp6ekcHBxhYWGcnJwSEhIHBwe+vr5ra2sXFxeFhYUhISEeHh4iIiJ8fHwpKSk/Pz+qqqqioqJVVVXm5ubIyMhxcXE4ODi3t7bQ0NDZ2dlmZmaSkpJERET29vZMTEwwMDA8PDyxsbGitl9/AAAEwElEQVR4nO3d6XKbMBQF4AhjAyassQ02DhaO3/8ZC0ncxGkCaKnvVXu+mU6nPzqjM0ILkpAfHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIDGLtq0eb1er+u83UQ76uLYFuXd/lxkaer7fppmxXnf5RF1oayRTR2GcZpk4kOWpHEY1o2kLpwFi8M2jMX34nB7WFAX0NCQL/0h3yB1PWNVB2P5XjMGdUVdTG2LTfnT83nzrJYbR6vxWBfJjIBCJEV9pC6sjqa76T3HZEnXUBdXXZROtcDP0tS50fHgza3A92r0DtRFVlOFagH7iKFTXWq1n9fHfJbsHYp43Kq0wat060yPusjVa/C1FnNXxsUnodoI32Tiibro8zQajfC9EvdODIuLes5U7Xtx7cJzGgXaAYUIHBj4pVY/epVuJXWASVFoEFCIkH8ldiZV2FdiRx1gytEzCiiEx33Yz/U70jdxTh1hgvZYeJXsqSOMiwq96cyHrODd1zyaBuwjPlKHGPVs1pMO0mfqEGN2RsP9e8It5z2NqjTtaPqupuT8Jnw5W2iH5wt1jBGrwjigEMWKOsaI1rwZ9g2xpY4x4tG3kNDnPFw8ms7ZBjESUvoPEv7z7bA1H/D7IZ9zX7qxMh5uqGOMuOwtzGn2nOc0zcnCvPTEeVl4YeXdgvWq8NpCwjV1iFGthXbIuSvtG6KFdRrOzbBn3NUkJ+oIE1qTfZlBwPshfXjYmW1bCBFyXqV5tTSbmvpL6gCTGsO9J+b9TE8+m1Si/yypA0xrAv0BIwv4V2Ffia3BPn4rqYs/h955oYEzZ4aiF83zNC+8t50G1dNg1WmeiepWr/+f86p+7gW9WPvEUDz8d4/zLvB/sNaGhEiIhOSQEAmRkB4Sup/wbV5qiPW8NFrZwP8dCgAAbJFVNF8lqYur4Xjywrm8kyMLpTeabP6qaZa5sJr/1UVlrzTgfIbmB1Lp65k4l9QFVrZ7UVkXTl7Yb/3+oVH7xMtzryEqviqyfin8llT8xCvZS+oiK6pUt/M9zjtO31HezfdZf+70J6l+IiOU1IVWorGXH3M/DHVDanzhlZSSutgKtM57sz7f/cViqXV7y5L14eAbG61Tppk7lXjUqsKhEl15S9xonxhypBIb7U9lk9KJ+bfM9Y8JB068Jh6M7qdx4Na2XWl0P03J/024NjvKHtTUAaY8GZ/VZ37fl/49X1fM7/vSm67dYj15k7mVr2QZDxl689GvGM9PI6OB4kNaMt3JP25tPKMDn+eJ9sXSxmGaNzHL3ubZXsA+IsOVN+NrzL5EZHdsaGU3YB+R2S01u5OdbvRDeuI1B7czEn7GbVS0cuXHrZTXbpTlfmbArK9Bwn8gYejbFvJKuFrax2xABAAATXJxH5Iq4LE9Bd7fF5xaomWbQxnauGJvWhKWJFtSVWL7pfdnaUJwJkxaWzucwyf4VYiL9bf6MVlx/2PS+f2e0UF6/zeN9T0f0v4xvf9NfEiIhEiIhEiIhEiIhEiIhEiIhDbUd054/3OnFn5/TAXBb5WZ/4acUkCK35uzegZqCskZqV1xv5boFySHa46d5yfZ35f4Xke06C0Py7PIRF8IkV3/svHn9p/ivDxImoAAAAAAAAC//QJS8Wgsx+WEFAAAAABJRU5ErkJggg=='),
('user2', 'username2', 'https://cdn.iconscout.com/icon/premium/png-256-thumb/chess-piece-1821167-1545629.png'),
('user3', 'username3', 'https://www.shareicon.net/data/256x256/2015/11/09/669267_chess_512x512.png');

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