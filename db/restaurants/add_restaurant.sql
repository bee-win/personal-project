insert into saved_restaurants (
    user_id,
    restaurant_id,
    restaurant_url,
    restaurant_name,
    restaurant_img,
    phone,
    rating,
    review_count,
    address1,
    city,
    zip_code,
    country,
    state,
    price
) values (
    $1, $2, $3, $4, $5,
    $6, $7, $8, $9, $10,
    $11, $12, $13, $14
);