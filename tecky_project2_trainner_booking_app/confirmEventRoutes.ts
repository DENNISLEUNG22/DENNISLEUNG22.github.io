import express from "express";
import { client } from "./env";
// import { form, formObjecttoArray, formParse } from "./formtableUtilis";

// import { requireLogin } from './guards';


export const  eventDetails = express.Router();

// requireLogin
eventDetails.get("/eventDetails/:id", async (req,res)=>{
    let eId = parseInt(req.params.id)

 let result = await client.query(/*sql*/ 
 `select event.*, username, email, phone, profile_icon,
 sub_event_type.name as sub_event_type_name, suggest_age_group.name as suggest_age_group_name, district.name as district_name
 from event 
 join users on event.trainer_id = users.id 
 join sub_event_type on event.sub_event_type_id = sub_event_type.id
 join suggest_age_group on event.suggest_age_group_id = suggest_age_group.id
 join district on district.id = event.district_id 
 where event.id =$1`,[eId])

//  console.log(result);
 
    res.json(result.rows)
//actually only 1 row, can pass teh only object to js, then js don't need to use for loop, it can use the result directly.
//res.json(result.rows[0])
})

export const  joinEvent = express.Router();

export type Class ={
    event_id: number;
    student_id: number;

}
// requireLogin



joinEvent.post("/joinEvent/:id", async(req,res) =>{

    try {
        let eID = +req.params.id;
        console.log('eid:',eID);
    let  sID = req.session.user!.id;

    // let classRecord = await client.query(/*sql*/ ` select * from training_class 
    // join event on training_class.event_id = event.id where event.id = $1 
    // `,[eID])
    // console.log('classRecord:',classRecord.rows);
    let classRecord = await client.query(/*sql*/ ` 
    select * from training_class
    join event on training_class.event_id = event.id 
    join users on training_class.student_id = users.id
    where event.id = $1 
    `,[eID])

    // if(classRecord.rows.student_id == sID)

    if(classRecord.rows.length == 0 ||(classRecord.rows[0].class_size > classRecord.rowCount)){
        await client.query(
        
            /*sql*/ `insert into training_class(
                event_id,student_id) values ($1,$2)`,[eID,sID]
        )
        res.status(200).json({ message: "登記成功～去比錢啦！" });
        return
    }else{
        res.status(200).json({ message: "滿人啦～" });
        return

    }
    

   

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "System Error" });

        
    }
    
})





