INSERT INTO users (username,email,password,age,gender,phone) VALUES ('1','1@gmail.com','11',18,'m',28882888);
INSERT INTO users (username,email,password,age,gender,phone) VALUES ('2','2@gmail.com','22',1,'m',27773777);

-- create role project2 with password 'project2';
-- alter role project2 with login;
alter table users add column password_hash char(60)
