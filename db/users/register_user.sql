insert into rf_users (
    username,
    email,
    hash,
    profile_picture
) values (
    ${username},
    ${email},
    ${hash},
    ${profilePicture}
)
returning user_id, username, email, profile_picture;