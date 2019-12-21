SELECT * FROM chess_users 
WHERE user_id IN (SELECT user_2 FROM friends WHERE user_2 = $1 )