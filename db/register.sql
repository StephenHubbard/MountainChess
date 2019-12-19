INSERT INTO chess_users (
    email,
    username,
    portrait
)

VALUES (
    ${email},
    ${username},
    'blank-profile.png'
);

SELECT user_id FROM chess_users
WHERE username = ${username};