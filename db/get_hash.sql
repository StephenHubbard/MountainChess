SELECT * FROM chess_users h
JOIN chess_hash hh ON h.hash_id = hh.hash_id
WHERE username = $1;