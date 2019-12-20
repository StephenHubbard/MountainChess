SELECT COUNT(*) FROM friends WHERE user_1 = $1 OR user_1 = $2 AND user_2 = $1 OR user_2 = $2 AND user_1 != user_2;

-- SELECT COUNT(*) FROM friends WHERE user_1 = (SELECT user_id FROM chess_users WHERE username = $1) AND user_2 = $2 
-- OR
-- user_1 = $2 AND user_2 = (SELECT user_id FROM chess_users WHERE username = $1);