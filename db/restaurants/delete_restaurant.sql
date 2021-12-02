delete from saved_restaurants
where user_id = $1 and restaurant_id = $2;