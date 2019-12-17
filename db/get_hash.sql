SELECT * FROM chess_users h
JOIN chess_hash hh ON h.user_id = hh.user_id
WHERE username = $1;