SELECT * FROM chess_users 
WHERE user_id IN (SELECT user_2 FROM friends WHERE user_2 = $1 )

-- SELECT * FROM chess_users 
-- WHERE user_id IN (SELECT 
--                  (CASE
--                     WHEN user_2 = $1 THEN user_1
--                     ELSE user_2
--                  END) 
--                  FROM friends 
--                  WHERE (CASE
--                            WHEN user_2 = $1 THEN user_1
--                            ELSE user_2
--                         END)
--                      = $1
--                   )
-- ;

-- SELECT * FROM chess_users
-- WHERE user_id IN (
--     IF 

-- )

