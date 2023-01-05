--------------------------
--insert home page type --
--------------------------
--added-- 
insert into main_event_type(name) VALUES ('Yoga'), ('Dancing'), ('Fitness');
--added--
insert into sub_event_type(name,main_event_type_id) VALUES ('Karma',1), ('Kriya',1), ('Bhakti',1), ('Gnana',1);

--sub event type of dance -- added
insert into sub_event_type(name,main_event_type_id) 
VALUES ('HipHop',2), ('Contemporary',2), ('Jazz',2), ('Ballet',2);

----sub event type of fitness -- added 
insert into sub_event_type(name,main_event_type_id) 
VALUES ('Aerobic',3), ('Strength',3), ('Stretching',3), ('Balance',3);
-- area table-- added
insert INTO area (name) values ('香港島'),('九龍'),('新界西'),('新界東');

-- district table -- to be confirm for add to DB
insert INTO district (name,area_id) values ('中西區',1),('灣仔區',1),('東區',1),('南區',1),('油尖旺區',2),('深水埗區',2),('九龍城區',2),('黃大仙區',2),('觀塘區',2),('葵青區',3),('荃灣區',3),('屯門區',3),('元朗區',3),('離島區',1),('北區',1),('大埔區',4),('沙田區',4),('西貢區',4);

-- suggest group --addded

INSERT into suggest_age_group(name)values('Above 40'),('Above 18'),('12 ~ 17'),('6 ~ 11');

--first user --added
INSERT into users(username,email,password,age,gender,phone,profile_icon)
values('peter','peter@gmail.com','12345678',1,'M',12345678,null);
INSERT into users(username,email,password,age,gender,phone,profile_icon)
values('Jim','jim@gmail.com','12345678',1,'M',12345678,null);

--base on above data succ added--
insert into event(trainer_id,event_name,sub_event_type_id,suggest_age_group_id,date,start_time,end_time,district_id,full_address,class_size,caption,event_profile_photo)VALUES 
(10,'yoga_event1',1,1,'2016-06-22','2016-06-22 19:10:25','2016-06-22 19:25:25',2,'Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.',10,'this is caption',null);


-- training class added--


insert into event(trainer_id,event_name,sub_event_type_id,suggest_age_group_id,date,start_time,end_time,district_id,full_address,class_size,caption,event_profile_photo)VALUES 
(4,'yoga_event2',2,1,'2022-01-01','2022-01-01 19:10:25','2022-01-01 19:25:25',2,'Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.',10,'this is caption','5d4034427790372cc40200600.webp');


-- ppl to join a event ! --

INSERT into users(username,email,password,age,gender,phone,profile_icon)
values('TestPPL1','TestPPL1@gmail.com','12345678',2,'M',12345678,null);
--
INSERT into users(username,email,password,age,gender,phone,profile_icon)
values('TestPPL2','TestPPL2@gmail.com','12345678',2,'M',12345678,null);
--
INSERT into users(username,email,password,age,gender,phone,profile_icon)
values('TestPPL3','TestPPL3@gmail.com','12345678',2,'M',12345678,null);
INSERT into users(username,email,password,age,gender,phone,profile_icon)
values('TestPPL4','TestPPL4@gmail.com','12345678',2,'M',12345678,null);
INSERT into users(username,email,password,age,gender,phone,profile_icon)
values('TestPPL5','TestPPL5@gmail.com','12345678',2,'M',12345678,null);
INSERT into users(username,email,password,age,gender,phone,profile_icon)
values('TestPPL6','TestPPL6@gmail.com','12345678',2,'M',12345678,null);
INSERT into users(username,email,password,age,gender,phone,profile_icon)
values('TestPPL7','TestPPL7@gmail.com','12345678',2,'M',12345678,null);
INSERT into users(username,email,password,age,gender,phone,profile_icon)
values('TestPPL8','TestPPL8@gmail.com','12345678',2,'M',12345678,null);
INSERT into users(username,email,password,age,gender,phone,profile_icon)
values('TestPPL9','TestPPL9@gmail.com','12345678',2,'M',12345678,null);
INSERT into users(username,email,password,age,gender,phone,profile_icon)
values('TestPPL10','TestPPL10@gmail.com','12345678',2,'M',12345678,null);

-- join ppl to training class --

INSERT into training_class(event_id,student_id)
values(27,10);
--already here
INSERT into training_class(event_id,student_id)
values(27,11);
--
INSERT into training_class(event_id,student_id)
values(27,12);
INSERT into training_class(event_id,student_id)
values(27,13);
INSERT into training_class(event_id,student_id)
values(27,14);
INSERT into training_class(event_id,student_id)
values(27,15);
INSERT into training_class(event_id,student_id)
values(27,16);
INSERT into training_class(event_id,student_id)
values(27,17);
INSERT into training_class(event_id,student_id)
values(27,18);
INSERT into training_class(event_id,student_id)
values(27,19);
INSERT into training_class(event_id,student_id)
values(27,20);




















--
--project2=# select array_agg(district.name) as district, area.name as area from district inner join area on area_id=area.id group by area.name;
--                   district                   |  area  
----------------------------------------------+--------
 --{中西區,灣仔區,東區,南區,離島區,北區}        | 香港島
 --{葵青區,荃灣區,屯門區,元朗區}                | 新界西
-- {大埔區,沙田區,西貢區}                       | 新界東
 --{油尖旺區,深水埗區,九龍城區,黃大仙區,觀塘區} | 九龍
--(4 rows)--

--project2=# select district.name as district, area.name as area from district inner join area on --area_id=area.id;
-- district |  area  
------------+--------
-- 中西區   | 香港島
-- 灣仔區   | 香港島
-- 東區     | 香港島
-- 南區     | 香港島
-- 油尖旺區 | 九龍
-- 深水埗區 | 九龍
-- 九龍城區 | 九龍
-- 黃大仙區 | 九龍
-- 觀塘區   | 九龍
-- 葵青區   | 新界西
-- 荃灣區   | 新界西
-- 屯門區   | 新界西
-- 元朗區   | 新界西
-- 離島區   | 香港島
-- 北區     | 香港島
-- 大埔區   | 新界東
-- 沙田區   | 新界東
-- 西貢區   | 新界東
--(18 rows)



