import express from "express";
import { client } from "./env";
// import { form, formObjecttoArray, formParse } from "./formtableUtilis";

// import { requireLogin } from './guards';



// To show all events
export const showAllEvent = express.Router();

//requireLogin
showAllEvent.get("/eventList", async (req,res)=>{
 let result = await client.query(/*sql*/ 
 `select event.id
 ,username
 ,district.name as district_name
 ,cast(event.date as text)
 ,start_time
 ,end_time
 ,event_name
 ,event_profile_photo 
 from event 
 join users on users.id = event.trainer_id 
 join district on district.id = event.district_id 
 where trainer_id = $1`,[req.session.user?.id])

//  console.log("result:",result);
//  console.log("resultRos:",result.rows);

    res.json(result.rows)
    // console.log(result);

    // console.log(result.rows);

})
//requireLogin
export let deleteEvent = express.Router();
deleteEvent.delete("/noGame/:id", async (req,res)=>{
    try {

            let id = +req.params.id
        let studentCount = await client.query(/*sql*/ ` select Count(*)
        from training_class
        where event_id = $1`,[id])

        // console.log("Event id:", id);
        // console.log("studentCount:",studentCount);
        // console.log("studentCountrowCount:",studentCount.rowCount);
        // console.log("Type of studentCountrowCount:",typeof(studentCount.rowCount));
        // console.log("studentCount row:",studentCount.rows[0].count);

    

        if(studentCount.rows[0].count > 0){
            res.status(409).json({ message: "You cannot delete the event. Since there is student/students in the event. Please contact them before you cancel it" });
            return;

        }else{
            let result = await client.query(/*sql*/ `delete from event where id = $1 AND trainer_id = $2`
            ,[id, req.session.user?.id])
            // res.json(result.rows)
            res.status(200).json({ message: "Event has deleted successfully" });
            return;
                console.log(result);
                //console.log(result.rows);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    return;
    }
    
   
   });


   // To show all events with specific date
export const showCalendarAllEvent = express.Router();

//requireLogin
showCalendarAllEvent.get("/eventList/:date", async (req,res)=>{
 let result = await client.query(/*sql*/ 
 `select event.id
 ,username
 ,district.name as district_name
 ,cast(event.date as text)
 ,start_time
 ,end_time
 ,event_name
 ,event_profile_photo 
 from event 
 join users on users.id = event.trainer_id 
 join district on district.id = event.district_id 
 where trainer_id = $1 AND date = $2`,[req.session.user?.id, req.params.date])

//  console.log(result);
 
    res.json(result.rows)
    // console.log(result);

    // console.log(result.rows);

})







// export type KeyEventDetails = {
//   eventName: string;
// //   mainEventType: string;
//   subEventType: string;
//   ageGroup: string;
//   date: Date;
//   startTime: number;
//   endTime: number;
//   area: string;
// //   district: string;
// //   fullAddress: string;
// //   classSize: number;
// //   caption: string;
//   eventProfilePhoto?: string;
// };

// export const dummyKeyEvent: KeyEventDetails = {
//     eventName: "",
//     // mainEventType: "",
//     subEventType: "",
//     ageGroup: "",
//     date: new Date(),
//     startTime: 1,
//     endTime: 1,
//     area: "",
//     // district: "",
//     // fullAddress: "",
//     // classSize: 1,
//     // caption: "",
//     eventProfilePhoto: "",
//   };

//   showAllEventRoutes.get("/eventList", requireLogin, async (req, res) =>{
//     try {
//         const { fields, files } = await formParse(form, req);
//         const filesArray = formObjecttoArray(files as any);


//         // let trainerId = req.session.user!.id;

//         let eventName = fields.eventName;
//         let subEventType = fields.subEventType;
//         let ageGroup = fields.ageGroup;
//         let date = fields.date;
//         let startTime = fields.startTime;
//         let endTime = fields.endTime;
//         let area = fields.area
//         // let district = fields.district;
//         // let fullAddress = fields.fullAddress;
//         // let classSize = fields.classSize;
//         // let caption = fields.caption;
//         let eventProfilePhoto = filesArray[0].profile.newFilename;

//         await client.query(/*sql*/`)
//     } catch (error) {
        
//     }
//   })