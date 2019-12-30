SELECT * FROM chess_users 
WHERE user_id IN (SELECT user_1 FROM friends WHERE user_1 = $1 );