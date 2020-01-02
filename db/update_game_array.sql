UPDATE games
SET game_array = ${placement}, is_white_turn = ${isWhiteTurn}
WHERE g_id = ${g_id};