INSERT INTO chess_users (
    email,
    username
)

VALUES (
    ${email},
    ${username}
);

SELECT user_id FROM chess_users
WHERE username = ${username};