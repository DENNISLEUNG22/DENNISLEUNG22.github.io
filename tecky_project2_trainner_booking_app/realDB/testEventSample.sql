-- users--added
INSERT into users(
        id,
        username,
        email,
        password,
        age,
        gender,
        phone,
        profile_icon
    )
values(
        44,
        'Dennis',
        'Dennis@gmail.com',
        '95881314',
        2,
        'M',
        95881314,
        '233f350a687c1a4aa43bf84fe96dc5dd.jpeg'
    );
INSERT into users(
        id,
        username,
        email,
        password,
        age,
        gender,
        phone,
        profile_icon
    )
values(
        55,
        'Yolo',
        'Yolo@gmail.com',
        '95881314',
        2,
        'F',
        95881314,
        'images (1).jpeg'
    );
INSERT into users(
        id,
        username,
        email,
        password,
        age,
        gender,
        phone,
        profile_icon
    )
values(
        66,
        'Donic',
        'Donic@gmail.com',
        '95881314',
        2,
        'M',
        95881314,
        'images.jpeg'
    );
-- fake event -- yoga 4 type --added
insert into event(
        trainer_id,
        event_name,
        sub_event_type_id,
        suggest_age_group_id,
        date,
        start_time,
        end_time,
        district_id,
        full_address,
        class_size,
        caption,
        event_profile_photo
    )
VALUES (
        44,
        'yoga_Karma',
        1,
        1,
        '2022-11-23',
        '2022-11-23 19:00:00',
        '2022-11-23 21:00:00',
        3,
        'Dennis Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.',
        10,
        'According to Lord Krishna in Bhagavad Gita, Karma yoga is the spiritual practice of "selfless action performed for the benefit of others"',
        '5d4034427790372cc40200600.webp'
    );
insert into event(
        trainer_id,
        event_name,
        sub_event_type_id,
        suggest_age_group_id,
        date,
        start_time,
        end_time,
        district_id,
        full_address,
        class_size,
        caption,
        event_profile_photo
    )
VALUES (
        44,
        'yoga_Kriya',
        2,
        1,
        '2022-11-23',
        '2022-11-23 19:00:00',
        '2022-11-23 21:00:00',
        2,
        'Dennis Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.',
        10,
        'In Kriya Yoga pranayama, kriya refers to revolving the life energy "upward and downward, around the six spinal centers.',
        '5d4034427790372cc40200600.webp'
    );
insert into event(
        trainer_id,
        event_name,
        sub_event_type_id,
        suggest_age_group_id,
        date,
        start_time,
        end_time,
        district_id,
        full_address,
        class_size,
        caption,
        event_profile_photo
    )
VALUES (
        44,
        'yoga_Bhakti',
        3,
        1,
        '2022-11-23',
        '2022-11-23 19:00:00',
        '2022-11-23 21:00:00',
        2,
        'Dennis Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.',
        10,
        'The Sanskrit word bhakti is derived from the root bhaj, which means "divide, share, partake, participate, to belong to".The word also means "attachment, devotion to, fondness for, homage, faith or love, worship, piety to something as a spiritual, religious principle or means of salvation',
        '5d4034427790372cc40200600.webp'
    );
insert into event(
        trainer_id,
        event_name,
        sub_event_type_id,
        suggest_age_group_id,
        date,
        start_time,
        end_time,
        district_id,
        full_address,
        class_size,
        caption,
        event_profile_photo
    )
VALUES (
        44,
        'yoga_Gnana',
        4,
        1,
        '2022-11-23',
        '2022-11-23 19:00:00',
        '2022-11-23 21:00:00',
        2,
        'Dennis Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.',
        10,
        'Jñāna, sometimes transcribed as gyaan, means "knowledge" in Sanskrit. The root jñā- is cognate to English know, as well as to the Greek γνώ- (as in γνῶσις gnosis). Its antonym is ajñāna "ignorance".',
        '5d4034427790372cc40200600.webp'
    );
--
--
--
-- fake event -- dance 4 type -- added
insert into event(
        trainer_id,
        event_name,
        sub_event_type_id,
        suggest_age_group_id,
        date,
        start_time,
        end_time,
        district_id,
        full_address,
        class_size,
        caption,
        event_profile_photo
    )
VALUES (
        55,
        'dance_Hiphop',
        1,
        2,
        '2022-11-23',
        '2022-11-23 19:00:00',
        '2022-11-23 21:00:00',
        19,
        'Yolo Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.',
        10,
        'Hip hop as music and culture formed during the 1970s in New York City from the multicultural exchange between African American youth from the United States and young Puerto Rican and children of immigrants from countries in the Caribbean.',
        'hiphop.jpeg'
    );
insert into event(
        trainer_id,
        event_name,
        sub_event_type_id,
        suggest_age_group_id,
        date,
        start_time,
        end_time,
        district_id,
        full_address,
        class_size,
        caption,
        event_profile_photo
    )
VALUES (
        55,
        'dance_contemporary',
        2,
        2,
        '2022-11-23',
        '2022-11-23 19:00:00',
        '2022-11-23 21:00:00',
        18,
        'Yolo Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.',
        10,
        'Contemporary dance draws on both classical ballet and modern dance, whereas postmodern dance was a direct and opposite response to modern dance.',
        'contemprary.webp'
    );
insert into event(
        trainer_id,
        event_name,
        sub_event_type_id,
        suggest_age_group_id,
        date,
        start_time,
        end_time,
        district_id,
        full_address,
        class_size,
        caption,
        event_profile_photo
    )
VALUES (
        55,
        'dance_jazz',
        3,
        2,
        '2022-11-23',
        '2022-11-23 19:00:00',
        '2022-11-23 21:00:00',
        17,
        'Yolo Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.',
        10,
        'Contemporary dance draws on both classical ballet and modern dance, whereas postmodern dance was a direct and opposite response to modern dance.',
        'jazz.jpg'
    );
insert into event(
        trainer_id,
        event_name,
        sub_event_type_id,
        suggest_age_group_id,
        date,
        start_time,
        end_time,
        district_id,
        full_address,
        class_size,
        caption,
        event_profile_photo
    )
VALUES (
        55,
        'dance_ballet',
        4,
        2,
        '2022-11-23',
        '2022-11-23 19:00:00',
        '2022-11-23 21:00:00',
        16,
        'Yolo Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.',
        10,
        'Ballet originated in the Italian Renaissance courts of the fifteenth and sixteenth centuries. Under Catherine de Medicis influence as Queen, it spread to France, where it developed even further.',
        'ballet.jpeg'
    );
-- fake event -- fitness 4 type --added
insert into event(
        trainer_id,
        event_name,
        sub_event_type_id,
        suggest_age_group_id,
        date,
        start_time,
        end_time,
        district_id,
        full_address,
        class_size,
        caption,
        event_profile_photo
    )
VALUES (
        66,
        'Fitness_aerobic',
        1,
        2,
        '2022-11-23',
        '2022-11-23 19:00:00',
        '2022-11-23 21:00:00',
        15,
        'Donic Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.',
        10,
        'Aerobic exercise is any type of cardiovascular conditioning, or “cardio.”',
        'aerobic.jpeg'
    );
--
insert into event(trainer_id,event_name,sub_event_type_id,suggest_age_group_id,date,start_time,end_time,district_id,full_address,class_size,caption,event_profile_photo)VALUES 
(
    66,
    'Fitness_Strength',
    2,
    2,
    '2022-11-23',
    '2022-11-23 19:00:00',
    '2022-11-23 21:00:00',
    14,
    '
Donic Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.',
    10,
    'Strength training is also known as weight training, resistance training, and muscular training.',
    'strength.jpeg'
);
--
insert into event(trainer_id,event_name,sub_event_type_id,suggest_age_group_id,date,start_time,end_time,district_id,full_address,class_size,caption,event_profile_photo)VALUES 
(
    66,
    'Fitness_Stretching',
    3,
    2,
    '2022-11-23',
    '2022-11-23 19:00:00',
    '2022-11-23 21:00:00',
    13,
    '
Donic Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.',
    10,
    'Stretching is a form of physical exercise in which a specific muscle or tendon (or muscle group) is deliberately flexed or stretched in order to improve the muscles felt elasticity and achieve comfortable muscle tone.',
    '20309c_a344e02414e44ffa924714b8def099ba_mv2.webp'
);
--
insert into event(trainer_id,event_name,sub_event_type_id,suggest_age_group_id,date,start_time,end_time,district_id,full_address,class_size,caption,event_profile_photo)VALUES 
(
    66,
    'Fitness_Balance',
    4,
    2,
    '2022-11-23',
    '2022-11-23 19:00:00',
    '2022-11-23 21:00:00',
    12,
    '
Donic Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.',
    10,
    'Balance training involves doing exercises that strengthen the muscles that help keep you upright, including your legs and core.',
    'balance.jpeg'
);
-- training class 26 by55
INSERT into training_class (event_id, student_id)
values (26, 9);
INSERT into training_class (event_id, student_id)
values (26, 10);
INSERT into training_class (event_id, student_id)
values (26, 11);
INSERT into training_class (event_id, student_id)
values (26, 12);
INSERT into training_class (event_id, student_id)
values (26, 13);
-- training class 35 by66
INSERT into training_class (event_id, student_id)
values (35, 33);
INSERT into training_class (event_id, student_id)
values (35, 44);
INSERT into training_class (event_id, student_id)
values (35, 14);
INSERT into training_class (event_id, student_id)
values (35, 55);
INSERT into training_class (event_id, student_id)
values (35, 15);
--submit all event 
INSERT into training_class (event_id, student_id)
values (35, 9);