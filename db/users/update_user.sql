update rf_users
set username = $1
where user_id = $2;

select user_id, username, email, profile_picture from rf_users 
where user_id = $2;