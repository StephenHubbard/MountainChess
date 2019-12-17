UPDATE chess_users SET
portrait = $1
WHERE user_id = $2;

SELECT * FROM chess_users
WHERE user_id = $2;