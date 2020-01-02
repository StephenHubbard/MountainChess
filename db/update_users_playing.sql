UPDATE games
SET white_user = ${userWhite}, black_user = ${userBlack}
WHERE g_id = ${g_id};