create table rf_users (
    user_id serial primary key,
    username varchar(120) not null,
    email varchar(150) not null,
    hash text not null,
    profile_picture text
);

create table saved_restaurants (
    saved_id serial primary key,
    user_id int references rf_users(user_id),
    restaurant_id varchar(100),
    restaurant_url text,
    restaurant_name varchar(150),
    restaurant_img text,
    phone varchar(100),
    rating float,
    review_count integer,
    address1 varchar(150),
    city varchar(10),
    zip_code varchar(30),
    country varchar(40),
    state varchar(10),
    price text

);