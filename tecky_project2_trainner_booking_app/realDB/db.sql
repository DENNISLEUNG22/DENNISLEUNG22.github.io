create database project2;

\c project2

-- CREATE USER p3 WITH PASSWORD 'p3' SUPERUSER;

create table main_event_type(
    id serial primary key,
    name VARCHAR(100) not null
);
create table sub_event_type(
    id serial primary key ,
    name VARCHAR(100) not null,
    main_event_type_id integer REFERENCES main_event_type(id) not null
);
create table area(
    id serial primary key,
    name VARCHAR(100) not null
);
create table district (
    id serial primary key,
    name VARCHAR(100) not null,
    area_id integer REFERENCES area(id) not null
);

create table suggest_age_group(
    id serial primary key,
    name VARCHAR(100) not null

);
create table users (
    id serial primary key,
    username VARCHAR(100) not null,
    email VARCHAR(100) not null,
    password VARCHAR(100) not null,
    age INTEGER references suggest_age_group(id) not null,
    gender char(1) not null, 
    phone INTEGER not null,
    profile_icon varchar(512)
);

create table event(
    id serial primary key,
    trainer_id integer REFERENCES users(id)not null ,
    event_name VARCHAR(100) not null,
    sub_event_type_id INTEGER references sub_event_type(id) not null,
    suggest_age_group_id INTEGER REFERENCES suggest_age_group(id) not null,
    date DATE not null,
    start_time time not null,
    end_time time not null,
    district_id INTEGER references district(id) not null,
    full_address TEXT not null,
    class_size INTEGER not null,
    caption TEXT not null,
    event_profile_photo varchar(512)
);
ALTER table event alter column date TYPE VARCHAR(255);



create table training_class(
    id serial primary key,
    event_id integer REFERENCES event(id) not null,
    student_id integer REFERENCES users(id) not null
);