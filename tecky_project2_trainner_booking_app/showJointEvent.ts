import express from "express";
import { client } from "./env";

export const showJointEvent = express.Router();

showJointEvent.get("/jointEvent", async (req,res)=>{
    let result = await client.query(/*sql*/ 
    `select event.id, username, district.name as district_name,cast(event.date as text),start_time,end_time, event_name, event_profile_photo
    from event 
    join training_class on event_id = event.id
    join district on district.id = event.district_id 
    join users on users.id = event.trainer_id 
    where student_id = $1`,[req.session.user?.id])

    // console.log(result);
    // console.log(result.rows);
    
    res.json(result.rows)

})




export const showCalendarJointEvent = express.Router();

showCalendarJointEvent.get("/showCalendarJointEvent/:date", async (req,res)=>{
    let result = await client.query(/*sql*/ 
    `select event.id, 
    username, 
    district.name as district_name,
    cast(event.date as text),
    start_time,end_time,
     event_name, 
     event_profile_photo
    from event 
    join training_class on event_id = event.id
    join district on district.id = event.district_id 
    join users on users.id = event.trainer_id 
    where student_id = $1 AND date = $2`,[req.session.user?.id, req.params.date])

// console.log(req.params.date);

    
    res.json(result.rows)

})