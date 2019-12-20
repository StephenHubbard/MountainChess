INSERT INTO friends (user_1, user_2)
VALUES ((SELECT user_id FROM chess_users WHERE username = $1), $2);